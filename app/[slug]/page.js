import Link from 'next/link';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';

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
        pubMonthRange = d.toLocaleString('en-US', { month: 'long' }); // Adjust if you want ranges
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
      <main className="container" style={{ padding: '6rem 0', textAlign: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '3rem', color: '#1e293b' }}>404 Not Found</h1>
        <p style={{ color: '#666', marginTop: '1rem' }}>The requested article does not exist.</p>
        <Link href="/" style={{ display: 'inline-block', margin: '2rem 0', padding: '0.8rem 1.5rem', background: '#1e40af', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>Back to Home</Link>
      </main>
    );
  }

  return (
        <main>
            <section className="content-section">
                <div className="container">
                    <div className="article-content" style={{ minHeight: '60vh' }}>
                        <h1 style={{ marginTop: '2.5rem', color: '#930a17' }}>{article.title}</h1>
                        <div className="article-meta" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.5rem', margin: '1.5rem 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem' }}>Article Information</h3>
                            <div className="meta-item"><strong style={{ color: '#1e40af', width: '140px', display: 'inline-block' }}>Authors:</strong> {article.authors}</div>
                            <div className="meta-item"><strong style={{ color: '#1e40af', width: '140px', display: 'inline-block' }}>Affiliations:</strong> {article.affiliations}</div>
                            <div className="meta-item">
                                <strong style={{ color: '#1e40af', width: '140px', display: 'inline-block' }}>Bibliographic:</strong> WISDOM, Volume {article.volume}, Issue {article.issue}, {article.month_range}, {article.year}
                            </div>
                            <div className="meta-item"><strong style={{ color: '#1e40af', width: '140px', display: 'inline-block' }}>Published:</strong> {article.published_date}</div>
                            <div className="meta-item"><strong style={{ color: '#1e40af', width: '140px', display: 'inline-block' }}>Pages:</strong> {article.page}</div>
                            <div className="meta-item keywords-item" style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed #cbd5e1' }}>
                                <strong style={{ color: '#1e40af', display: 'block' }}>Keywords:</strong>
                                <span style={{ color: '#555' }}>{article.keywords.join(", ")}</span>
                            </div>
                        </div>

                        <div className="abstract-box" style={{ background: '#fefce8', borderLeft: '5px solid #ca8a04', borderRadius: '0 8px 8px 0', padding: '1.5rem', margin: '2rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '1rem', lineHeight: '1.7', color: '#1f2937' }}>
                            <h2 style={{ color: '#930a17', margin: '0 0 1rem', fontSize: '1.3rem' }}>Abstract</h2>
                            <p>{article.abstract}</p>
                        </div>

                        <h2 style={{ color: '#930a17', fontSize: '1.5rem', marginTop: '2rem' }}>Full Text</h2>
                        <div className="article-body" style={{ lineHeight: '1.8', fontSize: '16px', color: '#222' }} dangerouslySetInnerHTML={{ __html: article.body }}>
                        </div>

                        <div className="citation-box" style={{ background: '#f0fdf4', borderLeft: '5px solid #166534', padding: '1.5rem', margin: '2rem 0', borderRadius: '0 8px 8px 0'}}>
                            <h4 style={{ color: '#930a17', margin: '0 0 0.5rem' }}>How to Cite</h4>
                            <div className="citation-text" style={{ fontStyle: 'italic', color: '#5b4a00' }}>
                                {article.citation}
                            </div>
                        </div>

                        {article.pdf_path ? (
                            <div className="pdf-box" style={{ margin: '30px 0', padding: '20px', border: '2px solid #1e40af', backgroundColor: '#eff6ff', textAlign: 'center', borderRadius: '8px' }}>
                                <h4 style={{ color: '#1e40af', margin: '0 0 15px', fontSize: '1.2rem' }}>Download Article</h4>
                                <a href={article.pdf_path.startsWith('http') || article.pdf_path.startsWith('/') ? article.pdf_path : `/${article.pdf_path}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#930a17', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                                    View / Download PDF
                                </a>
                            </div>
                        ) : (
                            <div className="pdf-box missing-pdf" style={{ margin: '30px 0', padding: '20px', border: '2px solid #ccc', backgroundColor: '#f3f4f6', textAlign: 'center', borderRadius: '8px' }}>
                                <h4 style={{ color: '#666', margin: '0 0 10px' }}>No PDF Available</h4>
                                <p className="pdf-info" style={{ margin: 0 }}>The PDF file for this article has not been uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
  );
}
