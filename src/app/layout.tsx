import type { Metadata } from 'next';
import './globals.scss';
import AuthSession from './_component/AuthSession';
import { MSW } from './_component/MSW';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSW />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
