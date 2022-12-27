import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import Navigation from '../../Navigation/NavbarUser'
import ProfileDetail from './ProfileDetail'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: ''
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem('token')
        const apiAuth = 'http://localhost:8080/auth'

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
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <ProfileDetail />
            </div>
        )
    }

}

export default Profile