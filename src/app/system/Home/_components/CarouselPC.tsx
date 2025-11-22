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
      "Bangladesh offers stunning natural diversity—lush green hills, serene rivers, mangrove forests, and sandy beaches—alongside six vibrant seasons, making it a captivating destination for nature lovers and cultural tourists.",
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
    <div>
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
                className="w-dvw h-dvh object-cover brightness-[.6]"
              />
              <div className="px-12 w-full absolute top-20 left-0 flex justify-between items-center z-10">
                <h1 className="text-8xl text-white font-comforter">
                  {slide.title}
                </h1>
                <h1 className="w-96 text-base text-white font-raleway">
                  {slide.description}
                </h1>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselPC;
