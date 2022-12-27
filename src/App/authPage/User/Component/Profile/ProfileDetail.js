import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: ''
        }
    }

    componentDidMount = async () => {
        const apiUrl = 'http://localhost:8080/user/profile'
        try {
            const profile = await axios.get(apiUrl, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            this.setState({
                profile: profile.data.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className='container'>
                <h4 className="text-primary mt-5">Profile</h4>
                <div className="card col-4 mb-5">
                    <img src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title text-primary">@{this.state.profile.username}</h5>
                        <p className="card-subtitle text-muted">{this.state.profile.name}</p>
                        <p className="card-subtitle text-muted">{this.state.profile.email}</p>
                        <a href={`/user/profile/edit`} className="btn btn-primary mb-5 mt-3">Edit</a>
                    </div>
                </div>
            </div >
        )
    }

}

export default Profile