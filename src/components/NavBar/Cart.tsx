import { FC } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Separator } from '../ui/separator'
import { formatPrice } from '@/lib/utils'
import { pathName } from '@/routes/routes'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface CartProps {

}

const Cart: FC<CartProps> = ({ }) => {

    const itemCount = 0

    const fee = 1

    return <Sheet>
        <SheetTrigger className='group -m-2 flex items-center p-2 '>
            <ShoppingCart aria-hidden
                className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ' />
            <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                0
            </span>
        </SheetTrigger>
        <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
            <SheetHeader className='space-y-2.5 pr-6'>
                <SheetTitle>
                    Cart (0)
                </SheetTitle>
            </SheetHeader>
            {
                itemCount > 0 ? (
                    <>
                        <div className='flex w-full flex-col pr-6'>
                            {/* TODO: cart logic */}
                            Cart Items
                        </div>
                        <div className='space-y-4 pr-6'>
                            <Separator />
                            <div className='space-y-1.5 text-sm'>
                                <div className='flex'>
                                    <span className='flex-1'>
                                        Shipping
                                    </span>
                                    <span>
                                        Free
                                    </span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>
                                        Transaction Fee
                                    </span>
                                    <span>
                                        {formatPrice(fee)}
                                    </span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>
                                        Total Fee
                                    </span>
                                    <span>
                                        {formatPrice(fee)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetTrigger asChild>
                                <Link href={pathName.cart} className={buttonVariants({
                                    className: 'w-full'
                                })}>
                                    Continue to checkout
                                </Link>
                            </SheetTrigger>
                        </SheetFooter>
                    </>
                ) : (
                    <div className='flex h-full flex-col items-center justify-center space-y-1 '>
                        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                            <Image
                                src={'/emptyCart.png'}
                                alt='Empty shopping cart image'
                                fill
                            />
                        </div>
                        <div className='text-xl font-semibold'> Your cart is empty</div>
                        <div className='text-sm font-light text-center'>Looks like you have not added anything to your cart. Go ahead & explore top categories.</div>
                        <SheetTrigger asChild>
                            <Link href={pathName.products} className={buttonVariants({
                                variant: 'link',
                                size: 'sm',
                                className: 'text-sm text-muted-foreground'
                            })}>
                            Add items to your cart to checkout
                            </Link>
                        </SheetTrigger>
                    </div>
                )
            }
        </SheetContent>
    </Sheet>
}

export default Cart