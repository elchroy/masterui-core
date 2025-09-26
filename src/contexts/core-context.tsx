// import { SidebarMenuGroups } from "@core/components/app-sidebar";
import { ConfirmationDialog, type ConfirmationDialogProps } from "@core/components/ui/confirmation";
import { AuthEndpoints } from "@authentication/domain";
import {
  useEffect,
  useState,
  type ReactNode
} from "react";
import { QueryProvider, type AppQueryClient } from "./query-provider";
import { CoreContext } from "./use-core";
import { SidebarMenuGroups } from "@core/domain";

export type CoreContextType = {
  theme: string
  toggleTheme: () => void
  confirmationDialogProps: ConfirmationDialogProps | null
  setConfirmationDialogProps: (props: ConfirmationDialogProps | null) => void

  // Apis
  // profileApi: ProfileManagementInterface,
  authEndpoints: AuthEndpoints,

  // // Configs
  // brandConfig: BrandConfig,
  // contentConfig: ContentConfig,
  // dashboardConfig: DashboardConfig,

  // // Feature flags
  // featureFlags: FeatureFlags,
  // billingFeatureFlags: BillingFeatureFlags,
  menuItemsGroup: SidebarMenuGroups
}

export interface CoreProviderProps {
  children: ReactNode
  queryClient: AppQueryClient
  // profileApi: ProfileManagementInterface,
  authEndpoints: AuthEndpoints,
  // billingFeatureFlags: BillingFeatureFlags,
  menuItemsGroup: SidebarMenuGroups,
  // featureFlags: FeatureFlags,
  // brandConfig: BrandConfig,
  // contentConfig: ContentConfig,
  // dashboardConfig: DashboardConfig,
}

export function CoreProvider({
  children,
  queryClient,
  // profileApi,
  authEndpoints,
  // billingFeatureFlags,
  menuItemsGroup,
  // featureFlags,
  // brandConfig,
  // contentConfig,
  // dashboardConfig,
}: CoreProviderProps): ReactNode {
  const [theme, setTheme] = useState('light');
  const [confirmationDialogProps, setConfirmationDialogProps] = useState<ConfirmationDialogProps | null>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  return (
      <CoreContext.Provider value={{
        theme,
        toggleTheme,
        confirmationDialogProps,
        setConfirmationDialogProps,
        // profileApi,
        // billingFeatureFlags,
        // featureFlags,
        authEndpoints,
        menuItemsGroup,
        // brandConfig,
        // contentConfig,
        // dashboardConfig,
      }}>
        <QueryProvider queryClient={queryClient}>
          {confirmationDialogProps && <ConfirmationDialog confirmationDialogProps={confirmationDialogProps} />}
          {children}
        </QueryProvider>
      </CoreContext.Provider>
  )
}
