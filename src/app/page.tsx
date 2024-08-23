'use client';
import { Button } from '@/components/atomics/Button';
import { Header } from '@/components/compounds/Header';
import { Form } from '@/components/compounds/Form';

import { useEmailInputQuery } from '@/reactQuery/Login/emailInputQuery';
import { QueryClient } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();
  const emailMutation = useEmailInputQuery();
  return (
    <>
      <Header />
      <Button label="계속" onClick={() => emailMutation.mutate()} />
    </>
  );
}
