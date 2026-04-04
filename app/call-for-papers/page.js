export const metadata = {
  title: 'Call for Papers - WISDOM Journal',
  description: 'Submit to WISDOM Journal: Double-blinded peer review, multidisciplinary submissions.',
};

export default function CallForPapersPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header" data-testid="submission-page">
            <div class="container">
                <h1 data-testid="text-submission-title">Call for Papers</h1>
                <p data-testid="text-submission-subtitle" style="text-align: justify;">
                    WISDOM welcomes <b>original</b>, <b>high-quality</b>, and <b>unpublished research contributions</b>
                    from academicians, researchers, professionals, students, and individuals with a keen interest in
                    law, social sciences, humanities, management, or allied disciplines. Authors are requested to follow
                    the below guidelines carefully to ensure uniformity and smooth processing of submissions.
                </p>
            </div>
        </section>

        <section class="content-section">
            <div class="container">
                <div class="guidelines-grid">
                    <div class="guideline-section">
                        <div class="guideline-card">
                            <div class="guideline-header">
                                <span class="step-number">1</span>
                                <h3>Manuscript Preparation</h3>
                            </div>
                            <ul class="guideline-list" data-testid="list-manuscript-preparation">
                                <li>Font: <b>Times New Roman</b></li>
                                <li>Font Size: <b>Title (13, Bold, Centered, Title Case), Author's Name & Affiliation (12, Italic, Right Alignment), Main Text (11, Justified)</b></li>
                                <li>Line Spacing: <b>1.15</b></li>
                                <li>Margins: <b>1 inch on all sides</b></li>
                                <li>Alignment: <b>Justified</b></li>
                                <li>Length: <b>Research Articles (2,500-3,000 words, including references), Book reviews, case notes, short communications (1,500-2,000 words)</b></li>
                                <li>Submit in Microsoft Word (.doc/.docx) format</li>
                                <li>Include abstract (150-200 words) with 5 keywords</li>
                            </ul>
                        </div>

                        <div class="guideline-card">
                            <div class="guideline-header">
                                <span class="step-number">2</span>
                                <h3>Review Process</h3>
                            </div>
                            <ul class="guideline-list" data-testid="list-review-process">
                                <li>Double-blinded peer review</li>
                                <li>Review process: 6-10 weeks</li>
                                <li>Plagiarism check mandatory (below 10%)</li>
                                <li>AI-generated text prohibited</li>
                                <li>Ethics approval required for human subjects</li>
                                <li>Editorial board reserves right to reject papers</li>
                            </ul>
                        </div>

                        <div class="guideline-card">
                            <div class="guideline-header">
                                <span class="step-number">3</span>
                                <h3>Manuscript Structure</h3>
                            </div>
                            <ul class="guideline-list">
                                <li>Cover page with title, author(s)' name(s), designation, institutional affiliation, email, contact number</li>
                                <li>Abstract (150-200 words) with 5 keywords</li>
                                <li>Main text starting from second page</li>
                                <li>Introduction with literature review</li>
                                <li>Methodology section</li>
                                <li>Results and analysis</li>
                                <li>Discussion and conclusions</li>
                                <li>References in OSCOLA format</li>
                            </ul>
                        </div>
                    </div>

                    <div class="guideline-section">
                        <div class="guideline-card">
                            <div class="guideline-header">
                                <span class="step-number">4</span>
                                <h3>Submission Requirements</h3>
                            </div>
                            <ul class="guideline-list" data-testid="list-submission-requirements">
                                <li>Cover letter with research significance</li>
                                <li>Author biographical statements</li>
                                <li>Conflict of interest declaration</li>
                                <li>Data availability statement</li>
                                <li>Copyright transfer agreement</li>
                                <li>Ethics committee approval (if applicable)</li>
                                <li>Maximum of three authors per manuscript</li>
                            </ul>
                        </div>

                        <div class="guideline-card">
                            <div class="guideline-header">
                                <span class="step-number">5</span>
                                <h3>Types of Submissions</h3>
                            </div>
                            <ul class="guideline-list">
                                <li>Long Articles/Research Articles: <b>2,500-3,000 words (excluding footnotes)</b></li>
                                <li>Short Articles/Essays: <b>1,500-2,000 words (excluding footnotes)</b></li>
                                <li>Case Notes and Commentaries: <b>1,500-2,000 words</b></li>
                                <li>Word limits may be relaxed at Editorial Board's discretion</li>
                                <li>Submissions must be original and unpublished</li>
                                <li>Not under review elsewhere</li>
                            </ul>
                        </div>

                        <div class="submission-cta">
                            <h3 data-testid="text-ready-submit">Ready to Submit?</h3>
                            <p data-testid="text-submit-description">
                                Submit your manuscript through our online submission system. Ensure all requirements are met before submission.
                            </p>
                            <a href="https://forms.gle/3wqdvAt5XR8h5hBJ6" target="_blank" class="btn-primary" style="display:inline-block; text-decoration:none;" data-testid="button-submit-manuscript">Submit Manuscript</a>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 3rem;">
                    <div class="content-card">
                        <h3>Publication Timeline</h3>
                        <div class="content-grid">
                            <div>
                                <h4 style="color: #2563eb; margin-bottom: 1rem;">Submission to First Decision</h4>
                                <ul>
                                    <li><span class="bullet"></span>Initial editorial screening: 1-2 weeks</li>
                                    <li><span class="bullet"></span>Peer review process: 4-6 weeks</li>
                                    <li><span class="bullet"></span>Editorial decision: 6-10 weeks</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="color: #2563eb; margin-bottom: 1rem;">Acceptance to Publication</h4>
                                <ul>
                                    <li><span class="bullet"></span>Author revisions: 2-4 weeks</li>
                                    <li><span class="bullet"></span>Final review: 1-2 weeks</li>
                                    <li><span class="bullet"></span>Copyediting and proofing: 2-3 weeks</li>
                                    <li><span class="bullet"></span>Online publication: 1 week</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="margin-top: 2rem;">
                        <h3>Ethical and Copyright Policies</h3>
                        <ul class="guideline-list">
                            <li>Submissions must be original, unpublished, and not under review elsewhere</li>
                            <li>Plagiarism must be below 10%, checked via detection software</li>
                            <li>AI-generated text is strictly prohibited</li>
                            <li>Authors retain copyright, grant WISDOM first publication rights</li>
                            <li>Articles licensed under Creative Commons Attribution 4.0 International License (CC BY 4.0)</li>
                            <li>Unethical behaviour (e.g., plagiarism, data fabrication) leads to rejection and blacklisting</li>
                        </ul>
                    </div>

                    <div class="content-card" style="margin-top: 2rem;">
                        <h3>Perks</h3>
                        <ul class="guideline-list">
                            <li>All published authors receive an official E-Certificate of Publication</li>
                        </ul>
                    </div>
                    
                    <div class="content-card" style="margin-top: 2rem;">
                        <h3>Article Processing Charge (APC)</h3>
                        <ul class="guideline-list">
                            <li><b>Submission:</b> No fee is required at the submission stage.</li>
                            <li><b>Article Processing Charge (APC) for Indian Citizen:</b> An APC of ₹599 is payable after acceptance and before online publication.</li>
                            <li><b>Article Processing Charge (APC) for Foreign Citizen:</b> An APC of $10 is payable after acceptance and before online publication.</li>
                            <li><b>Printed Copy Charges For Indian Citizen:</b> Single Author: A total of ₹599 (APC) + ₹999 (printing)<br>Co-authors: An additional ₹299 will be charged (APC) + ₹859 (printing) for each co-author</li>
                            <li><b>Printed Copy Charges For Foreign Citizen:</b> Single Author: A total of $10 (APC) + $10 (printing)<br>Co-authors: An additional $5 will be charged (APC) + $9 (printing) for each co-author</li>
                            <li><b>For Foreign Citizen: Delivery charges are to be paid in extra.</b></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    ` }} />
  );
}
