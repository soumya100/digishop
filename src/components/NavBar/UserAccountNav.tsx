"use client"
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { User } from '@/payload-types'
import Link from 'next/link'
import { pathName } from '@/routes/routes'
import { useAuth } from '@/hooks/use-auth'
import { LayoutDashboard, LogOut } from 'lucide-react'

interface UserAccountNavProps {
  user: User | null
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const { signOut } = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant={'ghost'} size={'sm'} className='relative rounded-full text-muted-foreground'>
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-background w-60' align={'end'}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-center">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={pathName.seller} className='px-5'>
            <div className='flex gap-5 w-full'>
              <LayoutDashboard size={'20px'} name='seller dashboard' />
              <p>
                Seller Dashboard
              </p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer px-5' onClick={signOut}>
          <div className='flex gap-5 w-full h-full items-center'>
            <LogOut size={'20px'} name='logout'/>
            <p>
              Log out
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAccountNav 