import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {
  const [categories, setcategories] = useState([])
  const [isloading, setisloading] = useState(false)
  async function getcategories() {
    setisloading(true)
  let{data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)

  setcategories(data.data);
  setisloading(false)
   }

   useEffect(() => {
   getcategories()  
   
   }, [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  return<>
  {isloading?<div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>:<Slider {...settings}>
    {categories.map((category)=><div key={category._id}>
      <img className='w-100' height={200} src={category.image}/>
      <h2 className='h6 pt-2'>{category.name}</h2>
    </div>)}
   </Slider>}
   
  </>
}
