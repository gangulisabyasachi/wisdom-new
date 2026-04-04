export const metadata = {
  title: 'Peer Review Policy - WISDOM Journal',
  description: 'WISDOM Journal follows a rigorous double-blinded peer review process. At least two expert reviewers. Fully COPE-compliant.',
};

export default function PeerReviewPolicyPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Peer Review Policy</h1>
                <p>Rigorous, transparent, and ethical double-blinded peer review process</p>
            </div>
        </section>

        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. Purpose of Peer Review</h2>
                    <p>Double-blinded Peer review is a cornerstone of scholarly publishing. WISDOM follows a rigorous
                        double-blinded peer review
                        process to ensure the quality, originality, and academic integrity of all works published. The
                        objective is to maintain high research standards while promoting fairness, transparency, and
                        constructive academic dialogue.</p>

                    <h2>2. Type of Peer Review</h2>
                    <p>WISDOM employs a <strong>double-blinded peer review system</strong>, where both the author(s) and
                        the reviewers remain anonymous to each other throughout the review process. This method ensures
                        impartial evaluation based on scholarly merit alone.</p>

                    <h2>3. Selection of Reviewers</h2>
                    <p>Reviewers are selected based on their subject expertise, academic credentials, and research
                        experience. The Editorial Board ensures there are no conflicts of interest between reviewers and
                        authors. Each manuscript is sent to <strong>at least two qualified reviewers</strong>.</p>

                    <h2>4. Review Process</h2>
                    <ul>
                        <li>After initial screening by the editorial board for relevance and originality, manuscripts
                            are sent to external reviewers.</li>
                        <li>Reviewers evaluate the paper’s methodology, originality, ethical compliance, argumentation,
                            and contribution to the discipline.</li>
                        <li>Reviewers may recommend acceptance, revision, or rejection.</li>
                        <li>The editorial team communicates reviewer feedback to the author(s) for revision where
                            necessary.</li>
                    </ul>

                    <h2>5. Timeframe</h2>
                    <p>The double-blinded peer review process generally takes between <strong>four to eight
                            weeks</strong>, depending
                        on reviewer availability and response times. Authors are informed of delays if the review
                        extends beyond this period.</p>

                    <h2>6. Confidentiality</h2>
                    <p>All manuscripts under review are treated as <strong>confidential documents</strong>. Reviewers
                        are not permitted to discuss or share the manuscript’s content with others or use any part of it
                        for their personal research.</p>

                    <h2>7. Ethical Considerations</h2>
                    <p>The Journal adheres to the <strong>Committee on Publication Ethics (COPE)</strong> guidelines.
                        Any suspected plagiarism, falsified data, or unethical conduct will result in rejection or
                        withdrawal of the article. Reviewers are instructed to report such issues immediately to the
                        editorial office.</p>

                    <h2>8. Reviewer Recognition</h2>
                    <p>WISDOM acknowledges the academic contribution of its reviewers. Their names may be listed
                        annually on the website or in a dedicated acknowledgment section unless anonymity is requested.
                    </p>

                    <h2>9. Appeals and Reconsideration</h2>
                    <p>Authors who wish to appeal an editorial decision may submit a written request to the editorial
                        office providing justification and evidence. Appeals are reviewed objectively by the Editorial
                        Board or by an independent reviewer.</p>

                    <h2>10. Editorial Decision</h2>
                    <p>The final decision to accept or reject a manuscript rests solely with the <strong>Editorial
                            Board</strong>, based on reviewer recommendations and compliance with journal standards.</p>

                    <hr style="margin: 2.5rem 0; border: none; border-top: 1px solid #e5e7eb;">

                    <p style="font-size: 0.9rem; color: #666; text-align: center;">
                        <strong>WISDOM</strong> | EE 73/5, Salt Lake, Kolkata – 700091, India<br>
                        Email: <a href="mailto:editorial@wisdomj.in" style="color: #2563eb;">editorial@wisdomj.in</a>
                    </p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
