import { PureComponent } from "react"
import 'styles/admin/GameCard.sass'




class GameCard extends PureComponent {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){

        let {
            title, 
            release_date, 
            description, 
            user_rating,
            critic_rating
        } = this.props.game
        
        let releaseDate = new Date(release_date)
        releaseDate = releaseDate.toUTCString()
        let releaseArray = releaseDate.split(' ')
        releaseArray.pop()
        releaseArray.pop()
        releaseDate = releaseArray.join(' ')

        return(
            <>
                {this.props.game?
                    <div className='game-card'>
                        <p className='game-card__title'>{title}</p>
                        <span className='game-card__release-date'>{releaseDate}</span>
                        <p className='game-card__description'>{description}</p>
                        <div className='game-card__user-rating'>{parseFloat(user_rating).toFixed(2)}</div>
                        <div className='game-card__critic-rating'>{critic_rating? critic_rating: 'N/A'}</div>
                    </div>
                : null}
            </>
        )
    }
}

export default GameCard