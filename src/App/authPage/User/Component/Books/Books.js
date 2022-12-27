import React, { Component } from 'react'
import axios from 'axios'
import Navigation from '../../../User/Navigation/NavbarUser'
import ListBook from './ListBook'

class Books extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: []
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
                <ListBook />
            </div >
        )
    }
}

export default Books