/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import config from '@/sanity.config'
import {NextStudio} from 'next-sanity/studio'
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { SplitImage } from '@/components/blocks/SplitImage';
import { FAQs } from '@/components/blocks/FAQs';
// import ImageSlider from '@/components/blocks/imageSlider';

export const dynamic = 'force-static'

export {metadata, viewport} from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
