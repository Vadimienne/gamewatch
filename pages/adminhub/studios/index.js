import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import TagCard from 'components/admin/TagCard'
import Input from 'components/Input'
import Button from 'components/Button'


import 'styles/admin/Genres.sass'

import { getStudios, createStudio } from 'api/queries'

class AdminStudios extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            studios: null,
            newGenreName: '',
            responseStatus: '',
            responseErrorText: ''
        }

        this.onStudioInput = this.onStudioInput.bind(this)
        this.onAddStudio = this.onAddStudio.bind(this)
    }

    async componentDidMount(){
        const response = await getStudios()
        let json = await response.status == 200 ? await response.json() : null
        this.setState({studios: json})
    }

    async onAddStudio(){
        let response = await createStudio({name: this.state.newStudioName})
        let status = await response.status
        let body =  await response.json()
        if (status != 200){
            if (body.error){
                this.setState({responseErrorText: body.error.detail}, ()=> this.setState({responseStatus: status}))
            }
        }
        else{
            this.setState({responseStatus: status})
        }
    }

    onStudioInput(e){
        this.setState({newStudioName: e.target.value})
    }

    render(){
        let {
            responseStatus,
            responseErrorText,
            newStudioName
        } = this.state
        return(
            <AdminLayout>
                
                <div className='admin-genres-page'>
                    <div className='add-genre-container'>
                        <Button 
                            className='green-button' 
                            onClick={this.onAddStudio}
                        >
                            Добавить студию
                        </Button>
                        <div className='new-genre-input-container'>
                            <label>Название</label>
                            <Input
                                className='single-line new-genre-input'
                                value={newStudioName}
                                onChange={this.onStudioInput}
                            />
                        </div>
                        <div className={'add-genre-response-status ' + (responseStatus!=200? 'error': '')}>
                            {(responseStatus== 200? 'OK': responseStatus) + ' ' + responseErrorText}</div>
                    </div>
                    {this.state.studios?
                        <ul className='genres-list-admin'>
                            {this.state.studios.map((studio, index) => 
                                <li key={`genre-li-item-admin-${index}`}>
                                    <TagCard item={studio} key={`genre-item-admin-${index}`}/>
                                </li>
                            )}
                        </ul>
                    :
                        <div>Nothing yet</div>
                    }
                </div>
            </AdminLayout>
        )
    }
}

export default AdminStudios