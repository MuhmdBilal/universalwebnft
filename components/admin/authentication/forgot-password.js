import {useState} from 'react';

const ForgotPassword = ({SetAuthState}) => {

    const [email,SetEmail] = useState("");

    const GoToLogin = (e) => {
        e.preventDefault(); 
        SetAuthState("login")
    }

    return(
        <>
            <div className="form-group">
                <label className="required">Email</label>
                <div>
                    <input type="text" name="email" value={email} onChange={(e) => SetEmail(e.target.value)} />
                </div>
            </div>
                        
            <button className="btn btn-primary btn-block">Generate password</button>

            <p className="text-center"><a href="#" onClick={(e) => GoToLogin(e)}>Go to login</a></p>
        </>
    )
} 

export default ForgotPassword;