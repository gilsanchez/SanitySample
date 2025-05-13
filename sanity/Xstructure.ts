import { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) => {
  // Get all document type list items
  const defaultListItems = S.documentTypeListItems()

  // Create the main list with items in the exact order we want
  return S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('page'),
      S.documentTypeListItem('project'),
      S.documentTypeListItem('sliderImage'),
      S.documentTypeListItem('faq'),
      S.listItem()
        .title('Stores')
        .child(
          S.documentList()
            .title('Stores')
            .filter('_type == "store"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('store')
            )
        ),
      S.documentTypeListItem('htmlContent'),
      S.documentTypeListItem('home'),
      S.documentTypeListItem('settings'),
    ])
} 