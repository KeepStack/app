import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useUser from "@/hooks/use-user";
import type { Page } from "@/types/page";
import type { NavFolder } from "@/types/folder";
import type { User } from "@/types/user";
import type { Tab } from "@/types/tab";

export interface DashboardContextType {
  pageList: Page[];
  folders: NavFolder[];
  fetchPages: () => void;
}

interface DashboardProviderProps {
  children: ReactNode;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [pageList, setPageList] = useState<Page[]>([]);
  const [folders, setFolders] = useState<NavFolder[]>([]);
  const { user } = useUser();

  //logic for folders will be moved to this context
  //logic for page list also goes here

  const fetchPages = () => {
    
  }

  const value: DashboardContextType = {
    pageList,
    folders,
    fetchPages,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
