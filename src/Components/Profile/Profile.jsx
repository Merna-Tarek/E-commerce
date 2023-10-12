import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';



export default function Profile() {

  const[name,setName]=useState(null);
  
useEffect(()=>{

  const x=jwtDecode(localStorage.getItem('tkn'))

  setName(x.name)

},[])

if(name===null){
  <h1>Loading...</h1>
}

  return <>

        <Helmet>
            <title>Profile</title>
        </Helmet>

  <div className="container">

    <h1>Hello {name}</h1>

  </div>

  </>
}
