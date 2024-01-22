'use client';

import { useLayoutEffect, useState } from 'react';

const mobileDeviceQuery = '(max-width : 400px)';

export function useIsMobileView() {
  const [isMobileView, setIsMobileView] = useState(false);

  useLayoutEffect(() => {
    function handleOnChange(event: MediaQueryListEvent) {
      setIsMobileView(event.matches);
    }

    const result = matchMedia(mobileDeviceQuery);
    result.addEventListener('change', handleOnChange);
    setIsMobileView(result.matches);

    return () => {
      result.removeEventListener('change', handleOnChange);
    };
  });

  return isMobileView;
}
