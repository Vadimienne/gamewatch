import { PureComponent } from "react"
import Router from "next/router"
import Select from 'react-select'
import AdminLayout from 'components/admin/Layout'

import TagCard from 'components/admin/TagCard'
import Input from 'components/Input'
import Button from 'components/Button'


import 'styles/admin/Genres.sass'

import { getAgeRestrictions } from 'api/queries'

class AdminAgeRestrictions extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            ageRestrictions: null,
            newGenreName: '',
            responseStatus: '',
            responseErrorText: ''
        }
    }

    async componentDidMount(){
        const response = await getAgeRestrictions()
        let json = await response.status == 200 ? await response.json() : null
        this.setState({ageRestrictions: json})
    }

    render(){
        let {
            responseStatus,
            responseErrorText
        } = this.state
        return(
            <AdminLayout>
                
                <div className='admin-genres-page'>
                    {this.state.ageRestrictions?
                        <ul className='genres-list-admin'>
                            {this.state.ageRestrictions.map((ageRestriction, index) => 
                                <li key={`genre-li-item-admin-${index}`}>
                                    <TagCard item={ageRestriction} key={`genre-item-admin-${index}`}/>
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

export default AdminAgeRestrictions