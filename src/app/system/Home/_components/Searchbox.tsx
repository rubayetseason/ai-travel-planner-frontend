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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Leaf, Mountain, Ship, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  from: z.string({ error: "Location is required" }),
  to: z.string({ error: "Location is required" }),
  date: z
    .object({
      from: z.date({ error: "Start date is required" }),
      to: z.date({ error: "End date is required" }),
    })
    .refine((data) => data.to > data.from, {
      message: "End date must be after start date",
      path: ["to"],
    }),
  travellers: z
    .number({ error: "Traveller count is required" })
    .min(1, { message: "At least 1 traveller is required" }),
  purpose: z.string({ error: "Purpose is required" }),
});

export type SearchFormValues = z.infer<typeof formSchema>;

const Searchbox = () => {
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travellers: 1,
    },
  });

  function onSubmit(values: SearchFormValues) {
    console.log(values);
    navigate("/search-result");
  }

  return (
    <div className="w-full font-raleway flex flex-col items-center justify-center min-h-screen px-4 z-10">
      <h1 className="text-2xl sm:text-3xl md:text-6xl font-raleway font-semibold text-transparent bg-clip-text bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 animate-gradient-text mb-8">
        How may I help you today?
      </h1>

      <div className="max-w-5xl mx-auto bg-white/40 rounded-lg md:rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-8 space-y-2">
              <div className="pt-1 pb-5 flex flex-wrap items-center gap-2 md:gap-3">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-fit">
                      <label className="m-0 p-0 text-white font-semibold text-sm">
                        From
                      </label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full md:w-40 py-5 text-black bg-white outline-none focus-visible:ring-transparent pointer-events-none lg:pointer-events-auto">
                            <SelectValue placeholder="Start From" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Location 1</SelectItem>
                          <SelectItem value="2">Location 2</SelectItem>
                          <SelectItem value="3">Location 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-700 font-bold" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-fit">
                      <label className="m-0 p-0 text-white font-semibold text-sm">
                        To
                      </label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full md:w-40 py-5 text-black bg-white outline-none focus-visible:ring-transparent pointer-events-none lg:pointer-events-auto">
                            <SelectValue placeholder="Going To" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Location 1</SelectItem>
                          <SelectItem value="2">Location 2</SelectItem>
                          <SelectItem value="3">Location 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-700 font-bold" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-fit min-w-[250px]">
                      <p className="text-white font-semibold text-sm">
                        Select Date
                      </p>
                      <Popover open={openDate} onOpenChange={setOpenDate}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "flex items-center gap-2 border px-4 py-5 rounded-md w-full h-[43px] justify-start",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="h-5 w-5 text-[#00000080]" />
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Select travel dates</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={(range) => {
                              field.onChange(range);
                              if (
                                range?.from &&
                                range?.to &&
                                range.from.getTime() !== range.to.getTime()
                              ) {
                                setOpenDate(false);
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-700 font-bold" />
                    </FormItem>
                  )}
                />

                <FormItem className="w-full md:w-fit flex items-center gap-2 md:gap-3">
                  {/* Travellers */}
                  <FormField
                    control={form.control}
                    name="travellers"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <p className="text-white font-semibold text-sm">
                          Travellers
                        </p>
                        <div className="bg-white flex border rounded-md items-center h-11">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-none"
                            onClick={() =>
                              field.onChange(Math.max(1, field.value - 1))
                            }
                          >
                            -
                          </Button>
                          <Input
                            readOnly
                            type="number"
                            className="w-16 mx-auto py-5 text-center outline-none focus-visible:ring-transparent border-y-0 rounded-none"
                            value={field.value}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="border-none"
                            onClick={() => field.onChange(field.value + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <FormMessage className="text-red-700 font-bold" />
                      </FormItem>
                    )}
                  />

                  {/* Purpose */}
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <label className="m-0 p-0 text-white font-semibold text-sm">
                          Purpose
                        </label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full md:w-40 py-5 text-black bg-white outline-none focus-visible:ring-transparent pointer-events-none lg:pointer-events-auto">
                              <SelectValue placeholder="Traveling For" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="honeymoon">Honeymoon</SelectItem>
                            <SelectItem value="family">
                              Family Vacation
                            </SelectItem>
                            <SelectItem value="business">
                              Business Trip
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-700 font-bold" />
                      </FormItem>
                    )}
                  />
                </FormItem>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-gradient-animate px-6 py-3 text-base font-semibold rounded-lg"
                  size="lg"
                >
                  <Sparkles className="mr-2" />
                  Generate Plan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className="hidden md:flex flex-wrap gap-4 mt-6">
        <Button variant="outline" className="gap-2">
          <Ship className="w-4 h-4" />
          Trip to Cox&apos;s Bazar
        </Button>
        <Button variant="outline" className="gap-2">
          <Leaf className="w-4 h-4" />
          Clouds of Sajek Valley
        </Button>
        <Button variant="outline" className="gap-2">
          <Mountain className="w-4 h-4" />
          Mountains of Bandarban
        </Button>
      </div>
    </div>
  );
};

export default Searchbox;
