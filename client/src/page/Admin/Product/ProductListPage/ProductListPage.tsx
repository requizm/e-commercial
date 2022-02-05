import "../../Admin.scss";

import { ProductList } from "../../../../component/Admin/Product/ProductList/ProductList";
import { Sidebar } from "../../../../component/Admin/Sidebar/Sidebar";
import { Header } from "../../../../component/Header/Header";

export function ProductListPage() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <ProductList />
                </div>
            </div>
        </div>
    );
}
