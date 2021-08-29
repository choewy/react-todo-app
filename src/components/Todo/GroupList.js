import React from 'react';
import { Link } from 'react-router-dom';

// TODO
/*
    1. 그룹 추가 버튼 및 기능 구현
*/

// 새로고침 시 Route state 초기화로 인한 오류 방지
let temp = [];

const tempGroups = (groups) => {
    if (groups) {
        temp = groups;
    }
    return temp;
}

const GroupList = ({ groups }) => {
    const _groups = tempGroups(groups);

    try {
        return (
            <ul className="group-list">
                {
                    _groups.map((group, index) => (
                        <li key={index}>
                            <Link to={{
                                pathname: `/todo/${group.group_seq}`,
                                state: { ...group }
                            }}>{group.group_title}</Link>
                        </li>
                    ))
                }
            </ul>
        )
    }
    catch {
        window.location.replace('/todo/')
    }
}

export default GroupList;