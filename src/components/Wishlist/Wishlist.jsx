import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'
import styles from './Wishlist.module.css'



export default function Wishlist() {
  let { getLoggedUserWishlist,addToCart,setnumOfCartItem,removeWishlistItem } = useContext(cartContext);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getWishlist(productId) {
    setIsLoading(true);
    let response = await getLoggedUserWishlist();
    console.log("Response:", response);

    if (response?.data?.status === 'success') {
      console.log("Wishlist data:", response.data);
      setWishlistDetails(response.data); // Assuming wishlist data is in response.data.data
      setIsLoading(false);
    }
  }

  async function addProductToCart(productId) {
    
    let response = await addToCart(productId);
    console.log(response);
    if (response?.data?.status === 'success') {
      setnumOfCartItem(response.data.numOfCartItems)
      toast.success(response.data.message,{duration:2000})
    }else{
      toast.error(response.data.message,{duration:2000})

    }
  }
  async function deleteWishlistItem(productId) {
    
    let response = await removeWishlistItem(productId);
    toast.error('Product Removed Succesfully',{duration:2000})
    setWishlistDetails(response.data)
    console.log(response);
    
  }

  useEffect(() => {
    getWishlist();
  }, []);

  

  return (
    <>
      {isLoading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <div className="bg-main-light p-4 my-4">
          <h3 className='text-center'> My Wishlist <i className='fa-solid fa-heart'></i></h3>

         

          {wishlistDetails?.data?.map((product) => (
            <div key={product._id} className="row border-bottom py-2 my-2 align-items-center">
              <div className="col-md-1 ">
                <img src={product?.imageCover} alt="item" className="w-100" />
              </div>
              <div className="col-md-11 d-flex justify-content-between  ">
                  <div>
                  <h4> <span className='text-main'>Name: </span>{product.title}</h4>
                  <h5> <span className='text-main'>Category: </span>{product?.category?.slug}</h5>
                  <h6> <span className='text-main'>Brand: </span>{product?.brand?.slug}</h6>

                  <h6 className='text-main'>price:{product.price}</h6>
                  <button onClick={()=>deleteWishlistItem(product._id)} className='btn m-0 p-0'><i className='fa-regular text-danger fa-trash-can'></i>Remove</button>
                  </div>

                  <div className="div">
                  <button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100 mx-1'>Add To Cart</button>
                  </div>
            </div>
            </div>
          ))}

        
        </div>
      )}
    </>
  );
}
