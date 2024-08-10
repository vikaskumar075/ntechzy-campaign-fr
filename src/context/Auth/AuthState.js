import React , { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) =>{
    const [location, setLocation] = useState("");

    return (
        <AuthContext.Provider value={{location, setLocation}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState