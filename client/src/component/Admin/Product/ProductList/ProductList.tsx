import "./style/ProductList.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Get, Post } from "../../../../util/ApiCall";

export interface Category {
    id: number;
    name: string;
    parent: Category;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
}

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [formSubmit, setFormSubmit] = useState("");

    async function updateProductList() {
        const response = await Get("product/getall");
        const result = await response.json();
        setProducts(result.data);
    }

    useEffect(() => {
        updateProductList();
    }, []);

    async function deleteProduct(id: number) {
        const response = await Post("", `product/delete/${id}`);
        if (response.ok) {
            updateProductList();
            setFormSubmit("");
        } else {
            const result = await response.json();
            setFormSubmit(result.message);
        }
    }

    return (
        <div className="product-table">
            <table>
                <thead>
                    <tr>
                        <th>İd</th>
                        <th>İsim</th>
                        <th>Açıklama</th>
                        <th>Fiyat</th>
                        <th>Fotoğraf</th>
                        <th>Kategori</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product) => {
                        return (
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt=""
                                        className="image"
                                    />
                                </td>
                                <td>{product.category.name}</td>
                                <td>
                                    <Link
                                        to={
                                            "/admin/products/update/" +
                                            product.id
                                        }
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
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
