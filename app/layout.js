import './globals.css';
import ClientLayout from './ClientLayout';
export const metadata = {
  title: 'WISDOM',
  description: 'WISDOM is an international double-blinded peer-reviewed open access journal published by Jayasree Publications. Editor-in-Chief: Prof (Dr.) Subhrangsu Shekhar Chatterji (Ex-Dean Law, Calcutta University). ISSN under process.',
  keywords: 'WISDOM journal, multidisciplinary journal India, double-blinded peer reviewed journal, open access journal, Jayasree Publications, Prof Subhrangsu Shekhar Chatterji, law journal, social sciences, management research, science journal',
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
  openGraph: {
    title: 'WISDOM – A Multidisciplinary Research Journal',
    description: 'WISDOM is a double-blinded peer-reviewed, open access multidisciplinary journal published by Jayasree Publications, fostering global scholarly excellence across sciences, social sciences, law, management, and more.',
    type: 'website',
    url: 'https://www.wisdomj.in/',
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
