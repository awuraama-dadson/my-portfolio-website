import { usePageMeta } from '../hooks/usePageMeta';
import { Hero } from '../components/home/Hero';
import { Dimensions } from '../components/home/Dimensions';
import { MoreFromMe } from '../components/home/MoreFromMe';
import { Speaking } from '../components/home/Speaking';
import { Contact } from '../components/home/Contact';

export default function Home() {
  usePageMeta(null);
  return (
    <>
      <Hero />
      <Dimensions />
      <MoreFromMe />
      <Speaking />
      <Contact />
    </>
  );
}
