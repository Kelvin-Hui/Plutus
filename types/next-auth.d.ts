import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  id: string;
  username?: string;
  cash?: number;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    user: ExtendedUser;
  }
}
