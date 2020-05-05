

const updateUserNotification = (friendId,notifications,userId,friends_request_name) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            friendId,
            notifications,
            userId, 
            friends_request_name
        })
    }

    fetch("http://localhost:3000/update_user_notifications",obj)
}

const updateUserFriendsList = (userId,friendId,friends_list, notifications) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            friendId,
            notifications,
            userId, 
            friends_list
        })
    }

    fetch("http://localhost:3000/update_user_friends_list",obj)
}

const addNotification = (friend_notification,friendId,userId,user_notifications) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            friendId,
            friend_notification,
            userId,
            user_notifications
        })
    }

    fetch("http://localhost:3000/add_notification ",obj)
}

const deleteNotification = (userId, user_notifications) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            user_notifications
        })
    }

    fetch("http://localhost:3000/delete_notification ",obj)
}

export {updateUserNotification,updateUserFriendsList,addNotification,deleteNotification} 