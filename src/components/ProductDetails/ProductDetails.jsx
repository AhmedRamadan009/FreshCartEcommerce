import React ,{ useContext, useEffect, useState }from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';


export default function ProductDetails() {
  let {  addToCart ,setnumOfCartItem} = useContext(cartContext);
 let {id}= useParams()
 const [product, setproduct] = useState([])
 const [isloading, setisloading] = useState(false)
  async function getProduct() {
    setisloading(true)
  let{data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)

  setproduct(data.data);
  setisloading(false)
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
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

   useEffect(() => {
   getProduct()  
   
   }, [])
  return<>
  
  <div className="container">
    <div className="row my-5 align-items-center justify-content-center ">
      {isloading?<div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>:<>
      
      <div className="col-md-4">
      {product.images && product.images.length > 0 && (
              <Slider {...settings}>
                {product.images.map((img) => <img src={img} key={product._id} className='w-100' />
                  
                )}
              </Slider>
            )} 
      </div>
      <div className="col-md-8">
        <h3>{product.title}</h3>
        <p className='text-muted p-2'>{product.description}</p>
        {product.category && (
                <span className="text-main fw-bold font-sm">{product.category.name}</span>
              )}
        <div className="d-flex justify-content-between">
       
      <span className='text-muted mt-2'>{product.price} EGP</span>
      <span ><i className='fas fa-star rating-color mt-2'></i>{product.ratingsAverage}</span>
    </div>
    <button onClick={()=>{addProductToCart(product._id)}} className=' btn bg-main text-white w-100 mt-3'>Add To Cart</button>
      </div>
      
      </>}
     
    </div>
  
  </div>
  </>
}
