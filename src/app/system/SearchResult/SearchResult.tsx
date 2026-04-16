import { motion } from "motion/react";
import Results from "./_components/Results";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AiLoader from "@/components/loaders/AiLoader";
import { AuroraBackground } from "@/components/ui/aurora-background";

const SearchResult = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <AiLoader></AiLoader>

      <AuroraBackground className="h-[42vh] min-h-[260px] sm:h-[46vh]">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 text-center"
        >
          <div className="text-3xl font-bold text-white font-raleway sm:text-4xl lg:text-5xl">
            Your personalized tour suggestion is ready to explore.
          </div>
          <p className="max-w-2xl text-sm text-white/80 sm:text-base">
            Review each day, update plans instantly, and continue with your preferred itinerary.
          </p>
        </motion.div>
      </AuroraBackground>

      <Results></Results>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-end gap-3 px-4 pb-14 font-raleway sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <Link to={"/checkout"} className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full cursor-pointer">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
