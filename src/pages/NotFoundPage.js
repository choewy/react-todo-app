import { Route } from "react-router";
import NotFound from "../component/home/NotFound";

const NotFoundPage = () => {
    return (
        <Route path='/' component={NotFound} />
    )
}

export default NotFoundPage;