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
      <Text variant="heading">About</Text>
      <Text className="" style={{paddingTop: 20}}>
        We provide rich icons for personal and commercial use, available in PNG and SVG. Resources are made by our
        designers, perfect for website design, social media organization, phone & desktop decoration, ect...
      </Text>

      <Text variant="sectionHeading" style={{paddingTop: 40}}>About products</Text>

      <Text className="">
        This shop contains a total of 5,500 icons now. Comes in black, white, colorful, neon, vintage, aesthetic, and
        more are coming. Following screenshots are original design proof of our icons:
      </Text>
    </div>
  )
}

NotFound.Layout = Layout
