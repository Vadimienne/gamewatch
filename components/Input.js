import { PureComponent } from "react"
import ContentEditable from 'react-contenteditable'

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
            maxLength,
            id,
            textArea,
            rows,
            resizable
        } = this.props

        return(
                <>
                <ContentEditable
                    
                    id={id}
                    className={'text-input field-container ' + className }
                        onChange={onChange}
                        html={value}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        rows={rows}
                />
                </>
        )
    }
}

export default Class

// return(
//     <>
//     <textarea
//         id={id}
//         className={'text-input field-container ' + className }
//             onChange={onChange}
//             value={value}
//             placeholder={placeholder}
//             maxLength={maxLength}
//             rows={rows}
//         />
//     </>
// )


// <>
//     {!textArea ?
//         <div className={'field-container '+ className}>
//             <input 
//                 id={id}
//                 className='text-input'
//                 onChange={onChange}
//                 value={value}
//                 placeholer={placeholder}
//                 maxLength={maxLength}
//             ></input>
//         </div>
//     :
//     <div className={'field-container '+ className}>
//             <textarea 
//                 id={id}
//                 className='text-input field-container'
//                 onChange={onChange}
//                 value={value}
//                 placeholer={placeholder}
//                 maxLength={maxLength}
//             ></textarea>
//     </div>}
// </>