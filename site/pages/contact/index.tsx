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
      <Text variant="heading">Contact Us</Text>

      In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site,
      please contact us at:
      <br/><br/>
      <br/><br/>SoCloud Technology, Inc.
      <br/><br/>Phone: +1(715)6029693
      <br/><br/>michael@socloud.ltd

    </div>
  )
}

NotFound.Layout = Layout
