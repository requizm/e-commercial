import { CategoryList } from '../../../../component/Admin/Category/CategoryList/CategoryList';
import { Header } from '../../../../component/Header/Header';

import './style/CategoryListPage.scss';

export function CategoryListPage() {
    return (
        <div className="App">
            <Header />
            <CategoryList />
        </div>
    );
}
