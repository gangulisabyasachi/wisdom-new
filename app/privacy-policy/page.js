import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Privacy Policy - WISDOM Journal',
  description: 'WISDOM Journal privacy policy: We collect only necessary academic data for manuscript handling and publication.',
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout 
      title="Privacy Policy" 
      subtitle="Protecting your data with transparency and academic security"
    >
      <section>
          <h2>1. Introduction</h2>
          <p>
              WISDOM (“we,” “our,” or “the Journal”) values your privacy and is committed to protecting the 
              personal information of our authors, reviewers, and readers. This policy explains how we 
              collect, use, and store your data in compliance with **GDPR**, **COPE**, and global 
              indexing standards (**ISSN**, **Google Scholar**, **Scopus**).
          </p>

          <h2>2. Information We Collect</h2>
          <ul>
              <li>**Personal details:** Name, institutional affiliation, designation, and contact credentials.</li>
              <li>**Manuscript data:** Article title, abstract, keywords, ORCID ID, and reference metadata.</li>
              <li>**Reviewer data:** Areas of expertise and double-blinded peer review evaluations.</li>
              <li>**Technical data:** IP address and browser type for site security and analytics.</li>
          </ul>

          <h2>3. Data Usage Protocol</h2>
          <p>Your data is processed solely for scholarly operations:</p>
          <ul>
              <li>Managing double-blinded peer review and editorial workflows.</li>
              <li>Publishing accepted manuscript metadata for global discovery.</li>
              <li>Maintaining citation tracking and bibliometric integrity.</li>
          </ul>
          <p><strong>We never sell or share personal data with third parties for commercial gain.</strong></p>

          <h2>4. Data Security & SSL</h2>
          <p>
              We use secure servers and **SSL encryption** to prevent unauthorized access. Only authorized 
              editorial personnel can access user data, and all such access is bound by strict 
              confidentiality agreements.
          </p>

          <h2>5. Cookies & Analytics</h2>
          <p>
              Our website uses cookies to enhance usability and track anonymized usage statistics (e.g., Google Analytics). 
              You may disable cookies in your browser settings, though some site functions may be affected.
          </p>

          <h2>6. Your Rights</h2>
          <p>
              In accordance with GDPR, users have the right to access, correct, or request deletion of 
              their personal data. Requests should be sent directly to **editorial@wisdomj.in**.
          </p>

          <h2>7. Policy Updates</h2>
          <p>
              This policy is updated periodically to reflect changes in global data regulations. 
              The latest version is always accessible via the WISDOM footer.
          </p>
      </section>
    </PolicyLayout>
  );
}
