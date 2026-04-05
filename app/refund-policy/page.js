import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Refund Policy - WISDOM Journal',
  description: 'WISDOM Journal refund policy: APC is non-refundable after acceptance, except in rare cases where an accepted article is not published. Transparent, fair, and author-friendly policy.',
  keywords: 'WISDOM journal refund policy, APC refund, article processing charge refund, publication fee refund, no refund after acceptance, transparent journal policy',
  alternates: {
    canonical: 'https://www.wisdomj.in/refund-policy',
  },
  openGraph: {
    title: 'Refund Policy – WISDOM Journal',
    description: 'WISDOM Journal APC refund policy: Non-refundable after acceptance, except if an accepted article is not published. Transparent, fair, and author-friendly.',
    url: 'https://www.wisdomj.in/refund-policy',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal – Refund Policy',
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

export default function RefundPolicyPage() {
  return (
    <PolicyLayout 
      title="Refund Policy" 
      subtitle="Transparent guidelines regarding Article Processing Charges (APC)"
    >
      <section>
          <h2>1. Introduction</h2>
          <p>
              WISDOM follows a fair and transparent publication policy designed to promote scholarly communication. 
              As a non-commercial entity, we charge a nominal **Article Processing Charge (APC)** solely to 
              support the maintenance of our digital, editorial, and web infrastructure.
          </p>

          <h2>2. Article Processing Charges (APC)</h2>
          <p>
              The APC is only applicable for manuscripts approved for publication after successful 
              double-blinded peer review. Payment is never a condition for acceptance; the primary 
              objective remains the dissemination of high-quality academic work.
          </p>

          <h2>3. Non-Refundable Nature</h2>
          <p>
              Since the APC is immediately utilized to cover operational costs, digital hosting, and 
              editorial coordination, it is treated as a **non-refundable contribution**. Once 
              payment is made following official acceptance, no refund will ordinarily be issued.
          </p>

          <h2>4. Exceptions (Non-Publication)</h2>
          <p>
              A refund may only be considered if, for unforeseen technical or editorial reasons, 
              an accepted scholarly work is **not published** in the Journal despite prior approval. 
              In such exceptional cases, authors may submit a formal written claim.
          </p>

          <h2>5. Procedure for Refund Claim</h2>
          <p>Requests must be sent from the registered submission email to **editorial@wisdomj.in**, including:</p>
          <ul>
              <li>Full name of the primary and co-authors.</li>
              <li>Official title of the manuscript.</li>
              <li>Date of transaction and digital proof of payment.</li>
              <li>Valid bank account details for processing.</li>
          </ul>

          <h2>6. Finality of Decision</h2>
          <p>
              All refund decisions are evaluated by the **Editorial Board of WISDOM** and are final 
              and binding. Approved refunds will be processed via the original payment mode.
          </p>
      </section>
    </PolicyLayout>
  );
}
