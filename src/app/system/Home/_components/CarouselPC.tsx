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
    description:
      "Bangladesh offers stunning natural diversity - lush green hills, serene rivers, mangrove forests, and sandy beaches - alongside six vibrant seasons, making it a captivating destination for nature lovers and cultural tourists.",
    image: AiDventureAssets.images.pc.pcImage1,
    alt: "Scenic landscape of Bangladesh",
  },
  {
    title: "The Sundarbans",
    description:
      "World's largest mangrove forest, a UNESCO World Heritage Site teeming with biodiversity, including the elusive Royal Bengal Tiger, offering adventurous eco-tourism and breathtaking natural beauty.",
    image: AiDventureAssets.images.pc.pcImage2,
    alt: "The Sundarbans forest with rivers and trees",
  },
  {
    title: "Chittagong Hill Tracts",
    description:
      "The Chittagong Hill Tracts boast rolling hills, tribal cultures, waterfalls, and scenic lakes like Kaptai, offering a unique blend of natural beauty and indigenous heritage in southeastern Bangladesh.",
    image: AiDventureAssets.images.pc.pcImage3,
    alt: "Hilly landscapes of Chittagong",
  },
  {
    title: "Saint Martin's Island",
    description:
      "Bangladesh's only coral island, featuring turquoise waters, vibrant coral reefs, and sandy beaches. A serene retreat with scuba diving, luminous plankton, fresh seafood, and laid-back island charm.",
    image: AiDventureAssets.images.pc.pcImage4,
    alt: "Saint Martin's Island with coral beach",
  },
];

const CarouselPC = () => {
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

            <div className="pointer-events-none absolute inset-0 z-10 flex items-start">
              <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-8 lg:mt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
                <h1 className="max-w-2xl text-4xl text-white font-comforter sm:text-5xl lg:text-7xl xl:text-8xl">
                  {slide.title}
                </h1>
                <p className="max-w-md text-sm text-white/90 font-raleway lg:text-base">
                  {slide.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselPC;
