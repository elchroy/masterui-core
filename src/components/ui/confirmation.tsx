import { AlertTriangle } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

export interface ConfirmationDialogProps {
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  trigger?: React.ReactNode;
  loading?: boolean;
}

export function ConfirmationDialog ({
  confirmationDialogProps
}: {
  confirmationDialogProps: ConfirmationDialogProps | null;
}) {
  if (!confirmationDialogProps) {
    return null; // or return a default dialog if needed
  }

  const {
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    variant = "default",
    icon,
    trigger,
    loading = false,
  } = confirmationDialogProps;

  // const isOpen = Boolean(onOpenChange); // Assuming onOpenChange is a function that indicates open state
  const isOpen = confirmationDialogProps !== null;

  const content = (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel} disabled={loading}>
          {cancelText}
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className={variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
          disabled={loading}
        >
          {loading ? "Processing..." : confirmText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  if (trigger) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        {content}
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {content}
    </AlertDialog>
  );
};

// // Preset confirmation dialogs for common actions
// interface DeleteConfirmationProps {
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
//   itemName: string;
//   onConfirm: () => void | Promise<void>;
//   onCancel?: () => void;
//   trigger?: React.ReactNode;
//   loading?: boolean;
// }
//
// export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
//   itemName,
//   ...props
// }) => (
//   <ConfirmationDialog
//     confirmationDialogProps={{
//       title: `Delete ${itemName}`,
//       description: `Are you sure you want to delete this ${itemName.toLowerCase()}? This action cannot be undone.`,
//       confirmText: "Delete",
//       icon: <Trash2 className="h-4 w-4" />,
//       variant: "destructive",
//       ...props,
//     }}
//   />
// );

interface UnsavedChangesProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  loading?: boolean;
}

export const UnsavedChangesDialog: React.FC<UnsavedChangesProps> = (props) => (
  <ConfirmationDialog
    confirmationDialogProps={{
      title: "Unsaved Changes",
      description: "You have unsaved changes. Are you sure you want to leave without saving?",
      confirmText: "Leave without saving",
      cancelText: "Stay",
      icon: <AlertTriangle className="h-4 w-4" />,
      variant: "destructive",
      ...props,
    }}
  />
);

export default ConfirmationDialog;
