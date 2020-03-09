import { PureComponent } from "react"
import Select from 'react-select'
import InputMask from 'react-input-mask'

import Layout from 'components/admin/Layout'

import Input from 'components/Input'
import Button from 'components/Button'

import 'styles/admin/newGame.sass'

class NewGame extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
        }

        this.onTitleInput = this.onTitleInput.bind(this)
    }

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

    onTitleInput(e){
        this.setState({title: e.target.value})
    }

    render(){
        let {
            title, 
            description
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
                                onChange={this.onTitleInput}
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
                            />
                        </div>
                        <div>
                            <label>Издатель:</label>
                            <Select 
                                styles={this.studioSelectStyles}
                                placeholder='Студия-издатель...'
                            />
                        </div>
                    </div>
                    <div className='form-item'>
                        <label htmlFor='game-description'>Описание</label>
                        <Input 
                            id='game-description'
                            className='game-description-input'
                            textArea
                        />
                    </div>
                    <div>
                        <label>Дата релиза:</label>
                        <InputMask 
                            className='field-container game-release-input'
                            mask='99/99/9999'
                            placeholder='31/12/2020'
                        />
                    </div>
                    
                    <div>
                        <label>Возрастное ограничение:</label>
                        <Select
                            styles={this.ageSelectStyles}
                            placeholder='...' 
                        />
                    </div>
                    <div>
                        <label>Рейтинг критиков:</label>
                        <Input 
                            className='game-critic-rating-input single-line'
                            maxLength={3}
                        />
                    </div>
                    <Button className='green-button'>Cоздать</Button>
                </form>
            </Layout>
        )
    }
}

export default NewGame