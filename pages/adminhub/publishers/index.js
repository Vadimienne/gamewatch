import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import TagCard from 'components/admin/TagCard'
import Input from 'components/Input'
import Button from 'components/Button'


import 'styles/admin/Genres.sass'

import { getPublishers, createPublisher } from 'api/queries'

class AdminPublishers extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            publishers: null,
            newPublisherName: '',
            responseStatus: '',
            responseErrorText: ''
        }

        this.onPublisherInput = this.onPublisherInput.bind(this)
        this.onAddPublisher = this.onAddPublisher.bind(this)
    }

    async componentDidMount(){
        const response = await getPublishers()
        let json = await response.status == 200 ? await response.json() : null
        this.setState({publishers: json})
    }

    async onAddPublisher(){
        let response = await createPublisher({name: this.state.newPublisherName})
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

    onPublisherInput(e){
        this.setState({newPublisherName: e.target.value})
    }

    render(){
        let {
            responseStatus,
            responseErrorText,
            newPublisherName
        } = this.state
        return(
            <AdminLayout>
                
                <div className='admin-genres-page'>
                    <div className='add-genre-container'>
                        <Button 
                            className='green-button' 
                            onClick={this.onAddPublisher}
                        >
                            Добавить издателя
                        </Button>
                        <div className='new-genre-input-container'>
                            <label>Название</label>
                            <Input
                                className='single-line new-genre-input'
                                value={newPublisherName}
                                onChange={this.onPublisherInput}
                            />
                        </div>
                        <div className={'add-genre-response-status ' + (responseStatus!=200? 'error': '')}>
                            {(responseStatus== 200? 'OK': responseStatus) + ' ' + responseErrorText}</div>
                    </div>
                    {this.state.publishers?
                        <ul className='genres-list-admin'>
                            {this.state.publishers.map((publisher, index) => 
                                <li key={`genre-li-item-admin-${index}`}>
                                    <TagCard item={publisher} key={`genre-item-admin-${index}`}/>
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

export default AdminPublishers