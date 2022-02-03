import { AddProduct } from '../../../../component/Admin/Product/AddProduct/AddProduct';
import { Header } from '../../../../component/Header/Header';

import './style/AddProductPage.scss';

export function AddProductPage() {
    return (
        <div className="App">
            <Header />
            <AddProduct />
        </div>
    );
}
