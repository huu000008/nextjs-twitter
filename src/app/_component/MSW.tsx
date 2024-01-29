'use client';

import { useEffect } from 'react';

export const MSW = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mock/brower');
      }
    }
  }, []);

  return null;
};
