export default function ImprintPage() {
  return (
    <div className="space-y-10">
      {/* TITLE */}
      <header>
        <h1 className="text-3xl font-semibold">Imprint</h1>
      </header>

      {/* CONTENT */}
      <section className="space-y-6 text-sm leading-relaxed text-neutral-800">
        <div>
          <h2 className="font-medium mb-1">
            Website Owner and Responsible Party
          </h2>
          <p>
            Rafail Tasakis
            <br />
            Operating as: Tasakis Venture Strategy
            <br />
            Legal form: Sole proprietor (Eenmanszaak)
            <br />
            Registered in Belgium
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Business Address</h2>
          <p>
            Lange Nieuwstraat 10 / 301
            <br />
            2000 Antwerp
            <br />
            Belgium
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Contact Information</h2>
          <p>
            Email:{" "}
            <a href="mailto:rafail@tasakis.com" className="underline">
              rafail@tasakis.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">VAT Identification Number</h2>
          <p>VAT number: BE1027934239</p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Professional Activity</h2>
          <p>
            Independent consulting services in venture strategy, business
            development, biotechnology, and related advisory services.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Liability for Content</h2>
          <p>
            The content of this website has been created with the utmost care.
            However, no guarantee is given for the accuracy, completeness, or
            timeliness of the information provided. As a service provider, I am
            responsible for my own content on these pages under applicable
            Belgian and EU law.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Liability for Links</h2>
          <p>
            This website may contain links to external websites operated by
            third parties. I have no influence over the content of those
            websites and therefore cannot assume any liability for external
            content. Responsibility lies solely with the respective operators.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Copyright</h2>
          <p>
            All original content on this website, including text, graphics, and
            layout, is protected by copyright. Any reproduction, modification,
            or distribution beyond the limits of copyright law requires prior
            written consent.
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-1">Third-Party Assets</h2>
          <p className="space-y-1">
            Some visual assets used on this website are sourced from third-party
            libraries and are used in accordance with their respective licenses:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Image 1 in the home section: Designed by GarryKillian / Freepik (
              <a
                href="http://www.freepik.com"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                freepik.com
              </a>
              )
            </li>
            <li>
              Image 2 in the home section: Designed by starline / Freepik (
              <a
                href="http://www.freepik.com"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                freepik.com
              </a>
              )
            </li>
            <li>
              Icons: Lucide (
              <a
                href="https://lucide.dev"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                lucide.dev
              </a>
              ), ISC License
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
