import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Login from './Login'

const Register = (props) => {

    const { register, handleSubmit, errors } = useForm()
    const onRegister = async (dataInput) => {
        try {
            const resRegister = await axios.post('http://localhost:8080/register', dataInput)
            if (resRegister.status === 201) {
                alert('Congrats you succesfully registered')
                props.history.push('/login')
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className='container'>
            <div className='mt-5 mb-5'>
                <div className='card col-8 offset-2'>
                    <form onSubmit={handleSubmit(onRegister)}>
                        <div className='m-5'>
                            <h2 className='mb-5'>Sign Up</h2>
                            <div className='form-group'>
                                <label>Name</label>
                                <input className='form-control' type='text' name="name" ref={register({
                                    validate: value => value.length > 2
                                })}></input>
                                {errors.name && <p className='text-danger'>check your Name, input Name at least 3 characters</p>}
                            </div>
                            <div className='form-group'>
                                <label>Username</label>
                                <input className='form-control' type='text' name="username" ref={register({
                                    validate: value => value.length > 4
                                })}></input>
                                {errors.username && <p className='text-danger'>check your username, input username at least 5 characters</p>}
                            </div>
                            <div className='form-group'>
                                <label>Email</label>
                                <input className='form-control' type='text' name="email" ref={register({
                                    required: true,
                                    pattern: /^\S+@\S+$/i
                                })}></input>
                                {errors.email && <p className='text-danger'>check your email, input email is invalid</p>}
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input className='form-control' type='password' name="password" ref={register({
                                    validate: value => value.length > 7
                                })}></input>
                                {errors.password && <p className='text-danger'>check your password, input password at least 8 characters</p>}
                            </div>
                            <div style={{ display: 'none' }}>
                                <select name='role' ref={register({ required: true })} multiple>
                                    <option value='USER' selected='selected'></option>
                                </select>
                            </div>
                            <button className='btn btn-primary mb-5' type='submit'>Register</button>
                            <p>Already have an account? <a href='/login'>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default Register