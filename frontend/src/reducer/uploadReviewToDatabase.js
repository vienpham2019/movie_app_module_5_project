export default function(new_review,reviewId){
    let obj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comments: new_review
        })
    }
    fetch(`http://localhost:3000/review/${reviewId}`,obj)
}