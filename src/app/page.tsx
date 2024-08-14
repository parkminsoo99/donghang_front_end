import { Button } from '@/components/atomics/Button';
import { Header } from '@/components/compounds/Header';
import { Login } from '@/components/compounds/Form';

export default function Home() {
  return (
    <>
      <Button label="계속" />
      <Header />
      <Login />
    </>
  );
}
