import React , {Component} from 'react' 

import NestedComment from './NestedComment'
import LikeDislike from './LikeDislike'
import ReplyComment from './ReplyComment'

class ReviewCard extends Component{

    constructor(){
        super()
        this.state = {
            hidden_text: true,
            display_reply: false, 
        }
    }

    handleReplyButton = () => {
        this.setState({display_reply: !this.state.display_reply})
    }

    render() {
        let review = this.props.review
        return (
            <div>

                <h3>{review.author}</h3>
                <div className="comment_review_content" style={this.state.hidden_text ? {overflow: "hidden", textOverflow: "ellipsis" , display: "-webkit-box" , WebkitLineClamp: "2" , WebkitBoxOrient: "vertical", height: "3.2em"} : null }>
                    <p id={this.props.index}>{review.content}</p>
                </div>

                {review.content.length > 300 ? 
                    <button className="show_text_btn" onClick = {() => this.setState({hidden_text: !this.state.hidden_text})}>{this.state.hidden_text ? "Read more" : "Show less"}</button>
                    : null 
                }

                <LikeDislike review = {review} /> 

                <button className="reply_btn" onClick = {() => this.handleReplyButton()}>{this.state.display_reply ? "CANCEL" : "REPLY" }</button>
                {
                    this.state.display_reply ? 
                        <ReplyComment review = {review} handleReplyButton = {this.handleReplyButton}/> 
                    : null 
                }

                <div>
                    {review.nestedComments.map(comment => <NestedComment comment = {comment} />)}
                </div>

            </div>
        )
    }
}

export default ReviewCard