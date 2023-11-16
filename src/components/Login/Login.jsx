import React, { useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login({saveUserData}) {
let navigate =useNavigate()
const [isloading, setisloading] = useState(false)
const [messageError, setmessageError] = useState('')

  async function handleLogin(values){
    setisloading(true)
   let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((errr)=>{
    setisloading(false)
    setmessageError(errr.response.data.message);
   })

   if(data.message==="success")
   {
    localStorage.setItem('userToken',data.token);
    saveUserData();
    setisloading(false)
    navigate('/')
   }
    console.log(values);
  }

  let validationSchema = Yup.object({
    email:Yup.string().required("email is required").email("email is invalid"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"Password must start with Uppercase and max length is 10"),
    
  })
  let formik =useFormik({
    initialValues:{
      email:'',
      password:''
      
    },validationSchema,
    onSubmit:handleLogin
  })
  return<>
  <div className="w-75 mx-auto py-4">

    <h3>Login Now:</h3>
    {messageError.length>0 ? <div className="alert alert-danger">{messageError} </div>:null}
   
    
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div>:null}

      <label htmlFor="password">Password:</label>
      <input onBlur={formik.handleBlur} className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password'/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div>:null}

          {isloading? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
       
     
    </form> 
  </div>
  </>
}
