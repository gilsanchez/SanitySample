import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { PAGE_QUERYResult } from "@/sanity/types";
import type { Image as SanityImage } from 'sanity';

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="isolate w-full aspect-[2/1] py-16 relative overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-8 h-full z-20">
        {title ? (
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-white text-pretty max-w-3xl">
            {title}
          </h1>
        ) : null}
        <div className="prose-lg lg:prose-xl prose-invert flex items-center">
          {text ? <PortableText value={text} /> : null}
        </div>
      </div>
      <div className="absolute inset-0 bg-pink-500 opacity-50 z-10" />
      {image && image.asset?._ref ? (
        <Image
          className="absolute inset-0 object-cover blur-sm"
          src={urlForImage(image as SanityImage)?.width(1600).height(800).url() ?? ''}
          width={1600}
          height={800}
          alt=""
        />
      ) : null}
    </section>
  );
}