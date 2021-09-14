import { Redirect, Route } from "react-router"
import About from "../component/todo/About"
import Todo from "../component/todo/Todo"
import { useAuthState } from "../context/AuthContext"

const TodoPage = () => {
    const auth = useAuthState();

    return (
        <div className="page">
            {
                auth === null
                    ? <Redirect to="/auth/login" />
                    : (
                        <>
                            <div className="todo-header">
                            </div>
                            <div className="todo-container">
                                <Route exact={true} path='/todo' component={About} />
                                <Route path='/todo/group' component={Todo} />
                            </div>
                        </>
                    )

            }
        </div>
    )
}

export default TodoPage;