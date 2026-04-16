import {
  Building2,
  Hotel,
  Link2,
  MapPinned,
  Route,
  type LucideIcon,
} from "lucide-react";

import { routesList } from "@/constants/routeList";

export type DashboardNavItem = {
  title: string;
  path: string;
  icon: LucideIcon;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "City",
    path: routesList.dashboardCity,
    icon: Building2,
  },
  {
    title: "Travel Connector",
    path: routesList.dashboardTravelConnector,
    icon: Route,
  },
  {
    title: "Hotel",
    path: routesList.dashboardHotel,
    icon: Hotel,
  },
  {
    title: "Attraction",
    path: routesList.dashboardAttraction,
    icon: MapPinned,
  },
  {
    title: "Attraction Connector",
    path: routesList.dashboardAttractionConnector,
    icon: Link2,
  },
];
