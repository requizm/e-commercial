import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Post } from '../../util/ApiCall';
import './style/Register.scss';

export function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formSubmit, setFormSubmit] = useState('');

    let navigate = useNavigate();

    function handleValidation(): boolean {
        return !firstName || !lastName || !email || !password;
    }

    function updateValidationErrors() {

        if (!firstName) {
            setFirstNameError("First name is required");
        }
        else {
            setFirstNameError("");
        }

        if (!lastName) {
            setLastNameError("Last name is required");
        }
        else {
            setLastNameError("");
        }


        if (!email) {
            setEmailError("Email is required");
        }
        else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
        }
        else {
            setPasswordError("");
        }
    }

    async function handleChange(setEvent: any, event: ChangeEvent<HTMLInputElement>, errorText: string, errorSetter: any) {
        setEvent(event.target.value);
        if (errorText && event.target.value) {
            errorSetter('')
        }

        let object = document.getElementById('register-button');
        if (!handleValidation()) {
            document.getElementById("register-button")?.setAttribute("disabled", "disabled");
            object?.classList.remove("active-btn");
            object?.classList.add("disable-btn");
        }
        else {
            document.getElementById("register-button")?.removeAttribute("disabled");
            object?.classList.remove("disable-btn");
            object?.classList.add("active-btn");
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        updateValidationErrors();
        if (!handleValidation()) {
            const data = { firstName: firstName, lastName: lastName, email: email, password: password };
            const response = await Post(JSON.stringify(data), "auth/register");
            if (response.ok) {
                navigate("../login");
            }
            const responseText = await response.text();
            setFormSubmit(responseText);
        }
        else {
            setFormSubmit('');
        }
    }
    return <div className="register-card">
        <form onSubmit={handleSubmit}>
            <div className="register-card-form">
                <div className="input-block firstName-block">
                    <div className="firstName-text">Name*</div>
                    <input type="text" placeholder="Enter" name="firstName" className="text-input firstName-input" autoComplete="off" onChange={e => handleChange(setFirstName, e, firstNameError, setFirstNameError)} />
                    <div className="error-text">{firstNameError}</div>
                </div>
                <div className="input-block lastName-block">
                    <div className="lastName-text">Surname*</div>
                    <input type="text" placeholder="Enter" name="lastName" className="text-input lastName-input" autoComplete="off" onChange={e => handleChange(setLastName, e, lastNameError, setLastNameError)} />
                    <div className="error-text">{lastNameError}</div>
                </div>
                <div className="input-block email-block">
                    <div className="email-text">Email*</div>
                    <input type="text" placeholder="Enter" name="email" className="text-input email-input" autoComplete="off" onChange={e => handleChange(setEmail, e, emailError, setEmailError)} />
                    <div className="error-text">{emailError}</div>
                </div>
                <div className="input-block password-block">
                    <div className="password-text">Password*</div>
                    <input type="password" placeholder="Enter" name="password" className="text-input password-input" autoComplete="off" onChange={e => handleChange(setPassword, e, passwordError, setPasswordError)} />
                    <div className="error-text">{passwordError}</div>
                </div>
                <div className="status">
                    <div className="status-text">{formSubmit}</div>
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