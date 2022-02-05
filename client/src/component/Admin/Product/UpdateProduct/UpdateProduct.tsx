import "./style/UpdateProduct.scss";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Get, Put } from "../../../../util/ApiCall";
import { isNullOrEmpty } from "../../../../util/StringUtils";

export interface Category {
    id: number;
    name: string;
    parent: number;
}

const defaultFields = {
    name: "",
    description: "",
    price: 5,
    image: "",
    category: 0,
};
export function UpdateProduct() {
    let params = useParams();
    const id = Number(params.id);

    const [fields, setFields] = useState(defaultFields);
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
            id: id,
            name: fields.name,
            description: fields.description,
            price: fields.price,
            image: fields.image,
            category: fields.category,
        };
        const response = await Put(JSON.stringify(data), "product/update");
        if (response.ok) {
            setFormSubmit("Güncellendi!");
        } else {
            const result = await response.json();
            setFormSubmit(result.message);
        }
    }

    async function updateCategoryList() {
        const categoryResponse = await Get("category/getall");
        const categoryResult = await categoryResponse.json();
        setCategories(categoryResult.data);

        const productResponse = await Get(`product/get/${id}`);
        const productResult = await productResponse.json();
        setFields((prevState) => ({
            ...prevState,
            name: productResult.data.name,
            description: productResult.data.description,
            price: productResult.data.price,
            image: productResult.data.image,
            category: productResult.data.category.id,
        }));
    }

    function handleInput(event: FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        setFields((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSelectInput(event: FormEvent<HTMLSelectElement>) {
        const { name, value } = event.currentTarget;
        setFields((prevState) => ({ ...prevState, [name]: value }));
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
                    <div className="update-button-block">
                        <input
                            type="submit"
                            id="update-button"
                            disabled={true}
                            className="btn active-btn update-button"
                            value="Update"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
