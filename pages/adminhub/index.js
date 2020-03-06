import { PureComponent } from "react"
import Router from "next/router"
import Layout from 'components/admin/Layout'

class Admin extends PureComponent {
    constructor(props){
        super(props)
    }

    componentDidMount(){ 
        Router.push('/adminhub/games')
    }

    render(){
        return(null)
    }
}

export default Admin