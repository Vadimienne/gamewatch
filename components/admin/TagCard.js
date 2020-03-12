import { PureComponent } from "react"

import 'styles/admin/TagCard.sass'

class TagCard extends PureComponent {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){
        let { item } = this.props

        return(
            <div className='genre-card-admin'>{item.name}</div>
        )
    }
}

export default TagCard