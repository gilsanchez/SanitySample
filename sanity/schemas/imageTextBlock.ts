export default {
    name: 'imageTextBlock',
    title: 'Image & Text Block',
    type: 'object',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
      },
      {
        name: 'text',
        title: 'Text',
        type: 'text',
      },
      {
        name: 'layout',
        title: 'Layout (Image Position)',
        type: 'string',
        options: {
          list: [
            { title: 'Image Left', value: 'left' },
            { title: 'Image Right', value: 'right' },
          ],
          layout: 'radio',
        },
      },
    ],
    preview: {
      select: {
        title: 'alt',
        media: 'image',
      },
    },
  }
  