import React , {Component} from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

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
                socket.emit('user connect' , {userName: data.username})
                this.props.setCurrentUserInNavbar(true)
                this.props.history.push("/")
                this.props.setUserName({userName: data.username})
                this.props.setCurrentUser({
                    id: data.token, 
                    username: data.username, 
                    favorate_movies: data.favorate_movies,
                    user_profile_img: data.user_profile_img,
                    friends_list: data.friends,
                    notifications: data.notifications,
                    chats: data.chats,
                    friends_request_name: data.friends_request_name
                })
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
        setUserName: user_obj => dispatch({type: "SET_USER_NAME" , user_obj}),
        setCurrentUser: user => dispatch({type: "SET_CURRENT_USER" , user}),
        setCurrentUserInNavbar: status => dispatch({type: "SET_CURRENT_USER_IMG_IN_NAVBAR", status})
    }
}

export default connect(null,mapDispatchToProps)(Login)