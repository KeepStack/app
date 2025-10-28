import { useState } from "react";
import { X } from "lucide-react";
import { type Page } from "@/types/page";
import Blank from "./blank";

interface Tab extends Page {
  isActive: boolean;
}

const Tabs = () => {
  let tabsList: Tab[] = [];
  const [activeTab, setActiveTab] = useState<string>(
    tabsList[0]?.title || "New Tab"
  );
  const activeTabContent = tabsList.find((tab) => tab.id === activeTab);
  return (
    <div className="flex flex-row w-full flex-1 overflow-x-auto scrollbar-hide">
      {/* Tab header */}
      {tabsList ? (
        <div className="bg-primary h-6">
          {tabsList.map((tab) => (
            <div
              key={tab.id}
              className={`justify-between mx-1 ${
                //this stuff controls the active tab styling and whether it changes on hover
                tab.isActive
                  ? "bg-primary-foreground border-2 border-accent-foreground"
                  : "bg-primary"
              } ${
                !tab.isActive ? "hover:bg-chart-5" : ""
              } text-sidebar-accent-foreground text-xs w-`}
              onClick ={() => setActiveTab(tab.id)}
            >
              <span className="truncate text-left">{tab.title}</span>
              <button>
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Blank />
      )}
      {/* Tab content */}
      <div>
        {activeTabContent && activeTabContent !== null}
      </div>
    </div>
  );
};

export default Tabs;