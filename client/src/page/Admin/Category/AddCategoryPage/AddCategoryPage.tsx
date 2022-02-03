import { AddCategory } from '../../../../component/Admin/Category/AddCategory/AddCategory';
import { Header } from '../../../../component/Header/Header';

import './style/AddCategoryPage.scss';

export function AddCategoryPage() {
    return (
        <div className="App">
            <Header />
            <AddCategory />
        </div>
    );
}
