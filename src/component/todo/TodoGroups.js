import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuthState } from "../../context/AuthContext";
import { useTodoDispatch, useTodoState } from "../../context/TodoContext";
import { googleSheetGroup } from "../../util/googlesheets";

const TodoGroups = () => {

    const [init, setInit] = useState(false);
    const auth = useAuthState();
    const groups = useTodoState();
    const dispatch = useTodoDispatch();

    const fetchGroups = useCallback(async (isMounted, uuid) => {
        if (isMounted) {
            const _groups = await googleSheetGroup(uuid);
            dispatch({ type: "get", groups: _groups });
            setInit(true);
        };
    }, [dispatch]);

    useEffect(() => {
        let isMounted = true;

        fetchGroups(isMounted, auth.uuid);

        return () => {
            isMounted = false;
        }

    }, [fetchGroups, auth]);

    return (
        !init
            ? <div className="loading">불러오는 중...</div>
            : <div className="groups">
                <div className="groups-part">
                    <div className="groups-header">
                        진행 중인 그룹
                    </div>
                    <div className="groups-list">
                        {
                            groups.ing.map((group, index) =>
                                <div key={index} className="group">
                                    <Link to={`/todo/?option=ing&groupId=${group.id}`}>{group.title}</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="groups-part">
                    <div className="groups-header">
                        완료된 그룹
                    </div>
                    <div className="groups-list">
                        {
                            groups.done.map((group, index) =>
                                <div key={index} className="group">
                                    <Link to={`/todo/?option=done&groupId=${group.id}`}>{group.title}</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div></div>
            </div>
    )
}

export default TodoGroups;