import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import moment from 'moment'


const FormBook = (props) => {
    return (
        <div className="container">
            <Form className="mt-5 mb-5 col-6" onSubmit={props.state.values.editMode ? props.handleEditBook : props.handleSubmit}>
                <h4 className='text-success mb-3'>Form Book</h4>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="Title" value={props.state.values.editMode ? props.state.values.title : props.state.values.title} placeholder="Input the title of book" onChange={props.handleChange} />
                    <p className='text-warning'>{props.state.valuesError.title}</p>
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input type="text" name="author" id="author" value={props.state.values.editMode ? props.state.values.author : props.state.values.author} placeholder="Input the author of book" onChange={props.handleChange} />
                    <p className='text-warning'>{props.state.valuesError.author}</p>
                </FormGroup>
                <FormGroup>
                    <Label for="publishedDate">Date Published</Label>
                    <Input type="date" name="publishedDate" id="publishedDate" value={props.state.values.editMode ? moment(props.state.values.publishedDate).format("YYYY-MM-DD") : props.state.values.publishedDate} placeholder="Choose the date" onChange={props.handleChange} />
                    <p className='text-warning'>{props.state.valuesError.publishedDate}</p>
                </FormGroup>
                <FormGroup>
                    <Label for="pages">Pages</Label>
                    <Input type="number" name="pages" id="pages" value={props.state.values.editMode ? props.state.values.pages : props.state.values.pages} placeholder="Input the pages of date" onChange={props.handleChange} />
                    <p className='text-warning'>{props.state.valuesError.pages}</p>
                </FormGroup>
                <FormGroup>
                    <Label for="language">Language</Label>
                    <Input type="text" name="language" id="language" value={props.state.values.editMode ? props.state.values.language : props.state.values.language} placeholder="Input the language of book" onChange={props.handleChange} />
                    <p className='text-warning'>{props.state.valuesError.language}</p>
                </FormGroup>
                <FormGroup>
                    <Label for="publisherId">Publisher Name</Label>
                    <Input type="text" name="publisherId" id="publisherId" value={props.state.values.editMode ? props.state.values.publisherId : props.state.values.publisherId} placeholder="Input the publisher name" onChange={props.handleChange} />
                    <p className='text-warning'>{props.state.valuesError.publisherId}</p>
                </FormGroup>
                <Button className='btn-success text-white' type="submit" disabled={props.state.form.buttonDisabled}>{props.state.values.editMode ? 'Edit' : 'Submit'}</Button>
            </Form>
        </div>
    )
}
export default FormBook



