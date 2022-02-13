import "./style/AddCategory.scss";

import { FormEvent, useEffect, useState } from "react";

import { Get, Post } from "../../../../util/ApiCall";
import { isNullOrEmpty } from "../../../../util/StringUtils";

export interface Category {
    id: number;
    name: string;
    parent: number;
}

export function AddCategory() {
    const [name, setName] = useState("");
    const [parent, setParent] = useState(-1);
    const [formSubmit, setFormSubmit] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        updateCategoryList();
    }, []);

    useEffect(() => {
        function validateForm(): boolean {
            return isNullOrEmpty(name);
        }

        let object = document.getElementById("add-button");
        if (validateForm()) {
            document
                .getElementById("add-button")
                ?.setAttribute("disabled", "disabled");
            object?.classList.remove("active-btn");
            object?.classList.add("disable-btn");
        } else {
            document.getElementById("add-button")?.removeAttribute("disabled");
            object?.classList.remove("disable-btn");
            object?.classList.add("active-btn");
        }
    }, [name]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = { name: name, parent: parent === -1 ? null : parent };
        const response = await Post(JSON.stringify(data), "category/add");
        if (response.ok) {
            updateCategoryList();
            setFormSubmit("Eklendi!");
        } else {
            const result = await response.json();
            setFormSubmit(result.message);
        }
    }

    async function updateCategoryList() {
        const response = await Get("category/getall");
        const result = await response.json();
        setCategories(result.data);
    }

    return (
        <div className="category-card">
            <form className="category-form" onSubmit={handleSubmit}>
                <div className="category-form-block">
                    <div className="input-block name-block">
                        <div className="name-text">Name*</div>
                        <input
                            type="text"
                            placeholder="Enter"
                            name="name"
                            className="text-input name-input"
                            autoComplete="off"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input-block parent-block">
                        <div className="parent-text">Parent</div>
                        <select
                            name="parent"
                            className="text-input parent-select"
                            autoComplete="off"
                            onChange={(e) => setParent(Number(e.target.value))}
                        >
                            <option value="-1">Null</option>
                            {categories.map((category: Category) => {
                                return (
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="status">
                        <div className="status-text">{formSubmit}</div>
                    </div>
                </div>
                <div className="category-form-bottom">
                    <div className="add-button-block">
                        <input
                            type="submit"
                            id="add-button"
                            className="btn disable-btn add-button"
                            value="Add"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
