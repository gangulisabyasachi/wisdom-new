import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Open Access Policy - WISDOM Journal',
  description: 'WISDOM is a fully open-access journal. All articles are freely available under Creative Commons CC BY 4.0 license. Authors retain copyright. No APCs. Immediate global access.',
  keywords: 'WISDOM journal open access, CC BY 4.0, fully open access journal, no article processing charges, author retains copyright, open access policy India, DOAJ compliant',
  alternates: {
    canonical: 'https://www.wisdomj.in/open-access-policy',
  },
  openGraph: {
    title: 'Open Access Policy – WISDOM Journal',
    description: 'WISDOM is a fully open-access, double-blinded peer-reviewed journal. All articles are freely available under the Creative Commons CC BY 4.0 license with no article processing charges.',
    url: 'https://www.wisdomj.in/open-access-policy',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal – Open Access Policy (CC BY 4.0)',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OpenAccessPolicyPage() {
  return (
    <PolicyLayout 
      title="Open Access Policy" 
      subtitle="Free global access to all published research without subscription barriers"
    >
      <section>
          <h2>1. Commitment to Open Access</h2>
          <p>
              WISDOM is a **fully open-access**, double-blinded peer-reviewed academic journal. All research articles, 
              reviews, and scholarly works published in the journal are freely accessible online to readers 
              worldwide without any subscription, login, or payment barriers.
          </p>

          <h2>2. Access and Licensing (CC BY 4.0)</h2>
          <p>
              All content published in WISDOM is distributed under the terms of the 
              **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. 
              Under this license:
          </p>
          <ul>
              <li>Readers are free to read, download, copy, distribute, print, search, or link to the full texts.</li>
              <li>Articles may be reused or quoted in part or in full, provided proper citation is given.</li>
              <li>No permission is required from the publisher or authors for non-commercial use.</li>
          </ul>
          <p>
              Full license details: [https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/)
          </p>

          <h2>3. Archiving and Preservation</h2>
          <p>
              To ensure long-term digital preservation, all published articles in WISDOM are archived 
              and indexed through reputable databases. The journal uses secure hosting and backup 
              systems to maintain uninterrupted access.
          </p>

          <h2>4. Author Rights</h2>
          <p>
              Authors retain the copyright of their scholarly work while granting WISDOM the non-exclusive 
              right to publish, distribute, and archive the article. Authors may share the final 
              published version on personal websites or institutional repositories.
          </p>

          <h2>5. Benefits of Open Access</h2>
          <ul>
              <li>Enhances the visibility and global reach of research.</li>
              <li>Encourages interdisciplinary collaboration and knowledge exchange.</li>
              <li>Promotes equity in access regardless of geographical or financial barriers.</li>
          </ul>
      </section>
    </PolicyLayout>
  );
}
