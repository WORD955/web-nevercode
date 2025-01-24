import cn from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
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

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()
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
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const handleStripeCheckout = () => {
    if (process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED) {
      goToCheckout()
    } else {
      window.location.href = '/checkout'
    }
  }

  const handlePaddleCheckout = async () => {
    try {
      console.log('data', data)
      if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
        console.error('Paddle client token not found')
        return
      }

      const paddle = await initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        checkout: {
          settings: {
            displayMode: 'inline',
            theme: 'dark',
            locale: 'en',
            successUrl: `${window.location.origin}/order/success`,
            frameTarget: '_self'
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

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn't process the purchase. Please check your card information
            and try again.
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
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <Text variant="sectionHeading" onClick={handleClose}>
                My Cart
              </Text>
            </Link>
            <ul className={s.lineItemsList}>
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div>
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
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
