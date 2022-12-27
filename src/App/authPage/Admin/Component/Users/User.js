import React, { Component } from 'react'
import Axios from 'axios'

import Navigation from '../../Navigation/NavbarAdmin'
import Login from '../../../../nonAuthPage/Login'
import User from '../../../User/Component/Index'
import TableUser from './TableUser'

class UserAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: ''
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem('token')
        const apiUrl = 'http://localhost:8080/auth'

        if (!token) {
            alert('Failed to authentification, Login First')
            this.props.history.push('/')
        } else if (token) {
            try {
                const resAuth = await Axios.get(apiUrl, {
                    headers: {
                        'authorization': token
                    }
                })
                const role = resAuth.data.data[0].name
                this.setState({
                    role: role
                })
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    }

    render() {
        return (
            <>
                {this.state.role === 'ADMIN' ?
                    <div>
                        <Navigation />
                        <TableUser />
                    </div>

                    : this.state.role === 'USER' ?
                        <User /> : <Login />
                }
            </>
        )
    }

}
export default UserAdmin