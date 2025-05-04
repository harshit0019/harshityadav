import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  ChevronRight,
  Code,
  Eye,
  EyeOff,
  Layers,
  Plus,
  RefreshCw,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  // Get counts for each content type
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/admin/projects", { includeHidden: true }],
    queryFn: async () => {
      const response = await fetch("/api/admin/projects?includeHidden=true");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    }
  });

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/admin/skills", { includeHidden: true }],
    queryFn: async () => {
      const response = await fetch("/api/admin/skills?includeHidden=true");
      if (!response.ok) throw new Error("Failed to fetch skills");
      return response.json();
    }
  });

  const { data: experiences, isLoading: experiencesLoading } = useQuery({
    queryKey: ["/api/admin/experiences", { includeHidden: true }],
    queryFn: async () => {
      const response = await fetch("/api/admin/experiences?includeHidden=true");
      if (!response.ok) throw new Error("Failed to fetch experiences");
      return response.json();
    }
  });

  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ["/api/admin/tags"],
    queryFn: async () => {
      const response = await fetch("/api/admin/tags");
      if (!response.ok) throw new Error("Failed to fetch tags");
      return response.json();
    }
  });

  const countVisible = (items: any[] | undefined) => {
    if (!items) return 0;
    return items.filter(item => item.isVisible).length;
  };
  
  const countHidden = (items: any[] | undefined) => {
    if (!items) return 0;
    return items.filter(item => !item.isVisible).length;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Overview of your portfolio content and quick actions.
            </p>
          </div>
          <Button asChild>
            <Link href="/" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Portfolio
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Projects Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <Skeleton className="h-7 w-full mb-1" />
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {projects?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Eye className="mr-1 h-3 w-3" />
                    <span>{countVisible(projects)} visible</span>
                    <span className="mx-1">•</span>
                    <EyeOff className="mr-1 h-3 w-3" />
                    <span>{countHidden(projects)} hidden</span>
                  </div>
                </>
              )}
              <Button variant="ghost" size="sm" className="mt-2 w-full" asChild>
                <Link href="/admin/projects">
                  Manage
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Skills</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {skillsLoading ? (
                <Skeleton className="h-7 w-full mb-1" />
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {skills?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Eye className="mr-1 h-3 w-3" />
                    <span>{countVisible(skills)} visible</span>
                    <span className="mx-1">•</span>
                    <EyeOff className="mr-1 h-3 w-3" />
                    <span>{countHidden(skills)} hidden</span>
                  </div>
                </>
              )}
              <Button variant="ghost" size="sm" className="mt-2 w-full" asChild>
                <Link href="/admin/skills">
                  Manage
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Experiences Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {experiencesLoading ? (
                <Skeleton className="h-7 w-full mb-1" />
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {experiences?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Eye className="mr-1 h-3 w-3" />
                    <span>{countVisible(experiences)} visible</span>
                    <span className="mx-1">•</span>
                    <EyeOff className="mr-1 h-3 w-3" />
                    <span>{countHidden(experiences)} hidden</span>
                  </div>
                </>
              )}
              <Button variant="ghost" size="sm" className="mt-2 w-full" asChild>
                <Link href="/admin/experience">
                  Manage
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Tags</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {tagsLoading ? (
                <Skeleton className="h-7 w-full mb-1" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{tags?.length || 0}</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    Used for categorizing projects
                  </div>
                </>
              )}
              <Button variant="ghost" size="sm" className="mt-2 w-full" asChild>
                <Link href="/admin/tags">
                  Manage
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Shortcuts to common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Project
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/skills/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Skill
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/experience/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Experience
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/tags/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Tag
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>
                Latest changes to your portfolio content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Display most recently updated content here. For now, show skeleton loader */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}