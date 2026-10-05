import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { isPlaceholder, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `The cookies ${site.legal.tradingName} uses on its website, what each one does and how you can change your cookie settings at any time.`,
  alternates: { canonical: "/cookies" },
};

const { contact, legal } = site;
const host = site.url.replace(/^https?:\/\//, "");

/** Links the email address once it is real; shows plain text while it is still a placeholder. */
function EmailAddress() {
  return isPlaceholder(contact.email) ? <>{contact.email}</> : <a href={`mailto:${contact.email}`}>{contact.email}</a>;
}

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie policy"
      updated="5 October 2026"
      intro={
        <p>
          This policy explains the cookies used on {host}, why we use them and how you can control them. We only set
          cookies that are not strictly necessary if you agree, in line with the Privacy and Electronic Communications
          Regulations (PECR) and UK data protection law.
        </p>
      }
    >
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files that a website saves in your browser. They let the site remember things about your
        visit, such as your preferences, or help the site’s owner understand how it is used. Similar technologies, such as
        local storage, work in a comparable way, and this policy covers them too.
      </p>
      <p>
        Cookies set by the website you are visiting are called first-party cookies. Cookies set by another organisation,
        such as a service embedded in the page, are called third-party cookies.
      </p>

      <h2>2. How we use cookies</h2>
      <ul>
        <li>
          <strong>Strictly necessary.</strong> We set one cookie, thapsus_consent, to remember your cookie choices. We do
          not need your consent for this, because the site needs it to respect the choice you have made.
        </li>
        <li>
          <strong>Analytics, optional.</strong> Google Analytics sets cookies only if you accept analytics cookies.
        </li>
        <li>
          <strong>Booking calendar, optional.</strong> The Cal.com booking calendar on our contact page sets third-party
          cookies, so it loads only if you allow it.
        </li>
      </ul>
      <p>
        We do not use advertising or marketing cookies. The scripts that provide smooth scrolling and animations on our
        site do not set any cookies.
      </p>

      <h2>3. Cookies we use</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Provider</th>
              <th scope="col">Purpose</th>
              <th scope="col">Duration</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>thapsus_consent</td>
              <td>{legal.tradingName} (this website)</td>
              <td>Stores your cookie choices so we can respect them</td>
              <td>6 months</td>
              <td>Strictly necessary</td>
            </tr>
            <tr>
              <td>_ga</td>
              <td>Google Analytics</td>
              <td>Distinguishes one visitor from another</td>
              <td>2 years</td>
              <td>Analytics, only with consent</td>
            </tr>
            <tr>
              <td>{"_ga_<container-id>"}</td>
              <td>Google Analytics</td>
              <td>Keeps track of the state of your visit (session)</td>
              <td>2 years</td>
              <td>Analytics, only with consent</td>
            </tr>
            <tr>
              <td>Set by Cal.com</td>
              <td>Cal.com, Inc.</td>
              <td>Make the embedded booking calendar work. See Cal.com’s policy for details</td>
              <td>Set by Cal.com</td>
              <td>Third-party, only with consent</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. Google Analytics</h2>
      <p>
        If you accept analytics cookies, we use Google Analytics 4 to understand how visitors use our website, such as
        which pages are visited and how people find us. This helps us improve the site. Google Analytics does not load,
        and sets no cookies, unless you accept.
      </p>
      <p>
        We keep Google Analytics data for [GA RETENTION — e.g. 14 months, confirm]. You can read more in{" "}
        <a href="https://policies.google.com/privacy">Google’s privacy policy</a> and in our{" "}
        <Link href="/privacy">privacy policy</Link>. You can also stop Google Analytics on every website you visit by
        installing <a href="https://tools.google.com/dlpage/gaoptout">Google’s opt-out browser add-on</a>.
      </p>

      <h2>5. Booking calendar</h2>
      <p>
        Our <Link href="/contact">contact page</Link> can show a booking calendar provided by Cal.com, Inc. Because the
        calendar sets third-party cookies, it only loads if you allow it. If you would rather not, you can still send us
        an enquiry using the form, or open our booking page on cal.com directly.
      </p>
      <p>
        Cal.com sets and controls these cookies, so we do not list them here. Please see{" "}
        <a href="https://cal.com/privacy">Cal.com’s privacy policy</a> for details of the cookies it uses and how it
        handles your information.
      </p>

      <h2>6. Changing your choices</h2>
      <p>
        When you first visit our website, a banner asks whether you accept optional cookies. Nothing optional is set until
        you choose. You can change your mind at any time using the “Cookie settings” link in the footer of every page, or
        the button below.
      </p>
      <p>
        <button type="button" data-cookie-settings className="link-more cursor-pointer">
          Change cookie settings
        </button>
      </p>
      <p>
        If you withdraw your consent, optional cookies will not be set from then on. You can delete cookies that have
        already been set in your browser settings. [CONSENT WITHDRAWAL — confirm whether the site deletes analytics
        cookies automatically when consent is withdrawn, and update this paragraph if so.]
      </p>
      <p>
        Most browsers also let you block or delete cookies, and your browser’s help pages explain how. If you block all
        cookies, including thapsus_consent, we cannot remember your choice, so the cookie banner will appear again.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        If we add or change the cookies we use, we will update this page and the “Last updated” date at the top. Where the
        law requires it, we will ask for your consent again.
      </p>

      <h2>8. Questions</h2>
      <p>
        If you have any questions about the cookies we use, <Link href="/contact">get in touch</Link>, email{" "}
        <EmailAddress /> or call <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>.
      </p>
    </LegalDocument>
  );
}
