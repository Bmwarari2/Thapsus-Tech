import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { isPlaceholder, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Website terms of use",
  description: `The terms that apply when you use the ${site.legal.tradingName} website, including our savings calculator and the prices shown on the site.`,
  alternates: { canonical: "/terms" },
};

const { contact, legal } = site;
const host = site.url.replace(/^https?:\/\//, "");

/** Links the email address once it is real; shows plain text while it is still a placeholder. */
function EmailAddress() {
  return isPlaceholder(contact.email) ? <>{contact.email}</> : <a href={`mailto:${contact.email}`}>{contact.email}</a>;
}

function PhoneNumber() {
  return <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>;
}

export default function TermsPage() {
  return (
    <LegalDocument
      title="Website terms of use"
      updated="5 October 2026"
      intro={
        <p>
          These terms set out the rules for using our website at {host}. Please read them carefully. By using the website,
          you agree to them. If you do not agree, please do not use the website.
        </p>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        This website is run by {legal.companyName}, trading as {legal.tradingName} (“{legal.tradingName}”, “we”, “us” or
        “our”). We are registered in {legal.registeredIn} under company number {legal.companyNumber}, and our registered
        office is {legal.registeredOffice}. We design, build and maintain custom software and websites for UK businesses.
      </p>
      <p>
        You can contact us by email at <EmailAddress /> or by phone on <PhoneNumber />.
      </p>

      <h2>2. Other terms that apply</h2>
      <ul>
        <li>
          Our <Link href="/privacy">privacy policy</Link> explains how we use personal information.
        </li>
        <li>
          Our <Link href="/cookies">cookie policy</Link> explains the cookies we use and how to change your settings.
        </li>
        <li>If you buy software or services from us, a separate written agreement applies (see section 8).</li>
      </ul>

      <h2>3. Using our website</h2>
      <p>Our website is intended for businesses. You may use it for lawful purposes only. You must not:</p>
      <ul>
        <li>use the site in any way that breaks a law or regulation, or that is fraudulent or harmful</li>
        <li>try to gain unauthorised access to the site, the server it runs on or any connected system</li>
        <li>introduce viruses, malware or other harmful material, or attack the site in any way</li>
        <li>use automated tools to copy or extract content from the site in bulk without our permission</li>
        <li>use our enquiry form to send spam or unsolicited advertising, or to submit false information</li>
      </ul>
      <p>
        We provide the site free of charge. We do not guarantee that it, or any content on it, will always be available or
        uninterrupted. We may suspend, withdraw or change any part of the site without notice.
      </p>

      <h2>4. Our content and intellectual property</h2>
      <p>
        The website and its content, including its text, images, design, layout and code, belong to us or our licensors
        and are protected by copyright and other intellectual property laws.
      </p>
      <p>
        You may view the site, and print or download extracts for your own reference or to share within your business, as
        long as you do not change them and you acknowledge us as the source. You must not otherwise copy, republish or use
        any part of the site for commercial purposes without our written permission. These terms do not give you a licence
        to use our content in any other way.
      </p>
      <p>
        Our name and logo are our trade marks. You must not use them without our written permission. Other names and trade
        marks shown on the site belong to their owners.
      </p>

      <h2>5. Information on our website</h2>
      <p>
        The content on our website is general information about our services. It is not professional, technical, legal or
        financial advice, and you should not rely on it as such. Please talk to us about your own situation before making
        decisions based on it.
      </p>
      <p>
        We try to keep the site accurate and up to date, but we do not promise that its content is complete, accurate or
        current. We may change the content, including descriptions of our services, at any time.
      </p>

      <h2>6. The savings calculator</h2>
      <p>
        Our savings calculator gives a rough idea of what your business might save by replacing software subscriptions with
        a system built by us. Its results are <strong>estimates only</strong>. They are based on the figures you enter and
        on example prices, which may not match what you actually pay or what we would charge.
      </p>
      <ul>
        <li>The calculator is not a quote or an offer to provide services.</li>
        <li>It is not financial advice.</li>
        <li>
          Your actual costs and savings will depend on your business, your requirements and the terms of any agreement we
          make with you.
        </li>
      </ul>
      <p>The calculator runs in your browser. The figures you enter are not sent to us or stored.</p>

      <h2>7. Prices</h2>
      <p>
        Prices shown on our website are indicative only. They are not an offer and may change. The price for any work is
        the price we confirm in a written proposal. [VAT — confirm whether the prices shown include or exclude VAT, and
        say so here.]
      </p>

      <h2>8. Our software services</h2>
      <p>
        These terms cover your use of the website only. If you ask us to design, build, host or maintain software or a
        website for you, that work is governed by a separate written agreement between your business and us. If anything in
        that agreement conflicts with these terms, the agreement takes priority.
      </p>
      <p>
        Sending an enquiry, booking a call or receiving a proposal does not create a contract for services. A contract only
        exists once we have both agreed it in writing.
      </p>

      <h2>9. Links to other websites</h2>
      <p>
        Our website may link to, or embed content from, other websites and services, such as our Cal.com booking calendar.
        We include these for your convenience. We have no control over them and are not responsible for their content or
        for how they handle your information. A link does not mean we endorse a website. Their own terms and policies
        apply.
      </p>

      <h2>10. Our liability</h2>
      <p>Nothing in these terms excludes or limits our liability for:</p>
      <ul>
        <li>death or personal injury caused by our negligence</li>
        <li>fraud or fraudulent misrepresentation</li>
        <li>anything else that cannot be excluded or limited by law</li>
      </ul>
      <p>Subject to that, and because our website is free and intended for businesses:</p>
      <ul>
        <li>
          we exclude all implied conditions, warranties, representations and other terms that might apply to the website or
          its content
        </li>
        <li>
          we are not liable for any loss or damage, whether in contract, tort (including negligence), breach of statutory
          duty or otherwise, arising from your use of, or inability to use, the website, or from your use of or reliance on
          any of its content, including the savings calculator
        </li>
        <li>
          in particular, we are not liable for loss of profits, sales, business or revenue; business interruption; loss of
          anticipated savings; loss of business opportunity, goodwill or reputation; or any indirect or consequential loss
        </li>
      </ul>
      <p>
        We take reasonable care to keep the website secure, but we do not guarantee that it is free from bugs or viruses.
        You are responsible for protecting your own devices and systems, for example with up-to-date security software.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may change these terms from time to time. The version on this page applies whenever you use the site, so please
        check it each time. The “Last updated” date at the top shows when the terms last changed.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms, and any dispute or claim arising out of or in connection with them or your use of the website
        (including non-contractual disputes or claims), are governed by the law of England and Wales. The courts of England
        and Wales have exclusive jurisdiction.
      </p>

      <h2>13. Questions</h2>
      <p>
        If you have any questions about these terms, <Link href="/contact">get in touch</Link>, email <EmailAddress /> or
        call <PhoneNumber />.
      </p>
    </LegalDocument>
  );
}
