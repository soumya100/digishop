"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './button'
import { CheckCheck, ShoppingCart } from 'lucide-react';

const AddToCartButton = () => {

    const [isSuccess, setIsSuccess]=useState<boolean>(false);
    useEffect(()=>{
        const timeout= setTimeout(()=>{
            setIsSuccess(false)
        }, 2000)

        return()=> clearTimeout(timeout)
    },[isSuccess])

  return (
    <Button onClick={()=>{
        setIsSuccess(true)
    }} size={'lg'} className='w-full flex gap-5'>
        {isSuccess ? <CheckCheck /> :<ShoppingCart />}
      {isSuccess ? "Added to cart!" : "Add to cart"}
    </Button>
  )
}

export default AddToCartButton
