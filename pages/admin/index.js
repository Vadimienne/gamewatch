import { PureComponent } from "react"
import Select from 'react-select'

import {getGames} from 'api/queries'

class Admin extends PureComponent {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        console.log(getGames)
        return(
            <div>
                This.is. Admin folder
            </div>
        )
    }
}

export default Admin