import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthDispatch } from '../../context/AuthContext';

const NavbarList = styled.ul`
    width: 768px;
    list-style-type: none;
    margin-top: 10px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 768px) {
        width: 100%;
    }
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
        <NavbarList>
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
        </NavbarList>
    )
}

export default Navbar;