import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Briefcase, 
  Code, 
  Layers, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Tag, 
  User, 
  X 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const links = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Skills",
      href: "/admin/skills",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Experience",
      href: "/admin/experience",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Tags",
      href: "/admin/tags",
      icon: <Tag className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50 lg:block">
        <div className="flex h-full flex-col px-3 py-4">
          <div className="border-b pb-4 mb-4">
            <Link href="/admin" className="flex items-center px-2 py-3">
              <div className="mr-2 rounded-md bg-primary/10 p-1">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  location === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.icon}
                <span className="ml-3">{link.title}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t pt-4 mt-auto">
            {user && (
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.isAdmin ? "Administrator" : "User"}
                  </span>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header + Sheet Sidebar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50 lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-full flex-col px-3 py-4">
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center justify-between px-2 py-3">
                  <Link href="/admin" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <div className="mr-2 rounded-md bg-primary/10 p-1">
                      <LayoutDashboard className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold">Admin Panel</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <nav className="flex-1 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      location === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-3">{link.title}</span>
                  </Link>
                ))}
              </nav>
              <div className="border-t pt-4 mt-auto">
                {user && (
                  <div className="flex items-center gap-2 px-3 py-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.isAdmin ? "Administrator" : "User"}
                      </span>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            <span className="font-bold">Admin Panel</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        <div className="container mx-auto p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}