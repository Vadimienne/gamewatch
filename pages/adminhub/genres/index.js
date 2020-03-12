import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import TagCard from 'components/admin/TagCard'
import Input from 'components/Input'
import Button from 'components/Button'


import 'styles/admin/Genres.sass'

import { getGenres, createGenre } from 'api/queries'

class AdminGenres extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            genres: null,
            newGenreName: '',
            responseStatus: '',
            responseErrorText: ''
        }

        this.onGenreInput = this.onGenreInput.bind(this)
        this.onAddGenre = this.onAddGenre.bind(this)
    }

    async componentDidMount(){
        const response = await getGenres()
        let json = await response.status == 200 ? await response.json() : null
        this.setState({genres: json})
    }

    async onAddGenre(){
        let response = await createGenre({name: this.state.newGenreName})
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

    onGenreInput(e){
        this.setState({newGenreName: e.target.value})
    }

    render(){
        let {
            responseStatus,
            responseErrorText,
            newGenreName
        } = this.state
        return(
            <AdminLayout>
                
                <div className='admin-genres-page'>
                    <div className='add-genre-container'>
                        <Button 
                            className='green-button' 
                            onClick={this.onAddGenre}
                        >
                            Добавить жанр
                        </Button>
                        <div className='new-genre-input-container'>
                            <label>Название</label>
                            <Input
                                className='single-line new-genre-input'
                                value={newGenreName}
                                onChange={this.onGenreInput}
                            />
                        </div>
                        <div className={'add-genre-response-status ' + (responseStatus!=200? 'error': '')}>
                            {(responseStatus== 200? 'OK': responseStatus) + ' ' + responseErrorText}</div>
                    </div>
                    {this.state.genres?
                        <ul className='genres-list-admin'>
                            {this.state.genres.map((genre, index) => 
                                <li key={`genre-li-item-admin-${index}`}>
                                    <TagCard item={genre} key={`genre-item-admin-${index}`}/>
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

export default AdminGenres