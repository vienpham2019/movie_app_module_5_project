import React , {Component} from 'react'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react';
import {NavLink} from 'react-router-dom'

class NavBar extends Component {
    render() {
        return(
            <div>
                <button onClick = {
                    window.scrollTo(0, 0)
                }>
                    <NavLink to = "/" >Home Page</NavLink>
                </button>
                {this.props.userName ? 
                    <button onClick = {() => {
                        localStorage.clear()
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
                    }}>Logout</button>
                : 
                    <button onClick = {() => {
                        window.scrollTo(0, 0)
                    }}>
                        <NavLink to = "/login">Login Page</NavLink>
                    </button>
                }
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setUserName: userName => dispatch({type: "SET_USER_NAME" , userName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)