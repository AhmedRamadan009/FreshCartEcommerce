import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
export default function Cart() {
  let { getLoggedUserCart,removeCartItem,updateCartCount,clearCart ,setnumOfCartItem} = useContext(cartContext)

  const [cartDetails, setcartDetails] = useState(null)
  const [isloading, setisloading] = useState(false)

  async function getCart(productId) {
    setisloading(true)
    let response = await getLoggedUserCart();
    console.log(response);
    if (response?.data?.status === 'success') {
      console.log(response);
      setcartDetails(response.data.data)
      setisloading(false)
    }
  }
  async function deleteItem(productId) {
    
    let response = await removeCartItem(productId);
    toast.error('Product Removed Succesfully',{duration:2000})
    setcartDetails(response.data.data)
    setnumOfCartItem(response.data.numOfCartItems)
    console.log(response);
    
  }
  async function updateProductQuntity(productId,count) {
    
    let response = await updateCartCount(productId,count);
    toast.success('Product qunatity Upadted Succesfully',{duration:2000})
    setcartDetails(response.data.data)
    
    console.log(response);
    
  }
  async function clearUserCart() {
    
    let response = await clearCart();
    toast.success('Cart Cleared Succesfully',{duration:2000})
    setcartDetails(response.data.data)
    setnumOfCartItem(response.data.numOfCartItems)
    console.log(response);
    
  }
  useEffect(() => {

   getCart()
  }, [])
  
  return <>
  {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) :<div className="bg-main-light p-4 my-4">
<h3>Shopping Cart:</h3>

{cartDetails?<>
  <h6 className='text-main'>Total:{cartDetails?.totalCartPrice} EGP</h6>
<button onClick={clearUserCart} className='btn btn-danger'>Clear Cart</button>
</>:null}

{cartDetails?.products?.map((product)=> <div key={product.product._id} className="row border-bottom py-2 my-2 align-items-center">
  <div className="col-md-1">
<img src={product.product.imageCover} alt="item" className="w-100" />
  </div>
  <div className="col-md-11 d-flex justify-content-between">
    <div>
    <h6>{product.product.title}</h6>
    <h6 className='text-main'>price:{product.price}</h6>
    <button onClick={()=>deleteItem(product.product._id)} className='btn m-0 p-0'><i className='fa-regular text-danger fa-trash-can'></i>Remove</button>
    </div>
    
    <div>
      <button onClick={()=>updateProductQuntity(product.product._id,product.count+1)} className='btn border-main btn-sm'>+</button>
      <span className='mx-2'>{product.count}</span>
      <button onClick={()=>updateProductQuntity(product.product._id,product.count-1)} className='btn border-main btn-sm'>-</button>

    </div>
  </div>
</div>

)}
<button className='btn bg-main'>
<Link className='text-white' to={'/checkout'}>
Checkout
</Link>
</button>
  </div>}
  
  </>
}
