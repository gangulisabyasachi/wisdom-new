export const metadata = {
  title: 'Contact Us - WISDOM Journal',
  description: 'Contact the editorial team of WISDOM Journal for manuscript submissions, inquiries, and editorial support.',
};

export default function ContactPage() {
  return (
    <main dangerouslySetInnerHTML={{ __html: `
        <section class="page-header" data-testid="contact-page">
            <div class="container">
                <h1 data-testid="text-contact-title">Contact Us</h1>
                <p data-testid="text-contact-subtitle">
                    Get in touch with our editorial team for inquiries and support
                </p>
            </div>
        </section>

        <section class="content-section">
            <div class="container">
                <div class="contact-grid">
                    <div class="contact-info">
                        <div class="info-card">
                            <h3 data-testid="text-editorial-office">Editorial Office</h3>
                            <div class="contact-item" data-testid="contact-general-inquiries">
                                <span class="icon">✉️</span>
                                <div>
                                    <p style="font-weight: 600; color: #333;">General Inquiries</p>
                                    <p style="color: #666;">editorial@wisdomj.in</p>
                                </div>
                            </div>

                            <div class="contact-item" data-testid="contact-phone">
                                <span class="icon">📞</span>
                                <div>
                                    <p style="font-weight: 600; color: #333;">Phone</p>
                                    <p style="color: #666;">+91-89100 10980</p>
                                </div>
                            </div>

                            <div class="contact-item" data-testid="contact-address">
                                <span class="icon">📍</span>
                                <div>
                                    <p style="font-weight: 600; color: #333;">Address</p>
                                    <p style="color: #666;">
                                        EE 73/5, Salt Lake, Kolkata 700091<br>West Bengal, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="publisher-image">
                        <img src="/images/logo.jpeg" alt="Logo of Wisdom Journal" data-testid="img-publisher-building">
                    </div>
                </div>
            </div>
        </section>
    ` }} />
  );
}
