import {useState} from 'react';
import {LOGIN_USER} from '../../../queries/admin';
import { useMutation} from '@apollo/client';
import { Login } from '../../../scripts/auth/admin';
import { GetApolloErrorText } from '../../../scripts/helper';
import { useRouter } from 'next/router';
import { useAuth } from './authProvider';

const LoginPage = ({SetAuthState}) => {

    const { SaveToken } = useAuth();
    const router = useRouter();

    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [error,SetError] = useState("");

    const [AdminLogin,{loading}] = useMutation(LOGIN_USER,
    {
        onCompleted:(data) => {
            if(!data.adminLogin.adminUser)
            {
                SetError("Zadali jste špatné uživatelské jméno a heslo.");
                setTimeout(() => SetError(""),3000);
            }
            else
            {
                SaveToken(data.adminLogin.loginToken);
                router.push('/ui-admin/blog');
            }
        },						
        onError : (err) => {
            
            SetError(GetApolloErrorText(err));
            setTimeout(() => SetError(""),3000);
        }
    });

    const GoToResetPassword = (e) => {
        e.preventDefault(); 
        SetAuthState("forgot-password")
    }

    return(
        <>
            <div className="form-group">
                <label className="required">Email</label>
                <div>
                    <input type="text" name="email" value={email} onChange={(e) => SetEmail(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
                <label className="required">Heslo</label>
                <div>
                    <input type="password" name="password" value={password} onChange={(e) => SetPassword(e.target.value)} />
                </div>
            </div>
            
            <button onClick={() => Login(AdminLogin,SetError,email,password)} className="btn btn-primary btn-block">Přihlásit</button>

            {error ? 
                <div className="admin-alert danger text-center">{error}</div>
            :null}
            
            {false &&
            <p className="text-center"><a href="#" onClick={(e) => GoToResetPassword(e)}>Zapomenuté heslo</a></p>
            }
        </>
    )
} 

export default LoginPage;