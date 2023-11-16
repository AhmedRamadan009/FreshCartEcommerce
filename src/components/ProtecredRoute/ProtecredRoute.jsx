import React from 'react'
import styles from './ProtecredRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtecredRoute(props) {
  if (localStorage?.getItem('userToken')==null) {

    return <Navigate to={'/login'}/>
    
  }else{

    return props?.children;
  }
}
