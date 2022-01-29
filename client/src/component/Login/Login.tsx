import { ChangeEvent, Component, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Post } from '../../util/ApiCall';
import './style/Login.scss';

export class Login extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { email: '', password: '', formSubmit: null };
    }

    handleValidation(): boolean {
        if (this.state.email && this.state.password) {
            return true;
        }
        return false;
    }

    async handleChange(event: ChangeEvent<HTMLInputElement>) {
        await this.setState({ [event.target.name]: event.target.value });
        let object = document.getElementById('login-button');
        if (!this.handleValidation()) {
            document.getElementById("login-button")?.setAttribute("disabled", "disabled");
            object?.classList.remove("active-btn");
            object?.classList.add("disable-btn");
        }
        else {
            document.getElementById("login-button")?.removeAttribute("disabled");
            object?.classList.remove("disable-btn");
            object?.classList.add("active-btn");
        }
    }

    async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.handleValidation()) {
            const data = { email: this.state.email, password: this.state.password };
            const response = await Post(JSON.stringify(data), "auth/login");
            this.setState({ formSubmit: response.ok });
        }
        else {
            this.setState({ formSubmit: null });
        }
    }

    render() {
        if (this.state.formSubmit) {
            return <Navigate to="/" />;
        }
        return <div className="login-card">
            <form onSubmit={this.handleSubmit}>
                <div className="login-card-form">
                    <div className="input-block email-block">
                        <div className="email-text">E-mail</div>
                        <input type="text" name="email" placeholder="Enter" className="text-input email-input" autoComplete="off" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="input-block password-block">
                        <div className="password-text">Password</div>
                        <input type="password" name="password" placeholder="Enter" className="text-input password-input" autoComplete="off" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="login-card-bottom">
                    <div className="login-button-block">
                        <input type="submit" id="login-button" disabled={true} className="btn disable-btn login-button" value="Login" />
                    </div>
                    <div className="register-block">
                        <span className="register-text">Don't have an account?</span>
                        <Link className="register-link" to="/register">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    }
}