import React from 'react';
import { useAuthState } from '../../context/AuthContext';
import { useTodoState } from '../../context/TodoContext';
import GroupAppend from './GroupAppend';
import GroupHeader from './GroupHeader';
import GroupList from './GroupList';
import GroupNotFound from './GroupNotFound';

const GroupTemplate = () => {
    const auth = useAuthState()
    const groups = useTodoState().filter(group => group.uuid === auth.uuid)
    return (
        <>
            {
                groups === undefined
                    ? <GroupNotFound />
                    : (
                        <>
                            <GroupHeader />
                            <GroupList groups={groups} />
                            <GroupAppend />
                        </>
                    )
            }
        </>
    )
}

export default GroupTemplate;