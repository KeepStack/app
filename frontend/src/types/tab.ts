import type { Page } from "./page";

export type Tab = Pick<Page, "title" | "url"> & {
  index: number;
  isActive: boolean;
};