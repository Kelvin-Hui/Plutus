import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5">
      <FaceFrownIcon className="h-40 w-40 " />
      <h1 className="text-3xl">No symbol matched</h1>
      <h6>Please Check Your Spelling / Use The SearchBar</h6>
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
