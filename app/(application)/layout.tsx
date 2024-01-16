import { NavBar } from '@/components/nav-bar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      {children}
    </div>
  );
}
