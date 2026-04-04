export const metadata = {
  title: 'Terms & Conditions - WISDOM Journal',
  description: 'Official Terms & Conditions of WISDOM Journal governing website use, manuscript submission, publication, and content access.',
};

export default function TermsConditionsPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Terms & Conditions</h1>
                <p>Governing the use of WISDOM journal website, submissions, and publications</p>
            </div>
        </section>

        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <p class="meta-info"><strong>Journal Name:</strong> WISDOM<br>
                        <strong>Office Address:</strong> EE 73/5, Salt Lake, Kolkata – 700091, India<br>
                        <strong>Email:</strong> <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a>
                    </p>

                    <h2>1. Introduction</h2>
                    <p>Welcome to <strong>WISDOM</strong> (“the Journal,” “we,” “our,” or “us”). These Terms and
                        Conditions govern your use of our website <a href="http://www.wisdomj.in">www.wisdomj.in</a>
                        and all associated services, including manuscript submission, double-blinded peer review,
                        publication, and
                        content access. By using this site, you agree to be bound by these Terms. If you do not agree,
                        please do not use this website.</p>

                    <h2>2. Ownership and Administration</h2>
                    <p>WISDOM is an independent, open-access academic journal published by its editorial board and
                        managed from its registered office at <strong>EE 73/5, Salt Lake, Kolkata – 700091,
                            India</strong>. The Journal’s operations, including double-blinded peer review, publication,
                        and digital
                        hosting, are conducted in accordance with globally accepted academic publishing norms and the
                        standards of ISSN, Google Scholar, and Scopus.</p>

                    <h2>3. Eligibility and User Conduct</h2>
                    <p>By using this website, you agree to:</p>
                    <ul>
                        <li>Submit only original, unpublished work that complies with academic and ethical standards.
                        </li>
                        <li>Not engage in plagiarism, copyright violation, or duplicate publication.</li>
                        <li>Refrain from uploading or sharing any content that is defamatory, obscene, or unlawful.</li>
                        <li>Use journal materials solely for academic and educational purposes, not for commercial
                            resale.</li>
                    </ul>

                    <h2>4. Intellectual Property</h2>
                    <p>All content published on WISDOM, including articles, reviews, and artwork, is protected under
                        applicable copyright laws. Authors retain copyright of their work under the <strong>Creative
                            Commons Attribution (CC BY 4.0) License</strong> unless otherwise specified. Users may share
                        and reuse material with appropriate citation and credit to the author(s) and journal.</p>

                    <h2>5. Disclaimer of Liability</h2>
                    <p>The views expressed in published articles are those of the authors and do not necessarily
                        represent the views of the editors, reviewers, or publisher. WISDOM assumes no liability for
                        errors, omissions, or any consequences arising from the use of published content.</p>

                    <h2>6. Revision of Terms</h2>
                    <p>WISDOM reserves the right to revise or update these Terms and Conditions at any time without
                        prior notice. Users are encouraged to review this page regularly to stay informed of changes.
                    </p>

                    <h2>7. Governing Law</h2>
                    <p>These Terms and Conditions are governed by and construed in accordance with the laws of India.
                        Any disputes shall be subject to the exclusive jurisdiction of the courts at Kolkata, West
                        Bengal.</p>

                    <h2>8. Contact Information</h2>
                    <p>For any queries regarding these Terms and Conditions, please contact:<br>
                        <strong>Email:</strong> <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a><br>
                        <strong>Address:</strong> EE 73/5, Salt Lake, Kolkata – 700091, India
                    </p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
