
import { Icons } from '@/Icons/Icons'
import { getServerSideUser } from '@/lib/payload-utils'
import { cn } from '@/lib/utils'
import { pathName } from '@/routes/routes'
import { cookies } from 'next/headers'
import Link from 'next/link'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { buttonVariants } from '../ui/button'
import Cart from '../Cart'
import NavItems from './NavItems'
import UserAccountNav from './UserAccountNav'
import { ModeToggle } from './ModeToggle'


const NavBar = async () => {

    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    return <div className={cn('bg-white sticky z-50 top-0 inset-x-60 h-16 dark:bg-background')}>
        <header className={cn('relative bg-white dark:bg-background')}>
            <MaxWidthWrapper>
                <div className={cn('border-b border-gray-200')}>
                    <div className={cn('flex h-16 items-center')}>
                        {/* To do: mobile nav  */}

                        <div className={cn('ml-4 flex lg:ml-0 ')}>
                            <Link href={pathName.landingPage}>
                                <Icons.logo className='h-12 w-12 text-purple-500' />
                            </Link>
                        </div>
                        <div className={cn('hidden z-50 lg:ml-8 lg:block lg:self-stretch')}>
                            <NavItems />
                        </div>
                        <div className='ml-auto flex items-center'>
                            <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                                {user ? null : <Link href={pathName.signIn} className={buttonVariants({ variant: 'ghost' })}>Sign in</Link>}
                                {
                                    user ? null : <span className='h-6 w-px bg-gray-200' aria-hidden />
                                }
                                {user ? <UserAccountNav user={user} /> : (
                                    <Link href={pathName.signUp} className={buttonVariants()}>
                                        Create account
                                    </Link>)}
                                {user ? <span className='h-6 w-px bg-gray-200' aria-hidden /> : null}
                                {user ? null : <div className='flex lg:ml-6'>
                                    <span className='h-6 w-px bg-gray-200' aria-hidden />
                                </div>}

                                <div className="flex gap-5 h-full items-center">
                                    <div className='ml-4 flow-root lg:ml-6 '>
                                        <Cart />
                                    </div>
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    </div>
}

export default NavBar