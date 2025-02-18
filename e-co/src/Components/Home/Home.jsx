import axios from 'axios/unsafe/axios.js'
import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import PropagateLoader from './../../../node_modules/react-spinners/esm/PropagateLoader';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider1 from '../../assets/images/slider-image-1.jpeg';
import Slider2 from '../../assets/images/slider-image-2.jpeg';
import blogImg1 from '../../assets/images/blog-img-1.jpeg';
import blogImg2 from '../../assets/images/blog-img-2.jpeg';
import useCategories from '../../Hooks/useCategories';
import { CartContext } from '../../Context/CartContext/CartContext';

export default function Home() {
  const {addToCart} = useContext(CartContext);
  
  async function getAllProducts(){
    
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
   
  }
  async function getAllCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const {data,isLoading} = useQuery({
    queryKey:'allProducts',
    queryFn:getAllProducts,

  });
  
  const allProductsData = data?.data.data;
  useEffect(()=>{
    getAllProducts()
  },[]);
  const {allCat,isLoading:catLoading}= useCategories();
  return <>
 <div className="container mx-auto p-4 m-4">
 <div className="grid grid-cols-6">
  <div className="col-span-4">
    <Swiper slidesPerView={1} loop={true} style={{height:'100%'}}>
      <SwiperSlide>
        <img src={Slider1} className='w-full h-full block' alt="slider1"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src={Slider2} className='w-full h-full block' alt="slider1"/>
      </SwiperSlide>
    </Swiper>
  </div>
  <div className=" col-span-2">
    <img src={blogImg1} className='h-1/2' alt="blog" />
    <img src={blogImg2} className='h-1/2' alt="blog2" />
  </div>
 </div>
 </div>

 <div className="container mx-auto p-4 m-4">
  <p className='text-2xl'>Shop Popular Categories</p>
 <Swiper slidesPerView={6} loop={true}>
      {allCat?.data.data.map((cat)=><SwiperSlide key={cat._id}>
        <img src={cat.image} className='h-[200px] w-full' alt="img" />
        <div>{cat.name}</div>
      </SwiperSlide>)}
 </Swiper>
 </div>

  {isLoading ? <div className='w-full bg-green-400 h-screen flex justify-center items-center'><PropagateLoader/></div>:<div className="container mx-auto p-4 m-3">
  <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {allProductsData.map((prod)=> <ProductCard  product={prod} key = {prod._id}/>)}
  </div>
  </div>}
 
  </>
}
