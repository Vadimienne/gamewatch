import { PureComponent } from "react"
import Router from "next/router"
import AdminLayout from 'components/AdminLayout'

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