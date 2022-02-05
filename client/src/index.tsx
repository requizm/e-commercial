import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AddCategoryPage } from "./page/Admin/Category/AddCategoryPage/AddCategoryPage";
import { CategoryListPage } from "./page/Admin/Category/CategoryListPage/CategoryListPage";
import { UpdateCategoryPage } from "./page/Admin/Category/UpdateCategoryPage/UpdateCategoryPage";
import { AddProductPage } from "./page/Admin/Product/AddProductPage/AddProductPage";
import { ProductListPage } from "./page/Admin/Product/ProductListPage/ProductListPage";
import { UpdateProductPage } from "./page/Admin/Product/UpdateProductPage/UpdateProductPage";
import { LoginPage } from "./page/LoginPage/LoginPage";
import { RegisterPage } from "./page/RegisterPage/RegisterPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/admin/products"
                    element={<ProductListPage />}
                ></Route>
                <Route
                    path="/admin/products/add"
                    element={<AddProductPage />}
                ></Route>
                <Route
                    path="/admin/products/update/:id"
                    element={<UpdateProductPage />}
                ></Route>
                <Route
                    path="/admin/categories"
                    element={<CategoryListPage />}
                ></Route>
                <Route
                    path="/admin/categories/add"
                    element={<AddCategoryPage />}
                ></Route>
                <Route
                    path="/admin/categories/update/:id"
                    element={<UpdateCategoryPage />}
                ></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
