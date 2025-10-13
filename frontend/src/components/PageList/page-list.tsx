import { useLocation } from "react-router-dom";
import { type Page } from "@/types/page";
import ListItem from "../PageList/list-item";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PageList = () => {
  const location = useLocation();
  const activeItem = {};
  const fetchPages = () => {
    //TODO: Fetch pages from API
  };
  const pages: Page[] = [
    {
      id: "1",
      title: "Example Page 1",
      url: "https://example.com/page1",
      type: "text",
      dateAdded: new Date(),
      description: "This is a description for Example Page 1.",
    },
    {
      id: "2",
      title: "Example Page 2",
      url: "https://example.com/page2",
      type: "video",
      dateAdded: new Date(),
      description: "This is a description for Example Page 2.",
    },
    {
      id: "3",
      title: "Example Page 3",
      url: "https://example.com/page3",
      type: "document",
      dateAdded: new Date(),
      description: "This is a description for Example Page 3.",
    },
  ];
  return (
    <aside className="flex w-82 flex-col border-r h-[calc(100vh-var(--header-height))] overflow-hidden">
      <div className="flex w-full items-center justify-between border-b p-4 flex-shrink-0">
        <div className="text-foreground text-base font-medium">Bookmarks</div>
        <Label className="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch />
        </Label>
      </div>
      <div className="flex-1 overflow-y-auto">
        {pages.map((page) => (
          <ListItem key={page.id} page={page} />
        ))}
      </div>
    </aside>
  );
};

export default PageList;