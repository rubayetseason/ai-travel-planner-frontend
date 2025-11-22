import GlobeLoader from "@/components/loaders/GlobeLoader";
import CarouselPC from "./_components/CarouselPC";
import CarouselMobile from "./_components/CarouselMobile";
import Searchbox from "./_components/Searchbox";

const Home = () => {
  return (
    <div>
      <GlobeLoader></GlobeLoader>
      <div className="relative">
        <div className="hidden md:block">
          <CarouselPC></CarouselPC>
        </div>
        <div className="md:hidden">
          <CarouselMobile></CarouselMobile>
        </div>
        <div className="w-full absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Searchbox></Searchbox>
        </div>
      </div>
    </div>
  );
};

export default Home;
