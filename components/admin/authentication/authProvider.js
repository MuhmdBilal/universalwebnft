import React, { useState, useContext, createContext, useEffect } from 'react';

const authContext = createContext();

export const AuthProvider = ({children}) => {

    const auth = useProviderAuth();

    return(
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}

const useProviderAuth = () => {

    const [token,SetToken]     = useState(null);
    const [loading,SetLoading] = useState(true);

    useEffect(() => {
        var t = localStorage.getItem("uitoken");
        if(!t) t = null;
        SetToken(t);
        SetLoading(false);
    },[])

    const SaveToken = (token) => {
        localStorage.setItem("uitoken",token);
        SetToken(token);
    }

    const Logout = () => {
        localStorage.removeItem("uitoken");
        SetToken(null);
        
    }

    const IsSignedIn = () => {
        return !!token;
    }

    return {
        loading,
        token,
        SaveToken,
        IsSignedIn,
        Logout
    }

}