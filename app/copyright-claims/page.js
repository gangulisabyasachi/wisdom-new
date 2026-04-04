export const metadata = {
  title: 'Copyright Infringement Claims Policy - WISDOM Journal',
  description: 'Official copyright infringement claims policy for WISDOM Journal. How to report unauthorized use of published articles.',
};

export default function CopyrightClaimsPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Copyright Infringement Claims Policy</h1>
                <p>Reporting unauthorized use of published content</p>
            </div>
        </section>
        <section class="content-section">
            <div class="container">
                <div class="content-card">
                    <h2>1. Copyright Ownership</h2>
                    <p>All articles published in WISDOM remain the sole copyright property of their respective authors.
                        Authors grant the journal a non-exclusive right to publish, archive, and distribute their work
                        online and in print. This means authors retain full rights over their content and may share,
                        reproduce, or reuse it elsewhere with proper citation to WISDOM as the original place of
                        publication.</p>
                    <p>All published works are licensed under the <strong>Creative Commons Attribution 4.0 International
                            License (CC BY 4.0)</strong>.<br>
                        This allows others to read, share, and use the material freely for academic purposes, provided
                        that proper credit is given to the original author(s) and the source is clearly mentioned.</p>

                    <h2>2. Author Responsibility</h2>
                    <ul>
                        <li>Authors are responsible for ensuring their work is original and does not violate any
                            existing copyright or intellectual property rights.</li>
                        <li>If the work includes material (such as text, figures, or images) from other sources, the
                            author must obtain prior written permission and provide proper acknowledgment.</li>
                        <li>The journal is not liable for any legal disputes arising from copyright violations committed
                            by authors.</li>
                    </ul>

                    <h2>3. Filing a Copyright Infringement Claim</h2>
                    <p>If you believe that your copyrighted material has been used or published in WISDOM without
                        authorization, you may send a written complaint including:</p>
                    <ul>
                        <li>Your full name and contact details</li>
                        <li>The title and author of the article in question</li>
                        <li>Proof of ownership of the copyrighted content</li>
                        <li>Details of the alleged infringement</li>
                        <li>A brief statement of good faith that your claim is genuine</li>
                    </ul>
                    <p>Send all complaints to:<br>
                        <strong>Email:</strong> <a href="mailto:editorial@wisdomj.in">editorial@wisdomj.in</a><br>
                        <strong>Subject line:</strong> Copyright Claim – [Article Title][ Vol no and Issue no]
                    </p>

                    <h2>4. Investigation and Resolution</h2>
                    <ul>
                        <li>The editorial team will review the complaint and acknowledge receipt within seven (7)
                            working days.</li>
                        <li>The author(s) of the concerned article will be informed and given a chance to respond.</li>
                        <li>If the complaint is found valid, the journal will take appropriate action such as removing
                            or correcting the article.</li>
                        <li>A written outcome will be shared with both parties, and the decision of the Editorial Board
                            will be final.</li>
                    </ul>

                    <h2>5. False or Misleading Claims</h2>
                    <p>Filing a false or malicious copyright claim is not permitted. Any such attempt may result in
                        legal or administrative action.</p>

                    <h2>6. Policy Updates</h2>
                    <p>This policy may be updated periodically to comply with changing laws or best publishing
                        practices. All updates will be published on the official WISDOM website.</p>
                </div>
            </div>
        </section>
    ` }} />
  );
}
