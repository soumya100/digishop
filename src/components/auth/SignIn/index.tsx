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

interface SignInProps {
    register: UseFormRegister<{ email: string; password: string; }>;
    handleSubmit: UseFormHandleSubmit<{ email: string; password: string; }>;
    errors: FieldErrors<{ email: string; password: string; }>;
    onSubmit({ email, password }: TAuthCredentialsValidator): void
    handleContinueAsBuyer(): void
    handleContinueAsSeller(): void
    postLoader: boolean
    isSeller: boolean
}

const SignIn: FC<SignInProps> = ({ register, handleSubmit, errors, onSubmit, isSeller,
    handleContinueAsBuyer, handleContinueAsSeller, postLoader }) => {

    const [isPassword, setIsPassword] = useState<boolean>(true)


    return <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 '>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col items-center space-y-2 text-center'>
                <Icons.logo className='h-20 w-20' />
                <h1 className='text-2xl font-bold'>
                    {`Sign in to your ${isSeller ? 'seller' : ''} account`}
                </h1>
                <Link href={pathName.signUp} className={cn(buttonVariants({ variant: 'link' }), 'ps-2 pe-0 gap-1.5 items-center')}>
                    Don&apos;t have an account? Sign-up
                    <ArrowRight className='h-4 w-4' />
                </Link>
            </div>
            <div className='grid gap-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-2 py-2">
                            <Label htmlFor='email'>
                                Email
                            </Label>
                            <div className='w-full'>
                                <Input className={cn({
                                    "focus-visible:ring-red-500 ring-inset": errors.email
                                })}
                                    placeholder='you@example.com'
                                    {...register("email")}

                                />
                                {errors?.email && (
                                    <small className='text-sm text-red-500'>{errors.email.message}</small>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2 py-2">
                            <Label htmlFor='password'>
                                Password
                            </Label>
                            <div className='flex items-center relative'>
                                <Input className={cn({
                                    "focus-visible:ring-red-500 ring-inset": errors.password
                                })}
                                    placeholder='Password'
                                    type={isPassword ? 'password' : 'text'}
                                    {...register("password")}
                                />
                                <div className={cn({
                                    "absolute right-2 cursor-pointer": !errors?.email?.message,
                                    "absolute right-2 top-3 cursor-pointer": errors?.email?.message
                                },)} onClick={() => { setIsPassword(prev => !prev) }}>
                                    {
                                        isPassword ?
                                            <Eye className='h-5' /> :
                                            <EyeOff className='h-5' />
                                    }
                                </div>
                            </div>
                            {errors?.password && (
                                <small className='text-sm text-red-500'>
                                    {errors.password.message}
                                </small>
                            )}
                        </div>
                        <Button>
                            Sign in
                        </Button>
                    </div>
                </form>

                <div className="relative">
                    <div aria-hidden className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>
                {
                    isSeller ? (
                        <Button variant={'secondary'} onClick={handleContinueAsBuyer} disabled={postLoader}>
                            Continue as customer
                        </Button>
                    ) : (
                        <Button variant={'secondary'} onClick={handleContinueAsSeller} disabled={postLoader}>
                            Continue as Seller
                        </Button>
                    )
                }
            </div>
        </div>
    </div>
}

export default SignIn