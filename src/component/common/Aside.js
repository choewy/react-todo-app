import { useRef, useEffect, useCallback, useState } from "react";
import { MdExpandMore, MdExpandLess, MdDone, MdKeyboardReturn } from "react-icons/md";
import { FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/AuthContext";
import { useTodoDispatch, useTodoState } from "../../context/TodoContext";
import { googleSheetAppendGroup, googleSheetGroup } from "../../util/googlesheets";

const Aside = () => {
    const groupListElement = useRef();
    const groupAppendElement = useRef();

    const auth = useAuthState();

    const groups = useTodoState();
    const dispatch = useTodoDispatch();

    const [trigger, setTrigger] = useState();
    const [title, setTitle] = useState('');

    const fetchGroups = useCallback(async () => {
        if (auth !== null) {
            const _groups = await googleSheetGroup(auth.uuid);
            dispatch({ type: 'get', groups: _groups })
            console.log('fetchGroups');
        }
    }, [auth, dispatch])

    const onTrigger = (visibility) => {
        if (visibility === 'hidden') {
            setTrigger(<MdExpandLess />)
            return {
                animation: "groups-show 0.5s ease",
                visibility: "visible",
                height: '55vh',
                padding: '10px',
                margin: '2px 0',
                display: 'flex'
            }
        } else {
            setTrigger(<MdExpandMore />)
            return {
                animation: "groups-hide 0.5s ease",
                visibility: "hidden",
                height: '0vh',
                padding: '0px',
                margin: '0px 0',
                display: 'none'
            };
        };
    };

    const onGroups = () => {
        const { animation, visibility, height, padding, margin, display } = onTrigger(groupListElement.current.style.visibility)
        groupListElement.current.style.animation = animation;
        groupListElement.current.style.visibility = visibility;
        groupListElement.current.style.height = height;
        groupListElement.current.style.padding = padding;
        groupListElement.current.style.margin = margin;
        groupAppendElement.current.style.display = display;
    }

    const onGithub = () => {
        window.open('https://github.com/choewy', '_blank');
    }

    useEffect(() => {
        if (groupListElement.current) {
            const { animation, visibility, height, padding, margin, display } = onTrigger(auth === null ? 'visible' : 'hidden');
            groupListElement.current.style.animation = animation;
            groupListElement.current.style.visibility = visibility;
            groupListElement.current.style.height = height;
            groupListElement.current.style.padding = padding;
            groupListElement.current.style.margin = margin;
            groupAppendElement.current.style.display = display;
            console.log('set elements ref');
        }
        fetchGroups();
    }, [fetchGroups, auth])

    const onNewGroup = async (event) => {
        event.preventDefault();
        await googleSheetAppendGroup(auth.uuid, title)
            .then(group => {
                dispatch({ type: 'group_append', group: { ...group, state: "new" } });
                groupListElement.current.scrollTop = groupListElement.current.scrollHeight;
                setTitle('');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {
                    auth === null
                        ? <></>
                        : (<li className="aside-groups" onClick={onGroups}>
                            <div>Todo</div>
                            {trigger}
                        </li>)
                }
                <ul ref={groupListElement} className="aside-group-list">
                    {
                        groups.map((group, index) =>
                            <li key={index}>
                                {
                                    group.state === "done"
                                        ?
                                        <div className="aside-group-item">
                                            <div className="aside-group-checkbox">
                                                <MdDone style={{ color: '#38d9a9' }} />
                                            </div>
                                            <Link to={`/todo/?groupId=${group.id}`} style={{ color: "gray" }}>{group.title}</Link>
                                        </div>
                                        :
                                        <div className="aside-group-item">
                                            <div className="aside-group-checkbox">
                                                <MdDone style={{ color: 'gray' }} />
                                            </div>
                                            <Link to={`/todo/?groupId=${group.id}`}>{group.title}</Link>
                                        </div>
                                }
                            </li>)
                    }
                </ul>
                <form ref={groupAppendElement} className="aside-group-form" onSubmit={onNewGroup}>
                    <input placeholder="새 그룹의 제목을 입력하세요." type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
                    <button type='submit'>
                        <MdKeyboardReturn />
                    </button>
                </form>
                <li><Link to='/about'>About</Link></li>
                <li onClick={onGithub} ><FaGithub /> Github</li>
            </ul>
        </>
    )
}

export default Aside;