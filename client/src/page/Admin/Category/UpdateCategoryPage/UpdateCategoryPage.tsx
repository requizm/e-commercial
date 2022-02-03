import { UpdateCategory } from '../../../../component/Admin/Category/UpdateCategory/UpdateCategory';
import { Header } from '../../../../component/Header/Header';

import './style/UpdateCategoryPage.scss';

export function UpdateCategoryPage() {
    return (
        <div className="App">
            <Header />
            <UpdateCategory />
        </div>
    );
}
