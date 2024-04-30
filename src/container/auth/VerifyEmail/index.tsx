'use client'
import { PageProps } from '@/app/(auth)/verify-email/page'
import VerifyEmail from '@/components/auth/verifyEmail'
import React from 'react'
import { VerifyEmailHooks } from './Hooks'

const VerifyEmailContainer = ({searchParams}: PageProps) => {

  const {getToken,isError, isLoading, data}=VerifyEmailHooks()

  return (
    <VerifyEmail searchParams={searchParams} getToken={getToken} isError={isError} data={data} isLoading={isLoading}/>
  )
}

export default VerifyEmailContainer
