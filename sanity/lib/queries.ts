import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    overview,
    showcaseProjects[]{
      _key,
      ...@->{
        _id,
        _type,
        coverImage,
        overview,
        "slug": slug.current,
        tags,
        title,
      }
    },
    title,
    blocks[]{
      _key,
      _type,
      title,
      text,
      image,
      features[]{
        _key,
        _type,
        title,
        text
      },
      orientation,
      faqs[]->{
        _id,
        title,
        body,
        text
      }
    }
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    body,
    overview,
    title,
    "slug": slug.current,
    blocks[]{
      _key,
      _type,
      title,
      text,
      image,
      features[]{
        _key,
        _type,
        title,
        text
      },
      orientation,
      faqs[]->{
        _id,
        title,
        body,
        text
      }
    }
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
    blocks[]{
      _key,
      _type,
      title,
      text,
      image,
      features[]{
        _key,
        _type,
        title,
        text
      },
      orientation,
      faqs[]->{
        _id,
        title,
        body,
        text
      }
    }
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    footer,
    menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    ogImage,
    blocks[]{
      _key,
      _type,
      title,
      text,
      image,
      features[]{
        _key,
        _type,
        title,
        text
      },
      orientation,
      faqs[]->{
        _id,
        title,
        body,
        text
      }
    }
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)
