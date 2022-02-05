import "../../Admin.scss";

import { AddCategory } from "../../../../component/Admin/Category/AddCategory/AddCategory";
import { Sidebar } from "../../../../component/Admin/Sidebar/Sidebar";
import { Header } from "../../../../component/Header/Header";

export function AddCategoryPage() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <AddCategory />
                </div>
            </div>
        </div>
    );
}
