import React , {Component} from 'react'

import {NavLink} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return(
            <div>
                <button onClick = {
                    window.scrollTo(0, 0)
                }>
                    <NavLink to = "/" >Home Page</NavLink>
                </button>
                <button onClick = {
                    window.scrollTo(0, 0)
                }>
                    <NavLink to = "/login">Login Page</NavLink>
                </button>
                <button onClick = {
                    window.scrollTo(0, 0)
                }>
                    <NavLink to = "/signup">SignUp Page</NavLink>
                </button>
            </div>

        )
    }
}