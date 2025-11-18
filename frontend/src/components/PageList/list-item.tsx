import { useEffect, useState } from "react";
import {
  BookImage,
  ExternalLink,
  FileText,
  Play,
  Text,
  Globe,
} from "lucide-react";
import { type Page } from "@/types/page";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ListItemProps {
  page: Page;
  onClick?: (page: Page) => void;
  //onRemove?: (pageId: string) => void;
}

const ListItem = ({ page, onClick }: ListItemProps) => {
  const [faviconUrl, setFaviconUrl] = useState<null | string>(null);
  const [faviconError, setFaviconError] = useState(false);
  const [unread, setUnread] = useState<boolean>(true);

  const getDomainFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return null;
    }
  };

  const getFaviconUrls = (url: string): string[] | null => {
    const domain = getDomainFromUrl(url);
    if (!domain) return null;
    return [
      `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      `https://favicons.githubusercontent.com/${domain}`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    ];
  };

  useEffect(() => {
    const faviconUrls = getFaviconUrls(page.url);
    let currentIndex = 0;
    if (faviconUrls) {
      const tryNextFavicon = () => {
        if (currentIndex >= faviconUrls.length) {
          setFaviconError(true);
          return;
        }

        const img = new Image();
        const currentUrl = faviconUrls[currentIndex];

        img.onload = () => {
          setFaviconUrl(currentUrl);
          setFaviconError(false);
        };

        img.onerror = () => {
          currentIndex++;
          tryNextFavicon();
        };

        img.src = currentUrl;
      };

      setFaviconError(false);
      setFaviconUrl(null);

      tryNextFavicon();
    }
  }, [page.url]);

  const getFallbackIcon = () => {
    switch (page.type) {
      case "video":
        return <Play />;
      case "text":
        return <Text />;
      case "document":
        return <FileText />;
      case "image":
        return <BookImage />;
      case "other":
        return <Globe />;
    }
  };

  const handleClick = (page: Page) => {
    setUnread(false);
    launchPage(page);
  };

  const launchPage = (page: Page) => {
    //TODO: open the page on the viewer
  };

  return (
    <a
      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
      onClick={() => handleClick(page)}
    >
      <div className="flex gap-3 items-center">
        {faviconUrl && !faviconError ? (
          <img
            src={faviconUrl}
            alt={`${getDomainFromUrl(page.url)} favicon`}
            className="w-8 h-8 rounded-sm flex-shrink-0"
            onError={() => setFaviconError(true)}
          />
        ) : (
          <div className="w-8 h-8 text-muted-foreground flex-shrink-0">
            {getFallbackIcon()}
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-medium">{page.title}</span>
          <span className="line-clamp-1 w-[260px] text-xs whitespace-break-spaces">
            {page.description}
          </span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a onClick={() => {}}>Remove</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href={page.url} className="inline-flex items-center gap-2">
                  Open Link
                  <ExternalLink className="w-3 h-3" />
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </a>
  );
};

export default ListItem;
