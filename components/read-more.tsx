'use client';

import { useIsMobileView } from '@/hook/use-is-mobile-view';
import React from 'react';

export function ReadMoreWrapper({ text }: { text: string | undefined }) {
  const [readMore, setReadMore] = React.useState<boolean>(true);
  const isMobileView = useIsMobileView();

  const MAX_CHAR = isMobileView ? 250 : 1000;

  if (!text) return null;
  if (text.length <= MAX_CHAR) return text;
  return (
    <>
      {readMore ? text?.slice(0, MAX_CHAR) : text}
      <a
        className="cursor-pointer font-semibold"
        onClick={() => setReadMore(!readMore)}
      >
        {readMore ? ' ...Read More' : ' Show Less'}
      </a>
    </>
  );
}
