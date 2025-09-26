import type { Page } from "./page";
import type { NavFolder } from "./folder";

export interface User {
  id: string;
  username: string;
  email: string;
  bookmarks: Page[];
  folders: NavFolder[];
}