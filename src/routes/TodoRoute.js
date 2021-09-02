import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components';
import GroupTemplate from '../components/Group/GroupTemplate';
import { useTodoDispatch } from '../context/TodoContext';
import TodoTemplate from '../components/Todo/TodoTemplate';
import { getTodosFromGoogleSheet } from '../util/google.sheets';
import { useAuthState } from '../context/AuthContext';
import { Switch } from 'react-router-dom';
import Spinner from '../components/Common/Spinner';

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

const SpinnerWrapper = styled.div`
    display: flex;
    margin: auto;
    justify-content: center;
`

const TodoRoute = () => {
    const auth = useAuthState();
    const [loader, setLoader] = useState(false);
    const dispatch = useTodoDispatch();

    useEffect(() => {
        const Init = async () => {
            if (auth !== null) {
                setLoader(false);
                await getTodosFromGoogleSheet(auth.uuid)
                    .then((groups) => {
                        dispatch({ type: "INIT", groups });
                    })
                    .catch((error) => console.log(error))
                setLoader(true);
            }
        }
        Init(auth);
    }, [dispatch, auth])

    if (auth === null) {
        return <Redirect exact={true} to='/auth/login/' />
    } else {
        return (
            <Wrapper>
                {
                    !loader
                        ?
                        <SpinnerWrapper>
                            <Spinner
                                width={75}
                                height={75}
                                type="Oval"
                                color="#3d66ba"
                            />
                        </SpinnerWrapper>
                        :
                        <Switch>
                            <Route exact={true} path="/todo/groups/" component={GroupTemplate} />
                            <Route path="/todo/" component={TodoTemplate} />
                        </Switch>
                }
            </Wrapper>
        )
    }
}

export default TodoRoute;