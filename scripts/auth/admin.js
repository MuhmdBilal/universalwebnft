import { ValidateEmail } from "../helper";

export const Login = (AdminLogin,SetError,email,password) => {
	  	  
    if(password !== '' && email !== '')
    {
        if(ValidateEmail(email))
        {
            AdminLogin({variables:{email,password}});  
        }
        else
        {
            SetError("Email není ve správném tvaru");
            setTimeout(() => SetError(""),3000);
        }
    }
    else
    {
        SetError("Nevyplnili jste email nebo heslo.");
        setTimeout(() => SetError(""),3000);
    }

}