'use client';

interface CssLink {
  url: string;
  description?: string;
}

interface HtmlContentProps {
  content: {
    title: string;
    description?: string;
    publishedAt?: string;
    inlineCss?: string;
    cssLinks?: CssLink[];
  };
  sanitizedHtml: string;
}

export default function HtmlContent({ content, sanitizedHtml }: HtmlContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {content.inlineCss && (
        <style dangerouslySetInnerHTML={{ __html: content.inlineCss }} />
      )}
      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
        {content.description && (
          <p className="text-gray-600 mb-8">{content.description}</p>
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
    </div>
  );
} 