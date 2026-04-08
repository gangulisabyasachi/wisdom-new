import './globals.css';
import ClientLayout from './ClientLayout';
export const metadata = {
  metadataBase: new URL('https://www.wisdomj.in'),
  title: 'WISDOM – A Multidisciplinary Double-Blinded Peer-Reviewed Journal',
  description: 'WISDOM is an international double-blinded peer-reviewed open access journal published by Jayasree Publications. Official ISSN (P): 3108-0499 | ISSN (E): 3108-351X. Editor-in-Chief: Prof (Dr.) Subhrangsu Shekhar Chatterji (Ex-Dean Law, Calcutta University).',
  keywords: 'WISDOM journal, ISSN 3108-0499, ISSN 3108-351X, multidisciplinary journal India, double-blinded peer reviewed journal, open access journal, Jayasree Publications, Prof Subhrangsu Shekhar Chatterji, law journal, social sciences, management research, science journal',
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
  openGraph: {
    title: 'WISDOM – A Multidisciplinary Research Journal (ISSN: 3108-0499, 3108-351X)',
    description: 'WISDOM is a double-blinded peer-reviewed, open access multidisciplinary journal published by Jayasree Publications, fostering global scholarly excellence. Print ISSN: 3108-0499 | Online ISSN: 3108-351X.',
    type: 'website',
    url: '/',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal – Multidisciplinary Academic Excellence',
      },
    ],
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
