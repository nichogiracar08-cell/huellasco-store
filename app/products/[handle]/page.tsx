import { getProduct } from '@/lib/shopify/client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetails from './ProductDetails';

export const revalidate = 3600;

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle).catch(() => null);
  if (!product) return {};
  return {
    title: `${product.title} — HuellasCo`,
    description: product.seo.description || product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} — HuellasCo`,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle).catch(() => null);
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
