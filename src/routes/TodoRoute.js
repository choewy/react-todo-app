import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components';
import GroupTemplate from '../components/Group/GroupTemplate';
import { useTodoDispatch } from '../context/TodoContext';
import TodoTemplate from '../components/Todo/TodoTemplate';
import { getTodosFromGoogleSheet } from '../util/google.sheets';
import { useAuthState } from '../context/AuthContext';
import { Switch } from 'react-router-dom';

const Wrapper = styled.div`
    width: 768px;
    height: 768px;

    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;

    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`

const TodoRoute = () => {
    const auth = useAuthState();
    const [init, setInit] = useState(false);
    const dispatch = useTodoDispatch();

    useEffect(() => {
        const Init = async () => {
            if (auth !== null) {
                setInit(false);
                await getTodosFromGoogleSheet(auth.uuid)
                    .then((groups) => {
                        dispatch({ type: "INIT", groups });
                    })
                    .catch((error) => console.log(error))
                setInit(true);
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
                    !init
                        ? <>로딩 중...</>
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