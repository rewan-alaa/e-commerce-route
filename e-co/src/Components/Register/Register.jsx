import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from './../../../node_modules/axios/lib/axios';
import {useNavigate} from 'react-router-dom'


export default function Register() {
  let [successMsg,setSuccessMsg] = useState(null)
  let [msg,setMsg] = useState(null);
  let [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  async function register(values) {
    setSuccessMsg(null)
    setMsg(null)
    setLoading(true)
    try{
      const res =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
      console.log(res);
      setSuccessMsg(res.data.message);
      setTimeout(()=>{navigate('/login')},1000)
    }catch(err){
      setMsg(err.response.data.message);
    }finally{
      setLoading(false)
    }
  }
  // function validate(values) {
  //   let errors = {};
  //   const passwordRegex = /^[A-z0-9_]{6,20}$/;
  //   const phoneRegex = /^01[1250][0-9]{8}$/;

  //   if (values.name.length < 3 || values.name.length > 20) {
  //     errors.name =
  //       "Name must be at least 3 characters long and Max 20 character";
  //   }
  //   if (
  //     values.email.includes("@") == false ||
  //     values.email.includes(".") == false
  //   ) {
  //     errors.email = "Email must be valid";
  //   }
  //   if (passwordRegex.test(values.password) == false) {
  //     errors.password =
  //       "Password must be at least 6 characters long and Max 20 character";
  //   }
  //   if (values.password !== values.rePassword) {
  //     errors.rePassword = "Password must be same";
  //   }
  //   if (phoneRegex.test(values.phone) == false) {
  //     errors.phone = "Phone number must be valid";
  //   }
  //   return errors;
  // }

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3,"min 3 char").max(20,'max 20 char'),
    email: yup.string().email('Email must be valid').required('Email is required'),
    password: yup.string().required('Password is required').matches(/^[A-z0-9_]{6,20}$/,'min is 6 max is 20'),
    rePassword: yup.string().required('rePassword is required').oneOf([yup.ref('password')],'rePassword not matches password'),
    phone: yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'phone must be egyption and valid'),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    // validate: validate,
    validationSchema:validationSchema,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {formik.errors.name && formik.touched.name ? 
            <div
              className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}!</span> Change
              a few things up and try submitting again.
            </div>
           : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}!</span> Change
              a few things up and try submitting again.
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}!</span>{" "}
              Change a few things up and try submitting again.
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}!</span>{" "}
              Change a few things up and try submitting again.
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}!</span> Change
              a few things up and try submitting again.
            </div>
          ) : null}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6"></div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading?'Loading ...':'Submit'}
        </button>
       {msg ? <div>{msg}</div>:null}
       {setSuccessMsg? <div>{successMsg}</div>:null}
      </form>
    </>
  );
}
