import { useState } from "react";
import { useAuthDispatch } from "../../context/AuthContext";
import { emailExp, passwordExp } from "../../util/expression";
import { googleSheetAppendUser, googleSheetAuth } from "../../util/googlesheets";
import Spinner from "../common/Spinner";

const Signup = () => {

    const dispatch = useAuthDispatch();


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState({ init: '', last: '' });

    const [errors, setErrors] = useState({ email: "", name: "", password: { init: "", last: "" } })
    const [spinner, setSpinner] = useState(false);

    const onEmail = event => {
        const { target: { value } } = event;
        if (value === '') setErrors({ ...errors, email: "이메일을 입력하세요." })
        else if (value.match(emailExp) === null) setErrors({ ...errors, email: "이메일 형식이 아닙니다." })
        else setErrors({ ...errors, email: "" })

        setEmail(value);
    };

    const onName = event => {
        const { target: { value } } = event;
        if (value === '') setErrors({ ...errors, name: "이름을 입력하세요." });
        else setErrors({ ...errors, name: '' });
        setName(value);
    };

    const onPassword = event => {
        const { target: { name, value } } = event;
        if (name === 'init') {
            if (value === '') setErrors({ ...errors, password: { ...errors.password, init: "비밀번호를 입력하세요." } })
            else if (value.match(passwordExp) === null) setErrors({ ...errors, password: { ...errors.password, init: "비밀번호는 10자리(영문, 숫자, 특수문자 조합)로 입력하세요." } })
            else setErrors({ ...errors, password: { ...errors.password, init: "" } })
            setPassword({ ...password, init: value })
        } else {
            if (value === '') setErrors({ ...errors, password: { ...errors.password, last: "비밀번호를 입력하세요." } })
            else if (value !== password.init) setErrors({ ...errors, password: { ...errors.password, last: "비밀번호가 일치하지 않습니다." } })
            else setErrors({ ...errors, password: { ...errors.password, last: "" } });
            setPassword({ ...password, last: value })
        }
    };

    const onSignup = async event => {
        event.preventDefault();

        const flags = [
            email === "" ? "이메일을 입력하세요." : "",
            name === "" ? "이름을 입력하세요." : "",
            password.init === "" ? "비밀번호를 입력하세요." : "",
            password.last === "" ? "비밀번호를 입력하세요." : ""
        ];

        if (errors.email + errors.name + errors.password.init + errors.password.last !== "") {

        } else if (flags.join('') !== '') {
            setErrors({ email: flags[0], name: flags[1], password: { init: flags[2], last: flags[3] } });
        } else {
            setSpinner(true);
            if (await googleSheetAuth(email) !== null) {
                setSpinner(false);
                setErrors({ ...errors, email: "이미 존재하는 이메일 계정입니다." });
            }
            else {
                const auth = await googleSheetAppendUser(email, name, password.init);
                setSpinner(false);
                dispatch({ type: "signup", auth });
            };
        };
    };

    return (
        <div className="signup">
            {
                spinner
                    ? <Spinner className="spinner-auth" />
                    : <form onSubmit={onSignup}>
                        <input type='text' value={email} placeholder="이메일 주소 입력" onChange={onEmail} />
                        <label className="auth-error">{errors.email}</label>
                        <input type='text' value={name} placeholder="이름 입력" onChange={onName} />
                        <label className="auth-error">{errors.name}</label>
                        <input type='password' value={password.init} placeholder="비밀번호 입력" onChange={onPassword} name="init" />
                        <label className="auth-error">{errors.password.init}</label>
                        <input type='password' value={password.last} placeholder="비밀번호 확인" onChange={onPassword} name="last" />
                        <label className="auth-error">{errors.password.last}</label>
                        <input type='submit' value="회원가입" />
                    </form>
            }
        </div>
    );
};

export default Signup;