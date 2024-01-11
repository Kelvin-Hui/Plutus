'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { TabsContent } from '@radix-ui/react-tabs';

import { LoginForm } from './components/login-form';
import { SignupForm } from './components/signup-form';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col items-center justify-center">
              <ArrowTrendingUpIcon className="h-24 w-24" />
              <h1 className="font-sanif text-8xl font-bold">Plutus</h1>
              <span className="text-lg text-muted-foreground">
                Welcome! Sign In To Continue
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Login">
            <TabsList className="mb-8 grid w-[500px] grid-cols-2">
              <TabsTrigger value="Login">Login</TabsTrigger>
              <TabsTrigger value="Signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="Login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="Signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
