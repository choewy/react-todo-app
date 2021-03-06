import React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import FindPassword from '../components/Auth/FindPassword';
import LoginTemplate from '../components/Auth/LoginTemplate';
import SignupTemplate from '../components/Auth/SignupTemplate';
import { useAuthState } from '../context/AuthContext';

const Wrapper = styled.div`
    width: 768px;
    height: 100vh;

    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;

    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const AuthRoute = () => {

    const auth = useAuthState();

    if (auth) {
        return <Redirect exact={true} to="/" />
    } else {
        return (
            <Wrapper>
                <Switch>
                    <Route path="/auth/login/" component={LoginTemplate} />
                    <Route path="/auth/signup/" component={SignupTemplate} />
                    <Route path="/auth/find-password/" component={FindPassword} />
                </Switch>
            </Wrapper>
        )
    }
}

export default AuthRoute;