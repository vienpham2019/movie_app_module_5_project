import React , {Component} from 'react'
import {connect} from  'react-redux'

class ReplyComment extends Component {
    constructor(){
        super()
        this.state = {
            text: ""
        }
    }
    render() {
        let review = this.props.review 
        return (
            <div className="reply_input">
                <input 
                    type="text" 
                    onChange = {(e) => this.setState({text: e.target.value})} 
                    value = {this.state.text}
                    placeholder="Add your comment ..."
                />
                <button 
                    className={this.state.text !== "" ? "btn btn-outline-primary" : "btn btn-outline-info"}
                    onClick = {() => {
                        if(this.props.userName){
                            this.props.showReplyList()
                            this.props.handleReplyButton()
                            this.props.addToNestedComment(this.state.text,review)
                            this.setState({text: ""})
                        }else{
                            this.props.loginAlert()
                        }
                    }}
                >REPLY</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userName: state.movieReducer.userName 
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addToNestedComment: (comment,review) => dispatch({type: "ADD_TO_NESTED_COMMENTS", comment , review})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComment)