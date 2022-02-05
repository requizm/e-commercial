import "./style/CategoryList.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Get, Post } from "../../../../util/ApiCall";

export interface Category {
    id: number;
    name: string ;
    parent: Category;
}

export function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [formSubmit, setFormSubmit] = useState("");

    async function updateCategoryList() {
        const response = await Get("category/getall");
        const result = await response.json();
        setCategories(result.data);
    }

    useEffect(() => {
        updateCategoryList();
    }, []);

    async function deleteCategory(id: number) {
        const response = await Post("", `category/delete/${id}`);
        if (response.ok) {
            updateCategoryList();
            setFormSubmit("");
        } else {
            const result = await response.json();
            setFormSubmit(result.message);
        }
    }

    return (
        <div className="category-table">
            <table>
                <thead>
                    <tr>
                        <th>İd</th>
                        <th>İsim</th>
                        <th>Üst Kategori</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: Category) => {
                        return (
                            <tr>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.parent?.name}</td>
                                <td>
                                    <Link
                                        to={
                                            "/admin/categories/update/" +
                                            category.id
                                        }
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() =>
                                            deleteCategory(category.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="status">
                <div className="status-text">{formSubmit}</div>
            </div>
        </div>
    );
}
