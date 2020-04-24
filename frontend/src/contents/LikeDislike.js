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
        let likeAmount = !this.state.likeStatus ? 1 : 0
        let dislikeAmount = !this.state.dislikeStatus ? 0 : -1

        this.props.addLike(review,likeAmount)
        this.props.addDislike(review,dislikeAmount)

        this.setState(
            {
                likes: this.state.likes + likeAmount, 
                dislikes: this.state.dislikes + dislikeAmount ,
                likeStatus: true, 
                dislikeStatus: false}
            )
    }

    handleDislike = (review) => {
        let dislikeAmount = !this.state.dislikeStatus ? 1 : 0
        let likeAmount = !this.state.likeStatus ? 0 : -1

        this.props.addDislike(review,dislikeAmount)
        this.props.addLike(review,likeAmount)

        this.setState(
            {
                dislikes: this.state.dislikes + dislikeAmount , 
                likes: this.state.likes + likeAmount , 
                likeStatus: false, 
                dislikeStatus: true
            })
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
        addLike: (review,amount) => dispatch({type: "ADD_LIKE", review , amount}),
        addDislike: (review,amount) => dispatch({type: "ADD_DISLIKE" , review , amount})
    }
}

export default connect(null, mapDispatchToProps)(LikeDislike)