export const metadata = {
  title: 'COPE Ethics and Malpractice Statement - WISDOM Journal',
  description: "WISDOM Journal's publication ethics and malpractice statement aligned with COPE guidelines.",
};

export default function CopeEthicsPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>COPE Ethics and Malpractice Statement</h1>
                <p>Commitment to ethical publishing standards</p>
            </div>
        </section>
        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. Purpose</h2>
                    <p>The Journal of WISDOM is committed to upholding the highest standards of publication ethics and
                        ensuring the integrity of academic work. This statement is based on the principles of the
                        <strong>Committee on Publication Ethics (COPE)</strong> and defines the ethical behavior
                        expected of all parties involved in the publication process — authors, editors, reviewers, and
                        publishers.
                    </p>

                    <h2>2. Duties and Responsibilities of Authors</h2>
                    <ul>
                        <li>Authors must ensure that their submissions are original works and not under consideration
                            elsewhere.</li>
                        <li>Any form of plagiarism, data fabrication, falsification, or duplicate submission is strictly
                            prohibited.</li>
                        <li>Proper citation and acknowledgment of others’ work must be ensured.</li>
                        <li>Authors must disclose any conflicts of interest or financial support that could influence
                            their findings.</li>
                        <li>Authors are responsible for obtaining all necessary permissions for reproducing third-party
                            materials (e.g., images, tables, or text).</li>
                        <li>If an author discovers a significant error in their published work, they must immediately
                            notify the Editor to facilitate correction or retraction.</li>
                    </ul>

                    <h2>3. Duties and Responsibilities of Editors</h2>
                    <ul>
                        <li>Editors are responsible for making unbiased publication decisions based solely on the
                            academic merit, originality, and relevance of submitted works.</li>
                        <li>Editors must ensure a fair, confidential, and transparent double-blinded peer review process,
                            free from
                            discrimination based on gender, ethnicity, or political beliefs.</li>
                        <li>Editors shall not use unpublished information for personal advantage.</li>
                        <li>Any ethical complaint or allegation of misconduct will be investigated promptly, and
                            corrective action (such as retraction or erratum) will be taken when necessary.</li>
                        <li>Editors must uphold the confidentiality of author and reviewer identities in the
                            double-blinded review process.</li>
                    </ul>

                    <h2>4. Duties and Responsibilities of Reviewers</h2>
                    <ul>
                        <li>Reviewers must conduct objective, confidential, and constructive evaluations.</li>
                        <li>They are expected to identify relevant published work not cited by the author(s) and report
                            any potential ethical concerns or plagiarism to the editor.</li>
                        <li>Reviewers must declare any conflict of interest that may affect their impartiality and
                            recuse themselves when necessary.</li>
                        <li>Reviews must be completed within the agreed timeframe to support timely editorial decisions.
                        </li>
                    </ul>

                    <h2>5. Duties and Responsibilities of the Publisher</h2>
                    <ul>
                        <li>The publisher of WISDOM ensures that good practice in ethics and integrity is maintained
                            throughout the publication process.</li>
                        <li>The publisher assists in communications with other journals or publishers if misconduct is
                            alleged or proven.</li>
                        <li>In cases of ethical disputes, the publisher adheres to COPE’s flowcharts and procedures for
                            resolution.</li>
                    </ul>

                    <h2>6. Misconduct Handling and Investigation</h2>
                    <p>Allegations of unethical behaviour will be investigated according to COPE guidelines. Proven
                        cases of misconduct may result in retraction, publication ban, or notification to relevant
                        authorities or institutions. The journal maintains full documentation of complaints and the
                        actions taken in response.</p>

                    <h2>7. Transparency and Integrity</h2>
                    <p>WISDOM commits to academic transparency, integrity, and accountability. All editorial decisions
                        and corrections will be publicly documented to preserve the trust of the academic community.</p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
