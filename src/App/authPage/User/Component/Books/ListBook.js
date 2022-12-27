import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class ListBooks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount = async () => {
        const apiUrl = 'http://localhost:8080/user/book/all'
        try {
            const dataBooks = await axios.get(apiUrl, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            const books = dataBooks.data.data
            this.setState({
                books: books
            })
        } catch (error) {
            alert('Failed to retrieve books')
        }
    }

    render() {
        return (
            <div className='container'>
                <h4 className="text-left text-primary mt-5">List Books 📚</h4>
                {this.state.books.map(book => (
                    <div className="card col-6 mb-3 mt-3" key={book.id}>
                        <div className="card-body">
                            <h5 className="card-title text-primary">{book.title}</h5>
                            <h6 className="card-subtitle text-muted">{book.author}</h6>
                            <p className="card-subtitle mt-3 mb-3">this book was published at {moment(book.publishedDate).format("dddd, MM YYYY")} and contains {book.pages} pages, the language of this book is {book.language}, and the publisher is {book.publisherId}</p>
                            <a href={`/user/book/detail/${book.id}`} className="card-link">Details</a>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListBooks