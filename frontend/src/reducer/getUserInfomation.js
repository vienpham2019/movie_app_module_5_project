export default function(userId){
    let obj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId 
        })
    }
    return fetch('http://localhost:3000/get_user_info',obj)
}