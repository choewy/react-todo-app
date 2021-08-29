import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { appendUserInGoogleSheet, emailExp, findUserInGoogleSheet, passwordExp } from '../../util/google.sheets';
import { getLocalAuth, setLocalAuth, setLocalAutoSave } from '../../util/storage';
import Modal from '../Common/Modal';

const Signup = () => {
    const auth = getLocalAuth();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [passwordInit, setPasswordInit] = useState("");
    const [passwordLast, setPasswordLast] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();
        setDisabled(true);

        if (email.match(emailExp) === null) {
            setDisabled(false);
            setError("입력하신 이메일을 다시 확인하세요.");
        } else if (name === "") {
            setDisabled(false);
            setError("이름을 입력하세요.");
        } else {
            await findUserInGoogleSheet(email)
                .then(async _auth => {
                    if (_auth !== null) {
                        setDisabled(false);
                        setError("이미 존재하는 이메일 계정입니다.");
                    } else if (passwordInit !== passwordLast) {
                        setDisabled(false);
                        setError("비밀번호가 일치하지 않습니다.");
                    } else if (passwordInit.match(passwordExp) === null) {
                        setDisabled(false);
                        setError("비밀번호는 10자리 이상의 영문과 특수문자 조합으로 구성되어야 합니다.");
                    } else {
                        await appendUserInGoogleSheet(email, name, passwordInit)
                            .then(_auth => {
                                setLocalAutoSave(email)
                                setDisabled(false);
                                setLocalAuth(_auth);
                                window.location.reload();
                            })
                    }
                })
                .catch(_error => {
                    setDisabled(false);
                    setError(error)
                });
        }
    }

    return (
        auth === null
            ? (
                <div className="signup">
                    <Modal visible={error ? true : false} setVisible={setError}>
                        <p>{error}</p>
                    </Modal>
                    <form onSubmit={handleSignup}>
                        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                        <input type="password" value={passwordInit} onChange={(event) => setPasswordInit(event.target.value)} />
                        <input type="password" value={passwordLast} onChange={(event) => setPasswordLast(event.target.value)} />
                        <button type="submit" disabled={disabled}>회원가입</button>
                    </form>
                </div>

            ) : (
                <Redirect to="/" />
            )
    )
}

export default Signup;