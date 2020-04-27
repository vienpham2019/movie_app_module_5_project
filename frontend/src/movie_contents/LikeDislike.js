import React , {Component} from 'react'
import {connect} from 'react-redux'

class LikeDislike extends Component {
    constructor(props){
        super()
        this.state = {
            likes: props.review.likes,
            dislikes: props.review.dislikes,
            likeStatus: props.review.likeUsers.includes(props.userName),
            dislikeStatus: props.review.dislikeUsers.includes(props.userName)
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.review !== this.props.review){
            let review = this.props.review
            this.setState({
                likes: review.likes, 
                dislikes: review.dislikes,
                likeStatus: this.props.review.likeUsers.includes(this.props.userName),
                dislikeStatus: this.props.review.dislikeUsers.includes(this.props.userName)
            })
        }
        if(prevProps.userName !== this.props.userName){
            this.setState({
                likeStatus: this.props.review.likeUsers.includes(this.props.userName),
                dislikeStatus: this.props.review.dislikeUsers.includes(this.props.userName)
            })
        }
    }

    handleLike = (review) => {
        if(!this.props.userName){
            this.props.loginAlert()
        }
        
        let likeAmount = this.state.likeStatus ? 0 : 1
        let dislikeAmount = this.state.dislikeStatus ? -1 : 0

        if(!this.state.likeStatus && this.props.userName){
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
        if(!this.props.userName){
            this.props.loginAlert()
        }

        let dislikeAmount = this.state.dislikeStatus ? 0 : 1
        let likeAmount = this.state.likeStatus ? -1 : 0

        if(!this.state.dislikeStatus && this.props.userName){
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
            <div className="like_dislike_reply_container">
                <button 
                    onClick = {() => this.handleLike(review)} 
                    className="like_and_dislike_btn"
                    style={this.state.likeStatus ? {color: "rgb(53, 53, 155)"} : null}
                >
                    <i className="fa fa-thumbs-up"></i><label>{this.state.likes}</label>
                </button>
                <button 
                    onClick = {() => this.handleDislike(review)} 
                    className="like_and_dislike_btn"
                    style={this.state.dislikeStatus ? {color: "rgb(53, 53, 155)"} : null}
                >
                    <i class="fa fa-thumbs-down"></i><label>{this.state.dislikes}</label>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.movieReducer.userName
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeDislike)