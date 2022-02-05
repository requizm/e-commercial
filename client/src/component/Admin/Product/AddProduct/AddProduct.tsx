import "./style/AddProduct.scss";

import { FormEvent, useEffect, useState } from "react";

import { Get, Post } from "../../../../util/ApiCall";
import { isNullOrEmpty } from "../../../../util/StringUtils";

export class Category {
    id: number | undefined;
    name: string | undefined;
    parent: Category | undefined;
}

const defaultFields = {
    name: "",
    description: "",
    price: 5,
    image: "",
    category: 0,
};
export function AddProduct() {
    const [fields, setFields] = useState(defaultFields);
    const [formSubmit, setFormSubmit] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        updateCategoryList();
    }, []);

    useEffect(() => {
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
    }, [fields.image, fields.description, fields.price, fields.name]);

    function validateForm(): boolean {
        return (
            isNullOrEmpty(fields.name) ||
            isNullOrEmpty(fields.description) ||
            isNullOrEmpty(fields.image) ||
            fields.price <= 0
        );
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = {
            name: fields.name,
            description: fields.description,
            price: fields.price,
            image: fields.image,
            category: {
                id: fields.category,
            },
        };
        const response = await Post(JSON.stringify(data), "product/add");
        if (response.ok) {
            setFormSubmit("Eklendi!");
        } else {
            const responseText = await response.text();
            setFormSubmit(responseText);
        }
    }

    function handleInput(event: FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        setFields((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSelectInput(event: FormEvent<HTMLSelectElement>) {
        const { name, value } = event.currentTarget;
        setFields((prevState) => ({ ...prevState, [name]: value }));
    }

    async function updateCategoryList() {
        const response = await Get("category/getall");
        const categories = await response.json();
        setCategories(categories);
    }

    return (
        <div className="product-card">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="product-form-block">
                    <div className="input-block name-block">
                        <div className="name-text">Name*</div>
                        <input
                            type="text"
                            placeholder="Enter"
                            name="name"
                            value={fields.name}
                            className="text-input name-input"
                            autoComplete="off"
                            onChange={(e) => handleInput(e)}
                            required
                        />
                    </div>
                    <div className="input-block description-block">
                        <div className="description-text">Description*</div>
                        <input
                            type="text"
                            placeholder="Enter"
                            name="description"
                            value={fields.description}
                            className="text-input description-input"
                            autoComplete="off"
                            onChange={(e) => handleInput(e)}
                            required
                        />
                    </div>
                    <div className="input-block price-block">
                        <div className="price-text">Price*</div>
                        <input
                            type="number"
                            placeholder="Enter"
                            name="price"
                            value={fields.price}
                            className="text-input price-input"
                            autoComplete="off"
                            onChange={(e) => handleInput(e)}
                            required
                        />
                    </div>
                    <div className="input-block image-block">
                        <div className="image-text">Image*</div>
                        <input
                            type="text"
                            placeholder="Enter"
                            name="image"
                            value={fields.image}
                            className="text-input image-input"
                            autoComplete="off"
                            onChange={(e) => handleInput(e)}
                            required
                        />
                    </div>
                    <div className="input-block category-block">
                        <div className="category-text">Category</div>
                        <select
                            name="category"
                            value={fields.category}
                            className="text-input category-select"
                            autoComplete="off"
                            onChange={(e) => handleSelectInput(e)}
                        >
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
                <div className="product-form-bottom">
                    <div className="add-button-block">
                        <input
                            type="submit"
                            id="add-button"
                            disabled={true}
                            className="btn disable-btn add-button"
                            value="Add"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
