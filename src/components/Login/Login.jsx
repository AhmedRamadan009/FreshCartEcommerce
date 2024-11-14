import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as  Yup from 'yup' ;
import { UserContext } from '../../Context/UserContext';

export default function Login() {

    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")

    let navigte=useNavigate()


    let {setuserToken}=useContext(UserContext)
    function handleLogin(values){

        setisLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).then(({data})=>{
            console.log(data);

            if(data.message==="success"){
                setisLoading(false)

                localStorage.setItem('userToken',data.token)
                setuserToken(data.token)


                navigte('/')
            }
            
        }).catch(err=>{

                setisLoading(false)
           seterrorMessage(err.response.data.message);
            
        })
        
    }

    let validationSchema=Yup.object({

        
        email:Yup.string().required("email is required").email("email is invaild"),
        password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"password must start with capital letter and max legnth is 10"),
       
    })


    let formik=useFormik({
        initialValues:{

        email:"",
        password:"",
       

        },validationSchema,

        onSubmit:handleLogin

    })
  return (
    <>
    
   <div className="w-75 mx-auto py-4">

    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
        

        
        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='form-control' id='email' name='email' />
        {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>
        
        :null}
        <label htmlFor="password">Password:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className='form-control' id='password' name='password' />
        {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>
        
        :null}
       

        {errorMessage.length>0?<div className="alert alert-danger mt-3">{errorMessage}</div>:null}

        {isLoading?<button className='btn btn-outline-info mt-3'><i className='fas fa-spinner fa-spin text-primary '></i></button>: <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn btn-outline-info mt-3'>Login</button>}
       



    </form>

   </div>
    
    </>
  )
}
