import { Header } from "../../component/Header/Header";
import { Login } from "../../component/Login/Login";
import "./style/LoginPage.scss";

export function LoginPage() {
    return (
        <div className="App">
            <Header />
            <Login />
        </div>
    );
}
