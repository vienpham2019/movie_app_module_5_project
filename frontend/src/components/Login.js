import React , {Component} from 'react'

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
        .then(data => console.log(data))
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

export default Login