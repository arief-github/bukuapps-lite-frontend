import React, { useMemo, useState } from 'react'
import Axios from 'axios'
import { useForm } from 'react-hook-form'

const Form = (props) => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
        const apiUrl = 'http://localhost:8080/user/profile/edit'
        try {
            const updateData = await Axios.put(apiUrl, data, {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            })
            if (updateData.status === 201) {
                alert('Succesfully updated profile')
                props.history.push('/user/profile')
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const [dataEdit, setDataEdit] = useState("")

    useMemo(() => {
        const token = sessionStorage.getItem('token')
        const dataForm = async () => {
            const resData = await Axios.get('http://localhost:8080/user/profile', {
                headers: {
                    'authorization': token
                }
            })
            setDataEdit(
                resData.data.data
            )
        }
        dataForm()
    }, [])

    return (
        <div className="container">
            <form className='form mt-5 col-6' onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-3 text-primary">Edit Profile</h4>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name='name' defaultValue={dataEdit.name} ref={register({ required: true })} />
                    {errors.name && <p className='text-danger'>Please Edit Your Name</p>}
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name='username' disabled={true} defaultValue={dataEdit.username} ref={register({ required: true })} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name='email' disabled={true} defaultValue={dataEdit.email} ref={register({ required: true })} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name='password' ref={register({ required: true, minLength: 8 })} />
                    {errors.password && <p className='text-danger'>password must be at least 8 character</p>}
                </div>
                <div style={{ display: 'none' }}>
                    <select name='role' ref={register({ required: true })} multiple>
                        <option value='USER' selected='selected'></option>
                    </select>
                </div>
                <button className='btn btn-primary' ftype='submit'>Edit</button>
            </form>
        </div>
    )
}

export default Form
