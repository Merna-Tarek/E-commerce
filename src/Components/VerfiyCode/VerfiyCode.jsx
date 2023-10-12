import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { Circles } from 'react-loader-spinner';

export default function VerfiyCode() {
  let navigate=useNavigate();
  const[loading,setLoading]=useState(false);
 async function reCode(values){
  setLoading(true);
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values
  
    ).then((response)=>{
      setLoading(false)
       console.log(response);
         toast.success(response.data.status)
        navigate("/GetPassword")
    }
      ).catch((error)=> {setLoading(false)
        toast.error(error.response.data.message)
      })}
    let Formik=useFormik({
      initialValues:{
        resetCode:""
      },
      onSubmit:reCode
})
    
    return (
      <>
        <div className="container p-3">
      <div className="card shadow rounded-3 col-lg-8  mx-auto  my-auto">
        <div className="card-header p-3 h4">
           Enter Your Password Reset Code
        </div>
     <form action="" onSubmit={Formik.handleSubmit}>
     <div className="form-group col-8 mx-auto mt-3">
     <label htmlFor="Code">Code:</label>
      <input type="text" id="Code" className='form-control mb-3 ' value={Formik.values.resetCode} name='resetCode' onChange={Formik.handleChange} onBlur={Formik.onBlur}/>
      </div>
<div className='d-flex align-items-center justify-content-center mx-auto'>
{loading!==true?<button className='btn bg-main m-4 text-center col-3 ' type='submit'>VerfiyCode</button>:
       <button className='btn bg-main m-4 text-center  ' type='submit'>  <Circles
       height="20"
       width="50"
       color="#fff"
       ariaLabel="circles-loading"
       wrapperStyle={{}}
       wrapperClass=""
       visible={true}
     /></button>}
     <Link  to="/ResetPassword" style={{"textDecoration":"underline"}} >Send code agin?</Link>
       
</div>
     </form>
     </div>
     </div>
      </>
    )
}
