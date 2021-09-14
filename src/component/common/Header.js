import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";
import { MdMenu } from 'react-icons/md';

const Header = ({ props }) => {

    const auth = useAuthState();
    const dispatch = useAuthDispatch();

    const { asideElement, containerElement } = props;

    const onIcon = () => {
        const left = asideElement.current.style.left;

        if (left === "0px") {
            asideElement.current.style.animation = "aside-hide 0.5s ease";
            asideElement.current.style.left = "-200px";
            containerElement.current.style.animation = "container-maximum 0.5s ease"
            containerElement.current.style.marginLeft = "0px"
        } else {
            asideElement.current.style.animation = "aside-show 0.5s ease";
            asideElement.current.style.left = "0px";
            containerElement.current.style.animation = "container-minimum 0.5s ease"
            containerElement.current.style.marginLeft = "200px"
        }
    }

    return (
        <header>
            <div className="icon" onClick={onIcon}>
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
                            <Link to='/todo'>할 일</Link>
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