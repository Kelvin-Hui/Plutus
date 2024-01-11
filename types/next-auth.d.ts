import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  username: string;
  id: string;
  cash: number;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
