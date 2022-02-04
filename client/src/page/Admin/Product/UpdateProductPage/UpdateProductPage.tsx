import '../../Admin.scss';

import { UpdateProduct } from '../../../../component/Admin/Product/UpdateProduct/UpdateProduct';
import { Sidebar } from '../../../../component/Admin/Sidebar/Sidebar';
import { Header } from '../../../../component/Header/Header';

export function UpdateProductPage() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <UpdateProduct />
                </div>
            </div >
        </div>
    );
}
