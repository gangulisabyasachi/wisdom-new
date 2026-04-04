export const metadata = {
  title: 'Disclaimer - WISDOM Journal',
  description: "Official disclaimer of WISDOM Journal: Published content reflects authors' views only.",
};

export default function DisclaimerPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Disclaimer</h1>
                <p>Views expressed are those of authors</p>
            </div>
        </section>
        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. General Disclaimer</h2>
                    <p>The Journal of WISDOM publishes scholarly articles, research papers, reviews, and opinions that
                        represent the independent views of the respective authors. The editorial board, reviewers, and
                        publisher do not necessarily endorse or agree with the opinions, interpretations, or conclusions
                        expressed in any published work.</p>
                    <p>The journal makes every effort to ensure the accuracy and authenticity of the information
                        contained in its publications; however, it does not accept liability for any errors, omissions,
                        or consequences arising from the use of any information published on the website or in print.
                    </p>

                    <h2>2. Author Responsibility</h2>
                    <ul>
                        <li>Authors are solely responsible for the originality, accuracy, and integrity of their work.
                        </li>
                        <li>The journal assumes that all submitted manuscripts are original, properly cited, and free
                            from plagiarism or copyright infringement.</li>
                        <li>Any data, image, table, or figure reproduced from other sources must have the necessary
                            permissions from the copyright holder, which remains the author’s responsibility.</li>
                    </ul>

                    <h2>3. No Legal or Professional Advice</h2>
                    <p>The contents published in WISDOM are intended solely for academic and research purposes. They
                        should not be construed as legal, professional, or medical advice. Readers are advised to verify
                        any information independently before acting upon it.</p>

                    <h2>4. Limitation of Liability</h2>
                    <p>Neither WISDOM, its editors, nor its publisher shall be held liable for any direct, indirect,
                        incidental, or consequential damages arising out of the use of the website, journal content, or
                        reliance on any information provided.</p>

                    <h2>5. External Links</h2>
                    <p>The Journal of WISDOM website may contain links to third-party websites or databases for
                        reference or citation purposes. The journal does not control or assume responsibility for the
                        content, privacy policies, or practices of any external sites linked to or referenced from the
                        journal’s pages.</p>

                    <h2>6. Updates to Disclaimer</h2>
                    <p>The Journal of WISDOM reserves the right to modify or update this Disclaimer at any time without
                        prior notice. All changes will take effect immediately upon publication on the journal website.
                    </p>

                    <h2>7. Contact</h2>
                    <p>For any concerns or clarifications regarding this Disclaimer, please contact:<br>
                        Email: <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a></p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
