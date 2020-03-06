import { PureComponent } from "react"

import Layout from 'components/admin/Layout'

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
                <form>
                    <label for='game-title'>Название</label>
                    <input id='game-title'/>
                    <label for='game-description'>Описание</label>
                    <input id='game-description'/>
                    <label>Дата релиза:</label>
                    <label>Издатель:</label>
                    <label>Разработчик:</label>
                    <label>Возрастное ограничение:</label>
                    <label>Рейтинг критиков:</label>
                </form>
            </Layout>
        )
    }
}

export default NewGame