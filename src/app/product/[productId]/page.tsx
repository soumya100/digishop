import SingleProduct from '@/components/Product/SingleProduct'
import { FC } from 'react'

interface pageProps {
  params: {
    productId: string
  }
}

const page: FC<pageProps> = ({params}) => {
  return <SingleProduct id={params.productId} />
}

export default page