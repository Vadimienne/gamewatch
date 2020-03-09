import { PureComponent } from "react"

import 'styles/Input.sass'

class Class extends PureComponent {

    constructor(props){
        super(props)
    }

    render(){

        let {
            onChange,
            value,
            className,
            placeholder,
            maxLength
        } = this.props

        return(
            <div className={className}>
                <div className='field-container'>
                    <input 
                        className='text-input'
                        onChange={onChange}
                        value={value}
                        placeholer={placeholder}
                        maxLength={maxLength}
                    ></input>
                </div>
            </div>
        )
    }
}

export default Class