import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthDispatch } from '../../context/AuthContext';

const NavbarWrapper = styled.ul`
    list-style-type: none;
    width: 300px;
    margin: 10px 0;
    padding: 10px 0;
`
const NavbarItem = styled.li`
    float: left;
`
const NavbarLink = styled(Link)`
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 0 20px;
    text-align: center;
`

const Navbar = ({ auth }) => {
    const dispatch = useAuthDispatch();

    const onLogout = () => {
        dispatch({ type: "AUTH_LOGOUT" })
    }

    return (
        <NavbarWrapper>
            <NavbarItem>
                <NavbarLink to="/">홈</NavbarLink>
            </NavbarItem>
            {
                auth === null
                    ? (
                        <>
                            <NavbarItem>
                                <NavbarLink to="/auth/login">로그인</NavbarLink>
                            </NavbarItem>
                            <NavbarItem>
                                <NavbarLink to="/auth/signup">회원가입</NavbarLink>
                            </NavbarItem>
                        </>
                    ) : (
                        <>
                            <NavbarItem>
                                <NavbarLink to="/todo/groups/">TODO</NavbarLink>
                            </NavbarItem>
                            <NavbarItem>
                                <NavbarLink to="/" onClick={onLogout}>로그아웃</NavbarLink>
                            </NavbarItem>
                        </>
                    )
            }
        </NavbarWrapper>
    )
}

export default Navbar;