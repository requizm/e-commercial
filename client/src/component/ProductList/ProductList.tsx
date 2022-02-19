import { useEffect, useState } from "react";
import { Get } from "../../util/ApiCall";

import "./style/ProductList.scss"

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

    useEffect(() => {
        updateProductList();
    }, []);

    async function updateProductList() {
        const response = await Get("product/getall");
        const result = await response.json();
        setProducts(result.data);
    }

    return (
        <div className="items">
            {products.map((product: Product) => {
                return (
                    <a href={ String(product.id) }>
                        <div className="item" key={product.id}>
                            <div className="img-block">
                                <img className="img" src="https://via.placeholder.com/150" alt="product" />
                            </div>
                            <div className="info-block">
                                <div className="name">{product.name}</div>
                                <div className="price">${product.price}</div>
                            </div>
                        </div>
                    </a>);
            })}
        </div>
    );
}
