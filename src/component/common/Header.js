import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";
import { MdMenu } from 'react-icons/md';
import { useAppDispatch } from "../../context/AppContext";

const Header = () => {

    const appDispatch = useAppDispatch();
    const auth = useAuthState();
    const dispatch = useAuthDispatch();

    const onAside = () => {
        appDispatch({ type: 'aside_trigger' });
    }

    return (
        <header>
            <div className="icon" onClick={onAside}>
                <MdMenu />
            </div>
            <div className="title">
                React Todo App
            </div>
            <div className="buttons">
                {
                    auth === null
                        ? (<>
                            <Link to="/auth/login">로그인</Link>
                            <Link to="/auth/signup">회원가입</Link>
                        </>) : (<>
                            <Link to='/auth/login' onClick={() => dispatch({ type: "logout" })}>
                                로그아웃
                            </Link>
                        </>)
                }
            </div>
        </header>
    )
}

export default Header;