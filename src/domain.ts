import { LucideIcon } from "lucide-react";

export interface SideNavItem extends NavItem {
  icon: LucideIcon;
  description?: string; // Optional description for the item
  group?: string; // Optional group for categorization
  permission?: string; // Optional permission required to view this item
  variant?: "destructive" | "ghost" | "outline" | "default" | "link"; // Button style variant
  // variant?: string
}

export interface SidebarMenuGroups {
  topMenuItems: SideNavItem[];
  middleMenuItems: SideNavItem[];
  bottomMenuItems: SideNavItem[];
}

export interface NavItem {
  key: string;
  title: string;
  url: string;
  isActive?: boolean;
  items?: (NavItem | SideNavItem)[];
  external?: boolean;
  icon?: LucideIcon;
}

export interface AsyncNavItem extends Omit<SideNavItem, "url"> {
  async: true;
  url: () => Promise<string>;
}