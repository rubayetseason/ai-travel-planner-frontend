import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { AiDventureAssets } from "@/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const carouselSlides = [
  {
    title: "Welcome to Bangladesh",
    image: AiDventureAssets.images.mobile.mobileImage1,
    alt: "Scenic landscape of Bangladesh",
  },
  {
    title: "The Sundarbans",
    image: AiDventureAssets.images.mobile.mobileImage2,
    alt: "The Sundarbans forest with rivers and trees",
  },
  {
    title: "Chittagong Hill Tracts",
    image: AiDventureAssets.images.mobile.mobileImage3,
    alt: "Hilly landscapes of Chittagong",
  },
];

const CarouselMobile = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 15 * 1000 }), Fade()]}
    >
      <CarouselContent>
        {carouselSlides.map((slide, index) => (
          <CarouselItem key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-screen w-full object-cover brightness-[.58]"
            />

            <div className="absolute inset-x-0 top-20 z-10 px-5">
              <h1 className="text-4xl text-center text-white font-comforter">
                {slide.title}
              </h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselMobile;
