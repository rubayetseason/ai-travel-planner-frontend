import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { routesList } from "@/constants/routeList";

import { dashboardNavItems } from "./_components/dashboardConfig";

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="font-raleway min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-violet-100">
      <div className="flex min-h-screen">
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsMobileSidebarOpen(false)}
          className={cn(
            "fixed inset-0 z-30 bg-black/40 md:hidden",
            isMobileSidebarOpen ? "block" : "hidden"
          )}
        />

        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transition-transform duration-300 md:static md:translate-x-0",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar className="h-full w-72 border-white/10 bg-gradient-to-b from-sky-950 via-indigo-950 to-violet-950 text-white shadow-xl md:shadow-none">
            <SidebarHeader className="border-white/10">
              <h2 className="text-lg font-semibold tracking-tight text-white">Travel Admin</h2>
              <p className="text-xs text-white/70">CRUD management panel</p>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-white/60">Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {dashboardNavItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={() => setIsMobileSidebarOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-white/18 text-white shadow-sm"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            )
                          }
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-white/10">
              <Button
                variant="outline"
                asChild
                className="w-full justify-start border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                <NavLink to={routesList.system}>Go to System</NavLink>
              </Button>
            </SidebarFooter>
          </Sidebar>
        </div>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-cyan-200/60 bg-white/70 px-4 backdrop-blur md:px-6">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </Button>

            <div>
              <h1 className="text-base font-semibold text-slate-900 md:text-lg">Dashboard CRUD</h1>
              <p className="text-muted-foreground hidden text-xs sm:block">
                Manage cities, connectors, hotels, attractions, and travel mapping.
              </p>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
