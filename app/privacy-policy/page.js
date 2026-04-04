export const metadata = {
  title: 'Privacy Policy - WISDOM Journal',
  description: 'WISDOM Journal privacy policy: We collect only necessary academic data for manuscript handling and publication.',
};

export default function PrivacyPolicyPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Privacy Policy</h1>
                <p>Protecting your data with transparency and security</p>
            </div>
        </section>

        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <p class="meta-info"><strong>Journal Name:</strong> WISDOM<br>
                        <strong>Office Address:</strong> EE 73/5, Salt Lake, Kolkata – 700091, India<br>
                        <strong>Email:</strong> <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a><br>
                        <strong>Website:</strong> <a href="https://www.wisdomj.in">www.wisdomj.in</a>
                    </p>

                    <h2>1. Introduction</h2>
                    <p>WISDOM (“we,” “our,” “us,” or “the Journal”) values your privacy and is committed to protecting
                        the personal information of our authors, reviewers, readers, and visitors. This Privacy Policy
                        explains how we collect, use, store, and protect your data in compliance with the
                        <strong>General Data Protection Regulation (GDPR)</strong>, <strong>COPE</strong>,
                        <strong>ISSN</strong>, <strong>Google Scholar</strong>, and <strong>Scopus</strong> standards.
                    </p>

                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following personal and non-personal information:</p>
                    <ul>
                        <li><strong>Personal details:</strong> Name, institutional affiliation, designation, email
                            address, contact number.</li>
                        <li><strong>Manuscript-related information:</strong> Author profile, article title, keywords,
                            ORCID ID, and references.</li>
                        <li><strong>Reviewer data:</strong> Name, email, expertise area, and review comments.</li>
                        <li><strong>Website usage data:</strong> IP address, browser type, cookies, and analytics data
                            for improving site performance.</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>Your data is collected and processed solely for academic and operational purposes, including:</p>
                    <ul>
                        <li>Managing manuscript submission and double-blinded peer review.</li>
                        <li>Communicating with authors, reviewers, and editors.</li>
                        <li>Publishing accepted articles and metadata online.</li>
                        <li>Maintaining indexing, citation tracking, and bibliometric services.</li>
                        <li>Enhancing website functionality and reader experience.</li>
                    </ul>
                    <p><strong>We never sell, rent, or share personal data with any third party for commercial
                            purposes.</strong></p>

                    <h2>4. Data Security</h2>
                    <p>We use secure servers, SSL encryption, and password-protected editorial systems to prevent
                        unauthorized access, alteration, or disclosure of personal data. Only authorized editorial
                        personnel can access user data, and all such personnel are bound by confidentiality obligations.
                    </p>

                    <h2>5. Cookies</h2>
                    <p>Our website uses cookies to enhance usability and track anonymized usage statistics (e.g., Google
                        Analytics). You may disable cookies in your browser settings, though some site functions may be
                        affected.</p>

                    <h2>6. Data Retention</h2>
                    <p>Personal data related to submitted manuscripts and reviews is retained for recordkeeping and
                        citation integrity as long as required by indexing databases and academic ethics guidelines.
                        Users may request data correction or deletion where legally permissible.</p>

                    <h2>7. Your Rights</h2>
                    <p>In accordance with GDPR and ethical publication standards, users have the right to:</p>
                    <ul>
                        <li>Access, correct, or delete personal data.</li>
                        <li>Withdraw consent for data processing.</li>
                        <li>Request information on data sharing and storage.</li>
                    </ul>
                    <p>Requests should be sent to <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a>.</p>

                    <h2>8. Third-Party Services</h2>
                    <p>We may link to external scholarly databases (e.g., CrossRef, DOAJ, Google Scholar, Scopus). Each
                        has its own privacy policies, and we encourage users to review them separately.</p>

                    <h2>9. Updates to Policy</h2>
                    <p>This Privacy Policy may be updated periodically to reflect changes in regulations or operational
                        procedures. The latest version will always be available on the WISDOM website.</p>

                    <h2>10. Contact Information</h2>
                    <p>For any concerns regarding privacy or data protection, please contact:<br>
                        Email: <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a><br>
                        Address: EE 73/5, Salt Lake, Kolkata – 700091, India</p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
