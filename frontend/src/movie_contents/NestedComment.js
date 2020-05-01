import React , {Component} from 'react'
import LikeDislike from './LikeDislike'

class NestedComment extends Component {
    
    render(){
        let comment = this.props.comment 
        let reviewOfComment  = this.props.reviewOfComment
        return(
            <div className="comment_container">
                <div className="comment_header">
                    <img src={comment.profile_img ? comment.profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                    <h5 className="mt-0">{comment.author}</h5>
                </div>
                <div className="comment_body">
                    <p>{comment.content}</p>
                    <LikeDislike 
                        review = {comment} 
                        reviewOfComment = {reviewOfComment} 
                        loginAlert = {this.props.loginAlert}
                    />
                </div>
            </div>
        )
    }
}

export default NestedComment