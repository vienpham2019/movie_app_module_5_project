import React , {Component} from 'react' 
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class UserNotifications extends Component {
    sendToFriend = (friendname) => {
        socket.emit('set_current_user', friendname)
    }

    render(){
        let current_user = this.props.current_user
        let notifications =  current_user ? current_user.notifications : []
        return(
            <div className="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalScrollableTitle">Notifications</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {notifications.map( notification => 
                            <div className="user_notification_container">
                                <label>{notification.title}</label>
                                {notification.friend ?  
                                    <div>
                                        <div className="notification_item">
                                            <img src={notification.friend.user_profile_img ? notification.friend.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                                            <label>{notification.friend.username}</label>
                                        </div>
                                        <div className="notification_item">
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => {
                                                    this.props.confirmAddFriend(notification.friend.username,notification)
                                                    this.sendToFriend(notification.friend.username)
                                                }}
                                            >Confirm</button>
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => {
                                                    this.props.sendNotification(`${current_user.username} Not Accept Your Request.`,notification.friend.username,notification)
                                                    this.sendToFriend(notification.friend.username)
                                                }}
                                            >Delete Request</button>
                                        </div>
                                    </div>
                                : 
                                    <div className="notification_item">
                                        <button 
                                            className="btn btn-outline-info"
                                            onClick={() => this.props.deleteUserNotification(notification)}
                                        >Confirm</button>
                                    </div>
                                }
                            </div>
                        )}
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
        current_user: state.userReducer.current_user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        confirmAddFriend: (friendname,notification) => dispatch({type: "CONFIRM_ADDFRIEND", friendname ,notification}),
        sendNotification: (title,friendname,notification) => dispatch({type: "SEND_NOTIFICATION", title, friendname, notification}),
        deleteUserNotification: notification => dispatch({type: "DELETE_NOTIFICATION" , notification})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserNotifications)