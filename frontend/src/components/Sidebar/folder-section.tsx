import React, { useEffect, useState, useRef } from "react";
import { Plus, MoreHorizontal, Folder, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { type Page } from "@/types/page";

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

interface FolderSectionProps {
  baseUrl?: string;
}

const FolderSection = ({
  baseUrl = "/insert_url_here",
}: FolderSectionProps) => {
  const { isMobile } = useSidebar();
  const [folderList, setFolderList] = useState<NavFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastEditingFolderId, setLastEditingFolderId] = useState<string | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/folders`);
      if (!response.ok) {
        throw new Error("Unable to fetch folders");
      }
      const folders = await response.json();

      //ensure data consistency
      const transformedFolders: NavFolder[] = folders.map((folder: any) => ({
        id: folder.id,
        name: folder.name,
        contents: folder.contents || [],
        isEditing: false,
      }));

      setFolderList(transformedFolders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load folders");
      console.error("Error fetching folders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

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

  const createFolder = async () => {
    try {
      const response = await fetch(`${baseUrl}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `folder-${Date.now()}`,
          name: `New Folder ${folderList.length + 1}`,
          contents: [],
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create folder");
      }
      const newFolder = await response.json();
      const folderWithEditing: NavFolder = {
        ...newFolder,
        isEditing: true,
      };
      setFolderList((prev) => [...prev, folderWithEditing]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create folder");
      console.error("Error creating folder:", err);
    }
  };

  const handleFolderNameChange = (folderId: string, newName: string) => {
    setFolderList((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  };

  const finishEditing = async (folderId: string) => {
    const folder = folderList.find((f) => f.id === folderId);
    if (!folder) return;
    try {
      await updateFolder(folderId, { name: folder.name });
      setFolderList((prev) =>
        prev.map((f) => (f.id === folderId ? { ...f, isEditing: false } : f))
      );
    } catch (err) {
      console.error("Failed to save folder name:", err);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent, folderId: string) => {
    if (e.key === "Enter") {
      finishEditing(folderId);
    } else if (e.key === "Escape") {
      const folder = folderList.find((f) => f.id === folderId);
      if (folder && folder.name.startsWith("New Folder")) {
        deleteFolder(folderId);
      } else {
        await finishEditing(folderId);
      }
    }
  };

  const updateFolder = async (
    folderId: string,
    updates: Partial<NavFolder>
  ) => {
    try {
      const response = await fetch(`${baseUrl}/folders/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update folder: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error("Error updating folder:", err);
      setError(err instanceof Error ? err.message : "Failed to update folder");
      throw err;
    }
  };

  const deleteFolder = async (folderId: string) => {
    try {
      const response = await fetch(`${baseUrl}/folders/${folderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }
      setFolderList((prev) => prev.filter((folder) => folder.id !== folderId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete folder");
      console.error("Error deleting folder:", err);
    }
    setFolderList((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  const handleBlur = (folderId: string, folderName: string) => {
    if (!folderName.trim()) {
      deleteFolder(folderId);
    } else {
      finishEditing(folderId);
    }
  };

  const showPages = async () => {

  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <SidebarGroupAction title="Create Folder" onClick={createFolder}>
        <Plus /> <span className="sr-only">Create Folder</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <ScrollArea className="h-[300px] w-[100%]">
          <SidebarMenu>
            {folderList.map((folder) => (
              <SidebarMenuItem key={folder.id}>
                <div className="flex items-center w-[114%]">
                  <SidebarMenuButton asChild>
                    <div onClick = {() => showPages}>
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
                            className="text-destructive"
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