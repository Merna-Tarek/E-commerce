import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { LineWave } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from '../../context/authrntication';
import { Helmet } from 'react-helmet';


export default function Login() {

  const {setToken}=useContext(authcontext)

let user={
    email:"",
    password:""
}

const [errorMsg,setErrorMsg]=useState(null);
const [sucessMsg,setsucessMsg]=useState(null);
const [isLoading,setIsLoading]=useState(false);

const navigate=useNavigate();


async function loginToAcoount(values){
  setIsLoading(true);
  //calling API
  const {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
  .catch(function(error){
    console.log("error occoured",error);
    console.log(error.response.data.message);
    setErrorMsg(error.response.data.message);

  });

  if(data.message==="success"){


    localStorage.setItem("tkn",data.token);
    setToken(data.token);
    setsucessMsg("Welcome back");

  setTimeout(function(){
    navigate('/products');
  },1000)
  
setIsLoading(false);

}}


// map form and formik object
const formikObj = useFormik({

    initialValues:user,

    onSubmit:loginToAcoount,

    validate:function(values){

      // const phoneRegex=/^(02)?01[0125][0-9]{8}$/;
      setErrorMsg(null);


      const errors={};


      if(values.email.includes("@")===false || values.email.includes(".")===false){
        errors.email="Email invalid";
      }

      if(values.password.length < 6 || values.password.length > 12 ){
        errors.password="Password must be at from 6 characters to 12 characters ";
      }



      return errors;
    }

});




  return <>
        <Helmet>
            <title>Login</title>
        </Helmet>
  <div className="w-75 m-auto py-5">
    {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
    {sucessMsg?<div className="alert alert-success">{sucessMsg}</div>:""}
    
  <h2>Login :</h2>

    <form onSubmit={formikObj.handleSubmit}>

        <label htmlFor='email'>Email:</label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type='text' placeholder='email' className='form-control mb-3'/>
        {formikObj.errors.email && formikObj.touched.email? <div className='alert alert-danger'>{formikObj.errors.email }</div> : ""}


        <label htmlFor='password'>Password:</label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type='password' placeholder='Password' className='form-control mb-3'/>
        {formikObj.errors.password &&  formikObj.touched.password? <div className='alert alert-danger'>{formikObj.errors.password }</div> : ""}

        

        <button type='submit' disabled={formikObj.isValid === false || formikObj.dirty===false} className='btn btn-success'>Login
         


        {isLoading?<LineWave
  height="50"
  width="50"
  color="#4fa94d"
  ariaLabel="line-wave"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>:""}

        
        
        </button>

        <Link className='  text-success float-end mt-3 ' to='/ResetPassword' >Forget Password?</Link>




  
    </form>

  </div>

  
  
  
  
  
  </>
}
