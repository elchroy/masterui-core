// import { usePermissions } from "@kit/contexts/permissions-context";
// import BasePage from "@kit/pages/entities/base-page";
// import type { ReactNode } from "react";
// import { NotAuthorized } from "./empty-states";

// export interface PermissionGuardProps {
//   permission: string;
//   children: ReactNode;
//   fallback?: ReactNode;
//   showBasePage?: boolean;
// }

// /**
//  * PermissionGuard - Declarative Permission Wrapper
//  * 
//  * This component handles permission checking for any content, removing the need
//  * for individual pages/components to handle their own permission logic.
//  * 
//  * Usage:
//  * <PermissionGuard permission="users.read">
//  *   <UserListPage />
//  * </PermissionGuard>
//  */
// export function PermissionGuard({
//   permission,
//   children,
//   fallback,
//   showBasePage = true,
// }: PermissionGuardProps) {
//   const { can } = usePermissions();

//   // If user has permission, render children
//   if (can(permission)) {
//     return <>{children}</>;
//   }

//   // If custom fallback is provided, use it
//   if (fallback) {
//     return <>{fallback}</>;
//   }

//   // Default: show not authorized state
//   if (showBasePage) {
//     return (
//       <BasePage>
//         <div className="container mx-auto">
//           <NotAuthorized />
//         </div>
//       </BasePage>
//     );
//   }

//   return <NotAuthorized />;
// }
