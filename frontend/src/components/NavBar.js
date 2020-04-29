import React , {Component} from 'react'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react';
import {NavLink} from 'react-router-dom'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class NavBar extends Component {

    render() {
        return(
            <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark p-4">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <button 
                                    className="btn btn-light nav_btn"
                                    onClick = {
                                        window.scrollTo(0, 0)
                                    }
                                >
                                    <NavLink to = "/" >Home Page</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className="btn btn-light nav_btn"
                                    onClick = {() => {
                                        window.scrollTo(0, 0)
                                    }}
                                >
                                    <NavLink to = "/user_profile">User Profile</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-light nav_btn"
                                    onClick={() => window.scroll(0,0)}
                                >
                                    <NavLink to = "/movies">Movies</NavLink>
                                </button>
                            </li>
                            <li className="nav-item">
                                {this.props.userName ? 
                                    <button 
                                        className="btn btn-light nav_btn"
                                        onClick = {() => {
                                            localStorage.clear()
                                            socket.emit('user disconnect' , {userName: this.props.userName})
                                            this.props.setUserName(null)
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
                </nav>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.movieReducer.userName
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setUserName: userName => dispatch({type: "SET_USER_NAME" , userName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)