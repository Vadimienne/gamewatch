import { PureComponent } from "react"
import Select from 'react-select'
import InputMask from 'react-input-mask'

import Layout from 'components/admin/Layout'

import Input from 'components/Input'
import Button from 'components/Button'
import Dropzone from 'components/Dropzone'

import {
    getGames, 
    getStudios, 
    getPublishers, 
    getAgeRestrictions, 
    getGenres, 
    getPlatforms,
    createGame
} from 'api/queries'

import 'styles/admin/newGame.sass'

class NewGame extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            poster: null,
            ageRestrictionId: null,
            studioId: null,
            publisherId: null,
            releaseDate: '',
            criticRating: '',
            selectedStudio: null,
            selectedPublisher: null,
            selectedAgeRestriction: null,
            selectedPlatforms: null,
            selectedGenres: null,

        }

        this.onTextInput = this.onTextInput.bind(this)
        this.onAddPoster = this.onAddPoster.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount(){
        let genres = await getGenres() 
        genres = await genres.json()
        let mappedGenres = []
        genres.map(el => mappedGenres.push({value: el.id, label: el.name}))
        this.setState({genres: mappedGenres})

        let studios = await getStudios()
        studios = await studios.json()
        let mappedStudios = []
        studios.map(el => mappedStudios.push({value: el.id, label: el.name}))
        this.setState({studios: mappedStudios})

        let publishers = await getPublishers()
        publishers = await publishers.json()
        let mappedPublishers = []
        publishers.map(el => mappedPublishers.push({value: el.id, label: el.name}))
        this.setState({publishers: mappedPublishers})

        let ageRestrictions = await getAgeRestrictions()
        ageRestrictions = await ageRestrictions.json()
        let mappedAgeRestrictions = []
        ageRestrictions.map(el => mappedAgeRestrictions.push({value: el.id, label: el.name}))
        this.setState({ageRestrictions: mappedAgeRestrictions})

        let platforms = await getPlatforms()
        platforms = await platforms.json()
        let mappedPlatforms = []
        platforms.map(el => mappedPlatforms.push({value: el.id, label: el.name}))
        this.setState({platforms: mappedPlatforms})
    }

    // VARIABLES

    studioSelectStyles = {
        container: (provided, state) => ({
            ...provided,
            width: 400
        })
    }

    ageSelectStyles = {
        container: (provided, state) => ({
            ...provided,
            width: 95
        })
    }


    // FUNCTIONS

    onTextInput(e, field){
        this.setState({[`${field}`]: e.target.value})
    }
    

    onAddPoster(files){
        this.setState({poster: files[0]})
    }

    onSelect(val, field){
        this.setState({[`${field}`]: val})
    }

    onSubmit(){
        let json = new FormData()
        json.append('title', this.state.title)
        json.append('description', this.state.description)
        json.append('poster', this.state.poster, `${this.state.title}-poster.jpg`)
        let response = createGame(json)
    }


    // RENDER

    render(){
        let {
            title, 
            description,
            genres,
            studios,
            publishers,
            ageRestrictions,
            platforms,
            selectedStudio,
            selectedPublisher,
            selectedAgeRestriction,
            selectedGenres
        } = this.state


        return(
            <Layout>
                <form className='add-new-game-form'>

                    <div className='form-first-row'>
                        <div className='form-item'>
                            <label htmlFor='game-title'>Название</label>
                            <Input
                                className='game-title-input'
                                id='game-title'
                                onChange={(e) => this.onTextInput(e, 'title')}
                                value={title}
                                rows={1}
                                placeholder='Dark Soils IV...'
                            />
                        </div>
                        <div>
                            <label>Разработчик:</label>
                            <Select 
                                styles={this.studioSelectStyles}
                                placeholder='Студия-разработчик...'
                                options={studios}
                                onChange={(val)=> this.onSelect(val, 'selectedStudio')}
                                value={selectedStudio}
                            />
                        </div>
                        <div>
                            <label>Издатель:</label>
                            <Select 
                                styles={this.studioSelectStyles}
                                placeholder='Студия-издатель...'
                                options={publishers}
                                onChange={(val)=> this.onSelect(val, 'selectedPublisher')}
                                value={selectedPublisher}
                            />
                        </div>
                    </div>
                    <div className='form-item'>
                        <label htmlFor='game-description'>Описание</label>
                        <Input 
                            id='game-description'
                            className='game-description-input'
                            textArea
                            onChange={(e) => this.onTextInput(e, 'description')}
                        />
                    </div>
                    <div>
                        <label>Жанры:</label>
                        <Select
                            styles={this.studioSelectStyles}
                            placeholder='экшн, пазл...' 
                            options={[{label: 'экшн', value: 1}, {label: 'пазл', value: 2}]}
                            isMulti
                            onChange={(val)=> this.onSelect(val, 'selectedGenres')}
                            value={selectedGenres}
                        />
                    </div>
                    <div>
                        <label>Дата релиза:</label>
                        <InputMask 
                            className='field-container game-release-input'
                            mask='99/99/9999'
                            placeholder='31/12/2020'
                            onChange={(e) => this.onTextInput(e, 'releaseDate')}
                        />
                    </div>
                    
                    <div>
                        <label>Возрастное ограничение:</label>
                        <Select
                            styles={this.ageSelectStyles}
                            placeholder='...' 
                            options={ageRestrictions}
                            onChange={(val)=> this.onSelect(val, 'selectedAgeRestriction')}
                            value={selectedAgeRestriction}
                        />
                    </div>
                    <div>
                        <label>Рейтинг критиков:</label>
                        <Input 
                            className='game-critic-rating-input single-line'
                            maxLength={3}
                            onChange={(e) => this.onTextInput(e, 'criticRating')}
                        />
                    </div>
                    <Button className='green-button' onClick={this.onSubmit}>Cоздать</Button>
                    <img src='/images/rdr2poster.jpg'></img>
                    <Dropzone onChange={this.onAddPoster}></Dropzone>
                </form>
            </Layout>
        )
    }
}

export default NewGame