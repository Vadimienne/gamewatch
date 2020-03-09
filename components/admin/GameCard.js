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
            critic_rating,
            studio_name,
            publisher_name,
            age_restriction_name
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
                        <p className='game-card__title'>{title? title: 'N/A'}</p>
                        <span className='game-card__release-date'>{releaseDate? releaseDate: 'N/A'}</span>
                        <p className='game-card__description'>{description? description: 'N/A'}</p>
                        <div className='game-card__user-rating'>{parseFloat(user_rating).toFixed(2)}</div>
                        <div className='game-card__critic-rating'>{critic_rating? critic_rating: 'N/A'}</div>
                        <span className='game-card__studio-name'>{studio_name? studio_name: 'N/A'}</span>
                        <span className='game-card__publisher-name'>{publisher_name? publisher_name: 'N/A'}</span>
                        <span className='game-card__age-restiction'>{age_restriction_name? age_restriction_name: 'N/A'}</span>
                    </div>
                : null}
            </>
        )
    }
}

export default GameCard