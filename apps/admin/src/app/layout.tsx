import '@repo/ui/styles.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Notes Admin',
  description: 'Administrative panel for notes management',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
