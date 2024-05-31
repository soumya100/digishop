"use client"
import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { cn, formatPrice } from '@/lib/utils';
import { pathName } from '@/routes/routes';
import { CircleCheckBig, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';

interface CheckOutProps {

}

const CheckOut: FC<CheckOutProps> = ({ }) => {

    const { items, removeItem } = useCart();
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const router = useRouter()


    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
    )

    const { mutate: createCheckoutSession, isLoading } = trpc.payment.createSession.useMutation({
        onSuccess: ({ url }) => {
            if (url) router.push(url)
        }
    })

    const productIds=items.map(({product})=> product.id)

    const fee = 1;
    const loader = <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />


    return <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-foreground'>
            Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div className={cn("lg:col-span-7", {
                "rounded-lg border-2 border-dashed border-zinc-200 p-12": items.length === 0,
            })}>
                <h2 className='sr-only'>
                    Items in your shopping cart
                </h2>

                {items.length === 0 && (
                    <div className='flex h-full flex-col items-center justify-center space-y-1'>
                        <div aria-hidden className='relative mb-4 h-40 w-40 text-muted-foreground'>
                            <Image
                                src={'/emptyCart.png'}
                                fill
                                loading='eager'
                                alt='empty shopping cart'
                                priority
                            />
                        </div>
                        <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                        <p className="text-muted-foreground text-center">
                            Oops! Nothing to show here yet.
                        </p>
                    </div>
                )
                }
                <ul className={cn({
                    "divide-y divide-gray-200 border-b border-t border-gray-200": items.length > 0
                })}>
                    {
                        isMounted && items.length > 0 && items.map(({ product }) => {
                            const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label

                            const { image } = product.images[0]

                            return (
                                <li key={product.id} className='flex py-6 sm:py-10'>
                                    <div className="flex-shrink-0">
                                        <div className="relative h-24 w-24">
                                            {typeof image !== 'string' && image.url && <Image src={image.url}
                                                alt={product.name} fill
                                                className='h-full w-full rounded-md object-center sm:h-48 sm:w-48'
                                            />
                                            }
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                                            <div>
                                                <div className='justify-between'>
                                                    <h3 className='text-sm'>
                                                        <Link href={pathName.singleProduct(product.id)}
                                                            className='font-medium text-gray-700 hover:text-gray-800 dark:text-muted-foreground dark:hover:text-foreground'
                                                        >
                                                            {isMounted ? product.name : '--'}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className='mt-1 flex text-sm'>
                                                    <p className="text-muted-foreground">
                                                        {`Category: ${label}`}
                                                    </p>
                                                </div>
                                                <p className='mt-1 text-sm font-medium text-gray-900 dark:text-foreground'>{formatPrice(product.price)}</p>
                                            </div>
                                            <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                                <div className="absolute right-0 top-0">
                                                    <Button aria-label='remove product'
                                                        onClick={() => removeItem(product.id)} variant={'ghost'}>
                                                        <X className='h-5 w-5' aria-hidden />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='mt-4 flex space-x-2 text-sm text-gray-700 dark:text-foreground'>
                                            <CircleCheckBig className='h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-300' />
                                            <span className=''>
                                                Eligible for instant delivery
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:bg-gray-800'>
                <h2 className='text-lg font-medium '>Order summary</h2>
                <div className='mt-6 space-y-4 '>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm text-gray-600 dark:text-muted-foreground'>
                            Subtotal
                        </p>
                        <p className='text-sm font-medium text-gray-900 dark:text-foreground'>
                            {isMounted ?
                                formatPrice(cartTotal) : (
                                    loader
                                )
                            }
                        </p>
                    </div>
                    <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <span>Flat transaction fee</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-foreground">
                            {
                                isMounted ? formatPrice(fee) : loader
                            }
                        </div>
                    </div>
                    <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                        <div className='text-base font-medium text-gray-900 dark:text-foreground '>Order Total</div>
                        <div className="text-base font-medium text-gray-900 dark:text-foreground">
                            {
                                isMounted ? formatPrice(cartTotal + fee) : loader
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                    onClick={()=>createCheckoutSession({productIds})}
                    className='w-full' size={'lg'} disabled={isLoading || items.length === 0}>
                      {isLoading && <Loader2 className='text-zinc-50 animate-spin w-4 h-4 mr-1.5' />}
                      Checkout
                    </Button>
                </div>
            </section>
        </div>
    </div>
}

export default CheckOut