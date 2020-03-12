import { PureComponent } from "react"
import Link from 'next/link'

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
            bgColor,
            href,
            className,
            onClick,
            disabled
        } = this.props

        return(
            <>
            {!href ? 
            <button 
                className={'my-custom-button ' + className + (disabled? ' disabled': '')} 
                type={type? type: 'button'} 
                style={{
                    backgroundColor: bgColor, 
                    color: textColor
                }}
                onClick={onClick}
                disabled={disabled}
            >
                {this.props.children}
            </button>
            :
            <Link href={href}>
                <a 
                    className={'my-custom-button ' + className} 
                    type={type? type: 'button'} 
                    style={{
                        backgroundColor: bgColor, 
                        color: textColor
                    }}
                >
                    {this.props.children}
                </a>
            </Link>}
            </>
        )
    }
}

export default Button