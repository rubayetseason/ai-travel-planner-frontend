import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Leaf, Mountain, Ship, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routesList } from "@/constants/routeList";
import { cn } from "@/lib/utils";

const dateRangeSchema = z
  .object({
    from: z.union([z.date(), z.undefined()]),
    to: z.union([z.date(), z.undefined()]),
  })
  .refine((value) => Boolean(value.from && value.to), {
    message: "Select both start and end dates",
  })
  .refine((value) => {
    if (!value.from || !value.to) {
      return true;
    }

    return value.to > value.from;
  }, {
    message: "End date must be after start date",
  });

const formSchema = z
  .object({
    from: z.string().min(1, "From location is required"),
    to: z.string().min(1, "Destination is required"),
    date: dateRangeSchema,
    travellers: z
      .number()
      .int("Traveller count must be a whole number")
      .min(1, "At least 1 traveller is required")
      .max(20, "Maximum 20 travellers are allowed"),
    purpose: z.string().min(1, "Purpose is required"),
  })
  .refine((data) => data.from !== data.to, {
    message: "Destination must be different from origin",
    path: ["to"],
  });

export type SearchFormValues = z.infer<typeof formSchema>;

const locationOptions = [
  "Dhaka",
  "Cox's Bazar",
  "Sylhet",
  "Bandarban",
  "Rangamati",
];

const purposeOptions = [
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Family Vacation", value: "family" },
  { label: "Business Trip", value: "business" },
  { label: "Adventure", value: "adventure" },
];

const Searchbox = () => {
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [calendarMonths, setCalendarMonths] = useState(1);

  useEffect(() => {
    const setMonths = () => {
      setCalendarMonths(window.innerWidth >= 1280 ? 2 : 1);
    };

    setMonths();
    window.addEventListener("resize", setMonths);

    return () => window.removeEventListener("resize", setMonths);
  }, []);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      date: {
        from: undefined,
        to: undefined,
      },
      travellers: 1,
      purpose: "",
    },
  });

  const currentDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  function onSubmit(values: SearchFormValues) {
    console.log(values);
    navigate(routesList.searchResult);
  }

  return (
    <div className="z-10 w-full max-w-7xl font-raleway">
      <h1 className="mb-6 text-center text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 sm:mb-8 sm:text-4xl lg:text-5xl">
        How may I help you today?
      </h1>

      <div className="w-full rounded-xl border border-white/30 bg-white/40 shadow-xl backdrop-blur-lg sm:rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 lg:items-end">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <label className="m-0 p-0 text-sm font-semibold text-white">
                      From
                    </label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 w-full bg-white text-black outline-none focus-visible:ring-transparent">
                          <SelectValue placeholder="Start from" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationOptions.map((location) => (
                          <SelectItem key={`from-${location}`} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-semibold text-red-700" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <label className="m-0 p-0 text-sm font-semibold text-white">
                      To
                    </label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 w-full bg-white text-black outline-none focus-visible:ring-transparent">
                          <SelectValue placeholder="Going to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationOptions.map((location) => (
                          <SelectItem key={`to-${location}`} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-semibold text-red-700" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full lg:col-span-2">
                    <p className="text-sm font-semibold text-white">Travel Dates</p>
                    <Popover open={openDate} onOpenChange={setOpenDate}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 w-full justify-start gap-2 overflow-hidden border bg-white px-3 text-left text-black",
                              !field.value?.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4 shrink-0 text-black/70" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <span className="truncate">
                                  {format(field.value.from, "LLL dd, y")} - {" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </span>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Select travel dates</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto max-w-[calc(100vw-2rem)] p-0"
                        align="start"
                      >
                        <Calendar
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={(range) => {
                            field.onChange({
                              from: range?.from,
                              to: range?.to,
                            });

                            if (
                              range?.from &&
                              range?.to &&
                              range.from.getTime() !== range.to.getTime()
                            ) {
                              setOpenDate(false);
                            }
                          }}
                          disabled={(date) => date < currentDate}
                          numberOfMonths={calendarMonths}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="font-semibold text-red-700" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travellers"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <p className="text-sm font-semibold text-white">Travellers</p>
                    <div className="flex h-11 items-center rounded-md border bg-white">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => field.onChange(Math.max(1, field.value - 1))}
                        className="h-full rounded-r-none px-3 text-base text-black hover:bg-gray-100"
                      >
                        -
                      </Button>

                      <Input
                        readOnly
                        type="number"
                        className="h-full border-y-0 border-x text-center focus-visible:ring-0"
                        value={field.value}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => field.onChange(field.value + 1)}
                        className="h-full rounded-l-none px-3 text-base text-black hover:bg-gray-100"
                      >
                        +
                      </Button>
                    </div>
                    <FormMessage className="font-semibold text-red-700" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <label className="m-0 p-0 text-sm font-semibold text-white">
                      Purpose
                    </label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 w-full bg-white text-black outline-none focus-visible:ring-transparent">
                          <SelectValue placeholder="Traveling for" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {purposeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-semibold text-red-700" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-5 text-center">
              <Button
                type="submit"
                className="w-full bg-gradient-animate px-6 py-3 text-base font-semibold sm:w-auto"
                size="lg"
              >
                <Sparkles className="mr-2" />
                Generate Plan
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="mt-6 hidden flex-wrap justify-center gap-3 md:flex">
        <Button variant="outline" className="gap-2 bg-white/90">
          <Ship className="h-4 w-4" />
          Trip to Cox&apos;s Bazar
        </Button>
        <Button variant="outline" className="gap-2 bg-white/90">
          <Leaf className="h-4 w-4" />
          Clouds of Sajek Valley
        </Button>
        <Button variant="outline" className="gap-2 bg-white/90">
          <Mountain className="h-4 w-4" />
          Mountains of Bandarban
        </Button>
      </div>
    </div>
  );
};

export default Searchbox;
