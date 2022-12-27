import React, { Component } from 'react'
import axios from 'axios'

const Home = (props) => {

    return (
        <div className="container">
            <h5 className="text-center m-5">Welcome back {props.dataUser.name} 🤜🏼, happy working 💪🏼</h5>
        </div>
    )
}
export default Home