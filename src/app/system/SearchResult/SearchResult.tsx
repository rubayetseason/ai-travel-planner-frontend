import { motion } from "motion/react";
import Results from "./_components/Results";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AiLoader from "@/components/loaders/AiLoader";
import { AuroraBackground } from "@/components/ui/aurora-background";

const SearchResult = () => {
  return (
    <div className="text-white bg-black">
      <AiLoader></AiLoader>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-6xl font-bold text-white text-center font-raleway">
            Your personalized tour suggestion is ready to explore.
          </div>
        </motion.div>
      </AuroraBackground>
      <Results></Results>
      <div className="pb-32 w-full max-w-screen-2xl mx-auto text-black text-xl font-raleway flex justify-between items-center gap-4">
        <Button size="lg" variant="outline">
          Edit Options
        </Button>
        <Link to={"/checkout"}>
          <Button size="lg" variant="outline" className="cursor-pointer">
            Proceeed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
