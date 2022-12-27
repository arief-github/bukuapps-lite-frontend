import React, { Component } from 'react'
import Axios from 'axios'
import Navigation from '../../Navigation/NavbarUser'
import FormEditProfile from './FormEditProfile'

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: '',
            profile: ''
        }
    }
    componentDidMount = async () => {
        const token = sessionStorage.getItem('token')
        const apiAuth = 'http://localhost:8080/auth'
        const apiUrl = `http://localhost:8080/user/profile/edit`

        if (!token) {
            alert('Failed to authentification, Login First')
            this.props.history.push('/')
        } else if (token) {
            try {
                const resAuth = await Axios.get(apiAuth, {
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
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <FormEditProfile history={this.props.history} />
            </div>
        )
    }
}

export default EditProfile