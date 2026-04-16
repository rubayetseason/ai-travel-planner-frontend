import { useMemo, useState } from "react";
import {
  CalendarDays,
  CloudSun,
  Droplets,
  MapPin,
  Pencil,
  Wind,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type TravelDay = {
  day: number;
  date: string;
  location: string;
  description: string;
  weatherPrediction: string;
  weatherUpdate: {
    morning: string;
    afternoon: string;
    evening: string;
    humidity: string;
    wind: string;
  };
  suggestions: string[];
  image: string;
};

const initialTravelData: TravelDay[] = [
  {
    day: 1,
    date: "2026-04-18",
    location: "Cox's Bazar",
    description:
      "Arrive in Cox's Bazar and explore the longest natural sea beach in the world. Enjoy a relaxing walk at Laboni Beach, visit Kolatoli Point, and end your day with sunset views from Sugandha Beach.",
    weatherPrediction: "32 C - Sunny",
    weatherUpdate: {
      morning: "28 C - Light breeze",
      afternoon: "32 C - Sunny",
      evening: "29 C - Clear",
      humidity: "73%",
      wind: "13 km/h",
    },
    suggestions: ["Carry sunscreen", "Stay hydrated", "Wear cotton clothes"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 2,
    date: "2026-04-19",
    location: "Himchari and Inani Beach",
    description:
      "Visit Himchari National Park for hill views and waterfalls. Later, head to Inani Beach, known for coral stones and calm shoreline, making it perfect for photography and leisure.",
    weatherPrediction: "31 C - Sunny",
    weatherUpdate: {
      morning: "27 C - Mostly sunny",
      afternoon: "31 C - Bright sun",
      evening: "28 C - Mild breeze",
      humidity: "70%",
      wind: "11 km/h",
    },
    suggestions: ["Wear comfortable shoes", "Bring camera", "Carry light snacks"],
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 3,
    date: "2026-04-20",
    location: "Maheshkhali Island",
    description:
      "Take a boat ride to Maheshkhali Island. Visit Adinath Temple on the hilltop, explore mangrove trails, and spend time experiencing local island culture.",
    weatherPrediction: "30 C - Partly cloudy",
    weatherUpdate: {
      morning: "26 C - Cloud patches",
      afternoon: "30 C - Partly cloudy",
      evening: "27 C - Calm",
      humidity: "77%",
      wind: "9 km/h",
    },
    suggestions: ["Use boat safety gear", "Carry cash", "Travel with a local guide"],
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 4,
    date: "2026-04-21",
    location: "Saint Martin's Island",
    description:
      "Travel to Saint Martin's Island, Bangladesh's only coral island. Enjoy turquoise water, fresh seafood, snorkeling, and a quiet evening by the sea.",
    weatherPrediction: "29 C - Clear",
    weatherUpdate: {
      morning: "25 C - Pleasant",
      afternoon: "29 C - Clear skies",
      evening: "27 C - Comfortable",
      humidity: "75%",
      wind: "10 km/h",
    },
    suggestions: ["Keep a power bank", "Wear sandals", "Carry snorkeling gear"],
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 5,
    date: "2026-04-22",
    location: "Cox's Bazar Local Markets",
    description:
      "Return to Cox's Bazar for a local market day. Visit Burmese Market for handicrafts and souvenirs, then relax at the beach before departure.",
    weatherPrediction: "31 C - Sunny",
    weatherUpdate: {
      morning: "27 C - Warm",
      afternoon: "31 C - Sunny",
      evening: "28 C - Pleasant",
      humidity: "71%",
      wind: "12 km/h",
    },
    suggestions: ["Carry extra cash", "Keep a souvenir bag", "Plan early checkout"],
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200&q=80",
  },
];

const Results = () => {
  const [travelData, setTravelData] = useState(initialTravelData);
  const [streetViewDay, setStreetViewDay] = useState<TravelDay | null>(null);
  const [editingDay, setEditingDay] = useState<TravelDay | null>(null);
  const [draftDescription, setDraftDescription] = useState("");

  const currentDayLabel = useMemo(() => {
    if (!editingDay) {
      return "";
    }

    return `Day ${editingDay.day} - ${editingDay.location}`;
  }, [editingDay]);

  const openEditModal = (day: TravelDay) => {
    setEditingDay(day);
    setDraftDescription(day.description);
  };

  const saveDayPlan = () => {
    if (!editingDay || !draftDescription.trim()) {
      return;
    }

    setTravelData((currentData) =>
      currentData.map((day) =>
        day.day === editingDay.day
          ? {
              ...day,
              description: draftDescription.trim(),
            }
          : day
      )
    );

    setEditingDay(null);
  };

  return (
    <section className="mx-auto mb-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 sm:space-y-8">
        {travelData.map((travel, index) => (
          <article
            key={travel.day}
            className="overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-slate-900/85 to-slate-950/70 shadow-xl"
          >
            <div
              className={`grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] ${
                index % 2 === 1
                  ? "xl:[&>*:first-child]:order-2 xl:[&>*:last-child]:order-1"
                  : ""
              }`}
            >
              <div className="p-5 sm:p-6 lg:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                    Day {travel.day}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-white/25 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => openEditModal(travel)}
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit Day Plan
                  </Button>
                </div>

                <h3 className="mt-4 flex items-start gap-2 text-2xl font-semibold text-white sm:text-3xl">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-rose-400" />
                  <span>{travel.location}</span>
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300 sm:text-sm">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                    <CalendarDays className="h-3.5 w-3.5 text-indigo-300" />
                    {travel.date}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                    <CloudSun className="h-3.5 w-3.5 text-amber-300" />
                    {travel.weatherPrediction}
                  </span>
                </div>

                <p className="mt-5 leading-relaxed text-slate-200">{travel.description}</p>

                <div className="mt-5 rounded-2xl border border-sky-300/20 bg-sky-500/10 p-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-sky-100">
                    <CloudSun className="h-4 w-4" />
                    Daily Weather Update
                  </h4>

                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div className="rounded-xl bg-black/25 px-3 py-2">
                      <p className="text-xs text-slate-300">Morning</p>
                      <p className="mt-1 text-sm font-medium text-slate-100">
                        {travel.weatherUpdate.morning}
                      </p>
                    </div>
                    <div className="rounded-xl bg-black/25 px-3 py-2">
                      <p className="text-xs text-slate-300">Afternoon</p>
                      <p className="mt-1 text-sm font-medium text-slate-100">
                        {travel.weatherUpdate.afternoon}
                      </p>
                    </div>
                    <div className="rounded-xl bg-black/25 px-3 py-2">
                      <p className="text-xs text-slate-300">Evening</p>
                      <p className="mt-1 text-sm font-medium text-slate-100">
                        {travel.weatherUpdate.evening}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200 sm:text-sm">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1">
                      <Droplets className="h-3.5 w-3.5 text-cyan-300" />
                      Humidity {travel.weatherUpdate.humidity}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1">
                      <Wind className="h-3.5 w-3.5 text-sky-200" />
                      Wind {travel.weatherUpdate.wind}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {travel.suggestions.map((item) => (
                    <span
                      key={`${travel.day}-${item}`}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200 sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="group relative min-h-[260px] overflow-hidden border-t border-white/10 xl:min-h-full xl:border-t-0 xl:border-l">
                <img
                  src={travel.image}
                  alt={travel.location}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

                <button
                  type="button"
                  onClick={() => setStreetViewDay(travel)}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
                >
                  <span className="rounded-full border border-white/45 bg-black/55 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg">
                    Open in Google Street View
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog
        open={Boolean(streetViewDay)}
        onOpenChange={(open) => {
          if (!open) {
            setStreetViewDay(null);
          }
        }}
      >
        <DialogContent className="font-raleway sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Google Street View</DialogTitle>
            <DialogDescription>
              Street View integration is not enabled yet for
              {" "}
              <span className="font-medium text-foreground">
                {streetViewDay?.location}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
            Placeholder modal opened successfully. Real Street View embedding can
            be connected in a later step.
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setStreetViewDay(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(editingDay)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingDay(null);
          }
        }}
      >
        <DialogContent className="font-raleway sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Day Plan</DialogTitle>
            <DialogDescription>{currentDayLabel}</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label className="text-sm font-medium">Day Description</label>
            <Textarea
              className="min-h-[150px]"
              value={draftDescription}
              onChange={(event) => setDraftDescription(event.target.value)}
              placeholder="Update the activities for this day"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditingDay(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={saveDayPlan}
              disabled={!draftDescription.trim()}
            >
              Save Day Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Results;
