import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext =createContext()



export function CartContextProvider(props){
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItem] = useState(0)


   async function getCart(){
        let response= await getLoggedUserCart();
        if (response?.data?.status==='success') {
            setnumOfCartItem(response.data.numOfCartItems)
            setcartId(response?.data?.data?._id)
        }
        console.log(response);
    }

useEffect(() => {

  getCart();

}, [])


let headers={token:localStorage.getItem('userToken')}


 function addToCart(ProductId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:ProductId
    },{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}

function getLoggedUserCart(ProductId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function removeCartItem(ProductId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function updateCartCount(ProductId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
    {
        count:count
    },
    {
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function onlinePayment(cartId,shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        shippingAddress:shippingAddress
    }
    ,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function addToWishlist(ProductId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:ProductId
    },{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function getLoggedUserWishlist(ProductId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function removeWishlistItem(ProductId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ProductId}`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}



 return <cartContext.Provider value={{setnumOfCartItem,numOfCartItems,cartId, addToCart ,getLoggedUserCart,removeCartItem,updateCartCount,clearCart,onlinePayment,addToWishlist,getLoggedUserWishlist,removeWishlistItem }}>

        {props.children}
    </cartContext.Provider>
}