import "./style/Login.scss";

import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Post } from "../../util/ApiCall";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmit, setFormSubmit] = useState("");
    let navigate = useNavigate();

    function handleValidation(): boolean {
        return !email || !password;
    }

    async function handleChange(
        setEvent: any,
        event: ChangeEvent<HTMLInputElement>
    ) {
        setEvent(event.target.value);
        let object = document.getElementById("login-button");
        if (handleValidation()) {
            document
                .getElementById("login-button")
                ?.setAttribute("disabled", "disabled");
            object?.classList.remove("active-btn");
            object?.classList.add("disable-btn");
        } else {
            document
                .getElementById("login-button")
                ?.removeAttribute("disabled");
            object?.classList.remove("disable-btn");
            object?.classList.add("active-btn");
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!handleValidation()) {
            const data = { email: email, password: password };
            const response = await Post(JSON.stringify(data), "auth/login");
            if (response.ok) {
                navigate("../");
            }
            const responseText = await response.text();
            setFormSubmit(responseText);
        } else {
            setFormSubmit("");
        }
    }
    return (
        <div className="login-card">
            <form onSubmit={handleSubmit}>
                <div className="login-card-form">
                    <div className="input-block email-block">
                        <div className="email-text">E-mail</div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter"
                            className="text-input email-input"
                            autoComplete="off"
                            onChange={(e) => handleChange(setEmail, e)}
                        />
                    </div>
                    <div className="input-block password-block">
                        <div className="password-text">Password</div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter"
                            className="text-input password-input"
                            autoComplete="off"
                            onChange={(e) => handleChange(setPassword, e)}
                        />
                    </div>
                    <div className="status">
                        <div className="status-text">{formSubmit}</div>
                    </div>
                </div>
                <div className="login-card-bottom">
                    <div className="login-button-block">
                        <input
                            type="submit"
                            id="login-button"
                            disabled={true}
                            className="btn disable-btn login-button"
                            value="Login"
                        />
                    </div>
                    <div className="register-block">
                        <span className="register-text">
                            Don't have an account?
                        </span>
                        <Link className="register-link" to="/register">
                            Register
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
