'use client';

import { usePathname } from 'next/navigation';
import AppBar from './Appbar';

export default function AppBarWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';
  const isLoginPage = pathname === '/authentication';
  return <AppBar isHomePage={isHomePage} isShow={!isLoginPage}/>;
}