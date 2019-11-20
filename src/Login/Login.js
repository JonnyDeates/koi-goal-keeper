import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }
    handleEmail(e){this.setState({login: e.target.value})}
    handlePassword(e){this.setState({password: e.target.value})}
    render(){
        return (
            <div>
                <h1>Login</h1>
                <label>Email: <input type="text" value={this.state.login} onChange={this.handleEmail}/></label>
                <label>Password: <input type="password" value={this.state.password} onChange={this.handlePassword}/></label>
            </div>
        )
    }
}
export default Login;