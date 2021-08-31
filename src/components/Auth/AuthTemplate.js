import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const AuthTemplate = () => {
    return (
        <>
            <Route exact={true} path='/auth/login' component={Login} />
            <Route exact={true} path="/auth/signup" component={Signup} />
        </>
    )
}

export default AuthTemplate;