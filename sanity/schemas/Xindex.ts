import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import galleryType from './blocks/galleryType'
import sliderImage from './documents/sliderImage'
import page from './documents/page'
import project from './documents/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    faqsType,
    featuresType,
    heroType,
    splitImageType,    
    galleryType,
    sliderImage,
    page,
    project,
  ],
};

 
 