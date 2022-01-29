import { ChangeEvent, Component, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Post } from '../../util/ApiCall';
import './style/Register.scss';

export class Register extends Component<any, any> {
    constructor(prop: any) {
        super(prop);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '', lastName: '', email: '', password: '',
            firstNameError: '', lastNameError: '', emailError: '', passwordError: '', formSubmit: null
        };
    }

    handleValidation(): boolean {
        let error = false;
        if (!this.state.firstName) {
            this.setState({ firstNameError: "First name is required" });
            error = true;
        }
        else {
            this.setState({ firstNameError: "" });
        }

        if (!this.state.lastName) {
            this.setState({ lastNameError: "Last name is required" });
            error = true;
        }
        else {
            this.setState({ lastNameError: "" });
        }


        if (!this.state.email) {
            this.setState({ emailError: "Email is required" });
            error = true;
        }
        else {
            this.setState({ emailError: "" });
        }

        if (!this.state.password) {
            this.setState({ passwordError: "Password is required" });
            error = true;
        }
        else {
            this.setState({ passwordError: "" });
        }

        return !error;
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.handleValidation()) {
            const data = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
            const response = await Post(JSON.stringify(data), "auth/register");
            this.setState({ formSubmit: response.ok });
        }
        else {
            this.setState({ formSubmit: null });
        }
    }

    render() {
        if (this.state.formSubmit) {
            return <Navigate to='/login' />
        }
        return <div className="register-card">
            <form onSubmit={this.handleSubmit}>
                <div className="register-card-form">
                    <div className="input-block firstName-block">
                        <div className="firstName-text">Name*</div>
                        <input type="text" placeholder="Enter" name="firstName" className="text-input firstName-input" autoComplete="off" value={this.state.firstName} onChange={this.handleChange} />
                        <div className="error-text">{this.state.firstNameError}</div>
                    </div>
                    <div className="input-block lastName-block">
                        <div className="lastName-text">Surname*</div>
                        <input type="text" placeholder="Enter" name="lastName" className="text-input lastName-input" autoComplete="off" value={this.state.lastName} onChange={this.handleChange} />
                        <div className="error-text">{this.state.lastNameError}</div>
                    </div>
                    <div className="input-block email-block">
                        <div className="email-text">Email*</div>
                        <input type="text" placeholder="Enter" name="email" className="text-input email-input" autoComplete="off" value={this.state.email} onChange={this.handleChange} />
                        <div className="error-text">{this.state.emailError}</div>
                    </div>
                    <div className="input-block password-block">
                        <div className="password-text">Password*</div>
                        <input type="password" placeholder="Enter" name="password" className="text-input password-input" autoComplete="off" value={this.state.password} onChange={this.handleChange} />
                        <div className="error-text">{this.state.passwordError}</div>
                    </div>
                    <div className="status">
                        <div className="status-text">{this.state.formSubmit !== null ? (this.state.formSubmit ? "Success" : "Failed") : ""}</div>
                    </div>
                </div>
                <div className="register-card-bottom">
                    <div className="register-button-block">
                        <input type="submit" className="btn active-btn register-button" value="Register" />
                    </div>
                    <div className="login-block">
                        <span className="login-text">Do you have a account?</span>
                        <Link className="login-link" to="/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    }
}