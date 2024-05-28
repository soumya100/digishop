import { buttonVariants } from '@/components/ui/button'
import { pathName } from '@/routes/routes'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface EmailVerificationProps {
  isError: boolean
  data: {
    success: boolean,

  } | undefined
  isLoading: boolean
}

const EmailVerification: FC<EmailVerificationProps> = ({ isError, data, isLoading }) => {

  if (isError) {
    return <div className='flex flex-col items-center gap-2'>
      <XCircle className='h-8 w-8 text-red-600' />
      <h3 className='font-semibold text-xl'>
        There was a problem
      </h3>
      <p className='text-muted-foreground text-sm'>
        This token is not valid or might be expired.
        Please try again.
      </p>
    </div>
  }

  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src={'/verifyEmail/digishop-sent-email.png'} alt={'digishop email was sent'} fill />
        </div>
        <h3 className='font-semibold text-2xl'>
          You&apos;re all set!
        </h3>
        <p className='text-muted-foreground text-center mt-1'>
          Thank you for verifying your email.
        </p>
        <Link href={pathName.signIn} className={buttonVariants({
          className: 'mt-4'
        })}>
          Sign in
        </Link>
      </div>
    )
  }
if (isLoading) {
  return <div className='flex flex-col items-center gap-2'>
    <Loader2 className='animate-spin h-8 w-8 text-purple-500' />
    <h3 className='font-semibold text-xl'>
      Verifying...
    </h3>
    <p className='text-muted-foreground text-sm'>
      This wont&apos; take long.
    </p>
  </div>

}

}


export default EmailVerification