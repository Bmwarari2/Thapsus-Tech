import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { isPlaceholder, site } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    `How ${site.legal.tradingName} collects, uses and protects personal information when you visit our website, send an enquiry or book a call, and the rights you have under UK data protection law.`,
  path: "/privacy",
});

const { contact, legal } = site;
const host = site.url.replace(/^https?:\/\//, "");

/** Links the email address once it is real; shows plain text while it is still a placeholder. */
function EmailAddress() {
  return isPlaceholder(contact.email) ? <>{contact.email}</> : <a href={`mailto:${contact.email}`}>{contact.email}</a>;
}

function PhoneNumber() {
  return <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>;
}

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated="5 October 2026"
      intro={
        <p>
          This policy explains how {legal.tradingName} collects and uses personal information when you visit our website
          ({host}), send us an enquiry or book a call with us. It also explains the choices you have and your rights under
          UK data protection law, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act
          2018.
        </p>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        {legal.tradingName} is a trading name of {legal.companyName}, a company registered in {legal.registeredIn} with
        company number {legal.companyNumber}. Our registered office is {legal.registeredOffice}. We design, build and
        maintain custom software and websites for UK businesses.
      </p>
      <p>
        {legal.companyName} is the controller of the personal information described in this policy. This means we decide
        how and why it is used, and we are responsible for looking after it.
      </p>
      {legal.icoNumber ? (
        <p>
          We are registered with the Information Commissioner’s Office (ICO) under registration number {legal.icoNumber}.
        </p>
      ) : null}
      <p>
        You can contact us about this policy or your information by email at <EmailAddress />, by phone on{" "}
        <PhoneNumber /> or by post at our registered office.
      </p>

      <h2>2. What this policy covers</h2>
      <p>
        This policy covers our website, enquiries sent to us and calls booked with us. It applies to you if you visit the
        site, get in touch with us, or are a contact at one of our clients or prospective clients.
      </p>
      <p>
        When we build or host systems for our clients, those systems may hold personal information, for example about our
        clients’ own customers or staff. In that work we act as a <strong>processor</strong> on our client’s behalf, under
        a separate data processing agreement, and the client’s own privacy notice applies. This policy does not cover that
        information.
      </p>
      <p>Our website is designed for businesses. It is not aimed at children.</p>

      <h2>3. The information we collect</h2>
      <h3>When you send an enquiry</h3>
      <p>
        Our <Link href="/contact">enquiry form</Link> asks for:
      </p>
      <ul>
        <li>your name and your business name</li>
        <li>your email address and, if you choose to give it, your phone number</li>
        <li>the number of staff in your business</li>
        <li>which software you currently pay for, and roughly how much you spend on software each month (as a range)</li>
        <li>your message</li>
        <li>
          a tick box confirming that you are happy for us to contact you about your enquiry
        </li>
      </ul>
      <p>
        To filter out automated spam, the form also contains a hidden field that people do not see (a “honeypot”) and
        checks how quickly it was filled in. We do not use a third-party CAPTCHA service.
      </p>
      <p>
        Please do not include sensitive information, such as health details, in your message. We do not need it to reply.
      </p>

      <h3>When you book a call</h3>
      <p>
        If you book a call through our Cal.com booking calendar, Cal.com collects the details you enter in its booking
        form, such as your name, email address, the time you choose and any notes, and
        shares them with us so we can hold the call.
      </p>

      <h3>When you contact us in other ways</h3>
      <p>
        If you email or phone us, we keep your contact details and what you tell us so we can deal with your request. If
        you become a client, we also keep business records such as contracts, invoices and related correspondence.
      </p>

      <h3>When you browse our website</h3>
      <ul>
        <li>
          <strong>Server logs.</strong> Our hosting provider automatically records standard technical information when a
          page is requested: your IP address, your browser and device type (user agent), the page requested and the time.
          These logs are kept for security and troubleshooting.
        </li>
        <li>
          <strong>Analytics, only if you agree.</strong> If you accept analytics cookies, Google Analytics collects
          information about how you use the site, such as the pages you visit, how you arrived, your type of device and
          browser, and your approximate location. If you do not accept, Google Analytics does not load.
        </li>
        <li>
          <strong>Cookies.</strong> We set one strictly necessary cookie to remember your cookie choices. Our{" "}
          <Link href="/cookies">cookie policy</Link> has the full details.
        </li>
      </ul>

      <h3>The savings calculator</h3>
      <p>
        Our savings calculator works entirely in your browser. The figures you enter are not sent to us and are not
        stored. If you choose to mention them in an enquiry, we treat them as part of that enquiry.
      </p>

      <h2>4. How we use your information and why</h2>
      <p>
        UK data protection law says we must have a lawful basis for each way we use personal information. The table below
        sets out what we do and the basis we rely on.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">What we do</th>
              <th scope="col">Information used</th>
              <th scope="col">Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reply to your enquiry, arrange and hold calls, and prepare proposals</td>
              <td>Enquiry form details, booking details, emails and any notes we make</td>
              <td>
                Legitimate interests (responding to businesses that contact us and running our business) and, where you ask
                for a proposal, taking steps at your request before entering into a contract
              </td>
            </tr>
            <tr>
              <td>Understand how our website is used (Google Analytics)</td>
              <td>Analytics information collected through cookies</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Show the embedded Cal.com booking calendar</td>
              <td>Information Cal.com collects through its cookies</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Keep business and tax records</td>
              <td>Client details, contracts, invoices and related correspondence</td>
              <td>Legal obligation</td>
            </tr>
            <tr>
              <td>Keep our website and inbox secure, and prevent spam, fraud and misuse</td>
              <td>Server logs and the results of our spam checks</td>
              <td>Legitimate interests (protecting our systems and our business)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Where we rely on legitimate interests, we have weighed our interests against yours and believe the use is
        reasonable and something you would expect. You can object at any time (see section 9).
      </p>
      <p>
        Where we rely on consent, you can withdraw it at any time using the “Cookie settings” link in the footer of every
        page. Withdrawing consent does not affect anything we did with your consent before then.
      </p>
      <p>
        We do not sell your personal information or use it for advertising, and we do not make decisions about you based
        solely on automated processing. We do not send marketing emails.
      </p>

      <h2>5. Who we share your information with</h2>
      <p>
        We use the service providers below to run our website and handle enquiries. They process personal information on
        our behalf and under their data processing terms.
      </p>
      <ul>
        <li>
          <strong>Railway</strong> (Railway Corporation, United States) hosts our website and keeps the server logs
          described above. Hosting region: Europe West (the Netherlands).
        </li>
        <li>
          <strong>Resend</strong> (United States) delivers enquiry form submissions to our email inbox.
        </li>
        <li>
          <strong>Zoho Mail</strong> (Zoho Corporation) hosts our email inbox, where enquiries are received and kept. Our Zoho account is hosted in Zoho’s EU data centres.
        </li>
        <li>
          <strong>Google</strong> provides Google Analytics, which runs only if you accept analytics cookies.
        </li>
        <li>
          <strong>Cal.com, Inc.</strong> provides our booking calendar, which loads only if you allow it. If you book
          directly on cal.com, Cal.com’s own privacy policy also applies.
        </li>
      </ul>
      <p>
        We may also share information with our professional advisers, such as our accountant or lawyers; with HM Revenue
        &amp; Customs or other authorities where the law requires it; and with anyone who takes over all or part of our
        business, who would have to use it in line with this policy.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Railway, Resend, Google and Cal.com may process personal information outside the UK, including in the United
        States. Where information is transferred outside the UK, we make sure it is protected by an appropriate safeguard,
        such as:
      </p>
      <ul>
        <li>
          UK adequacy regulations, which recognise that a country or framework gives adequate protection. This includes the
          UK Extension to the EU–US Data Privacy Framework, where the US provider is certified under it; or
        </li>
        <li>
          the International Data Transfer Agreement, or the International Data Transfer Addendum to the EU standard
          contractual clauses, issued by the ICO.
        </li>
      </ul>
      <p>
        For each provider, we rely on whichever of these safeguards applies to its service. You can contact us for more information about the safeguards we use.
      </p>

      <h2>7. How long we keep your information</h2>
      <p>
        We keep personal information only for as long as we need it for the purposes in this policy. After that we delete
        it or make it anonymous.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">How long we keep it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enquiries and booked calls that do not lead to work</td>
              <td>12 months after our last contact</td>
            </tr>
            <tr>
              <td>Client records, including contracts, invoices and correspondence</td>
              <td>6 years after the end of the contract, for tax and legal reasons</td>
            </tr>
            <tr>
              <td>Server logs</td>
              <td>For as long as our hosting provider keeps them, after which they are deleted automatically</td>
            </tr>
            <tr>
              <td>Google Analytics data</td>
              <td>14 months</td>
            </tr>
            <tr>
              <td>Your cookie choices (the thapsus_consent cookie)</td>
              <td>6 months, stored in your browser</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>8. Keeping your information secure</h2>
      <p>
        We use appropriate technical and organisational measures to protect personal information against loss, misuse and
        unauthorised access. Our website is served over an encrypted connection (HTTPS), and access to enquiries is limited
        to the people at {legal.tradingName} who need it.
      </p>
      <p>
        No way of sending information over the internet is completely secure. If a personal data breach happens, we will
        tell you and the ICO where the law requires us to.
      </p>

      <h2>9. Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>
          <strong>Access:</strong> ask for a copy of the personal information we hold about you.
        </li>
        <li>
          <strong>Rectification:</strong> ask us to correct information that is inaccurate or incomplete.
        </li>
        <li>
          <strong>Erasure:</strong> ask us to delete your information in certain circumstances.
        </li>
        <li>
          <strong>Restriction:</strong> ask us to limit how we use your information in certain circumstances.
        </li>
        <li>
          <strong>Objection:</strong> object to our use of your information where we rely on legitimate interests.
        </li>
        <li>
          <strong>Portability:</strong> ask us to send information you gave us to you, or to another organisation, in a
          commonly used electronic format, in certain circumstances.
        </li>
        <li>
          <strong>Withdraw consent:</strong> where we rely on consent, withdraw it at any time.
        </li>
      </ul>
      <p>
        Some of these rights only apply in certain situations, and we will explain if one does not apply to your request.
      </p>
      <p>
        To use any of these rights, email <EmailAddress />, call <PhoneNumber /> or write to us at our registered office.
        We may need to ask you to confirm your identity. There is usually no charge. We will reply within one month of
        receiving your request. If a request is complex, or you make several, we may extend this by up to two further
        months and will tell you if we need to.
      </p>

      <h2>10. Complaints</h2>
      <p>
        If you are unhappy with how we have handled your information, please contact us first so we can try to put things
        right. You also have the right to complain to the Information Commissioner’s Office (ICO), the UK’s data protection
        regulator, at <a href="https://ico.org.uk">ico.org.uk</a> or on 0303 123 1113.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time, for example if we change the services we use. We will publish the new
        version on this page and change the “Last updated” date at the top.
      </p>

      <h2>12. Questions</h2>
      <p>
        If you have any questions about this policy or how we use your information, <Link href="/contact">get in touch</Link>,
        email <EmailAddress /> or call <PhoneNumber />.
      </p>
    </LegalDocument>
  );
}
