import { Header } from "../../component/Header/Header";
import { ProductDetail } from "../../component/ProductDetail/ProductDetail";

import "./style/ProductDetailPage.scss";

export function ProductDetailPage() {
    return (
        <div>
            <Header />
            <div className="content">
                <ProductDetail />
            </div>
        </div>
    );
}
