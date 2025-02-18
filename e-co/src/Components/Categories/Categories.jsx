import { useQuery } from '@tanstack/react-query';
import axios from 'axios/unsafe/axios.js'
import React from 'react'
import useCategories from '../../Hooks/useCategories';

export default function Categories() {
  const {allCat,isLoading} = useCategories()
  return<>
  <div className="grid grid-cols-3">
    {allCat?.data.data.map((cat)=>{
      return <div key={cat._id}>
        <img src={cat.image} className='w-full h-[400px]' alt="img" />
        <div>{cat.name}</div>
      </div>
    })}
  </div>
  </>
}
