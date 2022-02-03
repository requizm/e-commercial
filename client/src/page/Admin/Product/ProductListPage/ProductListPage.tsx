import { Header } from '../../../../component/Header/Header';
import { ProductList } from '../../../../component/Admin/Product/ProductList/ProductList';

import './style/ProductListPage.scss';

export function ProductListPage() {
    return (
        <div className="App">
            <Header />
            <ProductList />
        </div>
    );
}
