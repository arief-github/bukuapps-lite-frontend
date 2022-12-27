import React, { Component } from 'react'
import axios from 'axios'

import FormBook from './FormBook'
import ListBook from './ListBook'
import UserPage from '../../../User/Component/Index'
import Login from '../../../../nonAuthPage/Login'
import Navigation from '../../Navigation/NavbarAdmin'


class Books extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            role: '',
            values: {
                editMode: false
            }, valuesError: {
                title: '', author: '', publishedDate: '', pages: '', language: '', publisherId: ''
            }, form: {
                buttonDisabled: true
            }
        }
    }

    initialState = () => {
        this.setState({
            values: {
                id: '', title: '', author: '', publishedDate: '', pages: '', language: '', publisherId: '', editMode: false
            },
            form: {
                buttonDisabled: true
            }
        })
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem('token')
        const apiAuth = 'http://localhost:8080/auth'

        if (!token) {
            alert('Failed to authentification, Login First')
            this.props.history.push('/')
        } else if (token) {
            try {
                const authData = await axios.get(apiAuth, {
                    headers: {
                        'authorization': token
                    }
                })
                const role = authData.data.data[0].name
                this.setState({
                    role: role
                })
            } catch (error) {
                alert(error.response.data.message)
            }
            try {
                const booksData = await axios.get('http://localhost:8080/admin/book/all', {
                    headers: {
                        'authorization': sessionStorage.getItem('token')
                    }
                })
                const books = booksData.data;
                this.setState({ books: books.data })
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    }

    validate = () => {
        let errorsValueState = {}
        let stateData = this.state.values
        let { title, author, publishedDate, pages, language, publisherId } = false

        if (!stateData.title) {
            errorsValueState.title = "title field is required"
            title = false
        } else if (stateData.title.length <= 2) {
            errorsValueState.title = "title field is too short"
            title = false
        } else {
            title = true
        }

        if (!stateData.author) {
            errorsValueState.author = "author field is required"
            author = false
        } else if (stateData.author.length <= 2) {
            errorsValueState.author = "author field is too short"
            author = false
        } else {
            author = true
        }

        if (!stateData.publishedDate) {
            errorsValueState.publishedDate = "date published field is required"
            publishedDate = false
        } else {
            publishedDate = true
        }

        if (!stateData.pages) {
            errorsValueState.pages = "pages field is required"
            pages = false
        } else if (stateData.pages <= 0) {
            errorsValueState.pages = "pages should more than one"
            pages = false
        } else {
            pages = true
        }

        if (!stateData.language) {
            errorsValueState.language = "language field is required"
            language = false
        } else if (stateData.language.length <= 2) {
            errorsValueState.language = "language is too short"
            language = false
        } else {
            language = true
        }

        if (!stateData.publisherId) {
            errorsValueState.publisherId = "publisher name field is required"
            publisherId = false
        } else if (stateData.publisherId.length <= 2) {
            errorsValueState.publisherId = "publisher is too short"
            publisherId = false
        } else {
            publisherId = true
        }

        if (title && author && publishedDate && pages && language && publisherId === true) {
            this.setState({
                form: {
                    buttonDisabled: false
                }
            })
        } else {
            this.setState({
                form: {
                    buttonDisabled: true
                }
            })
        }
        return errorsValueState
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            values: { ...this.state.values, [name]: value }
        }, () => {
            this.setState({
                valuesError: this.validate()
            })
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            title: this.state.values.title,
            author: this.state.values.author,
            publishedDate: this.state.values.publishedDate,
            pages: this.state.values.pages,
            language: this.state.values.language,
            publisherId: this.state.values.publisherId
        }
        try {
            const resAddBook = await axios.post(`http://localhost:8080/admin/book/add`, data, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            if (resAddBook.status === 201) {
                alert(resAddBook.data.message)
                this.initialState()
            }
            this.componentDidMount()
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }

    handleEdit = async (bookId) => {
        try {
            const resEdit = await axios.get(`http://localhost:8080/admin/book/all/${bookId}`, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            this.setState({
                values: {
                    id: resEdit.data.data.id,
                    title: resEdit.data.data.title,
                    author: resEdit.data.data.author,
                    publishedDate: resEdit.data.data.publishedDate,
                    pages: resEdit.data.data.pages,
                    language: resEdit.data.data.language,
                    publisherId: resEdit.data.data.publisherId,
                    editMode: true
                }
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    handleEditBook = async (event) => {
        event.preventDefault()
        try {
            const id = this.state.values.id
            const data = {
                title: this.state.values.title,
                author: this.state.values.author,
                publishedDate: this.state.values.publishedDate,
                pages: this.state.values.pages,
                language: this.state.values.language,
                publisherId: this.state.values.publisherId
            }
            const resEdit = await axios.put(`http://localhost:8080/admin/book/edit/${id}`, data, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            if (resEdit.status === 200) {
                alert(resEdit.data.message)
                this.initialState()
            }
            this.componentDidMount()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    handleDelete = async (bookId) => {
        try {
            const resDel = await axios.delete(`http://localhost:8080/admin/book/delete/${bookId}`, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            if (resDel.status === 200) {
                alert(resDel.data.message)
                this.componentDidMount()
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    render() {
        return (
            <>
                {this.state.role === 'ADMIN' ?
                    <div>
                        <Navigation />
                        <ListBook state={this.state} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
                        <FormBook state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleEditBook={this.handleEditBook} />
                    </div>
                    : this.state.role === 'USER' ? <UserPage /> : <Login />}
            </>
        )
    }
}
export default Books