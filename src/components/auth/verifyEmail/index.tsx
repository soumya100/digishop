import { PageProps } from '@/app/(auth)/verify-email/page'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import EmailVerification from './EmailVerification'

interface VerifyEmail extends PageProps {
  getToken(token: string): void
  isError: boolean
  data:{
    success: boolean,

  } | undefined
  isLoading: boolean
}

const VerifyEmail: FC<VerifyEmail> = ({ searchParams, getToken, isError, data, isLoading }) => {

  const token = searchParams.token
  const toEmail = searchParams.to

  useEffect(() => {
    token && typeof token === 'string' && getToken(token)
  }, [token])


  return <div className='container relative flex pt-20 flex-col items-center justofy-center px-0'>
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      {
        token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            <EmailVerification isError={isError} data={data} isLoading={isLoading}/>
          </div>
        )
          : (
            <div className='flex h-full flex-col items-center justify-center space-y-1'>
              <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                <Image
                  src='/verifyEmail/digishop-sent-email.png'
                  alt='digiShop sent email'
                  fill
                />
              </div>
              <h3 className='font-semibold text-2xl'>
                Check your email
              </h3>
              {
                toEmail ? <p className='text-muted-foreground text-center'>
                  We&apos;ve sent a verification link to&nbsp;<span className='font-semibold'>
                    {toEmail}
                  </span>.
                </p> :
                  <p className='text-muted-foreground text-center'>We&apos;ve sent a verification link to your email.</p>
              }
            </div>
          )
      }
    </div>
  </div>
}

export default VerifyEmail