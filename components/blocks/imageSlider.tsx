'use client'; // Only needed in Next.js App Router

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { getImages } from '@/sanity/lib/slider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface SliderImage {
  _id: string;
  asset: {
    url: string;
  };
}

export default function ImageSlider() {
  const [images, setImages] = useState<SliderImage[]>([]);

  useEffect(() => {
    getImages().then(setImages);
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="rounded-lg overflow-hidden"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.asset.url} alt={`Slide ${index}`} className="w-full h-auto" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
