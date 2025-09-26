import { useEffect, useState } from "react";
import { BookImage, FileText, Play, Text, Globe } from "lucide-react";

export interface Page {
  id: string;
  title: string;
  url: string;
  type: "video" | "text" | "document" | "image" | "other";
  dateAdded: Date;
  description?: string;
}

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
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full mx-auto
      ${
        unread
          ? "bg-background text-foreground"
          : "bg-ring text-muted-foreground"
      }`}
      onClick={() => handleClick(page)}
    >
      <div>
        {faviconUrl && !faviconError ? (
          <img
            src={faviconUrl}
            alt={`${getDomainFromUrl(page.url)} favicon`}
            className="w-48 h-48 rounded-sm"
            onError={() => setFaviconError(true)}
          />
        ) : (
          <div className="w-48 h-48 text-muted-foreground">
            {getFallbackIcon()}
          </div>
        )}
        <h3 className="text-1.25rem font-medium max-w-[75%] truncate">
          {page.title}
        </h3>
        <p className="text-1rem font-light max-w-[75%] truncate">{page.description}</p>
      </div>
    </div>
  );
};

export default ListItem;