export const metadata = {
  title: 'Payment Terms & Conditions - WISDOM Journal',
  description: 'Official APC payment terms for WISDOM Journal. No submission fees. Transparent, secure payment via official channels only.',
};

export default function PaymentTermsPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Payment Terms & Conditions</h1>
                <p>Article Processing Charge (APC) payment guidelines</p>
            </div>
        </section>
        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. General Overview</h2>
                    <p>The Journal of WISDOM operates on a non-commercial academic model that prioritizes the
                        dissemination of scholarly knowledge. While publication is not contingent upon payment, the
                        journal collects a nominal Article Processing Charge (APC) from authors of accepted papers to
                        support the cost of digital publication, website maintenance, DOI registration, indexing, and
                        long-term archiving.</p>

                    <h2>2. Applicability of Charges</h2>
                    <ul>
                        <li>The APC becomes applicable only after an article has been formally accepted for publication
                            following double-blinded peer review and editorial approval.</li>
                        <li>Submission, double-blinded peer review, or editorial evaluation do not require any prior or
                            advance
                            payment.</li>
                        <li>The amount of the APC is communicated to the author(s) via the official journal email (<a
                                href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a>) upon acceptance.</li>
                    </ul>

                    <h2>3. Mode of Payment</h2>
                    <ul>
                        <li>All payments must be made electronically through the official payment options provided by
                            the journal, such as bank transfer, UPI, or other approved digital platforms.</li>
                        <li>Payment details and instructions are provided only through official correspondence from
                            <strong>editorial@wisdomj.in</strong>.
                        </li>
                        <li>Authors are advised not to make payments to any third-party or individual account not listed
                            on the official website.</li>
                    </ul>

                    <h2>4. Payment Confirmation</h2>
                    <p>After payment, authors are required to send a proof of transaction (receipt or screenshot) to the
                        editorial email for verification. The journal will issue an official payment acknowledgment via
                        email within seven (7) working days of receipt.</p>

                    <h2>5. Non-Refundable Nature</h2>
                    <p>As outlined in the Refund Policy, APCs are generally non-refundable, as they are used to support
                        journal operations, including editorial management, digital hosting, and archiving. Refunds will
                        be granted only in exceptional cases where a paper has been accepted but not published due to
                        editorial or technical reasons.</p>

                    <h2>6. Currency and Taxes</h2>
                    <ul>
                        <li>All payments must be made in <strong>Indian Rupees (INR)</strong> for domestic authors and
                            <strong>US Dollars (USD)</strong> or equivalent for international contributors.
                        </li>
                        <li>Any applicable bank transfer fees, transaction charges, or currency conversion costs must be
                            borne by the author.</li>
                        <li>The journal does not charge additional taxes beyond the APC unless required by law.</li>
                    </ul>

                    <h2>7. Author Responsibility</h2>
                    <p>Authors are responsible for ensuring accurate payment details and confirming that the transaction
                        has been successfully processed. The journal will not be held liable for delays or errors caused
                        by third-party payment systems.</p>

                    <h2>8. Dispute Resolution</h2>
                    <p>Any payment-related dispute must be raised in writing to <a
                            href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a> within 15 days of the payment
                        date, along with transaction proof. The decision of the Editorial Board of WISDOM in resolving
                        such disputes shall be final and binding.</p>

                    <h2>9. Amendment of Terms</h2>
                    <p>The Journal of WISDOM reserves the right to revise, modify, or update the Payment Terms &
                        Conditions at any time. All changes will be posted on the official journal website and will take
                        effect immediately upon publication.</p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
