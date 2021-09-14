import { useState } from "react";
import { emailExp } from "../../util/expression";

const HelpPassword = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: "" });
    const [ing, setIng] = useState(true);

    const onEmail = event => {
        const { target: { value } } = event;
        if (value === '') setErrors({ ...errors, email: "이메일을 입력하세요." })
        else if (value.match(emailExp) === null) setErrors({ ...errors, email: "이메일 형식이 아닙니다" })
        else setErrors({ ...errors, email: "" })

        setEmail(value);
    };

    const onSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className="wrapper">
            <form>
                <p>현재 기능 구현에 필요한 API를 찾고 있습니다.</p>
                <p>이용에 불편을 드려 대단히 죄송합니다.</p>
            </form>
            <form onSubmit={onSubmit} style={{ display: 'none' }}>
                <input type='text' value={email} placeholder="이메일 주소 입력" onChange={onEmail} disabled={ing} />
                <label>{errors.email}</label>
                <input type='submit' value='임시 비밀번호 발급' disabled={ing} />
            </form>
        </div>
    );
};

export default HelpPassword;