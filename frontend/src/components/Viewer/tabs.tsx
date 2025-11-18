import { useState } from "react";
import { X } from "lucide-react";
import { type Page } from "@/types/page";
import Blank from "./blank";
import TextContent from "./text-content";

interface Tab extends Page {
  isActive: boolean;
  content: string;
  
}

const initialTabs: Tab[] = [
  {
    id: "1",
    title: "Welcome",
    content: "Welcome to the tabs system!",
    url: "/",
    isActive: true,
    type: "text",
    dateAdded: new Date(),
  },
  {
    id: "2",
    title: "About",
    content: "This is the about page.",
    url: "/",
    isActive: false,
    type: "text",
    dateAdded: new Date(),
  },
  {
    id: "3",
    title: "Settings",
    content: "Configure your settings here.",
    url: "/",
    isActive: false,
    type: "text",
    dateAdded: new Date(),
  },
];

const Tabs = () => {
  //let tabsList: Tab[] = [];
  const [tabsList, setTabsList] = useState<Tab[]>(initialTabs);
  const [activeTab, setActiveTab] = useState<Tab>();

  const handleTabClick = (tab: Tab) => {
    setTabsList(
      tabsList.map((t) => ({
        ...t,
        isActive: t.id === tab.id,
      }))
    );
    setActiveTab(tab);
  };
  
  return (
    <div className="flex flex-col w-full h-screen">
      {/* Tab headers */}
      {tabsList.length > 0 ? (
        <div className="flex flex-row overflow-x-auto bg-secondary">
          {tabsList.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center justify-between px-4 py-2 min-w-32 cursor-pointer border-r ${
                tab.isActive
                  ? "bg-background"
                  : "bg-secondary hover:bg-chart-5"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              <span className="truncate text-left text-sm text-foreground">
                {tab.title}
              </span>
              <button>
                <X size={14} className="text-foreground" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {activeTab?.content}
      </div>
    </div>
  );
};

export default Tabs;