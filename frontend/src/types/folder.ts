import { type Page } from './page';

export interface NavFolder {
  id: string;
    name: string;
    contents: Page[];
    isEditing?: boolean;
}