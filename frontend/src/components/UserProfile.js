import React , {Component} from 'react'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react'

import UserActivityContainer from '../user_activity/UserActivityContainer'
import UserInfoContainer from '../user_activity/UserInfoContainer'

class UserProfile extends Component {

    loginAlert = () => 
        swal({
            title: "Sorry, We Couldn't Verify Your Account",
            text: "Please Login Or SignUp !",
            content: (
                <button 
                    className="btn btn-outline-info"
                    onClick ={() => {
                        this.props.history.push("/login")
                        swal.close()
                    }}
                >Login Page</button>
            )
    })

    // componentDidMount(){
    //     if(!this.props.userName){
    //         window.scrollTo(0, 0)
    //         this.props.history.push('/')
    //         this.loginAlert()
    //     }
    // }

    render() {
        return (
           <div className="user_profile_container">
                <UserInfoContainer />
                <UserActivityContainer />
           </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        userName: state.movieReducer.userName
    }
}

export default connect(mapStateToProps)(UserProfile)