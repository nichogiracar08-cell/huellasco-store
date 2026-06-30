import { getProducts } from '@/lib/shopify/client';
import Hero            from '@/components/home/Hero';
import ProblemSolution from '@/components/home/ProblemSolution';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import CatalogSection  from '@/components/home/CatalogSection';
import TrustSection    from '@/components/home/TrustSection';

export const revalidate = 3600;

export default async function HomePage() {
  const products      = await getProducts(1, 'no-store').catch(() => []);
  const featuredProduct = products[0] ?? null;

  return (
    <>
      <Hero product={featuredProduct} />
      <ProblemSolution />
      <FeaturedProduct product={featuredProduct} />
      <CatalogSection />
      <TrustSection />
    </>
  );
}
