'use client'

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
 import {pageStructure, singletonPlugin} from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import sliderImage from '@/sanity/schemas/documents/sliderImage'
import faq from '@/sanity/schemas/documents/faq'
import store from '@/sanity/schemas/documents/store'
import htmlContent from '@/sanity/schemas/documents/htmlContent'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import {faqsType} from '@/sanity/schemas/blocks/faqsType'
import {featuresType} from '@/sanity/schemas/blocks/featuresType'
import {heroType} from '@/sanity/schemas/blocks/heroType'
import {splitImageType} from '@/sanity/schemas/blocks/splitImageType'
import {imageSliderType} from '@/sanity/schemas/blocks/imageSliderType'
import galleryType from '@/sanity/schemas/blocks/galleryType'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {presentationTool} from 'sanity/presentation'
import { structure } from '@/sanity/structure' // adjust path if needed
  
import {structureTool} from 'sanity/structure'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Personal Website with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  apiVersion: '2024-02-10',
  schema: {
    types: [
      // Block types
      faqsType,
      featuresType,
      heroType,
      splitImageType,
      imageSliderType,
      galleryType,
      // Document types
      page,
      project,
      sliderImage,
      faq,
      htmlContent,
      // Singleton types
      home,
      settings,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {previewMode: {enable: '/api/draft-mode/enable'}},
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
