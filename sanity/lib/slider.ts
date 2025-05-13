import { client } from './client';
import type { Image } from 'sanity';

interface SliderImage {
  _id: string;
  asset: {
    url: string;
  };
}

export async function getImages(): Promise<SliderImage[]> {
  return await client.fetch(`
    *[_type == "sliderImage"] {
      _id,
      "asset": image.asset->{
        url
      }
    }
  `);
} 