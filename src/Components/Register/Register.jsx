import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { LineWave } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Register() {
let user={
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
}

const [errorMsg,setErrorMsg]=useState(null);
const [sucessMsg,setsucessMsg]=useState(null);
const [isLoading,setIsLoading]=useState(false);

const navigate=useNavigate();


async function registerNewUser(values){
  setIsLoading(true);
  //calling API
  const {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  .catch(function(error){
    console.log("error occoured",error);
    console.log(error.response.data.message);
    setErrorMsg(error.response.data.message);

  });

  if(data.message==="success"){
  setsucessMsg("Acoount has created successfully");

  setTimeout(function(){
    navigate('/login');
  },1000)
  
setIsLoading(false);

}}


// map form and formik object
const formikObj = useFormik({

    initialValues:user,

    onSubmit:registerNewUser,

    validate:function(values){

      // const phoneRegex=/^(02)?01[0125][0-9]{8}$/;
      setErrorMsg(null);


      const errors={};

      if(values.name.length<4 || values.name.length>10){
        errors.name="Name must be at from 4 characters to 10 characters ";
      }

      if(values.email.includes("@")===false || values.email.includes(".")===false){
        errors.email="Email invalid";
      }

      if(! values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
        errors.phone="phone invalid"
      }

      if(values.password.length < 6 || values.password.length > 12 ){
        errors.password="Password must be at from 6 characters to 12 characters ";
      }

      if(values.rePassword!==values.password){
        errors.rePassword="password and Re password dosen't match";
      }



      return errors;
    }

});




  return <>

      <Helmet>
            <title>Register</title>
        </Helmet>


  <div className="w-75 m-auto py-5">
    {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
    {sucessMsg?<div className="alert alert-success">{sucessMsg}</div>:""}
    
  <h2>Register Now :</h2>

    <form onSubmit={formikObj.handleSubmit}>

        <label htmlFor='name'>Name:</label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' type='text' placeholder='name' className='form-control mb-3'/>
        {formikObj.errors.name && formikObj.touched.name? <div className='alert alert-danger'>{formikObj.errors.name }</div> : ""}



        <label htmlFor='email'>Email:</label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type='text' placeholder='email' className='form-control mb-3'/>
        {formikObj.errors.email && formikObj.touched.email? <div className='alert alert-danger'>{formikObj.errors.email }</div> : ""}



        <label htmlFor='phone'>Phone:</label>
        <input onBlur={formikObj.handleBlur}  onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' type='tel' placeholder='phone' className='form-control mb-3'/>
        {formikObj.errors.phone && formikObj.touched.phone? <div className='alert alert-danger'>{formikObj.errors.phone }</div> : ""}

        <label htmlFor='password'>Password:</label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type='password' placeholder='Password' className='form-control mb-3'/>
        {formikObj.errors.password &&  formikObj.touched.password? <div className='alert alert-danger'>{formikObj.errors.password }</div> : ""}

        <label htmlFor='rePassword'>Re Password:</label>
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword' type='password' placeholder='rePassword' className='form-control mb-3'/>
        {formikObj.errors.rePassword && formikObj.touched.rePassword? <div className='alert alert-danger'>{formikObj.errors.rePassword }</div> : ""}

        <button type='submit' disabled={formikObj.isValid === false || formikObj.dirty===false} className='btn btn-success'>Register

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

       




  
    </form>

  </div>

  
  
  
  
  
  </>
}
