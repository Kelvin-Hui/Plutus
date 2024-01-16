import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const SignOutButton = () => {
  return (
    <form
      className="display:none"
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" className="w-full">
        <div className="flex text-red-600">
          Sign Out
          <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
        </div>
      </button>
    </form>
  );
};

export async function UserAvatar({
  showUserRelated,
}: {
  showUserRelated: boolean;
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  if (!isLoggedIn || !showUserRelated) {
    return (
      <Link href="/login">
        <Button variant="outline">Login / Signup</Button>
      </Link>
    );
  }

  const username = session?.user.username;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback>
              {session?.user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Welcome {username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="select-auto" asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
