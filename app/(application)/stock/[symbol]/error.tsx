'use client';

import { Button } from '@/components/ui/button';
import { FlagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5">
      <FlagIcon className="h-40 w-40 " />
      <h1 className="text-3xl">Something Went Wrong</h1>
      <Button onClick={() => reset()}>Try again</Button>
      <Link
        key="backToDashboard"
        href="/dashboard"
        className="text-bold text-green-400 underline"
      >
        Return Dashboard
      </Link>
    </main>
  );
}
