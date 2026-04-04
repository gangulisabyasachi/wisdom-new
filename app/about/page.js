export const metadata = {
  title: 'About WISDOM | Multidisciplinary Double-Blinded Peer-Reviewed Journal',
  description: 'WISDOM is a double-blinded peer-reviewed multidisciplinary journal published by Jayasree Publications, promoting high-quality research.',
};

export default function AboutPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header" data-testid="about-page">
            <div class="container">
                <h1 data-testid="text-about-title">About WISDOM</h1>
                <p data-testid="text-about-subtitle" style="text-align: justify;">
                    WISDOM is a multidisciplinary, double-blinded peer-reviewed journal dedicated to the advancement of
                    knowledge, research, and academic excellence across diverse fields of study. Published by Jayasree
                    Publications, the journal provides a vibrant platform for scholars, researchers, and practitioners
                    to share original research, critical analyses, and innovative ideas that contribute to the growth of
                    interdisciplinary scholarship.<br>
                    The Editorial Board of WISDOM comprises eminent academicians and experts from various disciplines,
                    ensuring the highest standards of academic integrity, objectivity, and quality in every publication.
                    The journal welcomes contributions from across the humanities, social sciences, law, management,
                    science, and technology, encouraging intellectual dialogue and collaboration among scholars
                    worldwide.<br>
                    Through its commitment to rigorous double-blinded peer review, ethical publication practices, and academic
                    inclusivity, WISDOM seeks to promote impactful research that inspires thought, fosters innovation,
                    and drives academic progress.

                </p>

                <div class="content-card" style="margin-top: 3rem; background-color: #f9f9f9; padding: 1.5rem; border-left: 4px solid #930a17;">
                    <h3>Journal Information</h3>
                    <ul>
                        <li><strong>Starting Year:</strong> 2025</li>
                        <li><strong>Frequency:</strong> Quarterly</li>
                        <li><strong>Publication Format:</strong> Online & Printed</li>
                        <li><strong>ISSN (Print):</strong> 3108-0499</li>
                        <li><strong>ISSN (Online):</strong> Applied for</li>
                        <li><strong>Subject:</strong> Multidisciplinary</li>
                        <li><strong>Language:</strong> English</li>
                        <li><strong>Publisher:</strong> Jayasree Publications, EE 73/5 Salt Lake Kolkata 700 091 Bidhannagar</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="content-section">
            <div class="container">
                <div class="content-grid">
                    <div class="content-card">
                        <h3 data-testid="text-scope-title">Journal Scope</h3>
                        <p data-testid="text-scope-description">
                            WISDOM is a double blinded folded peer-reviewed multidisciplinary research journal dedicated
                            to advancing high-quality scholarly work across the fields of law, social sciences,
                            humanities, management, science, and technology. The journal provides a global platform for
                            researchers, academicians, and professionals to share original research papers, critical
                            reviews, case studies, and innovative perspectives. By encouraging interdisciplinary
                            scholarship, WISDOM bridges gaps between diverse academic domains, fostering fresh insights
                            and new discoveries. </p>
                    </div>

                    <div class="content-card">
                        <h3 data-testid="text-aims-title">Aims & Objectives</h3>
                        <p data-testid="text-scope-description">
                            The primary aim of WISDOM is to promote the dissemination of scholarly knowledge and
                            encourage academic dialogue among researchers worldwide. Its key objectives include:</p>
                        <ul>
                            <li data-testid="aim-excellence">
                                <span class="check-icon">✓</span>
                                Publishing original, high-quality, and impactful research in multiple disciplines.
                            </li>
                            <li data-testid="aim-collaboration">
                                <span class="check-icon">✓</span>
                                Encouraging interdisciplinary collaboration to address contemporary global challenges.
                            </li>
                            <li data-testid="aim-standards">
                                <span class="check-icon">✓</span>
                                Supporting young researchers and scholars by providing them an inclusive platform to
                                showcase their work.
                            </li>
                            <li data-testid="aim-access">
                                <span class="check-icon">✓</span>
                                Enhancing academic standards through a rigorous double-blinded peer review process.
                            </li>
                            <li data-testid="aim-access">
                                <span class="check-icon">✓</span>
                                Contributing to the development of a knowledge-based society by making cutting-edge
                                research accessible.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="content-grid" style="margin-top: 3rem;">
                    <div class="content-card">
                        <h3>Publication Ethics</h3>
                        <p>
                            WISDOM adheres strictly to the highest ethical standards of academic publishing. The journal
                            follows the guidelines of the Committee on Publication Ethics (COPE) to ensure transparency,
                            fairness, and integrity.
                        </p>
                        <ul>
                            <li>
                                <span class="bullet"></span>
                                Authors must ensure that submissions are original, plagiarism-free, and unpublished
                                elsewhere.
                            </li>
                            <li>
                                <span class="bullet"></span>
                                Editors are committed to unbiased decision-making, ensuring confidentiality and quality.
                            </li>
                            <li>
                                <span class="bullet"></span>
                                Reviewers play a crucial role in maintaining scholarly rigor through constructive,
                                objective, and timely feedback.
                            </li>
                            <li>
                                <span class="bullet"></span>
                                Any form of plagiarism, data manipulation, or unethical research practice is strictly
                                prohibited and will result in immediate rejection or retraction.
                                By upholding strong publication ethics, WISDOM ensures that every published article
                                contributes meaningfully to global academic literature.
                            </li>
                        </ul>
                    </div>

                    <div class="content-card">
                        <h3>Vision Statement</h3>
                        <p>
                            The vision of WISDOM is to become a leading international multidisciplinary research journal
                            that inspires academic excellence, nurtures critical inquiry, and drives innovation. WISDOM
                            aspires to:
                        </p>
                        <ul>
                            <li>
                                <span class="bullet"></span>
                                Empower global scholars with a platform for impactful research dissemination.
                            </li>
                            <li>
                                <span class="bullet"></span>
                                Encourage knowledge sharing that transcends disciplinary boundaries.
                            </li>
                            <li>
                                <span class="bullet"></span>
                                Promote research that contributes to social progress, sustainable development, and
                                intellectual growth.
                                With a commitment to quality, inclusivity, and innovation, WISDOM envisions itself as a
                                trusted source of scholarly WISDOM for future generations.

                            </li>
                            <li>
                                <span class="bullet"></span>
                                Any form of plagiarism, data manipulation, or unethical research practice is strictly
                                prohibited and will result in immediate rejection or retraction.
                                By upholding strong publication ethics, WISDOM ensures that every published article
                                contributes meaningfully to global academic literature.
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    ` }} />
  );
}
