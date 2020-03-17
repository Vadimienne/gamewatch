import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import GameCard from 'components/admin/GameCard'
import Button from 'components/Button'
import Link from 'next/link'

import 'styles/admin/Games.sass'

import {getGames} from 'api/queries'

class AdminGames extends PureComponent {
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

                <div className='add-game-button-container'>
                    <Button 
                        className='green-button' 
                        href='/adminhub/games/new-game'
                    >
                        Добавить игру
                    </Button>
                </div>
                {this.state.games?
                    <div className='game-table-container'>
                        <div className='table-top'>
                            <span className='table-top__title'>Название</span>
                            <span className='table-top__release'>Релиз</span>
                            <span className='table-top__description'>Описание</span>
                            <span className='table-top__user-rating' title='юзер рейтинг, ма фрэнд'>UR</span>
                            <span className='table-top__critic-rating' title='критик рейтинг'>CR</span>
                            <span className='table-top__studio'>Разработчик</span>
                            <span className='table-top__publisher'>Издатель</span>
                            <span className='table-top__age-restriction'>👶</span>
                        </div>
                        <div className='game'>
                            <ul>
                            {this.state.games.map((game, index) => 
                                <li className='game-list-item' key={`game-li-item-admin-${index}`}>
                                    <Link href={`/adminhub/games/${game.id}`}>
                                        <a><GameCard game={game} key={`game-item-admin-${index}`}/></a>
                                    </Link>
                                </li>
                            )}
                            </ul>
                        </div>
                    </div> 
                    :
                    <div>Nothing yet</div>
                }
            </AdminLayout>
        )
    }
}

export default AdminGames