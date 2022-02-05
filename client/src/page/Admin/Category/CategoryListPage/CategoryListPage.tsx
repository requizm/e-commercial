import "../../Admin.scss";

import { CategoryList } from "../../../../component/Admin/Category/CategoryList/CategoryList";
import { Sidebar } from "../../../../component/Admin/Sidebar/Sidebar";
import { Header } from "../../../../component/Header/Header";

export function CategoryListPage() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <CategoryList />
                </div>
            </div>
        </div>
    );
}
