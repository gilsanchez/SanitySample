import type { Reference } from 'sanity';

interface SanityImageHotspot {
  _type: 'sanity.imageHotspot';
  x: number;
  y: number;
  height: number;
  width: number;
}

interface SanityImageCrop {
  _type: 'sanity.imageCrop';
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SanityImage {
  _type: 'image';
  asset?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
}

export interface BlockBase {
  _type: string;
  _key: string;
}

export interface HeroBlock extends BlockBase {
  _type: 'hero';
  title?: string;
  text?: any[];
  image?: SanityImage;
}

export interface Feature {
  _type: 'feature';
  _key: string;
  title?: string;
  text?: string;
}

export interface FeaturesBlock extends BlockBase {
  _type: 'features';
  title?: string;
  features?: Feature[];
}

export interface SplitImageBlock extends BlockBase {
  _type: 'splitImage';
  title?: string;
  orientation?: 'imageLeft' | 'imageRight';
  image?: SanityImage;
}

export interface FAQ {
  _id: string;
  title: string | null;
  body: any[] | null;
  text: string;
}

export interface FAQsBlock extends BlockBase {
  _type: 'faqs';
  title?: string;
  faqs: FAQ[] | null;
}

export interface ImageSliderBlock extends BlockBase {
  _type: 'imageSlider';
}

export type Block = HeroBlock | FeaturesBlock | SplitImageBlock | FAQsBlock | ImageSliderBlock;

export interface BlockContent {
  blocks?: Block[];
} 