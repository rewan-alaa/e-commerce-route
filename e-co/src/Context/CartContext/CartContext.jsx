import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from './../../../node_modules/react-hot-toast/src/index';



export const CartContext = createContext()
export default function CartContextProvider({children}) {
    const [numOfCartItems,setNumOfCartItems] = useState();
    const [allCartItems, setAllCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState();
    const [cartId,setCartId] = useState();
    async function addToCart(productId){
        try{
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
                headers:{
                    token:localStorage.getItem('token')
                }
            });
            console.log(res);
            if(res.data.status == 'success'){
                toast.success('Successfully Added!');
                setNumOfCartItems(res.data.numOfCartItems);
            }
        }catch(err){
            console.log(err);
            toast.error('Something Went Wrong')
        }
    }
    async function getCartItems(){
        try{
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
                    token:localStorage.getItem('token'),
                }
            });
            console.log(res);
            if(res.data.status == 'success'){
                setAllCartItems(res.data.data.products);
                setNumOfCartItems(res.data.numOfCartItems);
                setTotalPrice(res.data.data.totalCartPrice);
                setCartId(res.data.cartId);
                }               
        }catch(err){
            console.log(err);
        }
    }
    async function updateItemCount(id,count){
     try{
        const res= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
            headers:{
                token:localStorage.getItem('token')
                }
        });
        if(res.data.status == 'success'){
            setAllCartItems(res.data.data.products);
            setTotalPrice(res.data.data.totalCartPrice)
        }
     }catch(err){
        console.log(err);
     }
    }
    async function deleteCartItem(id){
        try{
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers:{
                    token:localStorage.getItem('token'),
                }
            });
            if(res.data.status == 'success'){
                setAllCartItems(res.data.data.products);
                setTotalPrice(res.data.data.totalCartPrice);
            }
        }catch(err){
            console.log(err);
        }
    }
  return <CartContext.Provider value={{addToCart,numOfCartItems,getCartItems,allCartItems,updateItemCount,totalPrice,deleteCartItem,cartId,setNumOfCartItems}}> {children} </CartContext.Provider>
}
