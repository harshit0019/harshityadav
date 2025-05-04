import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, RouteProps } from "wouter";

interface ProtectedRouteProps extends RouteProps {
  adminOnly?: boolean;
}

export function ProtectedRoute({ 
  path, 
  children, 
  adminOnly = false,
  ...rest 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path} {...rest}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path} {...rest}>
        <Redirect to="/auth" />
      </Route>
    );
  }
  
  if (adminOnly && !user.isAdmin) {
    return (
      <Route path={path} {...rest}>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p>You need administrator privileges to access this page.</p>
        </div>
      </Route>
    );
  }

  return <Route path={path} {...rest}>{children}</Route>;
}