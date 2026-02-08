import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShineBorder } from "@/components/ui/shine-border";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const EditResult = () => {
  const [message, setMessage] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="font-raleway">
          Edit Options
        </Button>
      </DialogTrigger>

      <DialogContent className="font-raleway max-w-lg bg-black/90 border border-white/10 backdrop-blur-xl text-white rounded-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Request a Plan Change
          </DialogTitle>
        </DialogHeader>

        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
        <ShineBorder shineColor={["#09090b", "#615fff", "#1e1a4d"]} />
        {/* Textarea */}
        <div className="mt-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you'd like to change in your trip plan..."
            className="
              min-h-[140px]
              bg-white/5
              border-white/10
              text-slate-200
              placeholder:text-slate-400
              focus-visible:ring-1
              focus-visible:ring-indigo-500
            "
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <DialogTrigger asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogTrigger>

          <Button
            className="bg-gradient-animate"
            onClick={() => {
              console.log("Plan change request:", message);
            }}
          >
            Plan Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditResult;
