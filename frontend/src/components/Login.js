import React , {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            errors: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let password = e.target[1].value
        let obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username , password})
        }
        fetch("http://localhost:3000/login" , obj)
        .then(res => res.json())
        .then(data => {
            if(data.errors){
                this.setState({errors: data.errors})
            }else{
                this.props.history.push("/")
                this.props.setUserName(data.username)
                localStorage.token = data.token
            }
        })
    }
    render() {
        return (
            <div className="shadow-lg p-3 mb-5 bg-white login-signup-container">
                <h1>Login Page</h1>
                {this.state.errors ? 
                    <div class="alert alert-danger" role="alert">
                        {this.state.errors}
                    </div>
                : null }
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label className="form-group" >User Name</label>
                        <input className={`form-control ${this.state.errors ? "is-invalid" : ""}`} type="text" name = "username"/>
                    </div>
                    <div className="form-group">
                        <label className="form-group">Password</label>
                        <input className={`form-control ${this.state.errors ? "is-invalid" : ""}`} type="password" name = "password"/>
                    </div>
                    <div className="login_signup_btn_container">
                        <button type="submit" className="btn btn-outline-info">Login</button>
                    </div>
                </form>
                <div className="login_signup_btn_container">
                    <button 
                        className="btn btn-outline-info"
                        onClick = {() => {
                            window.scrollTo(0, 0)
                            this.props.history.push("/signup")
                        }
                    }>SignUp</button> 
                </div>   
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setUserName: userName => dispatch({type: "SET_USER_NAME" , userName})
    }
}

export default connect(null,mapDispatchToProps)(Login)