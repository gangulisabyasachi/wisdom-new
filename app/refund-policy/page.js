export const metadata = {
  title: 'Refund Policy - WISDOM Journal',
  description: 'WISDOM Journal refund policy: APC is non-refundable after acceptance, except in rare cases where an accepted article is not published.',
};

export default function RefundPolicyPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Refund Policy</h1>
                <p>Article Processing Charges (APC) and refund guidelines</p>
            </div>
        </section>
        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. Introduction</h2>
                    <p>WISDOM follows a fair and transparent publication policy designed to promote the enhancement of
                        academic knowledge and scholarly communication. The Journal operates on a non-commercial basis
                        and charges a nominal Article Processing Charge (APC) only to support the maintenance of
                        editorial, digital, and web infrastructure.</p>

                    <h2>2. Article Processing Charges (APC)</h2>
                    <p>The APC is applicable only for articles that have been approved for publication after successful
                        double-blinded peer review and editorial acceptance. Payment shall never be treated as a condition
                        or
                        constraint for publication. The primary objective of the Journal remains the dissemination of
                        quality academic work and advancement of knowledge.</p>

                    <h2>3. Non-Refundable Nature of APC</h2>
                    <p>Since the APC is utilized to maintain journal operations, online systems, editorial coordination,
                        and digital hosting, it is treated as a non-refundable contribution. Once the payment is made
                        following acceptance of the article, no refund will ordinarily be issued.</p>

                    <h2>4. Exception – Refund on Non-Publication</h2>
                    <p>A refund may only be considered if, for any unforeseen reason, an accepted scholarly work is not
                        published in the Journal despite approval. In such exceptional cases, the author may submit a
                        written claim for a refund.</p>

                    <h2>5. Procedure for Refund Claim</h2>
                    <p>The author must send a refund request from the same email address used during article submission
                        to <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a>, clearly mentioning:</p>
                    <ul>
                        <li>Full name of the author(s)</li>
                        <li>Title of the article</li>
                        <li>Date of payment</li>
                        <li>Proof of transaction</li>
                        <li>Bank account details for refund processing</li>
                    </ul>
                    <p>Upon verification, the editorial board will review the claim and process an approved refund
                        within a reasonable period.</p>

                    <h2>6. Mode of Refund</h2>
                    <p>If a refund is approved, it will be made through the same mode of payment used for the
                        transaction or directly to the bank account specified in the author’s request.</p>

                    <h2>7. Finality of Decision</h2>
                    <p>All decisions regarding refunds will be taken by the Editorial Board of WISDOM and shall be final
                        and binding.</p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
