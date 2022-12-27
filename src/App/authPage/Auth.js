import React, { Component } from 'react'
import axios from 'axios'

class Auth extends Component {

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
                if (role === 'ADMIN') {
                    this.props.history.push('/admin')
                } else if (role === 'USER') {
                    this.props.history.push('/user')
                } else {
                    this.props.history.push('/login')
                }
                console.log(resAuth)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    }

    render() {
        return (
            <div>
                <h3 className='text-center'>Redirecting ...</h3>
            </div>
        )
    }
}
export default Auth