import {useEffect, useRef, useState} from 'react';
import { type Page } from '@/types/page';

const TextContent = ({title, url, type}:Page) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="flex w-full h-full">
      <iframe
        src={url}
        className="w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        onLoad={() => setIsLoading(false)}
        title={title}
      />
    </div>
  );

}
export default TextContent;