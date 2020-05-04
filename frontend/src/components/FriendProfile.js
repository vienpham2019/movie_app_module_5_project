import React , {Component} from 'react'
import DisplayMovie from '../search_movies_container/DisplayMovies'
import {connect} from 'react-redux'

class FriendProfile extends Component {
    render() {
        let friend_info = this.props.friend_info
        return (
            <div className="user_profile_container">
                {friend_info ? 
                    <div className="friend_info_container">
                        <div className="friend_info_content">
                            <img src={friend_info.user_profile_img ? friend_info.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                            <label>{friend_info.username} Collection</label>
                        </div>
                        <br/>
                        <div className="friend_favorate_movies_container">
                            <DisplayMovie history = {this.props.history} displayMovies = {friend_info.favorate_movies} />
                        </div>
                    </div>
                : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        friend_info: state.userReducer.view_friend_profile
    }
}

export default connect(mapStateToProps)(FriendProfile)