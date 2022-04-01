import { Component } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginUsername: '',
            loginPassword: '',
            registerForm: false,
            registerUsername: '',
            registerPassword: '',
            registerPasswordConfirm: '',
            loginStatus: false
        }
    }

    async loginAuth() {
        axios({
            method: "POST",
            url: "http://localhost:5000/auth"
        }).then((res) => {
            if (res.data === 'authorized') {
                this.setLoginStatus(true)
            }
            else {
                this.setLoginStatus(false)
            }
        })
    }

    async logOut() {
        axios({
            method: "POST",
            url: "http://localhost:5000/logout"
        }).then((res) => {
            if (res.data === 'Success') {
                this.setLoginStatus(false)
            }
        })
    }

    componentDidMount = () => {
        this.loginAuth()
    }

    handleLoginSubmit = async e => {
        axios({
            method: "POST",
            data: {
                username: this.state.loginUsername,
                password: this.state.loginPassword
            },
            withCredentials: true,
            url: "http://localhost:5000/api/login"
        }).then((res) => {
            alert(res.data)
            this.setLoginStatus(true)
        });
        this.resetLoginState();
    }

    handleRegisterSubmit = async e => {
        if (this.state.registerPassword !== this.state.registerPasswordConfirm) {
            alert('Password confirmation doesn\'t match with the password entered above')
        }
        else {
            axios({
                method: "POST",
                data: {
                    username: this.state.registerUsername,
                    password: this.state.registerPassword
                },
                withCredentials: true,
                url: "http://localhost:5000/api/register"
            }).then((res) => alert(res.data));
            this.resetRegisterState();
        }
    }

    setLoginStatus(loginBool) {
        this.setState({
            loginStatus: loginBool
        })
    }

    resetLoginState() {
        this.setState({
            loginUsername: '',
            loginPassword: ''
        })
    }

    resetRegisterState() {
        this.setState({
            registerUsername: '',
            registerPassword: '',
            registerPasswordConfirm: ''
        })
    }

    render() {
        return (
            <div className="Loginpage">
                {this.state.loginStatus &&
                <div className="login-wrapper">
                    <p>You are logged in</p>
                    <button onClick={this.logOut}>Log out</button>
                </div>
                }

                {!this.state.loginStatus &&
                <div className="login-wrapper">
                    {this.state.registerForm ? <h1>Sign up</h1> : <h1>Log in</h1>}
                    {!this.state.registerForm &&
                        <div className="form-wrapper">
                            <form onSubmit={this.handleLoginSubmit}>
                                <input 
                                    autoComplete='off' 
                                    type='text' 
                                    value={this.state.loginUsername} 
                                    onChange={(event) => {this.setState({loginUsername: event.target.value})}}
                                    placeholder='Username'/>
                                <input 
                                    autoComplete='off' 
                                    type='password' 
                                    value={this.state.loginPassword} 
                                    onChange={(event) => {this.setState({loginPassword: event.target.value})}}
                                    placeholder='Password'/>
                                <button type='submit' id="3">Sign In</button>
                                <button id="4" onClick={() => {this.setState({registerForm: true})}}>Create a new account</button>
                            </form>
                        </div>
                    }
                    {this.state.registerForm &&
                        <div className="form-wrapper">
                            <form onSubmit={this.handleRegisterSubmit}>
                                <input 
                                    autoComplete='off' 
                                    type='text' 
                                    value={this.state.registerUsername} 
                                    onChange={(event) => {this.setState({registerUsername: event.target.value})}}
                                    placeholder='Username'/>
                                <input 
                                    autoComplete='off' 
                                    type='password' 
                                    value={this.state.registerPassword} 
                                    onChange={(event) => {this.setState({registerPassword: event.target.value})}}
                                    placeholder='Password'/>
                                <input 
                                    autoComplete='off' 
                                    type='password' 
                                    value={this.state.registerPasswordConfirm} 
                                    onChange={(event) => {this.setState({registerPasswordConfirm: event.target.value})}}
                                    placeholder='Confirm password'/>
                                <button type='submit' id="3">Create account</button>
                                <button id="4"  onClick={() => {this.setState({registerForm: false})}}>Already have an account?</button>
                            </form>
                        </div>
                    }
                </div>
                }
            </div>
        )
    }
}
export default Login