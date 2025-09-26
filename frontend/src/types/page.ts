export interface Page {
  id: string;
  title: string;
  url: string;
  type: "video" | "text" | "document" | "image" | "other";
  dateAdded: Date;
  description?: string;
}

export interface PageCreateRequest {
  
}