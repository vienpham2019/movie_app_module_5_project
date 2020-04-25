import React , {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {
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
                console.log(data.errors)
            }else{
                this.props.setUserName(data.username)
                localStorage.token = data.token
            }
        })
        e.target.reset()
    }
    render() {
        return (
            <div>
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <input type="text" name = "username"/>
                    <br/>
                    <input type="text" name = "password"/>
                    <br/>
                    <input type="submit" value="Login"/>
                </form>
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