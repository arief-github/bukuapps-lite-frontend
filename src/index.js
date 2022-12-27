import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './App/nonAuthPage/Login'
import Register from './App/nonAuthPage/Register'
import Auth from './App/authPage/Auth'

import User from './App/authPage/User/Component/Index'
import BooksUser from './App/authPage/User/Component/Books/Books'
import Profile from './App/authPage/User/Component/Profile/Profile'
import BookDetail from './App/authPage/User/Component/Books/Book'
import EditProfile from './App/authPage/User/Component/Profile/EditProfile'

import Admin from './App/authPage/Admin/Component/Index'
import Users from './App/authPage/Admin/Component/Users/User'
import BooksAdmin from './App/authPage/Admin/Component/Books/Books'


const routing = (
    <Router>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/auth' component={Auth} />

            <Route exact path='/user' component={User} />
            <Route exact path='/user/book/all' component={BooksUser} />
            <Route exact path='/user/book/detail/:id' component={BookDetail} />
            <Route exact path='/user/profile' component={Profile} />
            <Route exact path='/user/profile/edit' component={EditProfile} />

            <Route exact path='/admin' component={Admin} />
            <Route exact path='/admin/user/all' component={Users} />
            <Route exact path='/admin/book/all' component={BooksAdmin} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
