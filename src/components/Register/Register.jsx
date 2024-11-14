import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as  Yup from 'yup' ;

export default function Register() {

    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")

    let navigte=useNavigate()

    function handleRegister(values){

        setisLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).then(({data})=>{
            console.log(data);

            if(data.message==="success"){
                setisLoading(false)

                navigte('/login')
            }
            
        }).catch(err=>{

                setisLoading(false)
           seterrorMessage(err.response.data.message);
            
        })
        
    }

    let validationSchema=Yup.object({

        name:Yup.string().required("name is required").min(3,"min length is 3").max(10,'max length is 10'),
        email:Yup.string().required("email is required").email("email is invaild"),
        password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"password must start with capital letter and max legnth is 10"),
        rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")],"password and re password doesont match"),
        phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,"phone must be egy number")
    })


    let formik=useFormik({
        initialValues:{

        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:""

        },validationSchema,

        onSubmit:handleRegister

    })
  return (
    <>
    
   <div className="w-75 mx-auto py-4">

    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className='form-control' id='name' name='name' />

        {formik.errors.name&&formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>
        
    :null}

        
        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='form-control' id='email' name='email' />
        {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>
        
        :null}
        <label htmlFor="password">Password:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className='form-control' id='password' name='password' />
        {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>
        
        :null}
        <label htmlFor="repassword">RePassword:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" className='form-control' id='repassword' name='rePassword' />
        {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>
        
        :null}
        <label htmlFor="phone">Phone:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" className='form-control' id='phone' name='phone' />
        {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>
        
        :null}


        {errorMessage.length>0?<div className="alert alert-danger mt-3">{errorMessage}</div>:null}

        {isLoading?<button className='btn btn-outline-info mt-3'><i className='fas fa-spinner fa-spin text-primary '></i></button>: <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn btn-outline-info mt-3'>Register</button>}
       



    </form>

   </div>
    
    </>
  )
}
