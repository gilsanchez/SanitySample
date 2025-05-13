import {HomePage} from '@/components/HomePage'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'
import Link from 'next/link'
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { SplitImage } from '@/components/blocks/SplitImage';
import { FAQs } from '@/components/blocks/FAQs';
 import ImageSlider from '@/components/blocks/imageSlider';
import { Block } from '@/types/blocks';

interface HomeData {
  _id: string;
  _type: string;
  title: string | null;
  overview: any[] | null;
  blocks?: Block[];
}

export default async function IndexRoute() {
  const {data} = await sanityFetch({query: homePageQuery})

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  const {blocks} = data as HomeData ?? {};

  return (
    <>
      <HomePage data={data} />
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
    </>
  )
}


