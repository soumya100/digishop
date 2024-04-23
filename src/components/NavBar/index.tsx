
import { cn } from '@/lib/utils'
import { FC } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Link from 'next/link'
import { pathName } from '@/utils/routes'
import { Icons } from '@/Icons/Icons'
import NavItems from './NavItems'

interface NavBarProps {
    handleOpen(idx: number): void
    isOpen(idx: number): boolean
    isAnyOpen: boolean
    handleClose(): void
}

const NavBar: FC<NavBarProps> = ({ handleOpen, isOpen, isAnyOpen, handleClose }) => {
    return <div className={cn('bg-white sticky z-50 top-0 inset-x-60 h-16')}>
        <header className={cn('relative bg-white')}>
            <MaxWidthWrapper>
                <div className={cn('border-b border-gray-200')}>
                    <div className={cn('flex h-16 items-center')}>
                        {/* To do: mobile nav  */}

                        <div className={cn('ml-4 flex lg:ml-0 ')}>
                            <Link href={pathName.landingPage}>
                                <Icons.logo className='h-12 w-12 text-purple-500'/>
                            </Link>
                        </div>
                        <div className={cn('hidden z-50 lg:ml-8 lg:block lg:self-stretch')}>
                            <NavItems handleOpen={handleOpen} isOpen={isOpen} 
                            isAnyOpen={isAnyOpen} handleClose={handleClose}/>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    </div>
}

export default NavBar