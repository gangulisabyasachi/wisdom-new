export const metadata = {
  title: 'Open Access Policy - WISDOM Journal',
  description: 'WISDOM is a fully open-access journal. All articles are freely available under Creative Commons CC BY 4.0 license.',
};

export default function OpenAccessPolicyPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Open Access Policy</h1>
                <p>Free global access to all published research</p>
            </div>
        </section>
        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. Commitment to Open Access</h2>
                    <p>WISDOM is a <strong>fully open-access</strong>, double-blinded peer-reviewed academic journal. All
                        research
                        articles, reviews, and scholarly works published in the journal are freely accessible online to
                        readers worldwide without any subscription, login, or payment barriers. This policy aligns with
                        the journal’s vision of promoting the advancement and dissemination of academic knowledge for
                        the benefit of the global scholarly community.</p>

                    <h2>2. Access and Licensing</h2>
                    <p>All content published in WISDOM is distributed under the terms of the <strong>Creative Commons
                            Attribution 4.0 International License (CC BY 4.0)</strong>.<br>
                        Under this license:</p>
                    <ul>
                        <li>Readers are free to read, download, copy, distribute, print, search, or link to the full
                            texts of the articles.</li>
                        <li>Articles may be reused or quoted in part or in full, provided proper citation and
                            acknowledgment of the original author(s) and source are given.</li>
                        <li>No permission is required from the publisher or authors for non-commercial use under the CC
                            BY 4.0 license.</li>
                    </ul>
                    <p>Full license details: <a href="https://creativecommons.org/licenses/by/4.0/"
                            target="_blank">https://creativecommons.org/licenses/by/4.0/</a></p>

                    <h2>3. Archiving and Preservation</h2>
                    <p>To ensure long-term digital preservation, all published articles in WISDOM are archived and
                        indexed through reputable databases and digital repositories. The journal uses secure hosting
                        and backup systems to maintain uninterrupted access to all published materials.</p>

                    <h2>4. Author Rights</h2>
                    <p>Authors retain the copyright of their scholarly work while granting WISDOM the non-exclusive
                        right to publish, distribute, and archive the article in any format or medium. Authors may share
                        and post the final published version on personal websites, institutional repositories, or social
                        platforms with proper citation.</p>

                    <h2>5. Benefits of Open Access</h2>
                    <p>The open-access model adopted by WISDOM:</p>
                    <ul>
                        <li>Enhances the visibility and global reach of authors’ research.</li>
                        <li>Encourages interdisciplinary collaboration and knowledge exchange.</li>
                        <li>Promotes equity in access to academic information regardless of geographical or financial
                            barriers.</li>
                    </ul>

                    <h2>6. Ethical Use and Responsibility</h2>
                    <p>Users of WISDOM content are required to respect the moral rights of authors by citing sources
                        accurately and avoiding plagiarism, misrepresentation, or commercial misuse of published works.
                    </p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
