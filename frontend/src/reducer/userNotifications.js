

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

const addUserProfileImg = (userId,new_profile_img) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            new_profile_img
        })
    }

    fetch("http://localhost:3000/update_prifile_img",obj) 
}

const updateUserChats = (userId,chats,friendId) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            chats,
            friendId
        })
    }

    fetch("http://localhost:3000/update_user_chats",obj) 
}

const unfriend = (userId,friendId) => {
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            friendId
        })
    }

    fetch("http://localhost:3000/unfriend",obj) 
}

export {updateUserNotification,updateUserFriendsList,addNotification,deleteNotification,addUserProfileImg,updateUserChats,unfriend} 