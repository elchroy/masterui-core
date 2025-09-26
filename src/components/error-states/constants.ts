import { AlertTriangle, FileQuestion, ServerCrash } from "lucide-react";
import type { ErrorStateProps } from "./error-state";

export const error404Props: ErrorStateProps = {
  title: "Page not found",
  description: "Sorry, we couldn't find the page you're looking for.",
  icon: FileQuestion,
  actionLabel: "Back to homepage",
};

export const error500Props: ErrorStateProps = {
  title: "Server error",
  description:
    "Sorry, our server encountered an error. Please try again later.",
  icon: ServerCrash,
  actionLabel: "Refresh page",
};

export const error403Props: ErrorStateProps = {
  title: "Access denied",
  description: "Sorry, you don't have permission to access this page.",
  icon: AlertTriangle,
  actionLabel: "Go back",
};

export const error503Props: ErrorStateProps = {
  title: "Service unavailable",
  description:
    "Sorry, our service is currently unavailable. Please try again later.",
  icon: ServerCrash,
  actionLabel: "Try again",
};
