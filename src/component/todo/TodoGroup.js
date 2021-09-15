import queryString from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { useTodoState } from '../../context/TodoContext';

const TodoGroup = ({ location }) => {
    const query = queryString.parse(location.search);
    const group = useTodoState();
    const [filterGroup, setFilterGroup] = useState();

    const fetchGroup = useCallback(() => {
        if (Object.keys(query).length === 0 || group === undefined) {
            setFilterGroup(undefined);
        } else {
            setFilterGroup(group[query.option].filter(group => group.id === query.groupId)[0])
        }
    }, [query, group]);

    useEffect(() => {
        fetchGroup();
    }, [fetchGroup]);

    return (
        <div className="group">
            {
                filterGroup === undefined
                    ? ('')
                    : (
                        <>
                            <div className="title">
                                {filterGroup.title}
                                {filterGroup.todos.map((todo, index) =>
                                    <div key={index} className="todo">
                                        {todo.text}
                                    </div>
                                )}
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default TodoGroup;