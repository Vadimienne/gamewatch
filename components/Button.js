import { PureComponent } from "react"

import 'styles/Button.sass'

class Button extends PureComponent {

    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        let {
            type,
            textColor,
            bgColor
        } = this.props

        return(
            <button 
                className='my-custom-button' 
                type={type? type: 'button'} 
                style={{
                    backgroundColor: bgColor, 
                    color: textColor
                }}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button