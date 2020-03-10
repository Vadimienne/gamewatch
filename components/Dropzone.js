import React, { PureComponent } from 'react'
import 'styles/Dropzone.sass'

// import { postImage, postImageStep, postImageCreatingStep } from 'api/requests'

class Dropzone extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hightlight: false,
            selectedImg:''}

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

        // let response = await postImage(this.props.recipeId, files[0], this.props.fetchPath)


        // this.props.stateUpdater(this.props.updatePath, response.image)
    }

    render() {

        const url = this.props.data
        

        return (
            <div
                className={`Dropzone ${this.state.hightlight ? 'Highlight ' : ''} ${url ? ' uploaded' : ''}`}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onClick={this.openFileDialog}
                url={url}
                style={{ 
                    cursor: this.props.disabled ? 'default' : 'pointer', 
                    backgroundImage: url ? `url(${url})`: '',
                    height: this.props.height? this.props.height : '340px'
                }}
            >
                {!url?
                    <span className='Dropzone__upload-description'>Загрузите фотографию</span> : undefined
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