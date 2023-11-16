import React, { useContext } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';

export default function CheckOut() {
let {onlinePayment,cartId}=useContext(cartContext)


  async function handleSubmit(values){
let response= await onlinePayment(cartId,values);

    if (response?.data?.status==='success') {

      window.location.href = response.data.session.url
      
    }
  }
  let formik =useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
      
    },onSubmit:handleSubmit
  })
  return<>


      <div className="w-50 mx-auto py-5">
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details">Details:</label>
      <input className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.details} type="text" name='details' id='details'/>
      <label htmlFor="details">Phone:</label>
      <input className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone'/>
      <label htmlFor="details">City:</label>
      <input className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.city} type="text" name='city' id='city'/>
        
        <button className='btn border-main w-100' type='submit'>Pay</button>
</form>
      </div>
     
  </>
}
