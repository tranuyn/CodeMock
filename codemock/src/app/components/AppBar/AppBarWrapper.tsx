'use client';

import { usePathname } from 'next/navigation';
import AppBar from './Appbar';

export default function AppBarWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';
  
  return <AppBar isHomePage={isHomePage} />;
}