import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="error404">
            <h1>📌 404 : Page Not Found</h1>
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
            <p>잘못된 요청이거나, 삭제된 페이지가 존재합니다.</p>
            <Link to="/">{`< 홈으로 >`}</Link>
        </div>
    )
}

export default NotFoundPage;