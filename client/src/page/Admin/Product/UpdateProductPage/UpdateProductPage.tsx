import { UpdateProduct } from '../../../../component/Admin/Product/UpdateProduct/UpdateProduct';
import { Header } from '../../../../component/Header/Header';

import './style/UpdateProductPage.scss';

export function UpdateProductPage() {
    return (
        <div className="App">
            <Header />
            <UpdateProduct />
        </div>
    );
}
