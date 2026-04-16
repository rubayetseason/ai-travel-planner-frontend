import { Plus, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DashboardPageHeaderProps = {
  title: string;
  description: string;
  createLabel: string;
  onCreate: () => void;
  icon: LucideIcon;
  count: number;
  iconColorClass: string;
};

const DashboardPageHeader = ({
  title,
  description,
  createLabel,
  onCreate,
  icon: Icon,
  count,
  iconColorClass,
}: DashboardPageHeaderProps) => {
  return (
    <Card className="border-white/70 bg-white/80 shadow-sm backdrop-blur-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "mt-0.5 rounded-xl p-2.5 text-white shadow-sm",
                iconColorClass
              )}
            >
              <Icon className="size-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
                <Badge variant="secondary">{count} records</Badge>
              </div>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">{description}</p>
            </div>
          </div>

          <Button
            type="button"
            onClick={onCreate}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:brightness-110"
          >
            <Plus className="mr-1.5 size-4" />
            {createLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPageHeader;
