import React , {Component} from 'react'

class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            username: "", 
            password: "", 
            password_confirmation: "", 
            password_error: null,
            username_error: null, 
            errors: [],
            signup_success: false
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        let username , password , password_confirmation , obj 
        username = this.state.username 
        password = this.state.password 
        password_confirmation = this.state.password_confirmation

        obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username,password,password_confirmation})
        }

        fetch("http://localhost:3000/signup",obj)
        .then(res => res.json())
        .then(data => {
            let password_error , username_error , errors , signup_success

            if(data.errors){
                password_error = data.errors.find(err => err.match(/^password/i)) ? "yes" : "no"
                username_error = data.errors.find(err => err.match(/^username/i)) ? "yes" : "no"
                errors = data.errors 
                this.setState({password_error, username_error, errors})
            }else{
                errors = [1]
                password_error = "no"
                username_error = "no"
                signup_success = true 
                this.setState({password_error,username_error,errors,signup_success})
            }
        })
    }

    render() {
        let signup_success = this.state.signup_success
        let errors  = this.state.errors
        let password_error = this.state.password_error 
        let username_error = this.state.username_error 
        return (
            <div className="shadow-lg p-3 mb-5 bg-white login-signup-container">
                <h1>Signup Page</h1>
                {errors.length > 0 ? 
                    !signup_success ? 
                        <div class="alert alert-danger" role="alert">
                            {errors.map(error => 
                                <ul>{error}</ul>
                            )}
                        </div>
                    : 
                        <div class="alert alert-success" role="alert">
                            <label>You have signed up successfully</label>
                        </div>
                : null }
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label className="form-group" >User Name</label>
                        <input 
                            className={`form-control ${username_error === "yes" ? "is-invalid" : username_error === "no" ? "is-valid" : ""}`} 
                            type="text" 
                            onChange = {(e) => this.setState({username: e.target.value.trim()})}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-group">Password</label>
                        <input 
                            className={`form-control ${password_error === "yes" ? "is-invalid" : password_error === "no" ? "is-valid" : ""}`} 
                            type="password" 
                            onChange = {(e) => this.setState({password: e.target.value.trim()})}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-group">Password Confirmation</label>
                        <input 
                            className={`form-control ${password_error === "yes" ? "is-invalid" : password_error === "no" ? "is-valid" : ""}`} 
                            type="password" 
                            onChange = {(e) => this.setState({password_confirmation: e.target.value.trim()})}
                        />
                    </div>
                    <div className="login_signup_btn_container">
                        <button type="submit" className="btn btn-outline-info">SignUp</button>
                    </div>
                </form>
                <div className="login_signup_btn_container">
                    <button 
                        className = "btn btn-outline-info"
                        onClick={() => {
                            this.props.history.push("/login")
                            window.scrollTo(0,0)}
                        }
                    >Login</button>
                </div>
            </div>
        )
    }
}

export default SignUp