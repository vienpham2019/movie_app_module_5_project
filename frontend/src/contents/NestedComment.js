import React , {Component} from 'react'
import LikeDislike from './LikeDislike'

class NestedComment extends Component {
    
    render(){
        let comment = this.props.comment 
        let reviewOfComment  = this.props.reviewOfComment
        return(
            <div>
                <h3>{comment.author}</h3>
                <p>{comment.content}</p>
                <LikeDislike review = {comment} reviewOfComment = {reviewOfComment}/>
            </div>
        )
    }
}

export default NestedComment