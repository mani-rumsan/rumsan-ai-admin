"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CreateTeamDialog } from "../dashboard/CreateTeamDialog";
import { ProfileUserDashboard } from "../profile/profile";
import { usePathname } from "next/navigation";
import { useWorkspaceQuery } from "@/queries/workspaceQuery";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function MainHeader({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: workspaceData, isLoading, isError } = useWorkspaceQuery(); // ✅ fetch workspaces
  const [currentValue, setCurrentValue] = useState("Select Workspace");

  useEffect(() => {
    setIsMounted(true);
    const savedName = localStorage.getItem("workspaceName");
    if (savedName) setCurrentValue(savedName);
  }, []);

  const handleTeamCreated = async (teamSlug: string) => {
    console.log("Team created with slug:", teamSlug);
  };
  const handleWorkspaceSelect = (workspace: { id: string; name: string }) => {
    localStorage.setItem("workspaceId", workspace.id);
    localStorage.setItem("workspaceName", workspace.name);
    setCurrentValue(workspace.name);
  };

  if (!isMounted) return null;

  // Check if we're in the admin dashboard
  const isAdminDashboard = pathname?.startsWith("/admin");

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and hamburger (mobile) or workspace switcher (desktop) */}
        <div className="flex items-center space-x-4">
          {/* Logo and title - visible on mobile dashboard and always in admin dashboard, hidden on desktop dashboard */}
          <div
            className={cn(
              "flex items-center space-x-2",
              !isAdminDashboard && "lg:hidden"
            )}
          >
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3 text-white"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Rumsan AI</h1>
          </div>

          {/* Hamburger menu - visible on mobile */}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Workspace switcher - visible on mobile after hamburger, always visible on desktop, hidden in admin dashboard */}
          {!isAdminDashboard && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-40 sm:w-56 justify-between",
                    "data-[state=open]:bg-accent"
                  )}
                >
                  <span>
                    {isLoading
                      ? "Loading..."
                      : isError
                      ? "Error loading"
                      : currentValue}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="start">
                {workspaceData?.data?.myWorkspaces.length ? (
                  workspaceData.data.myWorkspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onClick={() => handleWorkspaceSelect(workspace)}
                    >
                      {workspace.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    No workspaces found
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Right side - Admin and logout */}

        <ProfileUserDashboard />
      </div>

      <CreateTeamDialog
        open={createTeamDialogOpen}
        onOpenChange={setCreateTeamDialogOpen}
        onTeamCreated={handleTeamCreated}
      />
    </header>
  );
}
