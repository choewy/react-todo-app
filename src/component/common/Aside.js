import { useRef, useEffect, useCallback, useState } from "react";
import { MdExpandMore, MdExpandLess, MdDone, MdKeyboardReturn } from "react-icons/md";
import { FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/AuthContext";
import { useTodoDispatch, useTodoState } from "../../context/TodoContext";
import { googleSheetAppendGroup, googleSheetGroup } from "../../util/googlesheets";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import Spinner from "./Spinner";

const Aside = () => {
    const groupListElement = useRef();
    const groupAppendElement = useRef();

    const app = useAppState();
    const auth = useAuthState();

    const groups = useTodoState();
    const todoDispatch = useTodoDispatch();
    const appDispatch = useAppDispatch();

    const [icon, setIcon] = useState(<></>);
    const [title, setTitle] = useState('');

    const [spinner, setSpinner] = useState(false);

    const onLink = () => {
        appDispatch({ type: 'hide_aside' });
    }

    const fetchGroups = useCallback(async () => {
        if (auth !== null) {
            setSpinner(true);
            const _groups = await googleSheetGroup(auth.uuid);
            todoDispatch({ type: 'get', groups: _groups });
            setIcon(<MdExpandLess />)
            setSpinner(false);
        };
    }, [auth, todoDispatch]);

    const onGroups = () => {
        if (app.groupList && groupListElement.current && groupAppendElement.current) {
            setIcon(<MdExpandMore />);
            appDispatch({ type: 'hide_groupList' });
        } else {
            setIcon(<MdExpandLess />);
            appDispatch({ type: 'show_groupList' });
        };
    };

    const onGithub = () => {
        window.open('https://github.com/choewy', '_blank');
    };

    const onNewGroup = async (event) => {
        event.preventDefault();
        if (title !== '') {
            setSpinner(true);
            await googleSheetAppendGroup(auth.uuid, title)
                .then(group => {
                    todoDispatch({ type: 'group_append', group: { ...group, state: "new" } });
                    setTitle('');
                })
                .catch(error => console.log(error));
            setSpinner(false);
            groupListElement.current.scrollTop = groupListElement.current.scrollHeight;
        }
    };

    useEffect(() => {
        fetchGroups();
        appDispatch({ type: "init_groupList", auth, groupListElement, groupAppendElement });
    }, [auth, appDispatch, fetchGroups]);

    return (
        <>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {
                    auth === null
                        ? <></>
                        : (<li className="aside-groups" onClick={onGroups}>
                            <div>Todo</div>
                            {icon}
                        </li>)
                }
                {
                    spinner
                        ? <Spinner className="spinner-aside" />
                        : <>
                            <ul ref={groupListElement} className="aside-group-list">
                                {
                                    groups.map((group, index) =>
                                        <li key={index}>
                                            <div className="aside-group-item" state={group.state}>
                                                <div className="aside-group-checkbox">
                                                    <MdDone />
                                                </div>
                                                <Link to={`/todo/?groupId=${group.id}`} onClick={onLink}>{group.title}</Link>
                                            </div>
                                        </li>)
                                }
                            </ul>
                            <form ref={groupAppendElement} className="aside-group-form" onSubmit={onNewGroup}>
                                <input placeholder="새 그룹의 제목을 입력하세요." type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
                                <button type='submit'>
                                    <MdKeyboardReturn />
                                </button>
                            </form>
                        </>
                }
                <li><Link to='/about'>About</Link></li>
                <li onClick={onGithub} ><FaGithub /> Github</li>
            </ul>
        </>
    )
}

export default Aside;