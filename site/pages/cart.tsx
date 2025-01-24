import type { GetStaticPropsContext } from 'next'
import { useState } from 'react'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Button, Text, Container } from '@components/ui'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import { CartItem } from '@components/cart'
import { useUI } from '@components/ui/context'
import { loadStripe } from '@stripe/stripe-js'
import { initializePaddle, CheckoutOpenLineItem } from '@paddle/paddle-js'

// Price to Paddle priceId mapping
const PRICE_TO_PADDLE_ID: Record<number, string> = {
  0.99: 'pri_01h7wt7r9nerhe1apjq6yats3f',
  19.99: 'pri_01h7wrwtppv23hd6sn558m2h3f',
  99.99: 'pri_01h7wrwrvxkzrpfn2hz1qav35b',
  34.99: 'pri_01h7wrwq409mfe02eb1tazk6qm',
  4.99: 'pri_01h7wrm7q8870k4nbdw4y0v18h',
  9.99: 'pri_01h7wrjrwv2b0ccyg5mdxz3q1z'
}

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
    props: { pages, categories },
  }
}

export default function Cart() {
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()
  const { openSidebar, setSidebarView } = useUI()
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  const handleStripeCheckout = async () => {
    try {
      const stripe = await stripePromise
      if (!stripe) {
        console.error('Failed to load Stripe')
        return
      }

      // Create a Stripe Checkout Session
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: data?.lineItems.map((item: any) => ({
            price: item.variant.price,
            quantity: item.quantity,
            name: item.name || item.variant.name || 'Product'
          }))
        }),
      })

      const session = await response.json()

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        console.error('Stripe checkout error:', result.error)
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error)
    }
  }

  const handlePaddleCheckout = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
        console.error('Paddle client token not found')
        return
      }

      const paddle = await initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        checkout: {
          settings: {
            displayMode: 'overlay',
            theme: 'dark',
            locale: 'en',
            successUrl: `${window.location.origin}/order/success`,
          }
        }
      })

      if (!paddle) {
        console.error('Failed to initialize Paddle')
        return
      }

      const paddleItems = (data?.lineItems || []).reduce<CheckoutOpenLineItem[]>((acc, item: any) => {
        const price = Number(item.variant.price)
        const paddleId = PRICE_TO_PADDLE_ID[price]
        if (!paddleId) {
          console.error(`No Paddle priceId found for price: ${price}`)
          return acc
        }
        return [...acc, {
          priceId: paddleId,
          quantity: item.quantity
        }]
      }, [])

      await paddle.Checkout.open({
        items: paddleItems
      })
    } catch (error) {
      console.error('Paddle checkout error:', error)
    }
  }

  return (
    <Container className="grid lg:grid-cols-12 pt-4 gap-20">
      <div className="lg:col-span-7">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-accent-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn't process the purchase. Please check your card
              information and try again.
            </h2>
          </div>
        ) : success ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Thank you for your order.
            </h2>
          </div>
        ) : (
          <div className="lg:px-0 sm:px-6 flex-1">
            <Text variant="pageHeading">My Cart</Text>
            <Text variant="sectionHeading">Review your Order</Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b border-accent-2">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency.code!}
                />
              ))}
            </ul>
            <div className="my-6">
              <Text>
                Before you leave, take a look at these items. We picked them
                just for you
              </Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div
                    key={x}
                    className="border border-accent-3 w-full h-24 bg-accent-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-5">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6">
          <div className="border-t border-accent-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Estimated Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-10">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="w-full lg:w-72">
              {isEmpty ? (
                <Button href="/" Component="a" width="100%">
                  Continue Shopping
                </Button>
              ) : (
                <>
                  {showPaymentOptions ? (
                    <div className="space-y-2">
                      <Button width="100%" onClick={handleStripeCheckout}>
                        Pay with Stripe ({total})
                      </Button>
                      <Button width="100%" onClick={handlePaddleCheckout} variant="flat">
                        Pay with Paddle ({total})
                      </Button>
                      <Button width="100%" variant="slim" onClick={() => setShowPaymentOptions(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button width="100%" onClick={() => setShowPaymentOptions(true)}>
                      Proceed to Checkout ({total})
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

Cart.Layout = Layout
