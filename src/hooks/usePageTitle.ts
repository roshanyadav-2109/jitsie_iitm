import { useEffect } from "react";

export function usePageTitle(title?: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | JITSIE IIT Madras` : "JITSIE IIT Madras";
    return () => {
      document.title = previous;
    };
  }, [title]);
}
