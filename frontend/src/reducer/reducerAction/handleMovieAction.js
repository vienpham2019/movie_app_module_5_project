const add_review = (author, content ,review_arr) => {
    let new_review = {
        author,
        content,
        likes: 0,
        likeUsers: [],
        dislikes: 0, 
        dislikeUsers: [],
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
        likeUsers: [],
        dislikes: 0,
        dislikeUsers: []
    }
    let updateReview = review_arr[index]
    updateReview.nestedComments = [newComment,...updateReview.nestedComments]

    return [...review_arr.slice(0,index),updateReview,...review_arr.slice(index + 1)]
}


const add_like_or_dislike_for_review = (likes_or_dislikes,userName, amount, review , review_arr) => {
    let index = review_arr.indexOf(review)
    let newReview = review_arr[index]
    if(likes_or_dislikes === "likes"){
        newReview.likes += amount
        if(amount === 1){
            filterArr(newReview.likeUsers,newReview.dislikeUsers,userName)
        }
    }else{
        newReview.dislikes += amount
        if(amount === 1){
            filterArr(newReview.dislikeUsers,newReview.likeUsers,userName)
        }
    }

    return [...review_arr.slice(0,index),newReview,...review_arr.slice(index + 1)]
}


const add_like_or_dislike_for_comment = ( likes_or_dislikes , userName, amount , comment ,review , review_arr) => {
    let index = review_arr.indexOf(review)
    let newReview = review_arr[index] 
    let commentIndex = newReview.nestedComments.indexOf(comment)
    let newComment  = newReview.nestedComments[commentIndex]

    if(likes_or_dislikes === "likes"){
        newComment.likes += amount 
        if(amount === 1){
            filterArr(newComment.likeUsers,newComment.dislikeUsers,userName)
        }
    }else{
        newComment.dislikes += amount
        if(amount === 1){
            filterArr(newComment.dislikeUsers,newComment.likeUsers,userName)
        }
    }

    newReview.nestedComments = [...newReview.nestedComments.slice(0,commentIndex),newComment,...newReview.nestedComments.slice(commentIndex + 1)]

    return [...review_arr.slice(0,index),newReview,...review_arr.slice(index + 1)]
}

const filterArr = (arr1, arr2, element) => {
    let length1 = arr1.length 
    if([...arr1,...arr2].includes(element)){
        let index = [...arr1,...arr2].indexOf(element)
        if(index > length1 - 1) {
            arr2.splice(index - length1, 1)
            arr1.unshift(element)
        }
    }else{
        arr1.unshift(element)
    }

}

export { add_review , add_nested_comments , add_like_or_dislike_for_review , add_like_or_dislike_for_comment}