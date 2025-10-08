import React from "react";
import {
  BookMarked,
  Plus,
  Zap,
  Settings,
  Send,
  CircleQuestionMark,
} from "lucide-react";
import { SearchForm } from "../ui/search";
import { Button } from "../ui/button";
import { NavSecondary } from "./nav-secondary";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import NavUser from "./nav-user";

import FolderSection from "./folder-section";

const items = [
  {
    title: "All Bookmarks",
    url: "#",
    icon: BookMarked,
  },
  {
    title: "Weekly Digest",
    url: "#",
    icon: Zap,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const navSecondary = [
  {
    title: "Support",
    url: "#",
    icon: CircleQuestionMark,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
];

const user = {
  //replaced with the actual user
  name: "John Doe",
  avatar: "",
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const addBookmark = () => {
    // Implement add bookmark functionality here
  };
  return (
    <>
      <Sidebar
        className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
        {...props}
      >
        <SidebarHeader>
          <SearchForm className="w-full sm:ml-auto sm:w-auto mx-auto mt-1" />
          <Button
            variant="secondary"
            className="w-full flex h-[2rem] items-center justify-center mt-1"
            onClick={() => addBookmark()}
          >
            <Plus />
            Add Bookmark
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <FolderSection />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavSecondary items={navSecondary} className="mt-auto" />
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar> 
    </>
  );
};

export default AppSidebar;