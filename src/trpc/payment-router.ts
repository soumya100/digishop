import { z } from 'zod'
import {
  privateProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { stripe } from '../lib/stripe'
import type Stripe from 'stripe'
import type { Product, Order } from '@/payload-types'

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx
      const { productIds } = input

      if (productIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      const payload = await getPayloadClient()

      const { docs: rawProducts } = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          },
        },
      })

      const products = rawProducts as unknown as Product[]

      const filteredProducts = products.filter((prod) =>
        Boolean(prod.priceId)
      )

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products: filteredProducts.map((prod) => prod.id),
          user: user.id,
        },
      })

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

      filteredProducts.forEach((product) => {
        line_items.push({
          price: product.priceId!,
          quantity: 1,
        })
      })

      line_items.push({
        price: 'price_1PMX9mSGSafvrZj2QfIJRqL3',
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      })

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ['card', 'paypal'],
          mode: 'payment',
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        })

        console.log(stripeSession)
        return { url: stripeSession.url }
      } catch (err) {
        console.error(err)
        return { url: null }
      }
    }),

  pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input

      const payload = await getPayloadClient()

      const { docs: rawOrders } = await payload.find({
        collection: 'orders',
        where: {
          id: {
            equals: orderId,
          },
        },
      })

      const orders = rawOrders as unknown as Order[]

      if (!orders.length) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [order] = orders

      return { isPaid: order._isPaid }
    }),
})
