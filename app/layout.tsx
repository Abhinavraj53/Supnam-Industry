import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { getAllSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sapnam Industry - Aapki Aastha Ka Saarthi | B2B Pujan Products',
  description:
    'Leading B2B marketplace for authentic pujan products including agarbatti, dhoop, kapoor, hawan samagri, gangajal, kumkum, yantra and pujan books. Manufacturer & trader across India.',
  keywords:
    'pujan products, agarbatti wholesale, dhoop, kapoor, hawan samagri, gangajal, kumkum, yantra, pujan books, B2B spiritual products',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let primaryColor = '#f97316';
  try {
    const settings = await getAllSettings();
    primaryColor = settings?.theme?.primaryColor || '#f97316';
  } catch {}

  return (
    <html lang="en">
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider primaryColor={primaryColor}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
