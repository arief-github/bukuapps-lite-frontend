import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            role: ''
        }
    }

    componentDidMount = async () => {
        const apiUrl = 'http://localhost:8080/admin/user/all'
        try {
            const resUsers = await axios.get(apiUrl, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            const users = resUsers.data.data
            this.setState({
                users: users
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event) => {
        const { value } = event.target
        this.setState({
            role: value
        })
    }

    handleEdit = async (idUser) => {
        const data = {
            roleId: this.state.role
        }
        const apiUrl = `http://localhost:8080/admin/user/${idUser}`
        try {
            const resUpdate = await axios.put(apiUrl, data, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            const status = resUpdate.status
            if (status === 201) {
                alert(resUpdate.data.message)
            }
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }

    render() {
        return (
            <div className="container" >
                <h4 className="text-left text-success mt-5">List User</h4>
                <table className='table'>
                    <thead className='text-center text-success'>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {this.state.users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td><select className='form-control' onChange={this.handleChange}>
                                    <option value={user.roles[0].id}>{user.roles[0].name}</option>
                                    <option value={user.roles[0].id === 2 ? 1 : 2}>{user.roles[0].name === 'ADMIN' ? 'USER' : 'ADMIN'}</option>
                                </select>
                                </td>
                                <td><button className='btn btn-warning text-white' onClick={() => { this.handleEdit(user.id) }}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Users