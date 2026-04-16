// import GlobeLoader from "@/components/loaders/GlobeLoader";
import CarouselPC from "./_components/CarouselPC";
import CarouselMobile from "./_components/CarouselMobile";
import Searchbox from "./_components/Searchbox";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { routesList } from "@/constants/routeList";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <div className="relative min-h-screen">
        <div className="hidden md:block">
          <CarouselPC></CarouselPC>
        </div>
        <div className="md:hidden">
          <CarouselMobile></CarouselMobile>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-4">
          <Searchbox></Searchbox>
        </div>

        <div className="bg-white/65 absolute top-4 right-4 z-20 rounded-[30px]">
          <Link to={routesList.dashboard}>
            <Button variant="ghost">
              <User /> Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
