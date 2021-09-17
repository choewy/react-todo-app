import { useCallback, useEffect, useState } from "react";
import { googleSheetHomePosts } from "../../util/googlesheets";

const Home = () => {

    const [init, setInit] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchPost = useCallback(async (isMounted) => {
        const _posts = await googleSheetHomePosts();
        if (isMounted) {
            setPosts(_posts);
            setInit(true);
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        fetchPost(isMounted);

        return () => {
            isMounted = false;
        };

    }, [fetchPost]);

    return (
        <div className="home">

            {
                init
                    ? (
                        <div className="posts">
                            {
                                posts.map((post, index) => (
                                    <div key={index} className="post">
                                        <h1>공지사항</h1>
                                        <div className="post-header">
                                            <h1>{post.title}</h1>
                                            <p>{post.date}</p>
                                        </div>
                                        <pre>{post.content}</pre>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        "로딩 중..."
                    )
            }
        </div>
    )
}

export default Home;