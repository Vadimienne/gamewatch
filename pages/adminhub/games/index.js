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
                <div className='game-table-container'>
                    <div className='table-top'>
                        <span className='table-top__title'>Название</span>
                        <span className='table-top__release'>Релиз</span>
                        <span className='table-top__description'>Описание</span>
                        <span className='table-top__user-rating'>UR</span>
                        <span className='table-top__critic-rating'>CR</span>
                        <span className='table-top__studio'>Разработчик</span>
                        <span className='table-top__publisher'>Издатель</span>
                        <span className='table-top__age-restriction'>👶</span>
                    </div>
                    <div className='game'>
                        <ul>
                        {this.state.games.map((game, index) => 
                            <li key={`game-li-item-admin-${index}`}>
                                <GameCard game={game} key={`game-item-admin-${index}`}/>
                            </li>
                        )}
                        </ul>
                    </div>
                </div> 
                :
                <div>Nothing yet</div>
            }
            <Button 
                className='game-add-button' 
                href='/adminhub/games/new-game'
            >
                Добавить игру
            </Button>
            </AdminLayout>
        )
    }
}

export default Admin