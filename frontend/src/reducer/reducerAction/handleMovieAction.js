const add_review = (author, content ,review_arr) => {
    let new_review = {
        author,
        content,
        likes: 0,
        dislikes: 0, 
        nestedComments: []
    }
    return [new_review,...review_arr]
}


const add_nested_comments = (author , content , review, review_arr ) => {
    let index = review_arr.indexOf(review)
    let newComment = {
        author,
        content,
        likes: 0,
        dislikes: 0
    }
    let updateReview = review_arr[index]
    updateReview.nestedComments = [newComment,...updateReview.nestedComments]

    return [...review_arr.slice(0,index),updateReview,...review_arr.slice(index + 1)]
}


const add_like_or_dislike_for_review = (likes_or_dislikes, amount, review , review_arr) => {
    let index = review_arr.indexOf(review)
    let newReview = review_arr[index]

    likes_or_dislikes === "likes" ? newReview.likes += amount : newReview.dislikes += amount

    return [...review_arr.slice(0,index),newReview,...review_arr.slice(index + 1)]
}


const add_like_or_dislike_for_comment = ( likes_or_dislikes , amount , comment ,review , review_arr) => {
    let index = review_arr.indexOf(review)
    let newReview = review_arr[index] 
    let commentIndex = newReview.nestedComments.indexOf(comment)
    let newComment  = newReview.nestedComments[commentIndex]

    likes_or_dislikes === "likes" ? newComment.likes += amount : newComment.dislikes += amount
    newReview.nestedComments = [...newReview.nestedComments.slice(0,commentIndex),newComment,...newReview.nestedComments.slice(commentIndex + 1)]

    return [...review_arr.slice(0,index),newReview,...review_arr.slice(index + 1)]
}

export { add_review , add_nested_comments , add_like_or_dislike_for_review , add_like_or_dislike_for_comment}