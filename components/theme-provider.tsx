'use client';

import { useEffect } from 'react';

export function ThemeProvider({
  primaryColor,
  children,
}: {
  primaryColor: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty('--brand', primaryColor);
  }, [primaryColor]);

  return <>{children}</>;
}
