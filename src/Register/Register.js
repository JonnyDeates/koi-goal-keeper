import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            checkPassword: ''
        }
    }

    handleEmail(e) {
        this.setState({login: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleCheckPassword(e) {
        this.setState({password: e.target.value})
    }

    handleSubmit(){
        //Handle API STUFF
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: <input type="text" value={this.state.login} onChange={this.handleEmail}/></label>
                    <label>Password: <input type="password" value={this.state.password} onChange={this.handlePassword}/></label>
                    <label>Re-Enter Password: <input type="password" value={this.state.checkPassword}
                                                     onChange={this.handleCheckPassword}/></label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;