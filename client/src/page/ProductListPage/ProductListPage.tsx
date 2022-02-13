import { Header } from "../../component/Header/Header";
import { ProductList } from "../../component/ProductList/ProductList";

import "./style/ProductListPage.scss";

export function ProductListPage() {
    return (
        <div>
            <Header />
            <div className="content">
                <ProductList />
            </div>
        </div>
    );
}
