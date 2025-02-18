import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useNavigate } from 'react-router-dom';


export default function Order() {
  const [paymentWay,setPaymentWay] = useState();
  const {cartId,setNumOfCartItems} = useContext(CartContext);
  const navigate = useNavigate();
  console.log(cartId);
  function handelSubmit(values){
    console.log(values);
    if(paymentWay == 'cash'){
      cashOrder(values);
    }else if(paymentWay == 'visa'){
      visaOrder(values);
    }
  }
  async function cashOrder(values){
    console.log('cash')
  try{
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{
        headers:{
          token:localStorage.getItem('token'),
        }
      });
      if(res.data.status == 'success'){
        toast.success('Order Cash Success');
        setNumOfCartItems(0);
        navigate('/');
      }
      console.log(res);
    }catch(err){
      console.log(err)
    }
  }
  async function visaOrder(values){
    console.log("visa order");
    try{
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values,{
        headers:{
          token:localStorage.getItem('token'),
        }
      });
      console.log(res);
      window.open(res.data.session.url,'_blank')
    }catch(err){
      console.log(err);
    }
  }

  const formik = useFormik({
      initialValues: {
       shippingAddress:{
        details:'',
        phone:'',
        city:'',
       }
      },
      onSubmit:handelSubmit,
    });
  return <>
  <form className="max-w-md mx-auto my-3" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group ">
          <input onChange={(e)=>formik.setFieldValue('shippingAddress.details',e.target.value)} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
           <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
          
        </div>
  <div className="relative z-0 w-full mb-5 group">
          <input onChange={(e)=>formik.setFieldValue('shippingAddress.phone',e.target.value)} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
           <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          
        </div>
  <div className="relative z-0 w-full mb-5 group">
          <input onChange={(e)=>formik.setFieldValue('shippingAddress.city',e.target.value)} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
           <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
          
        </div>
  <button onClick={()=>setPaymentWay('cash')} type='submit' className='py-4 px-3 m-4 bg-emerald-500 text-center text-white rounded'>Cash Order</button>
  <button onClick={()=>setPaymentWay('visa')} type='submit' className='py-4 px-3 m-4 bg-emerald-500 text-center text-white rounded'>Visa Order</button>
  </form>
  </>
}
