import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PropagateLoader from './../../../node_modules/react-spinners/esm/PropagateLoader';
import { CartContext } from './../../Context/CartContext/CartContext';

export default function ProductDetails() {
  const {addToCart} = useContext(CartContext);
    let [details,setDetails] = useState();
    const x = useParams();
    async function getProductDetails(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`);
    }
    const { data, isLoading } = useQuery({
        queryKey: ['details', x.id], 
        queryFn: getProductDetails,
        cacheTime: 0,
      });
    const detailsProduct = data?.data.data;
    
  return <>
   
  {isLoading ? <div className='w-full bg-green-400 h-screen flex justify-center items-center'><PropagateLoader/></div>:<div className="grid grid-cols-6 container mx-auto p-4 m-4">
    <div className="col-span-2">
        <img src={detailsProduct?.imageCover} alt="" />
    </div>
    <div className="col-span-4 flex flex-col justify-center ms-3">
        <h2 className='font-semibold mb-2 text-xl'>{detailsProduct?.title}</h2>
        <p>{detailsProduct?.description}</p>
        <span className='text-red-500 font-semibold text-xl'>{detailsProduct?.price}$</span>
        <button 
  onClick={() => addToCart(detailsProduct?._id)} 
  className="bg-green-500 w-full rounded blocky-3 text-white my-3 p-3"
>
  Add To Cart
</button>    </div>
  </div>}
  </> 
}
