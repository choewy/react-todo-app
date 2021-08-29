import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { encodingPassword } from '../../util/encode';
import { emailExp, findUserInGoogleSheet } from '../../util/google.sheets';
import { getLocalAuth, getLocalAutoSave, removeLocalAutoSave, setLocalAuth, setLocalAutoSave } from '../../util/storage';
import Modal from '../Common/Modal';

const Login = () => {
    const auth = getLocalAuth();
    const autosave = getLocalAutoSave();

    const [email, setEmail] = useState(autosave ? autosave : "");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(autosave ? true : false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setDisabled(true);

        if (email.match(emailExp) === null) {
            setDisabled(false);
            setError("입력하신 이메일을 다시 확인하세요.");
        } else {
            await findUserInGoogleSheet(email)
                .then(async _auth => {
                    const _password = await encodingPassword(_auth.salt, password);

                    if (_auth === null) {
                        setDisabled(false);
                        setError("이메일 계정이 존재하지 않습니다.");
                    } else if (_password !== _auth.password) {
                        setDisabled(false);
                        setError("비밀번호가 일치하지 않습니다.");
                    } else {
                        if (checked) setLocalAutoSave(email);
                        else removeLocalAutoSave();
                        setDisabled(false);
                        setLocalAuth(_auth);
                        window.location.reload();
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
                <div className="login">
                    <Modal visible={error ? true : false} setVisible={setError}>
                        <p>{error}</p>
                    </Modal>
                    <form onSubmit={handleLogin}>
                        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <label>
                            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                            이메일 기억하기
                        </label>
                        <button type="submit" disabled={disabled}>로그인</button>
                    </form>
                </div>
            ) : (
                <Redirect exact={true} to="/" />
            )
    )
}

export default Login;