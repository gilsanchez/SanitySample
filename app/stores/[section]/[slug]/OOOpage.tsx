import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery, slugsByTypeQuery} from '@/sanity/lib/queries'
import type {Metadata, ResolvingMetadata} from 'next'
import {toPlainText, type PortableTextBlock} from 'next-sanity'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { SplitImage } from '@/components/blocks/SplitImage';
import { FAQs } from '@/components/blocks/FAQs';
 

import StorePage from '@/components/pages/StorePage'


import ImageSlider from '@/components/blocks/imageSlider';
import { Block } from '@/types/blocks';

type Props = {
  params: Promise<{slug: string}>
}

interface PageData {
  _id: string;
  _type: string;
  title: string | null;
  overview: any[] | null;
  body: any[] | null;
  blocks?: Block[];
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {data: page} = await sanityFetch({
    query: pagesBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: page?.title,
    description: page?.overview ? toPlainText(page.overview) : (await parent).description,
  }
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'page'},
    stega: false,
    perspective: 'published',
  })
  return data
}

export default async function PageSlugRoute({params}: Props) {
  const {data} = await sanityFetch({query: pagesBySlugQuery, params})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const {body, overview, title, blocks} = data as PageData ?? {}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-14">
        {/* Header */}
        <Header
          id={data?._id || null}
          type={data?._type || null}
          path={['overview']}
          title={title || (data?._id ? 'Untitled' : '404 Page Not Found')}
          description={overview}
        />

        {/* Body */}
        {body && (
          <CustomPortableText
            id={data?._id || null}
            type={data?._type || null}
            path={['body']}
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={body as unknown as PortableTextBlock[]}
          />
        )}
        {blocks?.map((block) => {
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
      <div className="absolute left-0 w-screen border-t" />
    </div>
    
  )
}

