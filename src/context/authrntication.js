import { createContext, useEffect, useState } from "react";

export const authcontext=createContext()



export function AuthProvider({children}){

    const [token,setToken]=useState(null);

    //component DidMount.
    useEffect(function(){
        if(localStorage.getItem('tkn')!==null)
        {
            setToken(localStorage.getItem('tkn'));
        }
    },[])

return<authcontext.Provider value={ {token , setToken} }>

{children}

</authcontext.Provider>

}