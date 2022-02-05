import "./style/UpdateCategory.scss";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Get, Put } from "../../../../util/ApiCall";
import { isNullOrEmpty } from "../../../../util/StringUtils";

export class Category {
    id!: number;
    name!: string;
    parent: Category | undefined;
}

export function UpdateCategory() {
    let params = useParams();
    const id = Number(params.id);
    const [name, setName] = useState("");
    const [parent, setParent] = useState(new Category());
    const [formSubmit, setFormSubmit] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        updateCategoryList();
    }, []);

    useEffect(() => {
        let object = document.getElementById("update-button");
        if (validateForm()) {
            document
                .getElementById("update-button")
                ?.setAttribute("disabled", "disabled");
            object?.classList.remove("active-btn");
            object?.classList.add("disable-btn");
        } else {
            document
                .getElementById("update-button")
                ?.removeAttribute("disabled");
            object?.classList.remove("disable-btn");
            object?.classList.add("active-btn");
        }
    }, [name]);

    function validateForm(): boolean {
        return isNullOrEmpty(name);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = { id: id, name: name, parent: parent };
        const response = await Put(JSON.stringify(data), "category/update");
        if (response.ok) {
            updateCategoryList();
            setFormSubmit("Güncellendi!");
        } else {
            const result = await response.json();
            setFormSubmit(result.message);
        }
    }

    async function updateCategoryList() {
        const response = await Get("category/getall");
        const result = await response.json();
        setCategories(result.data);

        const category: Category = result.data.find(
            (c: { id: number }) => c.id === id
        );
        setName(category?.name);
        if (category?.parent) {
            setParent(category?.parent);
        }
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
                            value={name}
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
                            value={parent.id}
                            onChange={(e) => {
                                let category: Category = new Category();
                                category.id = Number(e.target.value);
                                setParent(category);
                            }}
                        >
                            <option value="">None</option>
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
                    <div className="update-button-block">
                        <input
                            type="submit"
                            id="update-button"
                            className="btn active-btn update-button"
                            value="Update"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
