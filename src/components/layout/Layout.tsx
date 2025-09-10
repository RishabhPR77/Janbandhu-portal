import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Navbar />
      <main className="w-full p-6">
        {children}
      </main>
    </div>
  );
}