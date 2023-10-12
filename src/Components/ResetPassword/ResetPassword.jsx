import React, {  useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  let navigate=useNavigate();
  const[loading,setLoading]=useState(false);
 async function resetEmail(values){
  setLoading(true);
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values
  
    ).then((response)=>{
      setLoading(false)
       toast.success(response.data.message)
       navigate("/VerfiyCode")
    }
      ).catch((error)=> setLoading(false))}
    let Formik=useFormik({
      initialValues:{
        email:""
      },
      onSubmit:resetEmail
})
    
    return (
      <>
        <div className="container p-3">
      <div className="card shadow rounded-3 col-lg-8  mx-auto  my-auto">
        <div className="card-header p-3 h4">
           Enter Your Email
        </div>
     <form action="" onSubmit={Formik.handleSubmit}>
     <div className="form-group col-8 mx-auto mt-3">
     <label htmlFor="email">Email:</label>
      <input type="email" id="email" className='form-control mb-3 ' value={Formik.values.email} name='email' onChange={Formik.handleChange} onBlur={Formik.onBlur}/>
      </div>
<div className='d-flex align-items-center justify-content-center mx-auto'>
{loading!==true?<button className='btn bg-main m-4 text-center  ' type='submit'>send Code</button>:
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
