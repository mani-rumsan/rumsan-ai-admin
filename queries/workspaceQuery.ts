import { ROUTES } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/utils";
import { toastUtils } from "@/lib/toast-utils";

export interface Workspace {
  id: string;
  orgId: string | null;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  isPersonal: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
export type CreateInvitationPayload = {
  email: string;
  role: string;
};

export interface WorkspacesResponse {
  data: {
    myWorkspaces: Workspace[];
  };
}
export function useWorkspaceQuery() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async (): Promise<WorkspacesResponse> => {
      const access_token = getAuthToken();
      const res = await fetch(`${ROUTES.MY_WORKSPACE}`, {
        method: "GET",
        headers: {
          access_token: access_token || "",
          accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.message || data.error || `HTTP ${res.status}: ${res.statusText}`;
        throw new Error(errorMessage);
      }
      return data;
    },
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workspaceData: {
      name: string;
      description?: string;
    }) => {
      const access_token = getAuthToken();
      const res = await fetch(ROUTES.CREATE_WORKSPACE, {
        method: "POST",
        headers: {
          access_token: access_token || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workspaceData),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.message || data.error || `HTTP ${res.status}: ${res.statusText}`;
        throw new Error(errorMessage);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error: Error) => {
      toastUtils.generic.error(
        "Error creating workspace",
        error.message || "Something went wrong. Please try again."
      );
    },
  });
}

export function useInvitationWorkspaceMutation() {
  const queryClient = useQueryClient();
  const workspaceId = localStorage.getItem("workspaceId");

  return useMutation({
    mutationFn: async (payload: CreateInvitationPayload) => {
      const access_token = getAuthToken();
      const res = await fetch(ROUTES.WORKSPACEINVITE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": workspaceId || "",
          access_token: access_token || "",
          accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.message || data.error || `HTTP ${res.status}: ${res.statusText}`;
        throw new Error(errorMessage);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });
      toastUtils.invitations.sendSuccess(1);
    },
    onError: (error: Error) => {
      toastUtils.invitations.sendError(error.message);
    },
  });
}
