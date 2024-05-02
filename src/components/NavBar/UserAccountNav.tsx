"use client"
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { User } from '@/payload-types'
import Link from 'next/link'
import { pathName } from '@/routes/routes'
import { useAuth } from '@/hooks/use-auth'

interface UserAccountNavProps {
  user: User | null
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const {signOut}=useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant={'ghost'} size={'sm'} className='relative rounded-full text-muted-foreground'>
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white w-60' align={'end'}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={pathName.seller}>
            Seller Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' onClick={signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAccountNav 