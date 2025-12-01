import { useContext } from "react";
import { ViewerContext } from "@/contexts/viewer-context";

const useViewer = () => {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error("useViewer must be used within a ViewerProvider");
  }
  return context;
}

export default useViewer;