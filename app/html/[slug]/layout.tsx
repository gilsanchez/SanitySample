import { Metadata } from 'next';
import { client } from '@/sanity/lib/client'

interface CssLink {
  url: string;
  description?: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const content = await client.fetch(`
    *[_type == "htmlContent" && slug.current == $slug][0] {
      title,
      description,
      cssLinks[] {
        url,
        description
      }
    }
  `, { slug: params.slug });

  if (!content) return { title: 'Not Found' };

  const cssLinks = content.cssLinks?.map((link: CssLink) => ({
    rel: 'stylesheet',
    href: link.url,
    crossOrigin: 'anonymous'
  })) || [];

  return {
    title: content.title,
    description: content.description || 'No description available',
    openGraph: {
      title: content.title,
      description: content.description || 'No description available',
      type: 'article',
    },
    ...(cssLinks.length > 0 && { links: cssLinks })
  };
}

export default function HtmlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 