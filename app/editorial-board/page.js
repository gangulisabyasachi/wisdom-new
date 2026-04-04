export const metadata = {
  title: 'Editorial Board - WISDOM Journal',
  description: 'Meet the distinguished Editorial Board of WISDOM Journal — led by Prof (Dr.) Subhrangsu Shekhar Chatterji. Includes top academics from global institutions.',
};

export default function EditorialBoardPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header">
            <div class="container">
                <h1>Editorial Board</h1>
                <p>Distinguished scholars and experts leading our double-blinded peer review process</p>
            </div>
        </section>

        <section class="content-section container">
            <h2 class="section-title">Editor-in-Chief</h2>
            <div class="board-grid">
                <div class="member-card">
                    <img src="/images/s-s-chatterjee.jpeg" alt="Prof (Dr.) Subhrangsu Shekhar Chatterji" class="member-image">
                    <h3>Prof (Dr.) Subhrangsu Shekhar Chatterji</h3>
                    <p class="member-position">Editor-in-Chief</p>
                    <p class="member-credentials">PhD (BHU)</p>
                    <p class="member-affiliation">Ex Dean Head and Secretary of Department of Law, University of Calcutta<br>Ex Vice Chancellor, Panchanan Barma University<br>Ex Chairman, West Bengal Public Service Commission</p>
                </div>
            </div>

            <h2 class="section-title">Editorial Board</h2>
            <div class="board-grid">
                <div class="member-card">
                    <img src="/images/sanat-mandal.jpg" alt="Prof (Dr.) Sanat Kumar Mandal" class="member-image">
                    <h3>Prof (Dr.) Sanat Kumar Mandal</h3>
                    <p class="member-credentials">M.Sc. BHU, Ph.D. SC (Indian Association for the Cultivation of Science, Calcutta University)<br>Visiting Scientist (MUN, Canada)<br>Ex. Assistant Professor, Chemistry Department, Memorial University (MUN).<br>Adj. Professor (Bio-medical Sciences, Faculty of Medicine, MUN, and Faculty Member, College of the North Atlantic (CNA)</p>
                    <p class="member-email" style="word-break: break-all;">Profile Link: <a href="https://www.cna.nl.ca/research-and-innovation/profiles/sanat-mandal">https://www.cna.nl.ca/research-and-innovation/profiles/sanat-mandal</a></p>
                    <p class="member-email">Email: sanat.mandal@cna.nl.ca</p>
                    <p class="member-address">1 Prince Phillip Drive PO Box 1693, St. John’s, NL A1C 5P7</p>
                </div>

                <div class="member-card">
                    <img src="/images/probal-chowdhury.jpeg" alt="Prof. Dr. Probal Chowdhury" class="member-image">
                    <h3>Prof. Dr. Probal Chowdhury</h3>
                    <p class="member-credentials">Ph.D. University of California, Berkeley<br>Professor (HAG) Indian Statistical Institute, Kolkata</p>
                    <p class="member-email" style="word-break: break-all;">Profile Link: <a href="https://www.isical.ac.in/~probal/">https://www.isical.ac.in/~probal/</a></p>
                    <p class="member-email">Email: probal@isical.ac.in</p>
                    <p class="member-address">Indian Statistical Institute, Calcutta 700108</p>
                </div>

                <div class="member-card">
                    <img src="/images/debashis-sengupta.jpeg" alt="Prof. (Dr.) Debasis Sengupta" class="member-image">
                    <h3>Prof. (Dr.) Debasis Sengupta</h3>
                    <p class="member-credentials">PhD ISI Kolkata<br>Professor (HAG) Indian Statistical Institute, Kolkata</p>
                    <p class="member-email">Email: sdebasis@isical.ac.in</p>
                    <p class="member-email" style="word-break: break-all;">Profile Link: <a href="https://www2.isical.ac.in/~asu/faculty.html">https://www2.isical.ac.in/~asu/faculty.html</a></p>
                    <p class="member-address">Indian Statistical Institute, Calcutta 700108</p>
                </div>

                <div class="member-card">
                    <img src="/images/sraboni-gupta.jpeg" alt="Dr. Sraboni Gupta, PhD, LL.M." class="member-image">
                    <h3>Dr. Sraboni Gupta, PhD, LL.M.</h3>
                    <p class="member-credentials">Associate Professor, Heritage Law College, affiliated to the University of Calcutta</p>
                    <p class="member-address">Heritage Law College, University of Calcutta, Kolkata</p>
                </div>

                <div class="member-card">
                    <img src="/images/saptarshi-goswami.jpeg" alt="Dr. Saptarsi Goswami" class="member-image">
                    <h3>Dr. Saptarsi Goswami</h3>
                    <p class="member-credentials">Assistant Professor & HoD - Computer Science<br>Bangabasi Morning College, Affiliated to the University of Calcutta</p>
                    <p class="member-email">Email: sgakc@caluniv.ac.in</p>
                    <p class="member-email" style="word-break: break-all;">Profile Link: <a href="https://bit.ly/4qsXS4c">https://bit.ly/4qsXS4c</a></p>
                </div>

                <div class="member-card">
                    <img src="/images/joydip-ghosal.jpeg" alt="Sri Joydip Ghoshal" class="member-image">
                    <h3>Sri Joydip Ghoshal</h3>
                    <p class="member-credentials">LLM, MA<br>Assistant Professor, Heritage Law College, affiliated to the University of Calcutta</p>
                    <p class="member-address">Heritage Law College, University of Calcutta, Kolkata</p>
                </div>

                <div class="member-card">
                    <img src="/images/siddharta-agarwal.jpeg" alt="Dr. Siddhartha Agarwal" class="member-image">
                    <h3>Dr. Siddhartha Agarwal</h3>
                    <p class="member-credentials">PhD, Engineering Management & Systems at Missouri University of Science & Technology, USA<br>Assistant Professor, IITISM, Dhanbad<br>Mining Engineering</p>
                    <p class="member-email">Email: sagarwal@iitism.ac.in</p>
                    <p class="member-email" style="word-break: break-all;">Profile Link: <a href="https://www.iitism.ac.in/faculty-details?faculty=sagarwal">https://www.iitism.ac.in/faculty-details?faculty=sagarwal</a></p>
                    <p class="member-address">IIT ISM(Dhanbad), Dhanbad - 826004</p>
                </div>

                <div class="member-card">
                    <img src="/images/dev-narayan-sarkar.jpeg" alt="Dr. Dev Narayan Sarkar" class="member-image">
                    <h3>Dr. Dev Narayan Sarkar</h3>
                    <p class="member-credentials">PhD in Business Management (CU)<br>Senior VP, Godrej Interio, Godrej & Boyce</p>
                    <p class="member-address">Godrej Interio, Godrej & Boyce, Mumbai</p>
                </div>

                <div class="member-card">
                    <img src="/images/prithwish-ganguli.jpg" alt="Prithwish Ganguli, Advocate" class="member-image">
                    <h3>Prithwish Ganguli, Advocate</h3>
                    <p class="member-position">Managing Editor</p>
                    <p class="member-credentials">LLM (CU), MA in Criminology (NALSAR), MA in Sociology (SRU), MA in Psychology (SGVU)</p>
                </div>
            </div>

            <h2 class="section-title">Editorial Board Responsibilities</h2>
            <div class="responsibilities-box">
                <ul>
                    <li>Ensuring the journal publishes original, high-quality, double-blinded peer-reviewed scholarly content while maintaining academic independence and guarding against unethical practices.</li>
                    <li>Defining and reviewing the journal's aims, scope, and editorial policies to ensure consistency, diversity, and thematic coherence.</li>
                    <li>Overseeing a transparent, fair, and timely double-blinded peer-review process, selecting qualified reviewers, and addressing conflicts of interest.</li>
                    <li>Upholding publication ethics, managing misconduct, ensuring compliance with research ethics, and correcting or retracting papers when necessary.</li>
                    <li>Maintaining transparency by publicly listing editorial board details, decision-making processes, and ensuring regular publication with accurate ISSN metadata.</li>
                    <li>Ensuring fair treatment of authors, timely communication, and supporting open access or transparent subscription policies.</li>
                    <li>Maintaining metadata accuracy and compliance with indexing standards (Scopus, Google Scholar) to ensure accessibility and discoverability.</li>
                    <li>Evaluating journal performance, encouraging editor and reviewer training, and overseeing strategic growth for inclusion in major databases.</li>
                </ul>
            </div>
        </section>
    ` }} />
  );
}
