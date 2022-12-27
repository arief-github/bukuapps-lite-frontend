import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class Books extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookDetail: [],
            comment: ''
        }
    }

    componentDidMount = async () => {
        const apiUrl = `http://localhost:8080/user/book/detail/${this.props.param}`
        try {
            const databook = await axios.get(apiUrl, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            const data = databook.data.data
            this.setState({
                bookDetail: data
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleComment = (event) => {
        event.preventDefault()
        const bookId = this.state.bookDetail[0].id
        const dataComment = {
            comment: this.state.comment
        }
        const apiUrl = `http://localhost:8080/user/book/comment/${bookId}`
        axios.post(apiUrl, dataComment, {
            headers: {
                'authorization': sessionStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        comment: ''
                    })
                    this.componentDidMount()
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    render() {
        return (
            <div className='container'>
                <h4 className="text-left text-primary mt-5">Book 📖 </h4>
                {this.state.bookDetail.map(book => (
                    <>
                        <div className="card col-6 mb-3 mt-3" key={book.id}>
                            <div className="card-body">
                                <h5 className="card-title text-primary">{book.title}</h5>
                                <img className="card-img-top" src="https://cdn.icon-icons.com/icons2/390/PNG/512/white-book_38568.png" alt="Card image cap" />
                                <h6 className="card-text mb-3 text-muted">
                                    by {book.author}</h6>
                                <p className="card-subtitle">this book was published at {moment(book.publishedDate).format("dddd, MM YYYY")} and contains {book.pages} pages, the language of this book is {book.language}, and the publisher is {book.publisherId} </p>
                            </div>
                        </div>
                        <div className="card col-6" >
                            <div className="card-header">List Comment:</div>
                            {book.comments.map(comment => (
                                <div className="card-body" key={comment.id}>
                                    <p className="card-subtitle text-primary">@{comment.user.username}</p>
                                    <p className="card-subtitle text-muted mt-1">{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ))}
                <form onSubmit={this.handleComment}>
                    <label className="mt-3">Comment</label>
                    <input className='form-control col-6' type='text' name='comment' onChange={this.handleChange} value={this.state.comment}></input>
                    <button className='btn btn-primary mt-3 mb-5' type='submit'>Comment</button>
                </form>

            </div >
        )
    }
}

export default Books