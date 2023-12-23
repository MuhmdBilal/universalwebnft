import {useState} from 'react';
import AdminLoginLayout from '../layout/adminLogin';
import Login from "../components/admin/authentication/login";
import ForgotPassword from "../components/admin/authentication/forgot-password";

const UiAdmin = () => {

    const [authState, SetAuthState] = useState("login");
    
    return(
        <AdminLoginLayout>
            <div id="auth">
                <div className="auth-panel">
                    <img id="logo" src="/images/logo.webp" />
                    {authState == "login" ?
                        <Login SetAuthState={SetAuthState} />
                    :null}
                    {authState == "forgot-password" ?
                        <ForgotPassword SetAuthState={SetAuthState} />
                    :null}
                </div>
            </div>
        </AdminLoginLayout>
    )
} 

export default UiAdmin;