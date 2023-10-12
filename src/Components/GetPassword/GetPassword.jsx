import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

export default function GetPassword() {
  let navigate=useNavigate();
  const[loading,setLoading]=useState(false);
 async function reCode(values){
  setLoading(true);
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values
  
    ).then((response)=>{
      setLoading(false)
       console.log(response);
         toast.success(response.statusText)
        navigate("/login")
    }
      ).catch((error)=> {setLoading(false)
        toast.error(error.response.data.message)
      })}
    let Formik=useFormik({
      initialValues:{
        email:"",
        newPassword:""
      },
      onSubmit:reCode
})
  return (
    <>
    <div className="container p-3">
  <div className="card shadow rounded-3 col-lg-8  mx-auto  my-auto">
    <div className="card-header p-3 h4">
       Enter Your Email and NewPassword
    </div>
 <form action="" onSubmit={Formik.handleSubmit}>
 <div className="form-group col-8 mx-auto mt-3">
 <label htmlFor="email">Email:</label>
      <input type="email" id="email" className='form-control mb-3 ' value={Formik.values.email} name='email' onChange={Formik.handleChange} onBlur={Formik.onBlur}/>
  </div>
  <div className="form-group col-8 mx-auto mt-3">
 <label htmlFor="RePassword">newPassword:</label>
      <input type="password" id="RePassword" className='form-control mb-3 ' value={Formik.values.newPassword} name='newPassword' onChange={Formik.handleChange} onBlur={Formik.onBlur}/>
  </div>

<div className='d-flex align-items-center justify-content-center mx-auto'>
{loading!==true?<button className='btn bg-main m-4 text-center col-3 ' type='submit'>Reset Password</button>:
   <button className='btn bg-main m-4 text-center  ' type='submit'>  <Circles
   height="20"
   width="50"
   color="#fff"
   ariaLabel="circles-loading"
   wrapperStyle={{}}
   wrapperClass=""
   visible={true}
 /></button>}

   
</div>
 </form>
 </div>
 </div>
  </>
)
  
}
