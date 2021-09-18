import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../context/AuthContext";
import { encodePassword } from "../../util/encode";
import { emailExp } from "../../util/expression";
import { googleSheetAuth } from "../../util/googlesheets";
import { localStorageGetSave } from "../../util/localstorage";
import Spinner from "../common/Spinner";

const Login = () => {

    const save = localStorageGetSave();
    const dispatch = useAuthDispatch();

    const [email, setEmail] = useState(save === null ? '' : save);
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState(save === null ? false : true);

    const [errors, setErrors] = useState({ email: "", password: "" })
    const [spinner, setSpinner] = useState(false);

    const onEmail = event => {
        const { target: { value } } = event;
        if (value === '') setErrors({ ...errors, email: "이메일을 입력하세요." })
        else if (value.match(emailExp) === null) setErrors({ ...errors, email: "이메일 형식이 아닙니다" })
        else setErrors({ ...errors, email: "" })

        setEmail(value);
    };

    const onPassword = event => {
        const { target: { value } } = event;
        if (value === '') setErrors({ ...errors, password: "비밀번호를 입력하세요." })
        else setErrors({ ...errors, password: "" })

        setPassword(value);
    };

    const onCheck = useCallback(event => {
        const { target: { checked } } = event
        setCheck(checked);
    }, []);

    const onLogin = async event => {
        event.preventDefault();

        const flags = [
            email === "" ? "이메일을 입력하세요." : "",
            password === "" ? "비밀번호를 입력하세요." : ""
        ];

        if (errors.email + errors.password !== "") {

        } else if (flags.join('') !== '') {
            setErrors({ email: flags[0], password: flags[1] });
        } else {
            setSpinner(true);
            const auth = await googleSheetAuth(email);
            if (auth === null) {
                setSpinner(false);
                setErrors({ ...errors, email: "등록되지 않은 이메일 입니다." });
            }
            else if (await encodePassword(auth.salt, password) !== auth.password) {
                setSpinner(false);
                setErrors({ ...errors, password: "비밀번호가 틀립니다." });
            }
            else {
                setSpinner(false);
                dispatch({ type: "login", auth, check });
            };
        };
    };

    return (
        <div className="login">
            {
                spinner
                    ? <Spinner className="spinner-auth" />
                    : <><form onSubmit={onLogin}>
                        <input type='text' value={email} placeholder="이메일 주소 입력" onChange={onEmail} />
                        <label className="auth-error">{errors.email}</label>
                        <input type='password' value={password} placeholder="비밀번호 입력" onChange={onPassword} />
                        <label className="auth-error">{errors.password}</label>
                        <div className="checkbox">
                            <input type='checkbox' checked={check} onChange={onCheck} />
                            <label className="login-check">이메일 기억하기</label>
                        </div>
                        <input type="submit" value="로그인" />
                    </form>
                        <div className="reset-password" style={{ display: 'none' }}>
                            <p>비밀번호를 잊으셨나요?</p>
                            <Link to="/auth/help-password">비밀번호 재설정</Link>
                        </div></>
            }

        </div>
    );
};

export default Login;