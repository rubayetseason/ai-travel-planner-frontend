import { ShineBorder } from "@/components/ui/shine-border";
import { CalendarDays, MapPin, Sun } from "lucide-react";

const travelData = [
  {
    day: 1,
    date: "2023-08-01",
    location: "Cox’s Bazar",
    description:
      "Arrive in Cox’s Bazar and explore the longest natural sea beach in the world. Enjoy a relaxing walk at Laboni Beach, visit Kolatoli Point, and experience the sunset from Sugandha Beach.",
    weatherPrediction: "32° C • Sunny",
    suggestions: ["Carry Sunscreen", "Stay Hydrated", "Light Cotton Clothes"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
  },
  {
    day: 2,
    date: "2023-08-02",
    location: "Himchari & Inani Beach",
    description:
      "Visit Himchari National Park to see waterfalls and hill views. Later, travel to Inani Beach, famous for coral stones and crystal-clear water. Ideal for photography and peaceful relaxation.",
    weatherPrediction: "31° C • Sunny",
    suggestions: ["Comfortable Shoes", "Camera", "Snacks"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
  },
  {
    day: 3,
    date: "2023-08-03",
    location: "Maheshkhali Island",
    description:
      "Take a boat ride to Maheshkhali Island. Visit the Adinath Temple on the hilltop, explore mangrove forests, and experience local island life.",
    weatherPrediction: "30° C • Partly Cloudy",
    suggestions: ["Boat Safety Gear", "Cash", "Local Guide"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
  },
  {
    day: 4,
    date: "2023-08-04",
    location: "Saint Martin’s Island",
    description:
      "Travel to Saint Martin’s Island, Bangladesh’s only coral island. Enjoy turquoise waters, fresh seafood, snorkeling, and a peaceful night stay.",
    weatherPrediction: "29° C • Clear",
    suggestions: ["Power Bank", "Flip-flops", "Snorkeling Gear"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
  },
  {
    day: 5,
    date: "2023-08-05",
    location: "Cox’s Bazar (Local Markets)",
    description:
      "Return to Cox’s Bazar. Visit Burmese Market and local souvenir shops. Relax at the beach before departure.",
    weatherPrediction: "31° C • Sunny",
    suggestions: ["Souvenir Bag", "Extra Cash", "Early Checkout"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
  },
];

const Results = () => {
  return (
    <div className="relative mb-32 max-w-6xl mx-auto px-4">
      {/* Vertical line */}
      <div className="hidden md:block absolute left-[95px] top-24 bottom-24 w-0.5 bg-linear-to-b from-indigo-500 via-blue-500 to-rose-500" />
      {travelData.map((travel, i) => (
        <div
          key={i}
          className="relative grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 mb-20"
        >
          {/* Timeline Dot */}
          {/* Timeline Column */}
          <div className="relative hidden md:flex justify-center">
            {/* Big Circle */}
            <div className="relative size-40 mx-auto my-auto text-2xl bg-black font-raleway font-medium flex justify-center items-center rounded-full z-10">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              Day {travel?.day}
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 ${
                i % 2 === 1
                  ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                  : ""
              }`}
            >
              {/* Text */}
              <div className="p-8 flex flex-col gap-4 font-raleway text-slate-200">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <MapPin className="text-rose-400 w-5 h-5" />
                  {travel.location}
                </h3>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-indigo-400" />
                    {travel.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    {travel.weatherPrediction}
                  </span>
                </div>

                <p className="leading-relaxed text-slate-300">
                  {travel.description}
                </p>

                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                  {travel.suggestions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-full">
                <img
                  src={travel.image}
                  alt={travel.location}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
