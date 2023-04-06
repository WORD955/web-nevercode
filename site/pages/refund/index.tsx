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

  // Virtual Goods Refund Policy
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col fit">
      <Text variant="heading">Refund Policy</Text>

      <Text variant='sectionHeading'>Can I get a refund?</Text>

      If you or your customer don’t like the theme, or if our theme has error or bug and functionality doesn’t work as
      expected, you can get in touch with our friendly support team, so we will either help you solve anything you need
      or we will refund all your money back within 14 days after your purchase.
      <br/><br/>

      <Text variant='sectionHeading'>Have issue, Looking for a solution?</Text>
      <li>Check item documentation</li>
      <li>Check videos tutorials</li>
      <li>Ask your question from Support team</li>
      <li>Make sure your WordPress have no problem</li>
      <li>Deactivate all of your 3rd party plugins</li>
      <li>Make sure your theme and plugins are up to date</li>
      <br/><br/>

    </div>
  )
}

NotFound.Layout = Layout
