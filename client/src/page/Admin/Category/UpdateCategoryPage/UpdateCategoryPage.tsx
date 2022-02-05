import "../../Admin.scss";

import { UpdateCategory } from "../../../../component/Admin/Category/UpdateCategory/UpdateCategory";
import { Sidebar } from "../../../../component/Admin/Sidebar/Sidebar";
import { Header } from "../../../../component/Header/Header";

export function UpdateCategoryPage() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <UpdateCategory />
                </div>
            </div>
        </div>
    );
}
