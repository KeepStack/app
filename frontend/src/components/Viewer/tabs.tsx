import { useState } from "react";
import { X } from "lucide-react";
import type { Tab } from "@/types/tab";
import Blank from "./blank";
import useViewer from "@/hooks/use-viewer";
//import TextContent from "./text-content";

const initialTabs: Tab[] = [
  {
    index: 1,
    title: "Welcome",
    url: "https://example.com/page1",
    isActive: true,
  },
  {
    index: 2,
    title: "About",
    url: "https://example.com/page2",
    isActive: false,
  },
  {
    index: 3,
    title: "Settings",
    url: "https://example.com/page3",
    isActive: false,
  },
];

const Tabs = () => {
  //let tabsList: Tab[] = [];
  //const [tabsList, setTabsList] = useState<Tab[]>(initialTabs);
  //const [activeTab, setActiveTab] = useState<Tab>();
  const {
    tabsList,
    activeTab,
    handleTabClick,
    handleTabClose,
  } = useViewer();

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Tab headers */}
      {tabsList ? (
        <div className="flex flex-row overflow-x-auto bg-secondary">
          {tabsList.map((tab) => (
            <div
              key={tab.index}
              className={`flex items-center justify-between px-4 py-2 min-w-32 cursor-pointer border-r ${
                tab.isActive ? "bg-background" : "bg-secondary hover:bg-chart-5"
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
      ) : (
        <Blank />
      )}
      {/* Tab content */}
      {activeTab && <div className="flex-1 overflow-auto">{activeTab.url}</div>}
    </div>
  );
};

export default Tabs;
