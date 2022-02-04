import { Link } from "react-router-dom";
import "./style/Sidebar.scss"

export function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="list">
                <li className="list-item"><Link to={"/admin/categories"} >Categories</Link></li>
                <li className="list-item"><Link to={"/admin/categories/add"} >Add Category</Link></li>
                <li className="list-item"><Link to={"/admin/products"} >Products</Link></li>
                <li className="list-item"><Link to={"/admin/products/add"} >Add Product</Link></li>
            </ul>
        </div>
    )
}
