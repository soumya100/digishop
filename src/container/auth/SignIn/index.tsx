'use client'
import SignIn from '@/components/auth/SignIn'
import React from 'react'
import { SignInHooks } from './Hooks'

const SignInContainer = () => {

    const {errors, handleSubmit, isLoading, onSubmit, register, isSeller, handleContinueAsBuyer, handleContinueAsSeller}=SignInHooks()
  return (
    <SignIn errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} 
     postLoader={isLoading} register={register} isSeller={isSeller}
     handleContinueAsBuyer={handleContinueAsBuyer} handleContinueAsSeller={handleContinueAsSeller}
     />
  )
}

export default SignInContainer
