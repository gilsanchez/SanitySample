import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import StorePage from '@/components/pages/StorePage'

// Query to fetch store content based on section and slug
const storeQuery = groq`*[_type == "store" && section == $section && slug.current == $slug][0]{
  _id,
  title,
  slug,
  section,
  content,
  // Add other fields you need
}`

export async function generateStaticParams() {
  // This function can be used to generate static paths at build time
  // For now, we'll return an empty array since we're handling dynamic routes
  return []
}

export default async function StoreRoute({
  params,
}: {
  params: { section: string; slug: string }
}) {
  // Await the params object before using its properties
  const { section, slug } = await params;  // Await the params here

  if (!section || !slug) {
    notFound() // or handle this scenario differently
  }

  const store = await client.fetch(storeQuery, {
    section: section,
    slug: slug,
  })

  if (!store) {
    notFound() // If no store is found for the given section and slug
  }

  return <StorePage store={store} />
}
