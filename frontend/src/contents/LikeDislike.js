import React , {Component} from 'react'
import {connect} from 'react-redux'

class LikeDislike extends Component {
    constructor(props){
        super()
        this.state = {
            likes: props.review.likes,
            dislikes: props.review.dislikes,
            likeStatus: false, 
            dislikeStatus: false
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.review !== this.props.review){
            let review = this.props.review
            this.setState({
                likes: review.likes, 
                dislikes: review.dislikes})
        }
    }

    handleLike = (review) => {
        let likeAmount = this.state.likeStatus ? 0 : 1
        let dislikeAmount = this.state.dislikeStatus ? -1 : 0

        if(!this.state.likeStatus){
            if(!this.props.reviewOfComment){
                this.props.addLikeForReview(review,likeAmount)
                this.props.addDislikeForReview(review,dislikeAmount)
            }else{
                this.props.addLikeForComment(review,likeAmount,this.props.reviewOfComment)
                this.props.addDislikeForComment(review,dislikeAmount,this.props.reviewOfComment)
            }

            this.setState(
                {
                    likes: this.state.likes + likeAmount, 
                    dislikes: this.state.dislikes + dislikeAmount ,
                    likeStatus: true, 
                    dislikeStatus: false}
                )
        }
    }

    handleDislike = (review) => {
        let dislikeAmount = !this.state.dislikeStatus ? 1 : 0
        let likeAmount = !this.state.likeStatus ? 0 : -1

        if(!this.state.dislikeStatus){
            if(!this.props.reviewOfComment){
                this.props.addDislikeForReview(review,dislikeAmount)
                this.props.addLikeForReview(review,likeAmount)
            }else{
                this.props.addDislikeForComment(review,dislikeAmount,this.props.reviewOfComment)
                this.props.addLikeForComment(review,likeAmount,this.props.reviewOfComment)
            }

            this.setState(
                {
                    dislikes: this.state.dislikes + dislikeAmount , 
                    likes: this.state.likes + likeAmount , 
                    likeStatus: false, 
                    dislikeStatus: true
                })
        }
    }

    render() {
        let review = this.props.review
        return(
            <div>
                <label>Likes: {this.state.likes}</label>
                <button onClick = {() => this.handleLike(review)}>Like</button><br/>
                <label>Dislikes: {this.state.dislikes}</label>
                <button onClick = {() => this.handleDislike(review)}>Dislike</button><br/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLikeForReview: (review,amount) => dispatch({type: "ADD_LIKE_FOR_REVIEW", review , amount}),
        addDislikeForReview: (review,amount) => dispatch({type: "ADD_DISLIKE_FOR_REVIEW" , review , amount}),
        addLikeForComment: (comment , amount , review) => dispatch({type: "ADD_LIKE_FOR_COMMENT" , comment , amount , review}),
        addDislikeForComment: (comment , amount , review) => dispatch({type: "ADD_DISLIKE_FOR_COMMENT" , comment , amount , review})
    }
}

export default connect(null, mapDispatchToProps)(LikeDislike)