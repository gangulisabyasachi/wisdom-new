import Link from 'next/link';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';


export const metadata = {
  title: 'Archives | All Volumes & Issues - WISDOM Journal',
  description: 'Browse all published volumes and issues of WISDOM Journal. Access double-blinded peer-reviewed research articles from multidisciplinary fields.',
};

export default async function ArchivesPage({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const selected_volume = parseInt(params.volume) || 0;
  const selected_issue = parseInt(params.issue) || 0;

  let volumes = [];
  let issues = [];
  let articles = [];
  let total_pages = 0;
  let bib_month_range = '';
  let bib_year = '';
  let global_total_articles = 0;

  try {
    await connectDB();
    global_total_articles = await Journal.countDocuments();

    // Get unique volumes for the first dropdown
    volumes = await Journal.distinct('volume');
    volumes = volumes.filter(v => v).sort((a, b) => b - a); // Descending

    // If a volume is selected, get its available issues
    if (selected_volume > 0) {
      issues = await Journal.find({ volume: selected_volume }).distinct('issue');
      issues = issues.filter(i => i).sort((a, b) => a - b); // Ascending
    }

    // If both are selected, fetch the articles
    if (selected_volume > 0 && selected_issue > 0) {
      const issueArticles = await Journal.find({ volume: selected_volume, issue: selected_issue })
        .sort({ page: 1, published_date: 1 })
        .lean();

      articles = issueArticles.map(a => ({
        topic: a.topic || '',
        slug: a.slug || '',
        authors: a.authors || '',
        page: a.page || ''
      }));

      // Find published year/month from the first article in this issue
      if (issueArticles.length > 0 && issueArticles[0].published_date) {
        const d = new Date(issueArticles[0].published_date);
        bib_year = d.getFullYear().toString();
        bib_month_range = d.toLocaleString('en-US', { month: 'long' });
      }

      // Calculate max page
      articles.forEach(art => {
        if (!art.page) return;
        const match = art.page.match(/-(\d+)$/);
        if (match) {
          const endPage = parseInt(match[1]);
          if (endPage > total_pages) total_pages = endPage;
        } else {
          const singlePage = parseInt(art.page);
          if (!isNaN(singlePage) && singlePage > total_pages) total_pages = singlePage;
        }
      });
    }
  } catch (err) {
    console.error("Failed to load archives:", err);
  }

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Archives</h1>
          <p>Browse all published issues and research articles from WISDOM Journal</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="content-card" style={{ marginBottom: '3rem' }}>
            <h2>Published Issues</h2>
            <p>Access the full archive of WISDOM: A multidisciplinary double-blinded peer-reviewed journal, including all volumes, issues, and scholarly articles.</p>
            
            <form action="/archives" method="GET">
              <div className="archive-dropdown">
                <select name="volume" defaultValue={selected_volume || ""} style={{ padding: '0.5rem', width: '200px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="">Select Volume</option>
                  {volumes.map(vol => (
                    <option key={vol} value={vol}>Volume {vol}</option>
                  ))}
                </select>

                <div className="issue-dropdown" style={{ display: selected_volume > 0 ? 'inline-block' : 'none', marginLeft: '1rem' }}>
                  <select name="issue" defaultValue={selected_issue || ""} style={{ padding: '0.5rem', width: '200px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Select Issue</option>
                    {issues.map(iss => (
                      <option key={iss} value={iss}>Issue {iss}</option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" style={{ marginLeft: '1rem', padding: '0.55rem 1.5rem', background: '#930a17', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {selected_volume > 0 ? 'Show Results' : 'Proceed to Issues'}
                </button>
              </div>
            </form>
          </div>

          {/* Articles List */}
          {selected_volume > 0 && selected_issue > 0 && (
            <div className="content-card">
              <div className="issue-list">
                {bib_year && bib_month_range && (
                  <h3 style={{ color: '#930a17', marginBottom: '1rem' }}>
                    WISDOM, Volume {selected_volume}, Issue {selected_issue}, {bib_month_range}, {bib_year}
                  </h3>
                )}

                <h3>Volume {selected_volume}, Issue {selected_issue}</h3>
                <p>{articles.length} Articles | Pages 1–{total_pages > 0 ? total_pages : 'N/A'}</p>
                <div style={{ marginTop: '1rem' }}>
                  {articles.length > 0 ? (
                    articles.map((article, idx) => (
                      <div key={idx} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                        <Link href={`/${article.slug}`} className="article-link" style={{ color: '#1d4ed8', fontSize: '1.1rem', fontWeight: '600', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>
                          {article.topic}
                        </Link>
                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>
                          {article.authors} | Pages {article.page}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>No articles found for this issue.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Publication Statistics */}
          <div style={{ marginTop: '3rem' }}>
            <div className="content-grid">
              <div className="content-card">
                <h3>Publication Statistics</h3>
                <div style={{ color: '#666', lineHeight: '1.8' }}>
                  <p><strong>Total Articles Published:</strong> {global_total_articles}</p>
                  <p><strong>Acceptance Rate:</strong> 35%</p>
                  <p><strong>Average Review Time:</strong> 4 weeks</p>
                  <p><strong>International Authors:</strong> 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
