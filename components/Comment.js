import { PureComponent } from "react"

import 'styles/Comment.sass'

class Comment extends PureComponent {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        
    }

    render() {
        let {
            username,
            body,
            time,
            likes
        } = this.props.comment

        return (
            <div className='comment'>
                <p className='comment__username'>{username}</p>
                <p className='comment__body'>{body}</p>
                <div className='comment__footer-container'>
                    <span className='comment__time'>
                        {time}
                    </span>
                    <div className='comment__likes'>
                        {likes}
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment