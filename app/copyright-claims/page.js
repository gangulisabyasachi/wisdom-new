import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Copyright Infringement Claims Policy - WISDOM Journal',
  description: 'Official copyright infringement claims policy for WISDOM Journal. How to report unauthorized use of published articles.',
};

export default function CopyrightClaimsPage() {
  return (
    <PolicyLayout 
      title="Copyright Infringement Claims" 
      subtitle="Official protocols for reporting unauthorized use of scholarly content"
    >
      <section>
          <h2>1. Copyright Ownership</h2>
          <p>
              All articles published in WISDOM remain the sole copyright property of their respective authors. 
              Authors grant the journal a non-exclusive right to publish, archive, and distribute their work. 
              This means authors retain full rights over their content and may share or reuse it with proper citation.
          </p>
          <p>
              All published works are licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. 
              This allows others to read and use the material freely for academic purposes, provided proper credit is given.
          </p>

          <h2>2. Author Responsibility</h2>
          <ul>
              <li>Authors must ensure their work is original and does not violate third-party intellectual property.</li>
              <li>Prior written permission is required for any figures or text from other copyrighted sources.</li>
              <li>The journal is not liable for legal disputes arising from author-side copyright violations.</li>
          </ul>

          <h2>3. Filing an Infringement Claim</h2>
          <p>
              If you believe your copyrighted material has been published in WISDOM without authorization, 
              please submit a written complaint including:
          </p>
          <ul>
              <li>Full name and contact credentials.</li>
              <li>Title and author of the article in question.</li>
              <li>Formal proof of ownership of the copyrighted content.</li>
              <li>A brief statement of good faith regarding the claim's authenticity.</li>
          </ul>
          <p>
              **Contact:** [editorial@wisdomj.in](mailto:editorial@wisdomj.in)  
              **Subject Line:** Copyright Claim – [Article Title] [Vol/Issue]
          </p>

          <h2>4. Investigation & Resolution</h2>
          <p>
              The editorial team acknowledges receipt within seven (7) working days. The author of the 
              concerned article is informed and given an opportunity to respond. If a claim is found valid, 
              the journal will take immediate corrective action, including potential removal or retraction.
          </p>

          <h2>5. False or Misleading Claims</h2>
          <p>
              Filing malicious or false copyright claims is strictly prohibited and may result in legal or 
              administrative action by the publisher.
          </p>
      </section>
    </PolicyLayout>
  );
}
