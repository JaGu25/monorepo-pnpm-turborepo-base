import { ReactNode } from 'react';

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>{title}</h1>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}
