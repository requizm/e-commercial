import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Get } from "../../util/ApiCall";

import "./style/ProductDetail.scss"

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

export function ProductDetail() {
    const [product, setProduct] = useState({} as Product);

    let params = useParams();
    const id = Number(params.id);

    const updateProductDetail = useCallback(async () => {
        const response = await Get("product/get/" + id);
        const result = await response.json();
        setProduct(result.data);
    }, [id]);

    useEffect(() => {
        updateProductDetail();
    }, [updateProductDetail]);

    return (
        <div className="item">
            <div className="item-image">
                <img src="https://via.placeholder.com/150" alt="product" />
            </div>
            <div className="item-info">
                <div className="item-name">{product.name}</div>
                <div className="item-price">${product.price}</div>
                <div className="item-description">{product.description}</div>
            </div>
        </div>
    );
}
