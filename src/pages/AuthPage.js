import { useAuthState } from "../context/AuthContext";
import { Redirect, Route } from 'react-router-dom';
import Login from "../component/auth/Login";
import Signup from "../component/auth/Signup";
import HelpPassword from "../component/auth/HelpPassword";

const AuthPage = () => {
    const auth = useAuthState();

    return (
        <div className="auth">
            {
                auth !== null
                    ? <Redirect exact={true} to="/" />
                    : (
                        <>
                            <Route path="/auth/login" component={Login} />
                            <Route path="/auth/signup" component={Signup} />
                            <Route path="/auth/help-password" component={HelpPassword} />
                        </>
                    )
            }
        </div>
    )
}

export default AuthPage;