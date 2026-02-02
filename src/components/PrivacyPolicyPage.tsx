export default function PrivacyPolicyPage() {
  return (
    <article className="space-y-10">
      {/* TITLE */}
      <header>
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      </header>

      {/* CONTENT */}
      <section className="space-y-8 text-sm leading-relaxed text-neutral-800">
        <div>
          <h2 className="font-medium mb-1">1. Controller</h2>
          <p>
            Rafail N. Tasakis, PhD
            <br />
            Operating as: Tasakis Venture Strategy
            <br />
            Lange Nieuwstraat 10 Box 301
            <br />
            2000 Antwerp
            <br />
            Belgium
            <br />
            Email:{" "}
            <a href="mailto:rafail@tasakis.com" className="underline">
              rafail@tasakis.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">2. General Principles</h2>
          <p>
            This website is designed to minimize the collection of personal
            data. I process personal data only in accordance with the General
            Data Protection Regulation (GDPR) and applicable Belgian data
            protection laws.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">3. Personal Data Collected</h2>
          <p>
            No contact forms, cookies, or analytics tools are used on this
            website. Personal data is processed only in the following cases:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>When you contact me directly by email</li>
            <li>
              When you voluntarily engage with me via LinkedIn by following
              links provided on this website
            </li>
          </ul>
          <p className="mt-2">
            In these cases, the following data may be processed:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your email address</li>
            <li>
              Any personal information you choose to include in your message
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-medium mb-1">
            4. Purpose and Legal Basis of Processing
          </h2>
          <p>Personal data is processed solely for the purpose of:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Responding to inquiries</li>
            <li>Conducting professional communication</li>
          </ul>
          <p className="mt-2">The legal basis for processing is:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Article 6(1)(b) GDPR: steps taken prior to entering into a
              contract
            </li>
            <li>
              Article 6(1)(f) GDPR: legitimate interest in professional
              correspondence
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-medium mb-1">5. Data Sharing and Transfers</h2>
          <p>Your personal data will:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Not be sold or shared with third parties</li>
            <li>Not be transferred outside the European Union</li>
          </ul>
          <p className="mt-2">
            Data is processed exclusively by the website owner and standard
            email service providers.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">6. Data Retention</h2>
          <p>
            Personal data communicated by email is retained only as long as
            necessary to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Respond to your inquiry</li>
            <li>Fulfill legal or contractual obligations</li>
          </ul>
          <p className="mt-2">
            Once no longer required, the data is securely deleted.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">7. Cookies and Analytics</h2>
          <p>
            This website does not use cookies, tracking technologies, or
            analytics tools. Therefore, no cookie consent banner is required.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">8. Data Subject Rights</h2>
          <p>Under the GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Rectify inaccurate or incomplete data</li>
            <li>Request erasure of your data</li>
            <li>Restrict or object to processing</li>
            <li>Request data portability where applicable</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="mt-2">
            In Belgium, the competent authority is the{" "}
            <strong>Gegevensbeschermingsautoriteit (GBA / APD)</strong>.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">9. Data Security</h2>
          <p>
            Appropriate technical and organizational measures are in place to
            protect personal data against unauthorized access, loss, or misuse.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">
            10. Changes to This Privacy Policy
          </h2>
          <p>
            This Privacy Policy may be updated if legal requirements or website
            functionality change. The latest version will always be published on
            this website.
          </p>
        </div>
      </section>
    </article>
  );
}
