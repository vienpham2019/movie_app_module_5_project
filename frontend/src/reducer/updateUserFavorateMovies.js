export default function(favorate_movies,userId){
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            favorate_movies,
            userId
        })
    }
    fetch("http://localhost:3000/update_user_favorate_movies",obj)
}