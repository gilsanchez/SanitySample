import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Gallery',
      };
    },
  },
});
      