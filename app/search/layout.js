export const metadata = {
  title: 'Search - WISDOM Journal',
  description: 'Search all articles, authors, volumes, issues, and keywords published in WISDOM Journal. Find high-quality, peer-reviewed research instantly.',
  keywords: 'WISDOM journal search, peer-reviewed articles, academic research search, multidisciplinary journal India, scholarly articles search, WISDOM volumes issues keywords',
  alternates: {
    canonical: 'https://www.wisdomj.in/search',
  },
  openGraph: {
    title: 'Search Articles – WISDOM Journal',
    description: 'Find all articles, authors, and research published in WISDOM Journal. Search by title, author, volume, issue, year, or keywords.',
    url: 'https://www.wisdomj.in/search',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SearchLayout({ children }) {
  return children;
}
