import { Route } from "react-router";
import Archive from "../component/home/‎Archive";

const ArchivePage = () => {
    return (
        <Route exact={true} path="/archive" component={Archive} />
    )
}

export default ArchivePage;