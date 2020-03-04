import { PureComponent } from "react"
import Select from 'react-select'
import AdminLayout from 'components/AdminLayout'

import {getGames} from 'api/queries'

class Admin extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            games: null
        }
    }

    async componentDidMount(){
        const response = await getGames()
        let json = await response.status == 200 ? await response.json() : null
        console.log(json)
        this.setState({games: json})
    }

    render(){
        // console.log(getGames)
        return(
            <AdminLayout>
                <div>
                    This.is. Admin folder
                </div>
            {this.state.games?
                <div>
                    State: {Object.keys(this.state.games[0]).map(key => 
                        <li>
                            {this.state.games[0][key]}
                        </li>
                    )}
                </div> 
                :
                <div>Nothing yet</div>
            }
            </AdminLayout>
        )
    }
}

export default Admin