import React from 'react'

const Home = (props) => {

    return (
        <div className="container">
            <h5 className="text-center m-5">Hallo, {props.dataUser.name} 💙, happy surfing 🏄🏻‍♂️</h5>
        </div>
    );
}
export default Home