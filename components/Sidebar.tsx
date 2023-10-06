"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayerStore from "@/hooks/usePlayerStore";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  songs: Song[];
};

const Sidebar = ({ children, songs }: Props) => {
  const pathname = usePathname();
  const player = usePlayerStore();

  const routes = useMemo(
    () => [
      {
        Icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        Icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        "flex h-full",
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>

        <Box className="overflow-y-auto flex-1">
          <Library songs={songs} />
        </Box>
      </div>

      <main className="flex-1 md:py-2 md:pr-2 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
