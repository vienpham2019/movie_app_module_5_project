import React , {Component} from 'react'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react';
import {NavLink} from 'react-router-dom'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class NavBar extends Component {

    render() {
        let current_user = this.props.current_user
        let UIIN = this.props.display_current_user_img_in_nabar
        return(
            <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark p-4">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <button 
                                    className="btn btn-light nav_btn"
                                    onClick = {() => {
                                        this.props.setCurrentUserInNavbar(true)
                                        window.scrollTo(0, 0)
                                    }}
                                >
                                    <NavLink to = "/" >Home Page</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-light nav_btn"
                                    onClick={() => {
                                        this.props.setCurrentUserInNavbar(true)
                                        window.scroll(0,0)
                                    }}
                                >
                                    <NavLink to = "/movies">Movies</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className="btn btn-light nav_btn"
                                    onClick = {() => {
                                        window.scrollTo(0, 0)
                                        this.props.setCurrentUserInNavbar(false)
                                    }}
                                >
                                    <NavLink to = "/user_profile">User Profile</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                {this.props.userName ? 
                                    <button 
                                        className="btn btn-light nav_btn"
                                        onClick = {() => {
                                            localStorage.clear()
                                            this.props.setCurrentUserInNavbar(false)
                                            socket.emit('user disconnect' , {userName: this.props.userName})
                                            this.props.setUserName({userName:  null})
                                            this.props.setCurrentUser(null)
                                            swal({
                                                icon: "success",
                                                buttons: {
                                                    cancel: "Close"
                                                },
                                                content: (
                                                    <div>
                                                        <h1>Message</h1>
                                                        <h5>You have been logged out successfully</h5>
                                                    </div>
                                                )
                                            })
                                            setTimeout(() => {
                                                swal.close()
                                            }, 1500);
                                        }}
                                    >Logout</button>
                                : 
                                    <button 
                                        className="btn btn-light nav_btn"
                                        onClick = {() => {
                                            window.scrollTo(0, 0)
                                            this.props.setCurrentUserInNavbar(false)
                                        }}
                                    >
                                        <NavLink to = "/login">Login Page</NavLink>
                                    </button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <nav className="navbar navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {current_user && UIIN ? 
                        <div 
                            className="current_user_img"
                            onClick={() => {
                                window.scrollTo(0, 0)
                                this.props.setCurrentUserInNavbar(false)
                                this.props.history.push('/user_profile')
                            }}
                        >
                            <img src={current_user.user_profile_img ? current_user.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                            <label>{current_user.username}</label>
                        </div>
                    : null }
                </nav>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.movieReducer.userName,
        current_user: state.userReducer.current_user,
        display_current_user_img_in_nabar: state.userReducer.display_current_user_img_in_nabar
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setUserName: user_obj => dispatch({type: "SET_USER_NAME" , user_obj}),
        setCurrentUser: user => dispatch({type: "SET_CURRENT_USER" , user}),
        setCurrentUserInNavbar: status => dispatch({type: "SET_CURRENT_USER_IMG_IN_NAVBAR", status})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)