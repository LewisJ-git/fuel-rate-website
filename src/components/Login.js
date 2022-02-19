import { Component } from "react";

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

    render() {
        return (
            <div className="Loginpage">
                
                <div className="login-wrapper">
                    {this.state.registerForm ? <h1>Sign up</h1> : <h1>Log in</h1>}
                    {!this.state.registerForm &&
                        <div className="form-wrapper">
                            <form onSubmit={() => {
                                    //since this is only front-end no fetch needed
                                    //reset state for now
                                    this.setState({
                                        loginUsername: '',
                                        loginPassword: ''
                                    })
                                }}>
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
                            <form onSubmit={() => {
                                    if (this.state.registerPassword !== this.state.registerPasswordConfirm) {
                                        alert('Password confirmation doesn\'t match with the password entered above')
                                    }
                                    else {
                                        //create the account with the info filled above
                                        //since this is only front-end no fetch needed
                                        //reset state for now
                                        this.setState({
                                            registerUsername: '',
                                            registerPassword: '',
                                            registerPasswordConfirm: ''
                                        })
                                    }
                                }}>
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


export default Login