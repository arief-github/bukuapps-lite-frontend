import React, { Component } from 'react'
import axios from 'axios'

import UserPage from '../../User/Component/Index'
import Navigation from '../Navigation/NavbarAdmin'
import Login from '../../../nonAuthPage/Login'
import Home from './Home'

class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: '',
            dataUser: ''
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem('token')
        const apiAuth = 'http://localhost:8080/auth'
        const apiUser = 'http://localhost:8080/admin/profile'

        if (!token) {
            alert('Failed to authentification, Login First')
            this.props.history.push('/')
        } else if (token) {
            try {
                const resAuth = await axios.get(apiAuth, {
                    headers: {
                        'authorization': token
                    }
                })
                const role = resAuth.data.data[0].name
                this.setState({
                    role: role
                })
            }
            catch (error) {
                alert(error.response.data.message)
            }
            try {
                const resUser = await axios.get(apiUser, {
                    headers: {
                        'authorization': token
                    }
                })
                this.setState({
                    dataUser: resUser.data.data
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        return (
            <>
                {this.state.role === 'ADMIN' ?
                    <div>
                        <Navigation />
                        <Home dataUser={this.state.dataUser} />
                    </div>
                    : this.state.role === 'USER' ? <UserPage /> : <Login />}
            </>
        )
    }
}
export default Index