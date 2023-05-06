import { CSSProperties, useEffect, useState } from "react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import {
  KeenSliderHooks,
  KeenSliderInstance,
  useKeenSlider,
} from "keen-slider/react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { ReducedProduct } from "@/types/product";

export type SliderType = KeenSliderInstance<{}, {}, KeenSliderHooks>;
interface Props {
  onSlideChange?: (slider: SliderType) => void;
  images: ReducedProduct["images"];
  style?: CSSProperties;
  activeVariant: ReducedProduct["variants"][number];
}
const ProductCarousel: React.FC<Props> = ({ images, style, activeVariant }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const [refCallback, slider] = useKeenSlider({
    slideChanged(slider) {
      setCurrentPosition(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const index = images.findIndex(
      (image) => image.id === activeVariant.image_id
    );
    if (index !== -1) {
      slider.current?.moveToIdx(index);
    }
  }, [activeVariant.image_id]);

  const showLeftArrow = currentPosition > 0;

  const showRightArrow = currentPosition < images.length - 1;

  return (
    <div className="">
      <div className="relative w-full xl:px-8">
        {showLeftArrow && (
          <div
            className="h-full w-6 absolute z-20 left-0 cursor-pointer"
            onClick={() => slider.current?.prev()}
          >
            <button
              onClick={() => slider.current?.prev()}
              className="absolute top-[50%] z-30 left-0 h-6 w-6"
            >
              <ChevronLeftIcon className="text-gray-400 hover:text-gray-500" />
            </button>
          </div>
        )}
        {showRightArrow && (
          <div
            className="h-full w-6 absolute z-20 right-0 cursor-pointer"
            onClick={() => slider.current?.next()}
          >
            <button
              onClick={() => slider.current?.next()}
              className="absolute top-[50%] z-30 right-0 h-6 w-6"
            >
              <ChevronRightIcon className="text-gray-400 hover:text-gray-500" />
            </button>
          </div>
        )}
        <div ref={refCallback} className={"keen-slider lg:max-h-[460px]"} style={style}>
          {images?.map((image) => (
            <Image
              src={image.src}
              key={image.id}
              alt={image.alt}
              priority
              className="keen-slider__slide w-full object-contain"
              width={800}
              height={800}
            />
          ))}
        </div>
      </div>
      {images.length > 1 ? 
      <div className="flex flex-wrap gap-2 w-full px-4 sm:px-0 mt-4 xl:px-8">
        {images?.map((image, index) => (
          <button
            onClick={() => slider.current?.moveToIdx(index)}
            key={image.id}
            className="hover:bg-gray-200 rounded-lg overflow-hidden"
          >
            <Image
              src={image.src}
              key={image.id}
              alt={image.alt}
              width={100}
              height={100}
              priority
              className="object-contain h-[100px] hover:opacity-75 bg-white"
            />
          </button>
        ))}
      </div>
      : null
      }
    </div>
  );
};

export default ProductCarousel;
