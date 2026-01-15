import { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/user";
import type { Tab } from "@/types/tab";
import type { Page } from "@/types/page";
import useUser from "@/hooks/use-user";

export interface ViewerContextType {
  tabsList: Tab[];
  activeTab: Tab | null;
  handleTabClick: (tab: Tab) => void;
  handleTabClose: (tab: Tab) => void;
  openPageAsTab: (page: Page) => void;
  //fetchTabs: () => void;
  isLoading: boolean;
}

interface ViewerProviderProps {
  children: ReactNode;
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

const ViewerProvider = ({ children }: ViewerProviderProps) => {
  const [tabsList, setTabsList] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>(null);
  const isLoadedRef = useRef(false);
  const user = useUser();

  /* const fetchTabs = async () => {
    if (!user) {
      setActiveTab(null);
      setIsLoading(false);
      isLoadedRef.current = false;
      return;
    }
    if (isLoadedRef.current) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/tabs", {
        credentials: "include",
        headers:
        {
          "Content-type" : "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Tab[] = await response.json();
      setTabsList(data);
      const active = data.find((tab) => tab.isActive) || null;
      setActiveTab(active);
    } catch (error) {
      throw new Error("Failed to fetch tabs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTabs();
  }, [user]); */

  //todo: sync tabs with backend on change with debounce

  const openPageAsTab = (page: Page) => {
    const newTab: Tab = {
      ...page,
      isActive: false,
      index: tabsList.length + 1
    }
    setTabsList((prev) => [...prev, newTab])
    setActiveTab(newTab)
  }

  const handleTabClick = (tab: Tab) => {
    setTabsList(
      tabsList.map((t) => ({
        ...t,
        isActive: t.index === tab.index,
      }))
    );
    setActiveTab(tab);
  };

  const handleTabClose = (tab: Tab) => {
    setTabsList((prev) => prev.filter((t) => t.index !== tab.index));
    if (activeTab?.index === tab.index) {
      const remainingTabs = tabsList.filter((t) => t.index !== tab.index);
      setActiveTab(remainingTabs.length > 0 ? remainingTabs[0] : null);
    }
  };

  const value: ViewerContextType = {
    tabsList,
    activeTab,
    handleTabClick,
    handleTabClose,
    openPageAsTab,
    //fetchTabs,
    isLoading,
  };
  return (
    <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>
  );
};

export { ViewerContext, ViewerProvider };
