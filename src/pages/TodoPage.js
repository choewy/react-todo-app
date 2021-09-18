import { useAuthState } from "../context/AuthContext"
import { useTodoState } from "../context/TodoContext";
import queryString from 'query-string';
import { useRef, useState } from "react";
import { useEffect } from "react";
import TodoHeader from "../component/todo/TodoHeader";
import TodoBody from "../component/todo/TodoBody";
import TodoAppend from "../component/todo/TodoAppend";
import Spinner from "../component/common/Spinner";
import Home from "../component/home/Home";

const TodoPage = ({ location }) => {

    const todoListElement = useRef();

    const auth = useAuthState();
    const query = queryString.parse(location.search);
    const groups = useTodoState();
    const [group, setGroup] = useState(null);

    const [init, setInit] = useState(false);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setGroup(groups.length > 0 ? groups.filter(group => group.uuid === auth.uuid && group.id === query.groupId)[0] : null);
        if (todoListElement.current) {
            todoListElement.current.scrollTop = todoListElement.current.scrollHeight;
        }
        setInit(true);
    }, [auth, query, groups, group])

    if (init === false) {
        return <Spinner className="spinner-todo" />
    } else if (group === null || group === undefined) {
        return <Home />
    } else {
        return (
            <>
                {
                    spinner
                        ? <Spinner className="spinner-todo" />
                        :
                        <div className="todo-page" ><TodoHeader props={{ group, setSpinner }} />
                            <div ref={todoListElement} className="todo-scroll-area" style={group.todos.length === 0 ? { display: 'none' } : {}}>
                                {
                                    group.todos.map((todo, index) => (
                                        <TodoBody key={index} props={{ groupId: group.id, todo, setSpinner }} />
                                    ))
                                }
                            </div>
                            <TodoAppend props={{ groupId: group.id, setSpinner }} />
                        </div>
                }
            </>
        )
    }
};

export default TodoPage;