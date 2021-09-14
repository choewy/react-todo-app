import { Route } from "react-router";
import Home from "../component/home/Home";

const HomePage = () => {
    return (
        <Route exact={true} path="/" component={Home} />
    )
}

export default HomePage;