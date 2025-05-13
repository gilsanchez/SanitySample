import { StructureBuilder } from 'sanity/desk'
import { StructureResolver } from 'sanity/desk'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Stores')
        .child(
          S.list()
            .title('Store Sections')
            .items([
              S.listItem()
                .title('Books')
                .child(
                  S.documentList()
                    .title('Books Pages')
                    .filter('_type == "page" && storeType == "books"')
                ),
              S.listItem()
                .title('DVD')
                .child(
                  S.documentList()
                    .title('DVD Pages')
                    .filter('_type == "page" && storeType == "dvd"')
                ),
              S.listItem()
                .title('Music')
                .child(
                  S.documentList()
                    .title('Music Pages')
                    .filter('_type == "page" && storeType == "music"')
                ),
              S.listItem()
                .title('Gifts')
                .child(
                  S.documentList()
                    .title('Gifts Pages')
                    .filter('_type == "page" && storeType == "gifts"')
                ),
              S.listItem()
                .title('Toys')
                .child(
                  S.documentList()
                    .title('Toys Pages')
                    .filter('_type == "page" && storeType == "toys"')
                ),
              S.listItem()
                .title('Electronics')
                .child(
                  S.documentList()
                    .title('Electronics Pages')
                    .filter('_type == "page" && storeType == "electronics"')
                ),
            ])
        ),
      S.listItem()
        .title('HTML Content')
        .child(
          S.list()
            .title('HTML Content Sections')
            .items([
              S.listItem()
                .title('BOPIS')
                .child(
                  S.documentList()
                    .title('BOPIS Content')
                    .filter('_type == "htmlContent" && section == "bopis"')
                ),
              S.listItem()
                .title('Textbooks')
                .child(
                  S.documentList()
                    .title('Textbooks Content')
                    .filter('_type == "htmlContent" && section == "textbooks"')
                ),
              S.listItem()
                .title('Misc')
                .child(
                  S.documentList()
                    .title('Misc Content')
                    .filter('_type == "htmlContent" && section == "misc"')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product')),
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post')),
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category')),
    ]) 