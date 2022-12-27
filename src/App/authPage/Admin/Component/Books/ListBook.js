import React, { useState } from 'react'
import { Table, Button } from 'reactstrap'
import moment from 'moment'


const ListBook = (props) => {

    return (
        <div className="container">
            <h4 className="text-left text-success mt-5">List Book</h4>
            <Table className="">
                <thead className='text-success'>
                    <tr className='text-center'>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Published</th>
                        <th>Pages</th>
                        <th>Language</th>
                        <th>Publisher</th>
                        <th colSpan="3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.state.books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{moment(book.publishedDate).format("DD-MM-YYYY")}</td>
                            <td>{book.pages}</td>
                            <td>{book.language}</td>
                            <td>{book.publisherId}</td>
                            <td><Button className='btn-warning text-white' onClick={() => { props.handleEdit(book.id) }}>Edit</Button></td>
                            <td><Button className='btn-danger text-white' onClick={() => { props.handleDelete(book.id) }}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    )
}
export default ListBook

