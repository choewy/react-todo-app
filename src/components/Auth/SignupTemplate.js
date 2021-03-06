import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useAuthDispatch } from '../../context/AuthContext';
import { EMAIL_EXP, PASSWORD_EXP } from '../../util/expression';
import { appendUserInGoogleSheet, getAuthInGoogleSheet } from '../../util/google.sheets';
import Spinner from '../Common/Spinner';
import SignupHeader from './SignupHeader';

const SignupForm = styled.form`
    background: white;

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

    @media (max-width: 768px) {
        width: 300px;
    }
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

const SignupButtonWrapper = styled.div`
    margin: 10px 0;
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

const SignupButton = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    text-align: center;

    &:hover {
        background: #63e6be;
    }
`

const SignupTemplate = () => {
    const dispatch = useAuthDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [lastPassword, setLastPassword] = useState('');

    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [firstPasswordError, setFirstPasswordError] = useState('');
    const [lastPasswordError, setLastPasswordError] = useState('');

    const onEmail = (event) => {
        const { target: { value } } = event;

        setEmail(value);

        if (value === '')
            setEmailError('???????????? ???????????????.')
        else if (value.match(EMAIL_EXP) === null)
            setEmailError('????????? ????????? ?????? ????????????.');
        else setEmailError('');
    };

    const onName = (event) => {
        const { target: { value } } = event;

        setName(value)

        if (value === '')
            setNameError('????????? ???????????????.')
        else setNameError('');
    };

    const onFirstPassword = (event) => {
        const { target: { value } } = event;

        setFirstPassword(value);

        if (value === '')
            setFirstPasswordError('??????????????? ???????????????.')
        else if (value.match(PASSWORD_EXP) === null)
            setFirstPasswordError('???????????? ????????? ?????? ????????????.')
        else setFirstPasswordError('');
    };

    const onLastPassword = (event) => {
        const { target: { value } } = event;

        setLastPassword(value);

        if (value === '')
            setLastPasswordError('??????????????? ???????????????.')
        else if (value !== firstPassword)
            setLastPasswordError('??????????????? ???????????? ????????????.')
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
            error = "???????????? ???????????????."
            setEmailError(error)
        }

        if (name === '') {
            error = "????????? ???????????????."
            setNameError(error)
        }

        if (firstPassword === '') {
            error = "??????????????? ???????????????."
            setFirstPasswordError(error)
        }

        if (lastPassword === '') {
            error = "??????????????? ???????????????."
            setLastPasswordError(error);
        }

        if (errors + error === '') {
            setLoader(true)
            setDisable(true)
            const _auth = await getAuthInGoogleSheet(email)

            if (_auth) {
                setEmailError('?????? ???????????? ????????? ???????????????.')
                setLoader(false)
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
                            : ("?????????")
                    }
                </SignupLabel>
                <SignupInput type="text" error={emailError} value={email} onChange={onEmail} disabled={disable} />

                <SignupLabel error={nameError}>
                    {
                        nameError
                            ? nameError
                            : ("??????")
                    }
                </SignupLabel>
                <SignupInput type="name" error={nameError} value={name} onChange={onName} disabled={disable} />

                <SignupLabel error={firstPasswordError}>
                    {
                        firstPasswordError
                            ? firstPasswordError
                            : ("????????????")
                    }
                </SignupLabel>
                <SignupInput type="password" error={firstPasswordError} value={firstPassword} onChange={onFirstPassword} disabled={disable} />

                <SignupLabel error={lastPasswordError}>
                    {
                        lastPasswordError
                            ? lastPasswordError
                            : ("???????????? ?????????")
                    }
                </SignupLabel>
                <SignupInput type="password" error={lastPasswordError} value={lastPassword} onChange={onLastPassword} disabled={disable} />
                <SignupButtonWrapper>
                    {
                        loader
                            ? <Spinner width={36} height={36} type="Oval" color="#3d66ba" />
                            : <SignupButton type="submit" disabled={disable}>????????????</SignupButton>
                    }
                </SignupButtonWrapper>
            </SignupForm>
        </>
    )
}

export default SignupTemplate