import React, { PureComponent } from 'react'
import 'styles/Dropzone.sass'

// import { postImage, postImageStep, postImageCreatingStep } from 'api/requests'

class Dropzone extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hightlight: false,
            selectedImg:'',
            imagePreview:''
        }

        this.fileInputRef = React.createRef()
        this.defaultImg = ""

        this.onDragOver = this.onDragOver.bind(this)
        this.openFileDialog = this.openFileDialog.bind(this)
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    openFileDialog() {
        if (this.props.disabled) return
        this.fileInputRef.current.click()
    }

    async onFilesAdded(evt) {
        if (this.props.disabled) return
        const files = evt.target.files

        let reader = new FileReader()

        reader.onload = (e) => {
            this.setState({imagePreview: e.target.result})
        }

        reader.readAsDataURL(files[0])

        //this.setState({imagePreview: reader.readAsDataURL(files[0])})

        this.props.onChange(files)
    }

    onDragOver(evt) {
        evt.preventDefault()
    }

    async onDrop(event) {
        event.preventDefault()

        if (this.props.disabled) return

        const files = event.dataTransfer.files

        this.props.onChange(files)

        let reader = new FileReader()

        reader.onload = (e) => {
            this.setState({imagePreview: e.target.result})
        }

        reader.readAsDataURL(files[0])

        // let response = await postImage(this.props.recipeId, files[0], this.props.fetchPath)


        // this.props.stateUpdater(this.props.updatePath, response.image)
    }

    render() {

        const {imagePreview} = this.state
        

        return (
            <div
                className={`Dropzone ${this.state.hightlight ? 'Highlight ' : ''} ${imagePreview ? ' uploaded' : ''}`}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onClick={this.openFileDialog}
                style={{ 
                    cursor: this.props.disabled ? 'default' : 'pointer', 
                    backgroundImage: imagePreview ? `url(${imagePreview})`: '',
                    height: this.props.height? this.props.height : '300px',
                    width: this.props.width? this.props.width: '200px'
                }}
            >
                {!imagePreview?
                    <span className='Dropzone__upload-description'>&#xe811;</span> : undefined
                }
                
                
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={this.onFilesAdded}
                />
            </div>
        )
    }
}

export default Dropzone