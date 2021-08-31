import React from 'react';
import styled from 'styled-components';
import GroupItem from './GroupItem';

const GroupListWrapper = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`

const GroupList = ({ groups }) => {
    return (
        <GroupListWrapper>
            {
                groups.map((group, index) => (
                    <GroupItem
                        key={index}
                        group_id={group.id}
                        title={group.title}
                    />
                ))
            }
        </GroupListWrapper>
    )
}

export default GroupList;