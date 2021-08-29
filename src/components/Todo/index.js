import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import GroupList from './GroupList';
import GroupItem from './GroupItem';
import { getLocalAuth } from '../../util/storage';
import { Redirect } from 'react-router-dom';
import { getTodoFromGoogleSheet } from '../../util/google.sheets';

const Todo = () => {
    const auth = getLocalAuth();
    const uuid = auth ? auth.uuid : null;
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const asyncFunction = async () => {
            await getTodoFromGoogleSheet(uuid)
                .then(_groups => {
                    setGroups(_groups);
                })
        }
        asyncFunction();
    }, [uuid])

    console.log(groups);

    return (
        auth === null
            ? (
                <Redirect to='/auth/login/' />

            ) : (
                <div className="todo">
                    <GroupList groups={groups} />
                    <Route exact={true} path='/todo/:seq' component={GroupItem} />
                </div>
            )
    )
}

export default Todo;