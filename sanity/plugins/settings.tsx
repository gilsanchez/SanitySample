/**
 * This plugin contains all the logic for setting up the singletons
 */

import {type DocumentDefinition} from 'sanity'
import {type StructureResolver} from 'sanity/structure'


  
    
export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, {creationContext}) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => !types.includes(templateItem.templateId))
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, {schemaType}) => {
        if (types.includes(schemaType)) {
          return prev.filter(({action}) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (typeDefArray: DocumentDefinition[]): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(S.editor().id(typeDef.name).schemaType(typeDef.name).documentId(typeDef.name))
    })

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    )

    // return S.list()
    //   .title('Content')
    //   .items([...singletonItems, S.divider(), ...defaultListItems]),


    return  S.list()
    .title('Content')
    .items([...singletonItems, S.divider(), ...defaultListItems,
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
        .title('HTML Content 2')
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
    ])

    
  }
}
