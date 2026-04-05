import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'COPE Ethics and Malpractice Statement - WISDOM Journal',
  description: "WISDOM Journal's publication ethics and malpractice statement aligned with COPE guidelines.",
};

export default function CopeEthicsPage() {
  return (
    <PolicyLayout 
      title="COPE Ethics & Malpractice" 
      subtitle="Commitment to ethical publishing standards as per COPE guidelines"
    >
      <section>
          <h2>1. Purpose</h2>
          <p>
              The Journal of WISDOM is committed to upholding the highest standards of publication ethics 
              and ensuring the integrity of academic work. This statement is based on the 
              **Committee on Publication Ethics (COPE)** and defines the ethical behavior 
              expected of authors, editors, and reviewers.
          </p>

          <h2>2. Duties and Responsibilities of Authors</h2>
          <ul>
              <li>Submissions must be original, unpublished, and not under consideration elsewhere.</li>
              <li>Plagiarism, data fabrication, and falsification are strictly prohibited.</li>
              <li>Proper citation and acknowledgment of all third-party work is mandatory.</li>
              <li>Disclosure of conflicts of interest or financial support is required for every manuscript.</li>
              <li>Authors must notify the Editor immediately if significant errors are discovered post-publication.</li>
          </ul>

          <h2>3. Duties and Responsibilities of Editors</h2>
          <ul>
              <li>Editors make unbiased decisions based solely on academic merit and research relevance.</li>
              <li>Ensuring a fair, confidential, and transparent double-blinded peer review process.</li>
              <li>Investigating every ethical complaint or allegation of misconduct promptly.</li>
              <li>Upholding the strict confidentiality of both author and reviewer identities.</li>
          </ul>

          <h2>4. Duties and Responsibilities of Reviewers</h2>
          <ul>
              <li>Reviewers must provide objective, confidential, and constructive evaluations within agreed timeframes.</li>
              <li>Identifying relevant uncited work and reporting ethical concerns or plagiarism to the editor.</li>
              <li>Declaring any conflict of interest and recusing themselves from the review if necessary.</li>
          </ul>

          <h2>5. Misconduct Handling</h2>
          <p>
              Allegations of unethical behavior are investigated strictly according to COPE guidelines. 
              Proven misconduct results in immediate retraction, publication bans, and institutional notification. 
              WISDOM maintains full documentation of all complaints and corrective actions.
          </p>
      </section>
    </PolicyLayout>
  );
}
