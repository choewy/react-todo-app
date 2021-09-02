import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAuthDispatch } from '../../context/AuthContext';
import { encodingPassword } from '../../util/encode';
import { EMAIL_EXP, PASSWORD_EXP } from '../../util/expression';
import { getAuthInGoogleSheet } from '../../util/google.sheets';
import { getLocalSave } from '../../util/storage';
import Spinner from '../Common/Spinner';
import LoginHeader from './LoginHeader';

const LoginForm = styled.form`
    background: white;

    width: 100%;
    max-width: 500px;

    margin: 0 auto;

    padding-top: 32px;
    padding-bottom: 16px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 300px;
    }
`

const LoginLabel = styled.div`
    width: 100%;
    font-size: 16px;
    margin: 5px 0;

    ${props =>
        props.error &&
        css`
            color: red;
        `
    } 
`

const LoginInput = styled.input`
    padding: 12px;
    margin: 5px 0;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;

    ${props =>
        props.error &&
        css`
            border: 1px solid red;
            color: red;
        `
    } 
`

const LoginCheck = styled.div`
    display: flex;
    flex-direction: initial;
    width: 100%;
    align-items: center;
    justify-content: center;    

    input {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    margin: 10px 0;
`

const LoginButtonWrapper = styled.div`
    margin: 10px 0;
    max-width: 500px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    background-color: #38d9a9;
    cursor: pointer;

    *{
        width: 100%;
        padding: 5px;
    }

    button {
        padding: 12px;
    }
`

const LoginButton = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    text-align: center;

    &:hover {
        background: #63e6be;
    }
`

const LoginOtherButtonsWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    * {
        margin: -10px 20px;
    }

    @media (max-width: 768px) {
        width: 300px;

        * {
            margin: -10px 10px;
        }
    }
`

const LoginTemplate = () => {
    const dispatch = useAuthDispatch();

    const save = getLocalSave();

    const [email, setEmail] = useState(save === null ? '' : save);
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState(save === null ? false : true)

    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onEmail = (event) => {
        const { target: { value } } = event;

        setEmail(value);

        if (value === '')
            setEmailError('이메일을 입력하세요.')
        else if (value.match(EMAIL_EXP) === null)
            setEmailError('이메일 형식에 맞지 않습니다.')
        else setEmailError('');
    };
    const onPassword = (event) => {
        const { target: { value } } = event;

        setPassword(value);

        if (value === '')
            setPasswordError('비밀번호를 입력하세요.')
        else if (value.match(PASSWORD_EXP) === null)
            setPasswordError('비밀번호를 다시 확인하세요.')
        else setPasswordError('')
    };
    const onCheck = (event) => setCheck(event.target.value);
    const onLogin = async (event) => {
        event.preventDefault();

        const errors = [
            emailError,
            passwordError
        ].join('');

        let error = '';

        if (email === '') {
            error = "이메일을 입력하세요."
            setEmailError(error);
        }

        if (password === '') {
            error = "비밀번호를 입력하세요."
            setPasswordError(error);
        }

        if (errors + error === '') {
            setLoader(true)
            setDisable(true)
            await getAuthInGoogleSheet(email)
                .then(async (auth) => {
                    if (auth === null) {
                        setEmailError('존재하지 않은 이메일 계정입니다.')
                        setDisable(false)
                        setLoader(false)
                    } else if (await encodingPassword(auth.salt, password) !== auth.password) {
                        setPasswordError('비밀번호가 일치하지 않습니다.')
                        setDisable(false)
                        setLoader(false)
                    } else {
                        dispatch({ type: "AUTH_LOGIN", auth, check })
                    }
                })
        }
    }

    return (
        <>
            <LoginHeader />
            <LoginForm onSubmit={onLogin}>
                <LoginLabel error={emailError}>
                    {
                        emailError
                            ? emailError
                            : ("이메일")
                    }
                </LoginLabel>
                <LoginInput type="text" error={emailError} value={email} onChange={onEmail} disabled={disable} />

                <LoginLabel error={passwordError}>
                    {
                        passwordError
                            ? passwordError
                            : ("비밀번호")
                    }
                </LoginLabel>
                <LoginInput type="password" error={passwordError} value={password} onChange={onPassword} disabled={disable} />

                <LoginCheck>
                    <LoginInput type="checkbox" value={check} onChange={onCheck} checked={check} disabled={disable} />
                    이메일 기억하기
                </LoginCheck>
                <LoginButtonWrapper>
                    {
                        loader
                            ? <Spinner width={36} height={36} type="Oval" color="#3d66ba" />
                            : <LoginButton type="submit" disabled={disable}>로그인</LoginButton>
                    }
                </LoginButtonWrapper>
            </LoginForm >
            <LoginOtherButtonsWrapper>
                <Link to="/auth/signup/">회원가입</Link>
                <Link to="/auth/find-password/">비밀번호 찾기</Link>
            </LoginOtherButtonsWrapper>
        </>
    )
}

export default LoginTemplate;