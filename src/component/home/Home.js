import { useEffect, useState } from "react";
import { googleSheetHomePosts } from "../../util/googlesheets";

const Home = () => {

    const [init, setInit] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchPost = async () => {
            const _posts = await googleSheetHomePosts();
            if (isMounted) {
                setPosts(_posts);
                setInit(true);
            }
        }

        fetchPost();

        return () => {
            isMounted = false;
        }

    }, [init])

    return (
        <div className="home">
            {
                init
                    ? (
                        <>
                            {
                                posts.map((post, index) => (
                                    <div key={index} className="post">
                                        <h1>{post.title}</h1>
                                        <h3>{post.date}</h3>
                                        <pre>{post.content}</pre>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        "로딩 중..."
                    )
            }
        </div>
    )
}

export default Home;