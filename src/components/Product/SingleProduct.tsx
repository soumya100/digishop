import { pathName } from '@/routes/routes'
import { Check, Shield, Slash } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { getPayloadClient } from '@/get-payload'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSlider from '../ui/ImageSlider'
import ProductReel from './ProductReel'
import AddToCartButton from '../ui/AddToCartButton'

interface SingleProductProps {
    id: string
}

type breadCrumbType = {
    id: number,
    name: string,
    href: string
}
const BREADCRUMBS: breadCrumbType[] = [
    { id: 1, name: 'Home', href: pathName.landingPage },
    { id: 2, name: 'Products', href: pathName.products }
]

const SingleProduct: FC<SingleProductProps> = async ({ id }) => {

    const payload = await getPayloadClient()
    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: id
            },
            approvedForSale: {
                equals: 'approved'
            }
        }
    })
    const [product] = products;


    if (!product) return notFound();

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label

    const validUrls = product?.images.map(({ image }) => (
        typeof image === 'string' ? image : image.url
    )).filter(Boolean) as string[]

    return <MaxWidthWrapper className='bg-white dark:bg-background'>
        <div className='bg-white dark:bg-background'>
            <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* product details */}
                <div className='lg:max-w-lg lg:self-end'>
                    <ol className='flex items-center space-x-2'>
                        {BREADCRUMBS.map((breadcrumb: breadCrumbType, idx) => (
                            <li key={breadcrumb.id}>
                                <div className='flex items-center text-sm '>
                                    <Link href={breadcrumb.href} className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                                        {breadcrumb.name}
                                    </Link>
                                    {idx !== BREADCRUMBS.length - 1 && <Slash fill='currentColor'
                                        className='ml-2 h-4 w-4 flex-shrink-0 text-gray-300'
                                        aria-hidden viewBox='0 0 20 20' />}
                                </div>
                            </li>
                        ))
                        }
                    </ol>
                    <div className="mt-4">
                        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-slate-100'>
                            {product.name}
                        </h1>
                    </div>

                    <section className='mt-4'>
                        <div className='flex items-center'>
                            <p className='font-medium text-gray-900 dark:text-white'>{formatPrice(product.price)}</p>
                            <div className='ml-4 border-l text-muted-foreground  border-gray-300 pl-4'>
                                {label}
                            </div>
                        </div>
                        <div className='mt-4 space-y-6'>
                            <p className="text-base text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center">
                            <Check aria-hidden
                                className='h-5 w-5 flex-shrink-0 text-green-500' />
                            <p className="ml-2 text-sm text-muted-foreground">Eligible for instant delivery</p>
                        </div>
                    </section>
                </div>
                {/* product images */}
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-square rounded-lg">
                        <ImageSlider urls={validUrls} />
                    </div>
                </div>
                {/* add to cart section */}
                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                        <div>
                            <div className="mt-10">
                                <AddToCartButton product={product} />
                            </div>
                            <div className="mt-6 text-center">
                                <div className="group inline-flex text-sm text-medium">
                                    <Shield aria-hidden className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'/>
                                    <span className="text-muted-foreground hover:text-gray-700 capitalize">
                                        30 day return guarantee
                                    </span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <ProductReel href={pathName.products} 
        query={{category: product.category, limit: 4}} 
        title={`Similar ${label}`} subTitle={`Browse similar high quality ${label} just like ${product.name}`}/>
    </MaxWidthWrapper>
}

export default SingleProduct