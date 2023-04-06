import type {GetStaticPropsContext} from 'next'
import commerce from '@lib/api/commerce'
import {Layout} from '@components/common'
import {Text} from '@components/ui'

export async function getStaticProps({
                                       preview,
                                       locale,
                                       locales,
                                     }: GetStaticPropsContext) {
  const config = {locale, locales}
  const {pages} = await commerce.getAllPages({config, preview})
  const {categories, brands} = await commerce.getSiteInfo({config, preview})
  return {
    props: {
      pages,
      categories,
      brands,
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col fit">
      <Text variant="heading">Shipping</Text>
      <Text>As our products are digital content, we will immediately deliver icons to user's email once purchased
      </Text>
      <Text variant='sectionHeading'>Refund Policy</Text>
      <Text>Your files will be available to download once payment is confirmed. We don't accept returns, or cancellations, since they are downloadable and licensed. But please contact us if you have any problems with your order.</Text>

    </div>
  )
}

NotFound.Layout = Layout
