import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-white bg-black flex flex-col justify-center items-center gap-5 h-screen">
      <h2 className="text-3xl font-comforter">Not Found</h2>
      <p className="text-lg font-raleway">Could not find requested resource</p>
      <Link to="/">
        <Button variant="outline" className="text-black">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
