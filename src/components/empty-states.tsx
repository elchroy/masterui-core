import { AlertCircle, Database, FileX, Lock, Plus, Search, Users } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary";
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => (
  <Card className={cn("w-full mx-auto", className)}>
    <CardContent className="flex flex-col items-center justify-center text-center p-8 space-y-4">
      {icon && (
        <div className="text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button 
          onClick={action.onClick} 
          variant={action.variant || "default"}
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </CardContent>
  </Card>
);

// Preset empty states for common scenarios
export const NoDataFound: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<Database className="h-12 w-12" />}
    title="No data found"
    {...props}
  />
);

// Preset empty states for common scenarios
export const NotAuthenticated: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<Lock className="h-12 w-12" />}
    title="Not Authenticated"
    description="You need to log in to access this content"
    {...props}
  />
);

// Preset empty states for common scenarios
export const NotAuthorized: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<Lock className="h-12 w-12" />}
    title="Not Authorized"
    description="You do not have permission to access this content"
    {...props}
  />
);

export const NoResultsFound: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<Search className="h-12 w-12" />}
    title="No results found"
    description="Try adjusting your search or filter criteria"
    {...props}
  />
);

export const NoUsersFound: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<Users className="h-12 w-12" />}
    title="No users found"
    {...props}
  />
);

export const FileNotFound: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<FileX className="h-12 w-12" />}
    title="No files found"
    {...props}
  />
);

export const ErrorState: React.FC<Omit<EmptyStateProps, "icon" | "title">> = (props) => (
  <EmptyState
    icon={<AlertCircle className="h-12 w-12 text-destructive" />}
    title="Something went wrong"
    description="An error occurred while loading the data"
    {...props}
  />
);

export const CreateFirstItem: React.FC<Omit<EmptyStateProps, "icon" | "title"> & { itemName: string }> = ({ 
  itemName, 
  ...props 
}) => (
  <EmptyState
    icon={<Plus className="h-12 w-12" />}
    title={`Create your first ${itemName}`}
    description={`Get started by creating your first ${itemName.toLowerCase()}`}
    {...props}
  />
);
