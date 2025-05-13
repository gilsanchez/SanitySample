import '@/styles/index.css'
import {CustomPortableText} from '@/components/CustomPortableText'
import {Navbar} from '@/components/Navbar'
import IntroTemplate from '@/intro-template'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {homePageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import type {Metadata, Viewport} from 'next'
import {toPlainText, VisualEditing, type PortableTextBlock} from 'next-sanity'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'
import {Toaster} from 'sonner'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { SplitImage } from '@/components/blocks/SplitImage';
import { FAQs } from '@/components/blocks/FAQs';
 import ImageSlider from '@/components/blocks/imageSlider';
import { Block } from '@/types/blocks';

interface SettingsData {
  _id: string;
  _type: string;
  footer: any[] | null;
  blocks?: Block[];
}

export async function generateMetadata(): Promise<Metadata> {
  const [{data: settings}, {data: homePage}] = await Promise.all([
    sanityFetch({query: settingsQuery, stega: false}),
    sanityFetch({query: homePageQuery, stega: false}),
  ])

  const ogImage = urlForOpenGraphImage(
    // @ts-expect-error - @TODO update @sanity/image-url types so it's compatible
    settings?.ogImage,
  )
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.overview ? toPlainText(homePage.overview) : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({children}: {children: React.ReactNode}) {
  const {data} = await sanityFetch({query: settingsQuery})
  const {blocks} = data as SettingsData ?? {};

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <Navbar data={data} />
        <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
          {children}
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
        <footer className="bottom-0 w-full bg-white py-12 text-center md:py-20">
          {data?.footer && (
            <CustomPortableText
              id={data._id}
              type={data._type}
              path={['footer']}
              paragraphClasses="text-md md:text-xl"
              value={data.footer as unknown as PortableTextBlock[]}
            />
          )}
        </footer>
        <Suspense>
       
        </Suspense>
      </div>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
    </>
  )
}
      /*  <IntroTemplate />  */