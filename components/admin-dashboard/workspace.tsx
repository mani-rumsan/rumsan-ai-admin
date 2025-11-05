import { FolderKanban, Plus, Users } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useCreateWorkspace,
  useWorkspaceQuery,
} from "@/queries/workspaceQuery";
import { useState } from "react";
import { WorkspacesLoadingGrid } from "./workspace-skeleton";
import { Textarea } from "@/components/ui/textarea";

export default function WorkspacesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");

  const { data: workspaceData, isLoading } = useWorkspaceQuery();

  const createWorkspace = useCreateWorkspace();

  const handleCreateWorkspace = () => {
    if (!workspaceName.trim()) return;
    createWorkspace.mutate(
      {
        name: workspaceName.trim(),
        description: workspaceDescription.trim(),
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setWorkspaceName("");
          setWorkspaceDescription("");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-foreground">
                Workspace Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your AI workspaces and teams
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {isLoading ? (
          <WorkspacesLoadingGrid />
        ) : (
          <>
            {(workspaceData?.data?.myWorkspaces.length ?? 0) > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workspaceData?.data?.myWorkspaces?.map((workspace) => (
                  <Link
                    key={workspace.id}
                    href={`/admin/workspaces/${workspace.id}`}
                  >
                    <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="rounded-lg bg-teal-500 p-3">
                            <FolderKanban className="h-6 w-6 text-white" />
                          </div>
                          <Badge
                            variant={
                              workspace.isActive ? "default" : "secondary"
                            }
                          >
                            {workspace.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {workspace.name}
                        </CardTitle>
                        {workspace.description && (
                          <CardDescription className="text-sm leading-relaxed mt-2">
                            {workspace.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Workspace</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State for New Workspace */}
            <Card className="mt-6 border-dashed">
              <CardHeader className="text-center py-16">
                <div className="mx-auto mb-6 rounded-full bg-muted p-6 w-fit">
                  <Plus className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl mb-3">
                  {workspaceData?.data?.myWorkspaces.length === 0
                    ? "Create Your First Workspace"
                    : "Create a New Workspace"}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed max-w-md mx-auto">
                  {workspaceData?.data?.myWorkspaces.length === 0
                    ? "Get started by setting up a workspace where your team can collaborate and manage AI assistants together"
                    : "Set up a new workspace for your team to collaborate and manage AI assistants"}
                </CardDescription>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-6 mx-auto" size="lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Workspace
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Workspace</DialogTitle>
                      <DialogDescription>
                        Enter details for your new workspace. You can change
                        these later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="workspace-name-2">Workspace Name</Label>
                        <Input
                          id="workspace-name-2"
                          placeholder="e.g., Marketing Team"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="workspace-description-2">
                          Description (Optional)
                        </Label>
                        <Textarea
                          id="workspace-description-2"
                          placeholder="Describe the purpose of this workspace..."
                          value={workspaceDescription}
                          onChange={(e) =>
                            setWorkspaceDescription(e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateWorkspace}
                        disabled={!workspaceName.trim()}
                      >
                        Create Workspace
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
