import "../../Admin.scss";

import { AddProduct } from "../../../../component/Admin/Product/AddProduct/AddProduct";
import { Sidebar } from "../../../../component/Admin/Sidebar/Sidebar";
import { Header } from "../../../../component/Header/Header";

export function AddProductPage() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <AddProduct />
                </div>
            </div>
        </div>
    );
}
