"use client"
import SignUp from '@/components/auth/SignUp'
import React from 'react'
import { SignUpHooks } from './Hooks'

const SignUpContainer = () => {
  const {register, handleSubmit, errors, onSubmit, isLoading: postLoader}=SignUpHooks()
  return (
   <SignUp register={register} handleSubmit={handleSubmit}
    errors={errors} onSubmit={onSubmit} postLoader={postLoader} />
  )
}

export default SignUpContainer
