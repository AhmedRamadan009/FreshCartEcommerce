import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import ProdctedRoute from './components/ProtecredRoute/ProtecredRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Logout from './components/Logout/Logout';
import Brands from './components/Brands/Brands';
import CheckOut from './components/CheckOut/CheckOut';
import NotFound from './components/NotFound/NotFound';
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { CartContextProvider, cartContext } from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Offline } from "react-detect-offline";
import Wishlist from './components/Wishlist/Wishlist';
import AllOrders from './components/AllOrders/AllOrders';
import OrderDetails from './components/OrderDetails/OrderDetails';



function App() {
  const [userData, setuserData] = useState(null)

  let cart=useContext(cartContext)

useEffect(() => {
  
saveUserData();

}, [])

  // function saveUserData(){
  //   let encodedToken=localStorage.getItem('userToken');
  //   let decodedToken = jwtDecode(encodedToken);
  //   setuserData(decodedToken)
  //   console.log(decodedToken);
  // }
  
  function saveUserData() {
    const encodedToken = localStorage.getItem('userToken');
  
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        // Check token expiration here if needed
        // const isTokenExpired = decodedToken.exp < Date.now() / 1000;
  
        setuserData(decodedToken);
      } catch (error) {
        // Handle token decode error
        console.error('Token decode error:', error);
        localStorage.removeItem('userToken'); // Remove invalid token
        return <Navigate to={'/login'}/> // Redirect to login page
      }
    } else {
      // No token found, set user data to null
      setuserData(null);
    }
  }
  

  
  function logout(){
    localStorage.removeItem('userToken')
    setuserData(null)
    return <Navigate to={'/login'}/>
  }
  
  let routers=createHashRouter([
{path:'',element:<Layout  logout={logout} userData={userData}/>,children:[
  { index:true,element:<ProdctedRoute><Home/></ProdctedRoute>},
  { path:'products',element:<ProdctedRoute><Products/></ProdctedRoute>},
  { path:'product-details/:id',element:<ProdctedRoute><ProductDetails/></ProdctedRoute>},
  { path:'cart',element:<ProdctedRoute><Cart/></ProdctedRoute>},
  { path:'wishlist',element:<ProdctedRoute><Wishlist/></ProdctedRoute>},
  { path:'categories',element:<ProdctedRoute><Categories/></ProdctedRoute>},
  { path:'brands',element:<ProdctedRoute><Brands/></ProdctedRoute>},
  { path:'checkout',element:<ProdctedRoute><CheckOut/></ProdctedRoute>},
  { path:'login',element:<Login saveUserData={saveUserData}/>},
  { path:'register',element:<Register/>},
  { path: 'allorders', element: <AllOrders /> },
  { path: 'allorders/orderDetails/:id', element: <OrderDetails /> },
  { path:'logout',element:<Logout/>},
  { path: '*', element: <NotFound /> }

]}

  ]);
  return <CartContextProvider>
   
    <Offline> <div className='network'>Only shown offline (surprise!)</div> </Offline>
    <Toaster/>
    <RouterProvider router={routers}></RouterProvider>

  </CartContextProvider>
  
}

export default App;
