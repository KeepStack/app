import React, { useEffect, useState, useRef } from "react";
import { Plus, MoreHorizontal, Folder, Trash2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupAction,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavFolder {
  id: string;
  name: string;
  contents: Page[];
  isEditing?: boolean;
}

interface Page {
  id: string;
  title: string;
  url: string;
  type: "video" | "article" | "document";
  dateAdded: Date;
}

const FolderSection = () => {
  const { isMobile } = useSidebar();
  const [folderList, setFolderList] = useState<NavFolder[]>([]);
  const [lastEditingFolderId, setLastEditingFolderId] = useState<string | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const editingFolder = folderList.find((folder) => folder.isEditing);

    if (editingFolder && editingFolder.id !== lastEditingFolderId) {
      setLastEditingFolderId(editingFolder.id);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    } else if (!editingFolder && lastEditingFolderId) {
      setLastEditingFolderId(null);
    }
  }, [folderList, lastEditingFolderId]);

  const createFolder = () => {
    const newFolder: NavFolder = {
      id: `folder-${Date.now()}`,
      name: "New Folder",
      contents: [],
      isEditing: true,
    };
    setFolderList((prev) => [...prev, newFolder]);
  };

  const handleFolderNameChange = (folderId: string, newName: string) => {
    setFolderList((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  };

  const finishEditing = (folderId: string) => {
    setFolderList((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, isEditing: false } : folder
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, folderId: string) => {
    if (e.key === "Enter") {
      finishEditing(folderId);
    } else if (e.key === "Escape") {
      const folder = folderList.find((f) => f.id === folderId);
      if (folder && folder.name === "New Folder") {
        deleteFolder(folderId);
      } else {
        finishEditing(folderId);
      }
    }
  };

  const deleteFolder = (folderId: string) => {
    setFolderList((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  const handleBlur = (folderId: string, folderName: string) => {
    if (!folderName.trim()) {
      deleteFolder(folderId);
    } else {
      finishEditing(folderId);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <SidebarGroupAction title="Create Folder" onClick={createFolder}>
        <Plus /> <span className="sr-only">Create Folder</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <ScrollArea className="h-[300px] w-full">
          <SidebarMenu>
            {folderList.map((folder) => (
              <SidebarMenuItem key={folder.id}>
                <div className="flex items-center w-[114%]">
                  <SidebarMenuButton asChild>
                    <div>
                      <Folder />
                      {folder.isEditing ? (
                        <input
                          ref={inputRef}
                          type="text"
                          value={folder.name}
                          onChange={(e) =>
                            handleFolderNameChange(folder.id, e.target.value)
                          }
                          onBlur={() => handleBlur(folder.id, folder.name)}
                          onKeyDown={(e) => handleKeyDown(e, folder.id)}
                          className="bg-transparent border-none outline-none flex-1 text-sm"
                          placeholder="Folder name..."
                        />
                      ) : (
                        <span
                          onDoubleClick={() =>
                            setFolderList((prev) =>
                              prev.map((f) =>
                                f.id === folder.id
                                  ? { ...f, isEditing: true }
                                  : f
                              )
                            )
                          }
                          className="flex-1 cursor-pointer"
                        >
                          {folder.name}
                        </span>
                      )}
                    </div>
                  </SidebarMenuButton>
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {!folder.isEditing && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-56 rounded-lg"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              setFolderList((prev) =>
                                prev.map((f) =>
                                  f.id === folder.id
                                    ? { ...f, isEditing: true }
                                    : f
                                )
                              )
                            }
                          >
                            <span>Rename</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteFolder(folder.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="text-muted-foreground" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default FolderSection;