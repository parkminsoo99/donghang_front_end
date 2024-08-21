import { Button } from '@/components/atomics/Button';
import { Header } from '@/components/compounds/Header';
import { Form } from '@/components/compounds/Form';
import { DistanceFiltering } from '@/components/compounds/DistanceFiltering';
export default function Home() {
  return (
    <>
      <Button label="계속" />
      <Header />
      <DistanceFiltering />
    </>
  );
}
