import React , {Component} from 'react'

import {NavLink} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return(
            <div>
                <button>
                    <NavLink to = "/" >Home Page</NavLink>
                </button>
                <button>
                    <NavLink to = "/login">Login Page</NavLink>
                </button>
                <button>
                    <NavLink to = "/signup">SignUp Page</NavLink>
                </button>
            </div>

        )
    }
}