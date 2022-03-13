import { Component } from "react";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

async function registerUser(credentials) {
    return fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginUsername: '',
            loginPassword: '',
            registerForm: false,
            registerUsername: '',
            registerPassword: '',
            registerPasswordConfirm: ''
        }
    }

    handleLoginSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username: this.state.loginUsername,
            password: this.state.loginPassword
        });
        this.props.setToken(token);
        this.setState({
            loginUsername: '',
            loginPassword: ''
        })
    }

    handleRegisterSubmit = async e => {
        e.preventDefault();
        if (this.state.registerPassword !== this.state.registerPasswordConfirm) {
            alert('Password confirmation doesn\'t match with the password entered above')
        }
        else {
            const token = await registerUser({
                username: this.state.registerUsername,
                password: this.state.registerPassword
            });
            this.props.setToken(token);
            this.setState({
                registerUsername: '',
                registerPassword: '',
                registerPasswordConfirm: ''
            })
        }
    }

    render() {
        return (
            <div className="Loginpage">
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
            </div>
        )
    }
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login