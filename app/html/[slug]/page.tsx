import { client } from '@/sanity/lib/client'
import { sanitizeHtmlContent } from '../../lib/sanitizeHtml';
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { SplitImage } from '@/components/blocks/SplitImage';
import { FAQs } from '@/components/blocks/FAQs';
//import ImageSlider from '@/components/blocks/imageSlider';
import { Block } from '@/types/blocks';

interface HtmlPageProps {
  params: {
    slug: string;
  };
}

interface CssLink {
  url: string;
  description?: string;
}

interface HtmlContent {
  _id: string;
  title: string;
  html: string;
  inlineCss?: string;
  description?: string;
  publishedAt?: string;
  cssLinks?: CssLink[];
  blocks?: Block[];
}

async function getHtmlContent(slug: string): Promise<HtmlContent | null> {
  return await client.fetch(`
    *[_type == "htmlContent" && slug.current == $slug][0] {
      _id,
      title,
      html,
      inlineCss,
      description,
      publishedAt,
      cssLinks[] {
        url,
        description
      },
      blocks[]
    }
  `, { slug });
}

export default async function HtmlPage({ params }: HtmlPageProps) {
  const content = await getHtmlContent(params.slug);

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Content not found</h1>
        <p className="mt-4">The page you're looking for doesn't exist.</p>
      </div>
    );
  }

  const sanitizedHtml = sanitizeHtmlContent(content.html);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
        {content.description && (
          <p className="text-gray-600 mb-8">{content.description}</p>
        )}
        {content.inlineCss && (
          <style dangerouslySetInnerHTML={{ __html: content.inlineCss }} />
        )}
        <div 
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
        />
      </article>
      {content.publishedAt && (
        <div className="mt-8 text-sm text-gray-500">
          Published on {new Date(content.publishedAt).toLocaleDateString()}
        </div>
      )}
      {content.blocks?.map((block) => {
        switch (block._type) {
          case 'hero':
            return <Hero key={block._key} {...block} />;
          case 'features':
            return <Features key={block._key} {...block} />;
          case 'splitImage':
            return <SplitImage key={block._key} {...block} />;
          case 'faqs':
            return <FAQs key={block._key} {...block} />;
          case 'imageSlider':
            return <ImageSlider key={block._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
