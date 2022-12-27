import React, { Component } from 'react'
import axios from 'axios'

import Admin from '../../Admin/Component/Index'
import Home from './Home'
import Login from '../../../nonAuthPage/Login'
import Navigation from '../Navigation/NavbarUser'

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
        const apiUser = 'http://localhost:8080/user/profile'

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
            } catch (error) {
                alert('Failed to get role')
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
                {this.state.role === 'USER' ?

                    <div>
                        <Navigation />
                        <Home dataUser={this.state.dataUser} />
                    </div>

                    : this.state.role === 'ADMIN' ? <Admin /> : <Login />
                }
            </>

        );
    }

}

export default Index