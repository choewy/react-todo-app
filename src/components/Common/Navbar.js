import React from 'react';
import { Link } from 'react-router-dom';
import { getLocalAuth, removeLocalAuth } from '../../util/storage';

const LinkLogin = ({ auth }) => {
    return (
        auth === null
            ? <Link to={{ pathname: "/auth/login", state: {} }}>로그인</Link>
            : <></>
    )
}

const LinkSignup = ({ auth }) => {
    return (
        auth === null
            ? <Link to={{ pathname: "/auth/signup", state: {} }}>회원가입</Link>
            : <></>
    )
}

const LinkTodo = ({ auth }) => {
    return (
        auth === null
            ? <></>
            : <Link to={{ pathname: "/todo", state: {} }}>TODO</Link>
    )
}

const LinkLogout = ({ auth }) => {

    const handleLogout = () => {
        removeLocalAuth();
        window.location.reload();
    }
    return (
        auth === null
            ? <></>
            : <Link to={{ pathname: "/", state: { auth } }} onClick={handleLogout}>로그아웃</Link>
    )
}

const Navbar = () => {
    const auth = getLocalAuth();
    return (
        <ul className="navbar">
            <li>
                <Link to={{ pathname: "/", state: { auth } }}>홈</Link>
            </li>
            <li>
                <LinkLogin auth={auth} />
            </li>
            <li>
                <LinkSignup auth={auth} />
            </li>
            <li>
                <LinkTodo auth={auth} />
            </li>
            <li>
                <LinkLogout auth={auth} />
            </li>
        </ul>
    )
}

export default Navbar;