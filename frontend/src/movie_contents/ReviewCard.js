import React , {Component} from 'react' 
import {connect} from 'react-redux'

import NestedComment from './NestedComment'
import LikeDislike from './LikeDislike'
import ReplyComment from './ReplyComment'

class ReviewCard extends Component{

    constructor(){
        super()
        this.state = {
            hidden_text: true,
            display_reply: false, 
            hidden_reply: true
        }
    }

    handleReplyButton = () => {
        this.setState({display_reply: !this.state.display_reply})
    }

    showReplyList = () => {
        this.setState({hidden_reply: false})
    }

    render() {
        let review = this.props.review
        let nestedComments = review.nestedComments
        return (
            <div className="review_card_container">
                <div className="review_card_header">
                    <img src={review.profile_img ? review.profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                    <h5 className="mt-0">{review.author}</h5>
                </div>
                <div className="review_card_body">
                    <div className="comment_review_content" style={this.state.hidden_text ? {overflow: "hidden", textOverflow: "ellipsis" , display: "-webkit-box" , WebkitLineClamp: "2" , WebkitBoxOrient: "vertical", height: "3.2em"} : null }>
                        <p id={this.props.index}>{review.content}</p>
                    </div>
                    {review.content.length > 300 ? 
                        <button className="show_text_btn" onClick = {() => this.setState({hidden_text: !this.state.hidden_text})}>{this.state.hidden_text ? "Read more" : "Show less"}</button>
                        : null 
                    }<br/>
                    <div className="review_card_action">
                        <LikeDislike review = {review} loginAlert = {this.props.loginAlert}/> 

                        <button 
                            className="reply_btn like_dislike_reply_container" 
                            onClick = {() => 
                                this.props.userName ? 
                                    this.handleReplyButton() 
                                : 
                                    this.props.loginAlert()
                            }>{this.state.display_reply ? "CANCEL" : "REPLY" }</button>
                        {
                            this.state.display_reply ? 
                                <ReplyComment 
                                    review = {review} 
                                    handleReplyButton = {this.handleReplyButton} 
                                    showReplyList = {this.showReplyList}
                                    loginAlert = {this.props.loginAlert}
                                /> 
                            : null 
                        }
                        <br/>
                        {nestedComments.length > 0 ? 
                            <button className= "show_text_btn" onClick={() => this.setState({hidden_reply: !this.state.hidden_reply})}>
                                {this.state.hidden_reply ? "▼  View" : "▲  Hide"} {nestedComments.length} {nestedComments.length > 1 ? "Replies" : "Reply"}
                            </button>
                        : null }
                        {
                            !this.state.hidden_reply ? 
                                <div className="nested_comment_container">
                                    {review.nestedComments.map((comment,index) => 
                                        <NestedComment 
                                            key = {`${review.title} comment ${index}`}
                                            comment = {comment} 
                                            reviewOfComment = {review}
                                            loginAlert = {this.props.loginAlert}
                                        />
                                    )}
                                </div>
                            : null 
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.movieReducer.userName
    }
}

export default connect(mapStateToProps)(ReviewCard)