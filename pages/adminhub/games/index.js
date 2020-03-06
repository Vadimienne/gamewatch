import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import GameCard from 'components/admin/GameCard'
import Button from 'components/Button'

import 'styles/admin/Games.sass'

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
        this.setState({games: json})
    }

    render(){
        // console.log(getGames)
        return(
            <AdminLayout>
            {this.state.games?
                <div className='main-container'>
                    <ul>
                    {this.state.games.map(game => 
                        <li>
                            <GameCard game={game} />
                        </li>
                    )}
                    </ul>
                </div> 
                :
                <div>Nothing yet</div>
            }
            <Button bgColor='green' textColor='white' href='/adminhub/games/new-game'>Добавить игру</Button>
            </AdminLayout>
        )
    }
}

export default Admin