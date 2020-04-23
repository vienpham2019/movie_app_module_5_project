import React , {Component} from 'react'

class SignUp extends Component {

    handleSubmit = e => {
        e.preventDefault()
        let username , password , obj 
        username = e.target[0].value
        password = e.target[1].value 

        obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username,password})
        }

        fetch("http://localhost:3000/signup",obj)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    render() {
        return (
            <div>
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <input type="text"/>
                    <br/>
                    <input type="text"/>
                    <br/>
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}

export default SignUp