import React from 'react'
import Slider from "react-slick";
import styles from './MainSlider.module.css'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import slide4 from '../../assets/images/grocery-banner.png'
import slide5 from '../../assets/images/grocery-banner-2.jpeg'
import slide6 from '../../assets/images/slider-2.jpeg'
import slide7 from '../../assets/images/banner-4.jpeg'


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return<>
  <div className="container my-5"  >
    <div>
<Slider {...settings} >
  <img className='w-100' src={slide3} height={200}/>
    <img className='w-100' src={slide2} height={200} />
    <img className='w-100' src={slide4} height={200} />
    <img className='w-100' src={slide5} height={200} />
    <img className='w-100' src={slide6} height={200}/>
    <img className='w-100' src={slide7} height={200}/>
    <img className='w-100' src={slide1} height={200} />
   </Slider>
    </div>

  </div>
 
  </>
}
