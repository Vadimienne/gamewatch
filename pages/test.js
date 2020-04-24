import { PureComponent } from "react"

import Layout from 'components/Layout'
import 'styles/test.sass'

class Class extends PureComponent {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div className='layout'>
                <div className='container'>
                    <span className='text'>Новости</span>
                </div>

            </div>
        )
    }
}

export default Class