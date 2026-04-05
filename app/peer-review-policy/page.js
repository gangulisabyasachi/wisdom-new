import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Peer Review Policy - WISDOM Journal',
  description: 'WISDOM Journal follows a rigorous double-blinded peer review process. At least two expert reviewers. Fully COPE-compliant.',
};

export default function PeerReviewPolicyPage() {
  return (
    <PolicyLayout 
      title="Peer Review Policy" 
      subtitle="Rigorous, transparent, and ethical double-blinded peer review process"
    >
      <section>
          <h2>1. Purpose of Peer Review</h2>
          <p>
              Double-blinded Peer review is a cornerstone of scholarly publishing. WISDOM follows a rigorous 
              double-blinded peer review process to ensure the quality, originality, and academic integrity 
              of all works published. The objective is to maintain high research standards while promoting 
              fairness, transparency, and constructive academic dialogue.
          </p>

          <h2>2. Type of Peer Review</h2>
          <p>
              WISDOM employs a **double-blinded peer review system**, where both the author(s) and 
              the reviewers remain anonymous to each other throughout the review process. This method 
              ensures impartial evaluation based on scholarly merit alone.
          </p>

          <h2>3. Selection of Reviewers</h2>
          <p>
              Reviewers are selected based on their subject expertise, academic credentials, and research 
              experience. The Editorial Board ensures there are no conflicts of interest between reviewers 
              and authors. Each manuscript is sent to **at least two qualified reviewers**.
          </p>

          <h2>4. Review Process</h2>
          <ul>
              <li>Initial screening by the editorial board for relevance and originality.</li>
              <li>Evaluation of methodology, originality, ethical compliance, and argumentation.</li>
              <li>Reviewers recommend acceptance, revision, or rejection based on scientific merit.</li>
              <li>Feedback is communicated to authors for mandatory revisions if necessary.</li>
          </ul>

          <h2>5. Timeframe</h2>
          <p>
              The double-blinded peer review process generally takes between **four to eight weeks**, 
              depending on reviewer availability. Authors are updated if the review extends beyond this period.
          </p>

          <h2>6. Confidentiality</h2>
          <p>
              All manuscripts under review are treated as **confidential documents**. Reviewers are 
              prohibited from discussing or sharing the manuscript’s content with others.
          </p>

          <h2>7. Ethical Considerations</h2>
          <p>
              The Journal adheres to the **Committee on Publication Ethics (COPE)** guidelines. 
              Any suspected plagiarism or unethical conduct results in immediate rejection.
          </p>
      </section>
    </PolicyLayout>
  );
}
