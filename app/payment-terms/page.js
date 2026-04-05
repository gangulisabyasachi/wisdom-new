import PolicyLayout from '../components/PolicyLayout';

export const metadata = {
  title: 'Payment Terms & Conditions - WISDOM Journal',
  description: 'Official APC payment terms for WISDOM Journal. No submission fees. Transparent, secure payment via official channels only.',
};

export default function PaymentTermsPage() {
  return (
    <PolicyLayout 
      title="Payment Terms & Conditions" 
      subtitle="Article Processing Charge (APC) payment and security guidelines"
    >
      <section>
          <h2>1. General Overview</h2>
          <p>
              The Journal of WISDOM operates on a non-commercial academic model. While publication is 
              not contingent upon payment, we collect a nominal **Article Processing Charge (APC)** from 
              authors of accepted papers to support digital publication, website maintenance, 
              indexing, and long-term archiving.
          </p>

          <h2>2. Applicability of Charges</h2>
          <ul>
              <li>APC is only applicable **after** a manuscript has been formally accepted following double-blinded peer review.</li>
              <li>Submission and editorial evaluation do **not** require any prior payment.</li>
              <li>Official APC amounts are communicated exclusively via **editorial@wisdomj.in**.</li>
          </ul>

          <h2>3. Mode of Payment</h2>
          <p>
              All payments must be made electronically through official channels (Bank Transfer, UPI, 
              or approved digital platforms). Instructions are provided only through official 
              correspondence. Authors must not make payments to any individual or third-party account.
          </p>

          <h2>4. Payment Confirmation</h2>
          <p>
              After transaction, authors must send a proof of payment (receipt/screenshot) to the 
              editorial email. An official acknowledgment will be issued within seven (7) working days.
          </p>

          <h2>5. Currency & Taxes</h2>
          <ul>
              <li>**Domestic Authors:** Payments in Indian Rupees (INR).</li>
              <li>**International Contributors:** Payments in US Dollars (USD) or equivalent.</li>
              <li>Transaction charges or currency conversion costs must be borne by the author.</li>
          </ul>

          <h2>6. Non-Refundable Nature</h2>
          <p>
              As per our Refund Policy, APCs are generally non-refundable once utilized for 
              editorial management and digital hosting. Refunds are only granted in exceptional 
              cases of non-publication due to editorial reasons.
          </p>

          <h2>7. Dispute Resolution</h2>
          <p>
              Payment-related disputes must be raised in writing within 15 days of the transaction. 
              The decision of the **Editorial Board of WISDOM** shall be final.
          </p>
      </section>
    </PolicyLayout>
  );
}
