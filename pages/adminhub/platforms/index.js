import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import TagCard from 'components/admin/TagCard'
import Input from 'components/Input'
import Button from 'components/Button'


import 'styles/admin/Genres.sass'

import { getPlatforms, createPlatform } from 'api/queries'

class AdminPlatforms extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            platforms: null,
            newPlatformName: '',
            responseStatus: '',
            responseErrorText: ''
        }

        this.onPlatformInput = this.onPlatformInput.bind(this)
        this.onAddPlatform = this.onAddPlatform.bind(this)
    }

    async componentDidMount(){
        const response = await getPlatforms()
        let json = await response.status == 200 ? await response.json() : null
        this.setState({platforms: json})
    }

    async onAddPlatform(){
        let response = await createPlatform({name: this.state.newPlatformName})
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

    onPlatformInput(e){
        this.setState({newPlatformName: e.target.value})
    }

    render(){
        let {
            responseStatus,
            responseErrorText,
            newPlatformName
        } = this.state
        return(
            <AdminLayout>
                
                <div className='admin-genres-page'>
                    <div className='add-genre-container'>
                        <Button 
                            className='green-button' 
                            onClick={this.onAddPlatform}
                        >
                            Добавить платформу
                        </Button>
                        <div className='new-genre-input-container'>
                            <label>Название</label>
                            <Input
                                className='single-line new-genre-input'
                                value={newPlatformName}
                                onChange={this.onPlatformInput}
                            />
                        </div>
                        <div className={'add-genre-response-status ' + (responseStatus!=200? 'error': '')}>
                            {(responseStatus== 200? 'OK': responseStatus) + ' ' + responseErrorText}</div>
                    </div>
                    {this.state.platforms?
                        <ul className='genres-list-admin'>
                            {this.state.platforms.map((platform, index) => 
                                <li key={`genre-li-item-admin-${index}`}>
                                    <TagCard item={platform} key={`genre-item-admin-${index}`}/>
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

export default AdminPlatforms