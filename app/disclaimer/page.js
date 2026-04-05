import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Disclaimer - WISDOM Journal',
  description: "Official disclaimer of WISDOM Journal: Published content reflects authors' views only. The journal, editors, and publisher assume no liability for accuracy, errors, or use of information.",
  keywords: 'WISDOM journal disclaimer, legal disclaimer, author responsibility, no liability, academic publishing disclaimer, editorial@wisdomj.in',
  alternates: {
    canonical: 'https://www.wisdomj.in/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer – WISDOM Journal',
    description: "Official disclaimer of WISDOM Journal. Published content reflects authors' views only. The journal, editors, and publisher assume no liability.",
    url: 'https://www.wisdomj.in/disclaimer',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <PolicyLayout 
      title="Disclaimer" 
      subtitle="Scholarly accountability and limitations of liability"
    >
      <section>
          <h2>1. General Disclaimer</h2>
          <p>
              The Journal of WISDOM publishes scholarly articles, research papers, reviews, and opinions that 
              represent the independent views of the respective authors. The editorial board, reviewers, 
              and publisher do not necessarily endorse or agree with the opinions, interpretations, 
              or conclusions expressed in any published work.
          </p>
          <p>
              While every effort is made to ensure accuracy, the journal does not accept liability for any 
              errors, omissions, or consequences arising from the use of information published on the 
              website or in print.
          </p>

          <h2>2. Author Responsibility</h2>
          <ul>
              <li>Authors are solely responsible for the originality, accuracy, and integrity of their work.</li>
              <li>Manuscripts are assumed to be original, properly cited, and free from plagiarism.</li>
              <li>Proper permissions for third-party figures or data remain the author’s responsibility.</li>
          </ul>

          <h2>3. No Professional Advice</h2>
          <p>
              Contents published in WISDOM are intended solely for academic and research purposes. 
              They should not be construed as legal, professional, or medical advice. Readers are 
              advised to verify any information independently before acting upon it.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
              Neither WISDOM, its editors, nor its publisher shall be held liable for any direct, 
              indirect, incidental, or consequential damages arising out of the use of the website 
              or reliance on any information provided in the journal.
          </p>

          <h2>5. External Links</h2>
          <p>
              Our website may contain links to third-party databases for reference or citation purposes. 
              WISDOM does not control or assume responsibility for the content, privacy policies, 
              or practices of any external sites.
          </p>

          <h2>6. Contact</h2>
          <p>
              For concerns regarding this disclaimer, please contact: **editorial@wisdomj.in**
          </p>
      </section>
    </PolicyLayout>
  );
}
