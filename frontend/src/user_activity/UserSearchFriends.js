import React , {Component} from 'react' 
import getUserInfomation from '../reducer/getUserInfomation'
import {connect} from 'react-redux'

class UserSearchFriends extends Component {
    render(){
        let user_lists = this.props.display_user_lists 
        let display_user_lists = this.props.userName ? user_lists.filter(user => user.username !== this.props.userName) : user_lists
        let friends_list = this.props.current_user.friends_list
        return(
            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Find a user</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body user_search_friends_container">
                        <input type="text" onChange={(e) => this.props.searchUsername(e.target.value)} placeholder="Search..."/>
                        <div className="user_search_friends_list">
                            {display_user_lists.length > 0 ? 
                                display_user_lists.map(user => 
                                    <div className="search_user_info">
                                        <img src={user.user_profile_img ? user.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                                        <label>{user.username}</label>
                                        {friends_list.includes(user.username) 
                                        ? <button 
                                            className="btn btn-outline-info"
                                            onClick={() => this.props.unFriend(user.username)}
                                        >Unfriend</button>
                                        : <button 
                                            className="btn btn-outline-info"
                                            onClick={() => this.props.addFriend(user.username)}
                                        >Add Friend</button>
                                        }
                                        <button 
                                            className="btn btn-outline-info"
                                            onClick={() => {
                                                getUserInfomation(user.id)
                                                .then(res => res.json())
                                                .then(data => {
                                                    this.props.setViewFriendProfile(data)
                                                    this.props.history.push('/friend_profile')
                                                })
                                            }}
                                            data-dismiss="modal"
                                        >User Profile Page</button>
                                    </div>
                                )
                            : <label>Can't find this user</label>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        display_user_lists: state.userReducer.display_user_lists,
        current_user: state.userReducer.current_user,
        userName: state.movieReducer.userName
    }
}

const mapDispatchToProps = dispatch => {
    return{
        searchUsername: username => dispatch({type: "SEARCH_USER_NAME", username}),
        addFriend: friendname => dispatch({type: "ADDFRIEND" , friendname}),
        unFriend: friendname => dispatch({type: "UNFRIEND" , friendname}),
        setViewFriendProfile: friend_obj => dispatch({type: "SET_VIEW_OBJ_PROFILE", friend_obj})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSearchFriends)