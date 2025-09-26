import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { Skeleton } from "./ui/skeleton";

// Basic spinner loading
export const SpinnerLoading: React.FC<{ 
  size?: "sm" | "md" | "lg"; 
  className?: string; 
}> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin", sizeClasses[size])} />
    </div>
  );
};

// Pulse loading for content areas
export const PulseLoading: React.FC<{ 
  lines?: number; 
  className?: string; 
}> = ({ lines = 3, className }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={cn("h-4 w-full", i === lines - 1 && "w-3/4")} />
    ))}
  </div>
);

// Card skeleton loading
export const CardSkeleton: React.FC<{ 
  count?: number; 
  className?: string; 
}> = ({ count = 1, className }) => (
  <div className={cn("grid gap-4", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-lg border p-4 space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);

// Table skeleton loading
export const TableSkeleton: React.FC<{ 
  rows?: number; 
  columns?: number; 
  className?: string; 
}> = ({ rows = 5, columns = 4, className }) => (
  <div className={cn("space-y-3", className)}>
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-8" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div 
        key={rowIndex} 
        className="grid gap-2" 
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-6" />
        ))}
      </div>
    ))}
  </div>
);

// Page loading wrapper
export const PageLoading: React.FC<{ 
  type?: "spinner" | "skeleton"; 
  children?: React.ReactNode;
  loading?: boolean;
  className?: string;
}> = ({ type = "spinner", children, loading = true, className }) => {
  if (!loading) return <>{children}</>;

  return (
    <div className={cn("min-h-[200px] flex items-center justify-center", className)}>
      {type === "spinner" ? (
        <SpinnerLoading size="lg" />
      ) : (
        <div className="w-full max-w-2xl">
          <PulseLoading lines={6} />
        </div>
      )}
    </div>
  );
};

export { Skeleton as SkeletonLoading };
