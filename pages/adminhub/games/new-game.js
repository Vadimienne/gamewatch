import { PureComponent } from "react"
import Select from 'react-select'

import Layout from 'components/admin/Layout'

import Input from 'components/Input'

import 'styles/admin/newGame.sass'

class NewGame extends PureComponent {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <Layout>
                <form className='add-new-game-form'>

                    <div className='form-first-row'>
                        <div className='form-item'>
                            <label for='game-title'>Название</label>
                            <Input />
                        </div>
                        <div>
                            <label>Разработчик:</label>
                            <Select />
                        </div>
                        <div>
                            <label>Издатель:</label>
                            <Select />
                        </div>
                    </div>
                    <div className='form-item'>
                        <label for='game-description'>Описание</label>
                        <Input />
                    </div>
                    <label>Дата релиза:</label>
                    <input type='date'/>
                    <label>Возрастное ограничение:</label>
                    <Select />
                    <label>Рейтинг критиков:</label>
                    <Input />
                </form>
            </Layout>
        )
    }
}

export default NewGame