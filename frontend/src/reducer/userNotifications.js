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

const addNotification = (notification,friendId,username) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            friendId,
            notification,
            username
        })
    }

    fetch("http://localhost:3000/add_notification ",obj)
}

export {updateUserNotification,updateUserFriendsList,addNotification} 