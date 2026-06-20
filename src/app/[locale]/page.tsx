import LandingPage from '@/components/views/LandingPage';
import FAQSchema from '@/components/seo/FAQSchema';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export default function Home() {
  return (
    <>
      <WebApplicationSchema />
      <FAQSchema />
      <LandingPage />
    </>
  );
}
