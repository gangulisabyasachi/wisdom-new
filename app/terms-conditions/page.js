import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Terms & Conditions - WISDOM Journal',
  description: 'Official Terms & Conditions of WISDOM Journal governing website use, manuscript submission, publication, and content access.',
};

export default function TermsConditionsPage() {
  return (
    <PolicyLayout 
      title="Terms & Conditions" 
      subtitle="Governing the use of WISDOM journal website, submissions, and publications"
    >
      <section>
          <h2>1. Introduction</h2>
          <p>
              Welcome to **WISDOM** (“the Journal,” “we,” “our,” or “us”). These Terms and Conditions 
              govern your use of our website [www.wisdomj.in](http://www.wisdomj.in) and all associated 
              services, including manuscript submission, double-blinded peer review, and content access. 
              By using this site, you agree to be bound by these Terms.
          </p>

          <h2>2. Ownership & Administration</h2>
          <p>
              WISDOM is an independent, open-access academic journal managed from its registered office 
              at **EE 73/5, Salt Lake, Kolkata – 700091, India**. Technical and editorial operations 
              comply with globally accepted academic publishing norms and ISSN standards.
          </p>

          <h2>3. Eligibility and User Conduct</h2>
          <ul>
              <li>Submit only original, unpublished work that complies with academic ethical standards.</li>
              <li>Plagiarism, copyright violation, and duplicate publication are strictly prohibited.</li>
              <li>Refrain from uploading defamatory, obscene, or unlawful scholarly content.</li>
              <li>Use journal materials solely for academic and educational purposes, not for commercial resale.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
              All content published on WISDOM is protected under applicable copyright laws. Authors retain 
              copyright under the **Creative Commons Attribution (CC BY 4.0) License**. Users may 
              share and reuse material provided appropriate citation and credit are given.
          </p>

          <h2>5. Disclaimer of Liability</h2>
          <p>
              Views expressed in published articles are those of the authors and do not necessarily 
              represent the views of the editors or publisher. WISDOM assumes no liability for errors, 
              omissions, or consequences arising from the use of published content.
          </p>

          <h2>6. Governing Law</h2>
          <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of India. 
              Any disputes shall be subject to the exclusive jurisdiction of the courts at Kolkata, West Bengal.
          </p>

          <h2>7. Contact Information</h2>
          <p>
              For any queries regarding these Terms, please contact: **editorial@wisdomj.in**
          </p>
      </section>
    </PolicyLayout>
  );
}
