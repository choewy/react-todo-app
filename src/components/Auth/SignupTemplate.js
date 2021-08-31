import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useAuthDispatch } from '../../context/AuthContext';
import { EMAIL_EXP, PASSWORD_EXP } from '../../util/expression';
import { appendUserInGoogleSheet, findUserInGoogleSheet } from '../../util/google.sheets';
import SignupHeader from './SignupHeader';

const SignupForm = styled.form`
    background: #f8f9fa;

    width: 100%;
    max-width: 500px;

    margin: 0 auto;

    padding-top: 32px;
    padding-bottom: 72px;
    
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SignupLabel = styled.div`
    width: 100%;
    font-size: 16px;
    margin: 5px 0;

    ${props =>
        props.error &&
        css`
            color: red;
        `
    } 
`;

const SignupInput = styled.input`
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
`;

const SignupButton = styled.button`
    padding: 12px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    background-color: #38d9a9;
    cursor: pointer;
    font-size: 18px;
    width: 100%;

    &:hover {
        background: #63e6be;
    }
`;

const SignupTemplate = () => {
    const dispatch = useAuthDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [lastPassword, setLastPassword] = useState('');

    const [disable, setDisable] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [firstPasswordError, setFirstPasswordError] = useState('');
    const [lastPasswordError, setLastPasswordError] = useState('');

    const onEmail = (event) => {
        const { target: { value } } = event;

        setEmail(value);

        if (value === '')
            setEmailError('이메일을 입력하세요.')
        else if (value.match(EMAIL_EXP) === null)
            setEmailError('이메일 형식에 맞지 않습니다.');
        else setEmailError('');
    };

    const onName = (event) => {
        const { target: { value } } = event;

        setName(value)

        if (value === '')
            setNameError('이름을 입력하세요.')
        else setNameError('');
    };

    const onFirstPassword = (event) => {
        const { target: { value } } = event;

        setFirstPassword(value);

        if (value === '')
            setFirstPasswordError('비밀번호를 입력하세요.')
        else if (value.match(PASSWORD_EXP) === null)
            setFirstPasswordError('비밀번호 형식에 맞지 않습니다.')
        else setFirstPasswordError('');
    };

    const onLastPassword = (event) => {
        const { target: { value } } = event;

        setLastPassword(event.target.value)

        if (value === '')
            setLastPasswordError('비밀번호를 입력하세요.')
        else if (value !== firstPassword)
            setLastPasswordError('비밀번호가 일치하지 않습니다.')
        else setLastPasswordError('');
    }

    const onSignup = async (event) => {
        event.preventDefault();

        const errors = [
            emailError,
            nameError,
            firstPasswordError,
            lastPasswordError
        ].join('');

        let error = "";

        if (email === '') {
            error = "이메일을 입력하세요."
            setEmailError(error)
        }

        if (name === '') {
            error = "이름을 입력하세요."
            setNameError(error)
        }

        if (firstPasswordError === '') {
            error = "비밀번호를 입력하세요."
            setFirstPasswordError(error)
        }

        if (lastPasswordError === '') {
            error = "비밀번호를 입력하세요."
            setLastPasswordError(error);
        }

        if (errors + error === '') {
            setDisable(true)
            const _auth = await findUserInGoogleSheet(email)

            if (_auth) {
                setEmailError('이미 존재하는 이메일 계정입니다.')
                setDisable(false)
            } else {
                const auth = await appendUserInGoogleSheet(email, name, firstPassword);
                dispatch({ type: "AUTH_SIGNUP", auth });
            }
        }
    }

    return (
        <>
            <SignupHeader />
            <SignupForm onSubmit={onSignup}>
                <SignupLabel error={emailError}>
                    {
                        emailError
                            ? emailError
                            : ("이메일")
                    }
                </SignupLabel>
                <SignupInput type="text" error={emailError} value={email} onChange={onEmail} disabled={disable} />

                <SignupLabel error={nameError}>
                    {
                        nameError
                            ? nameError
                            : ("이름")
                    }
                </SignupLabel>
                <SignupInput type="name" error={nameError} value={name} onChange={onName} disabled={disable} />

                <SignupLabel error={firstPasswordError}>
                    {
                        firstPasswordError
                            ? firstPasswordError
                            : ("비밀번호")
                    }
                </SignupLabel>
                <SignupInput type="password" error={firstPasswordError} value={firstPassword} onChange={onFirstPassword} disabled={disable} />

                <SignupLabel error={lastPasswordError}>
                    {
                        lastPasswordError
                            ? lastPasswordError
                            : ("비밀번호 재입력")
                    }
                </SignupLabel>
                <SignupInput type="password" error={lastPasswordError} value={lastPassword} onChange={onLastPassword} disabled={disable} />
                <SignupButton type="submit" disabled={disable}>완료</SignupButton>
            </SignupForm>
        </>
    )
}

export default SignupTemplate