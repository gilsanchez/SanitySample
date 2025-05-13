import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "store",
  title: "Store",
  type: "document",
  icon: TagIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: "storeType",
      title: "Store Type",
      type: "string",
      options: {
        list: [
          { title: "Books", value: "books" },
          { title: "DVD", value: "dvd" },
          { title: "Music", value: "music" },
          { title: "Gifts", value: "gifts" },
          { title: "Toys", value: "toys" },
          { title: "Electronics", value: "electronics" },
        ],
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        { type: "hero" },
        { type: "features" },
        { type: "splitImage" },
        { type: "faqs" },
        { type: "imageSlider" },
      ],
      group: 'content',
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: 'seo',
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      storeType: "storeType",
    },
    prepare({ title, storeType }) {
      return {
        title,
        subtitle: storeType ? `Store: ${storeType}` : "Store",
      };
    },
  },
}); 