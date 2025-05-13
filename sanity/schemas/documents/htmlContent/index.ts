import { defineField, defineType } from 'sanity';
import { CodeBlockIcon } from '@sanity/icons';

export default defineType({
  name: 'htmlContent',
  title: 'HTML Content',
  type: 'document',
  icon: CodeBlockIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'metadata',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'metadata',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'cssLinks',
      title: 'CSS Links',
      type: 'array',
      group: 'metadata',
      description: 'Add external CSS stylesheets to be included with this HTML content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().error('CSS URL is required'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Optional description of what this CSS file is for',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'inlineCss',
      title: 'Inline CSS',
      type: 'text',
      group: 'content',
      description: 'Add inline CSS styles that will be included in a <style> tag',
      rows: 10,
    }),
    defineField({
      name: 'html',
      title: 'HTML Content',
      type: 'text',
      group: 'content',
      rows: 20,
      validation: (Rule) => Rule.required().error('HTML content is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'metadata',
      rows: 3,
      validation: (Rule) => Rule.max(200).warning('Description should be less than 200 characters'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: subtitle || 'No description',
        media: CodeBlockIcon,
      };
    },
  },
});
