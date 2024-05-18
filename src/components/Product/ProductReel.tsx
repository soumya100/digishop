import { FC } from 'react'

interface ProductReelProps {
  title: string
  subTitle?: string
}

const ProductReel: FC<ProductReelProps> = (props) => {

    const {title, subTitle}= props;


  return <section className='py-12'>
    <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            {
                title && <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl dark:text-foreground'>
                    {title}
                </h1>
            }
             {
                subTitle && <p className='mt-2 text-sm text-muted-foreground'>
                    {subTitle}
                </p>
            }
        </div>
    </div>
  </section>
}

export default ProductReel