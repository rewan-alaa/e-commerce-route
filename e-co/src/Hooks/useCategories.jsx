import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios/unsafe/axios.js'

export default function useCategories() {
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    
      }
      const {data:allCat,isLoading} = useQuery({
        queryKey: 'allCategories',
        queryFn: getAllCategories,
      });
  return {allCat,isLoading}
}
