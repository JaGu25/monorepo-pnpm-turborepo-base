import '@repo/ui/styles.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Notes App',
  description: 'Simple notes application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
