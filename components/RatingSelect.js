import { PureComponent } from "react"

import 'styles/RatingSelect.sass'

class RatingSelect extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            starHovered: null
        }
    }

    componentDidMount(){
        
    }

    ratingHoverHandler(index) {
        this.setState({starHovered: index + 1})
    }

    render() {
        let { starHovered } = this.state
        let { userRating } = this.props
        return (
            <div className='rating-selector'>
                <div className='rating-selector__unselected-container'>
                </div>

                <div
                    className='rating-selector__selected-container'
                    style={{width: `${starHovered? starHovered * 10: userRating * 10}%`}}
                >
                </div>

                <div className='rating-selector__mapped-stars'>
                    {[...Array(10)].map((el, index) => 
                        <div
                            onMouseOver={() => this.ratingHoverHandler(index)}
                            onMouseLeave={() => this.setState({starHovered: null})}
                            className='rating-selector__rating-star'
                            key={`rstar-${index}`} />
                    )}
                </div>
            </div>
        )
    }
}

export default RatingSelect