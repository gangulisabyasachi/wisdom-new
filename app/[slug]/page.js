import Link from 'next/link';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import CitationBox from '../components/CitationBox';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const article = await Journal.findOne({ slug }, { topic: 1, abstract: 1, keywords: 1 }).lean();
    if (article) {
      // Truncate abstract for SEO description (exactly 160 chars as requested)
      const cleanAbstract = article.abstract ? article.abstract.replace(/\s+/g, ' ').trim() : '';
      const description = cleanAbstract.length > 160 
        ? cleanAbstract.substring(0, 157) + '...' 
        : cleanAbstract || `Read the full research manuscript "${article.topic}" on WISDOM Journal.`;

      // Combine article keywords with default scholarly keywords
      const defaultKeywords = "WISDOM Journal, peer-reviewed, research manuscript, open access, scholarly publication";
      const combinedKeywords = article.keywords 
        ? `${article.keywords}, ${defaultKeywords}`
        : defaultKeywords;

      return {
        title: `${article.topic} - WISDOM`,
        description: description,
        keywords: combinedKeywords,
        openGraph: {
          title: `${article.topic} - WISDOM`,
          description: description,
          url: `/${slug}`,
          siteName: 'WISDOM Journal',
          images: [
            {
              url: '/images/logo.jpeg',
              width: 1200,
              height: 630,
              alt: `WISDOM Journal Manuscript - ${article.topic}`,
            },
          ],
          locale: 'en_US',
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: `${article.topic} - WISDOM`,
          description: description,
          images: ['/images/logo.jpeg'],
        },
      };
    }
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }
  return { title: 'Article Details - WISDOM' };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  let article = null;

  try {
    await connectDB();
    const rawArticle = await Journal.findOne({ slug }).lean();

    if (rawArticle) {
      let pubDateStr = '';
      let pubMonthRange = '';
      let pubYear = '';

      if (rawArticle.published_date) {
        const d = new Date(rawArticle.published_date);
        pubDateStr = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        pubMonthRange = d.toLocaleString('en-US', { month: 'long' });
        pubYear = d.getFullYear().toString();
      }

      let keywordsArr = [];
      if (rawArticle.keywords) {
        keywordsArr = rawArticle.keywords.split(',').map(k => k.trim());
      }

      article = {
        title: rawArticle.topic || '',
        authors: rawArticle.authors || '',
        affiliations: rawArticle.affiliations || '',
        volume: rawArticle.volume || '',
        issue: rawArticle.issue || '',
        month_range: pubMonthRange,
        year: pubYear,
        doi: rawArticle.doi || '',
        page: rawArticle.page || '',
        published_date: pubDateStr,
        keywords: keywordsArr,
        abstract: rawArticle.abstract || '',
        body: rawArticle.body || '',
        citation: rawArticle.citation || '',
        pdf_path: rawArticle.pdf_path || ''
      };
    }
  } catch (err) {
    console.error("Failed to fetch article:", err);
  }

  if (!article) {
    return (
      <main className="container" style={{ padding: '8rem 0', textAlign: 'center', minHeight: '80vh' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--text-primary)' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.25rem' }}>Electronic manuscript not detected in database.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '3rem' }}>Back to Academic Repository</Link>
      </main>
    );
  }

  // PREPARE SCHOLARLY METADATA (JSON-LD)
  const scholarlySchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": article.title,
    "description": article.abstract,
    "author": article.authors.split(',').map(name => ({
      "@type": "Person",
      "name": name.trim()
    })),
    "datePublished": article.year,
    "publisher": {
      "@type": "Organization",
      "name": "WISDOM Journal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.wisdomj.in/images/logo.jpeg"
      }
    },
    "isPartOf": {
      "@type": "PublicationIssue",
      "issueNumber": article.issue,
      "isPartOf": {
        "@type": "PublicationVolume",
        "volumeNumber": article.volume,
        "isPartOf": {
          "@type": "Periodical",
          "name": "WISDOM Journal",
          "issn": "3108-351X" 
        }
      }
    },
    "pagination": article.page,
    "identifier": article.doi,
    "url": `https://www.wisdomj.in/${slug}`,
    "keywords": article.keywords.join(', ')
  };

  return (
    <main>
      {/* STRUCTURED DATA FOR SEARCH ENGINES */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlySchema) }}
      />
      <PageHero>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
            <Link href="/current-issue" style={{ color: 'var(--accent)' }}>Current Issue</Link>
            <span>/</span>
            <span>Research Manuscript</span>
          </div>
          <h1 className="manuscript-title" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 500, marginBottom: '2.5rem', lineHeight: '1.2' }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem' }}>{article.authors}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '600px' }}>{article.affiliations}</div>
            </div>
            {article.pdf_path && (
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <a
                  href={article.pdf_path.startsWith('http') || article.pdf_path.startsWith('/') ? article.pdf_path : `/${article.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 2rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, boxShadow: '0 10px 30px var(--accent-light)' }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16L7 11H10V4H14V11H17L12 16ZM19 18H5V16H3V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V16H19V18Z" /></svg>
                  Download PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </PageHero>

      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container article-detail-grid">
          <div className="article-main-content">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="abstract-card" style={{ background: 'var(--bg-subtle)', padding: '3rem', borderRadius: '4px', borderLeft: '6px solid var(--accent)', marginBottom: '4rem', boxShadow: 'var(--shadow-md)' }}>
                <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 800 }}>Abstract</h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-primary)', textAlign: 'justify', fontStyle: 'italic', wordBreak: 'break-word', fontFamily: 'var(--font-body)' }}>{article.abstract}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="article-teaser-container shadow-sm">
                <div className="article-body" style={{ textAlign: 'justify', fontSize: '1.05rem', lineHeight: '1.8' }}>
                  <div dangerouslySetInnerHTML={{ __html: article.body }} />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="manuscript-access-card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Limited Preview - Full Access via PDF</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1rem', textAlign: 'justify' }}>
                  You are reading a partial preview of this research manuscript. To view the complete peer-reviewed
                  publication including full references, equations, and supplementary data, please download the official PDF.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {article.pdf_path ? (
                    <a
                      href={article.pdf_path.startsWith('http') || article.pdf_path.startsWith('/') ? article.pdf_path : `/${article.pdf_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.25rem 2.5rem', fontSize: '1rem', boxShadow: '0 15px 35px var(--accent-light)' }}
                    >
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16L7 11H10V4H14V11H17L12 16ZM19 18H5V16H3V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V16H19V18Z" /></svg>
                      Download Full Publication (PDF)
                    </a>
                  ) : (
                    <Link href="/contact" className="btn btn-primary">Request Access from Editor</Link>
                  )}
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Cite this paper: <span style={{ fontStyle: 'italic' }}>{article.citation || article.title}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <aside className="article-sidebar">
            <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <ScrollReveal direction="right" delay={0.4}>
                <div className="beauty-card" style={{ margin: 0 }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Publication Details</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Volume</span>
                      <span style={{ fontWeight: 700 }}>{article.volume}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Issue</span>
                      <span style={{ fontWeight: 700 }}>{article.issue}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Released</span>
                      <span style={{ fontWeight: 700 }}>{article.month_range} {article.year}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Pagination</span>
                      <span style={{ fontWeight: 700 }}>{article.page}</span>
                    </div>
                    {article.doi && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>DOI</span>
                        <a
                          href={`https://doi.org/${article.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontWeight: 700, color: 'var(--accent)', wordBreak: 'break-all', textAlign: 'right', textDecoration: 'underline' }}
                        >
                          {article.doi}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.5}>
                <div className="beauty-card" style={{ margin: 0 }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Keywords</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {article.keywords.map((tag, i) => (
                      <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-subtle)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.6}>
                <CitationBox text={`${article.authors}, '${article.title}' [${article.year}] ${article.volume}(${article.issue}) WISDOM Journal ${article.page}`} />
              </ScrollReveal>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
