'use client';

import React from 'react';

const MAX_CHAR = 1000;

export function ReadMoreWrapper({ text }: { text: string | undefined }) {
  if (!text) return null;
  const [readMore, setReadMore] = React.useState<boolean>(true);

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
