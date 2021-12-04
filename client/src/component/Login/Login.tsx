import { Component } from 'react';
import './style/Login.scss';

export class Login extends Component {
    constructor(prop: any) {
        super(prop);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        alert('Login Successful');
    }
    render() {
        return <div className="login-card">
            <div className="username-block">
                <div className="username-text">Username</div>
                <input type="text" placeholder="Username" className="username-input" />
            </div>
            <div className="password-block">
                <div className="password-text">Password</div>
                <input type="password" placeholder="Password" className="password-input" />
            </div>
            <div className="login-button-block">
                <button className="login-button" onClick={this.handleClick} >Login</button>
            </div>
        </div>
    }
}