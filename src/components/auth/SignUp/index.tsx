import { Icons } from '@/Icons/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { TAuthCredentialsValidator } from '@/lib/validators/account-credentials-validator'
import { pathName } from '@/routes/routes'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

interface SignUpProps {
    register: UseFormRegister<{email: string; password: string;}>;
    handleSubmit: UseFormHandleSubmit<{email: string; password: string;}>;
    errors: FieldErrors<{email: string; password: string;}>;
    onSubmit({email, password}: TAuthCredentialsValidator): void
}

const SignUp: FC<SignUpProps> = ({ register, handleSubmit, errors, onSubmit }) => {

    const [isPassword, setIsPassword]=useState<boolean>(true)

    return <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 '>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col items-center space-y-2 text-center'>
                <Icons.logo className='h-20 w-20' />
                <h1 className='text-2xl font-bold'>
                    Create an account
                </h1>

            </div>
            <div className='grid gap-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1 py-2">
                            <Label htmlFor='email'>
                                Email
                            </Label>
                            <Input className={cn({
                                "focus-visible:ring-red-500": errors.email
                            })}
                                placeholder='you@example.com'
                                {...register("email")}

                            />
                        </div>
                        <div className="grid gap-1 py-2 relative">
                            <Label htmlFor='password'>
                                Password
                            </Label>
                            <Input className={cn({
                                "focus-visible:ring-red-500": errors.password
                            })}
                                placeholder='Password'
                                type={isPassword ? 'password' :'text'}
                                {...register("password")}
                            />
                            <div className='absolute right-3 top-9 cursor-pointer' onClick={()=>{setIsPassword(prev=>!prev)}}>
                                {
                                    isPassword ? 
                                    <Eye className='h-5'/> :
                                    <EyeOff className='h-5'/>
                                }
                            </div>
                        </div>
                        <Button>
                            Sign up
                        </Button>

                        <span className='text-muted-foreground flex items-center justify-center flex-wrap'>
                            Already have an account?
                            <Link href={pathName.signIn} className={cn(buttonVariants({ variant: 'link' }), 'ps-2 pe-0 gap-1.5')}>
                                Sign-in
                                <ArrowRight className='h-4 w-4' />
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default SignUp