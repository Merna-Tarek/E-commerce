import React, { useContext } from 'react'
import { authcontext } from '../../context/authrntication'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {

   const {token} =useContext(authcontext);

   if(token===null){

    return <Navigate to="/login"/>
    // return <Login/>
   }
    



  return <>
  {children}
  </>
}
