import React, {useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Categories() {
  const [category, setcategory] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getcategoires() {
    setisloading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setcategory(data.data);
    setisloading(false)
  }

  useEffect(() => {
    getcategoires()
  }, [])

  return (
    <div className="row">
      {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <>
          {category?.map((cat) => (
            <div key={cat._id} className="col-md-3">
              <div className="product cursor-pointer px-2 py-3">
                
                  <img className='w-100 mb-2' height={400} src={cat?.image} />
                  <div className="text-center">

                  <h3 className='text-main fw-bold font-sm'>{cat?.name}</h3>
                  
                  </div>
                  
               
             
              </div>
            </div>
          ))}
        </>
        
      )}
      
    </div>
    
  )
}

