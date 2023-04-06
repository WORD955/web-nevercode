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
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col fit" style={{'whiteSpace': 'pre'}}>

      <Text variant="heading">Privacy Policy</Text>

      This Website collects some Personal Data from its Users.
      <br/>
      This document can be printed for reference by using the print command in the settings of any browser.
      <br/>
      Owner contact email: michael@socloud.ltd

      <Text variant='sectionHeading'>Types of Data collected</Text>
      Among the types of Personal Data that this Website collects,
      <br/>
      by itself or through third parties, there are: email address; Usage Data; first name; last name; Tracker; website;<br/>
      Data communicated while using the service; unique device identifiers for advertising (Google Advertiser ID or<br/>
      IDFA, for example); geographic position; language; username.<br/>
      <br/>
      Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy<br/>
      policy or by specific explanation texts displayed prior to the Data collection.<br/>
      <br/>
      Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using<br/>
      this Website.<br/>
      <br/>
      Unless specified otherwise, all Data requested by this Website is mandatory and failure to provide this Data may<br/>
      make it impossible for this Website to provide its services. In cases where this Website specifically states that<br/>
      some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability<br/>
      or the functioning of the Service.<br/>
      <br/>
      Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.<br/>
      <br/>
      Any use of Cookies – or of other tracking tools – by this Website or by the owners of third-party services used by<br/>
      this Website serves the purpose of providing the Service required by the User, in addition to any other purposes<br/>
      described in the present document and in the Cookie Policy, if available.<br/>
      <br/>
      Users are responsible for any third-party Personal Data obtained, published or shared through this Website and<br/>
      confirm that they have the third party's consent to provide the Data to the Owner.<br/>

      <Text variant='sectionHeading'>Mode and place of processing the Data</Text>
      The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or<br/>
      unauthorized destruction of the Data.<br/>
      <br/>
      The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures<br/>
      and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be<br/>
      accessible to certain types of persons in charge, involved with the operation of this Website (administration,<br/>
      sales, marketing, legal, system administration) or external parties (such as third-party technical service<br/>
      providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as<br/>
      Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.<br/>

      <Text variant='sectionHeading'>Legal basis of processing</Text>
      The Owner may process Personal Data relating to Users if one of the following applies:<br/>
      Users have given their consent for one or more specific purposes. Note: Under some legislations the Owner may be<br/>
      allowed to process Personal Data until the User objects to such processing (“opt-out”), without having to rely on<br/>
      consent or any other of the following legal bases. This, however, does not apply, whenever the processing of<br/>
      Personal Data is subject to European data protection law;<br/>
      <br/>
      provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual<br/>
      obligations thereof;<br/>
      <br/>
      processing is necessary for compliance with a legal obligation to which the Owner is subject;<br/>
      processing is related to a task that is carried out in the public interest or in the exercise of official<br/>
      authority vested in the Owner;<br/>
      <br/>
      processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.<br/>
      In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in<br/>
      particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement<br/>
      necessary to enter into a contract.<br/>

      <Text variant='sectionHeading'>Place</Text>
      The Data is processed at the Owner's operating offices and in any other places where the parties involved in the<br/>
      processing are located.<br/>
      <br/>
      Depending on the User's location, data transfers may involve transferring the User's Data to a country other than<br/>
      their own. To find out more about the place of processing of such transferred Data, Users can check the section<br/>
      containing details about the processing of Personal Data.<br/>
      <br/>
      Users are also entitled to learn about the legal basis of Data transfers to a country outside the European Union<br/>
      or to any international organization governed by public international law or set up by two or more countries, such<br/>
      as the UN, and about the security measures taken by the Owner to safeguard their Data.<br/>
      If any such transfer takes place, Users can find out more by checking the relevant sections of this document or<br/>
      inquire with the Owner using the information provided in the contact section.<br/>
      <br/>
      <Text variant='sectionHeading'>Retention time</Text>
      Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.<br/>
      <br/>
      Therefore:<br/>
      <br/>
      Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall<br/>
      be retained until such contract has been fully performed.<br/>
      <br/>
      Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as needed<br/>
      to fulfill such purposes. Users may find specific information regarding the legitimate interests pursued by the<br/>
      <br/>
      Owner within the relevant sections of this document or by contacting the Owner.<br/>
      The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such<br/>
      processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal<br/>
      <br/>
      Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an<br/>
      authority.<br/>
      <br/>
      Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access, the right to<br/>
      erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the<br/>
      retention period.<br/>

      <Text variant='sectionHeading'>The purposes of processing</Text>
      The Data concerning the User is collected to allow the Owner to provide its Service, comply with its legal<br/>
      obligations, respond to enforcement requests, protect its rights and interests (or those of its Users or third<br/>
      parties), detect any malicious or fraudulent activity, as well as the following: Handling payments, Registration<br/>
      and authentication, Managing contacts and sending messages, Traffic optimization and distribution, Contacting the<br/>
      User, Registration and authentication provided directly by this Website, Displaying content from external<br/>
      platforms, Tag Management, Managing support and contact requests, Social features and Hosting and backend<br/>
      infrastructure.<br/>
      <br/>
      For specific information about the Personal Data used for each purpose, the User may refer to the section<br/>
      “Detailed information on the processing of Personal Data”.<br/>
      <br/>
      Detailed information on the processing of Personal Data<br/>
      Personal Data is collected for the following purposes and using the following services:<br/>

      <Text variant='sectionHeading'>Handling payments</Text>
      Unless otherwise specified, this Website processes any payments by credit card, bank transfer or other means via<br/>
      external payment service providers. In general and unless where otherwise stated, Users are requested to provide<br/>
      <br/>
      their payment details and personal information directly to such payment service providers. This Website isn't<br/>
      involved in the collection and processing of such information: instead, it will only receive a notification by the<br/>
      relevant payment service provider as to whether payment has been successfully completed.<br/>
      <br/>
      Stripe (Stripe Inc)<br/>
      Stripe is a payment service provided by Stripe Inc.<br/>
<br/>
      Personal Data processed: various types of Data as specified in the privacy policy of the service.<br/>
<br/>
      Place of processing: United States – Privacy Policy.<br/>
<br/>
      PayPal (PayPal Inc.)<br/>
      PayPal is a payment service provided by PayPal Inc., which allows Users to make online payments.<br/>
<br/>
      Personal Data processed: various types of Data as specified in the privacy policy of the service.<br/>
<br/>
      Place of processing: See the PayPal privacy policy – Privacy Policy.<br/>

      <Text variant='sectionHeading'>Cookie Policy</Text>
      This Website uses Trackers. To learn more, the User may consult the Cookie Policy.<br/>
<br/>
      Additional information about Data collection and processing<br/>
      Legal action<br/>
      <br/>
      The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible<br/>
      legal action arising from improper use of this Website or the related Services.<br/>
      The User declares to be aware that the Owner may be required to reveal personal data upon request of public<br/>
      authorities.<br/>
<br/>
      Additional information about User's Personal Data<br/>
      In addition to the information contained in this privacy policy, this Website may provide the User with additional<br/>
      and contextual information concerning particular Services or the collection and processing of Personal Data upon<br/>
      request.<br/>
<br/>
      System logs and maintenance<br/>
      For operation and maintenance purposes, this Website and any third-party services may collect files that record<br/>
      interaction with this Website (System logs) use other Personal Data (such as the IP Address) for this purpose.<br/>
<br/>
      Information not contained in this policy<br/>
      More details concerning the collection or processing of Personal Data may be requested from the Owner at any time.<br/>
      Please see the contact information at the beginning of this document.<br/>
<br/>
      How “Do Not Track” requests are handled<br/>
      This Website does not support “Do Not Track” requests.<br/>
      <br/>
      To determine whether any of the third-party services it uses honor the “Do Not Track” requests, please read their<br/>
      privacy policies.<br/>
<br/>
      <Text variant='sectionHeading'>Changes to this privacy policy</Text>
      The Owner reserves the right to make changes to this privacy policy at any time by notifying its Users on this<br/>
      page and possibly within this Website and/or - as far as technically and legally feasible - sending a notice to<br/>
      <br/>
      Users via any contact information available to the Owner. It is strongly recommended to check this page often,<br/>
      referring to the date of the last modification listed at the bottom.<br/>
      <br/>
      Should the changes affect processing activities performed on the basis of the User’s consent, the Owner shall<br/>
      collect new consent from the User, where required.<br/>
<br/>
      iubenda hosts this content and only collects the Personal Data strictly necessary for it to be provided.<br/>

    </div>
  )
}

NotFound.Layout = Layout
