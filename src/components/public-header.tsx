import type { BrandConfig } from "@kit/configs/content-config";
import type { FeatureFlags } from "@kit/configs/feature-flags";
// import { useFeatureFlags } from "@kit/hooks/use-feature-flags";
import { useCore } from "@kit/contexts/core-context";
import { useAuth } from "@kit/hooks/use-auth";
import { AuthUser } from "@kit/shared/domain";
import { LayoutDashboardIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface PublicHeaderProps {
  brand: BrandConfig;
}

interface NavigationItem {
  href: string;
  label: string;
  flag: keyof FeatureFlags | "auth" ;//| "documentation" | "helpCenter" | "blog";
}

const navigationItems: NavigationItem[] = [
  { href: "/features", label: "Features", flag: "features" },
  { href: "/pricing", label: "Pricing", flag: "pricing" },
  { href: "/about", label: "About", flag: "about" },
  { href: "/contact", label: "Contact", flag: "contact" },
  { href: "/careers", label: "Careers", flag: "careers" },
  { href: "/blog", label: "Blog", flag: "blog" },
  { href: "/docs", label: "Documentation", flag: "documentation" },
  { href: "/help", label: "Help Center", flag: "helpCenter" },
  { href: "/feedback", label: "Feedback", flag: "feedback" },
  { href: "/privacy", label: "Privacy", flag: "privacyPolicy" },
  { href: "/terms", label: "Terms", flag: "termsOfService" },
  { href: "/login", label: "Sign In", flag: "auth" },
  { href: "/register", label: "Get Started", flag: "auth" },
] as const;

// const resourceItems = [
//   { href: "/blog", label: "Blog", flag: "blog" },
//   { href: "/docs", label: "Documentation", flag: "documentation" },
//   { href: "/help", label: "Help Center", flag: "helpCenter" },
// ] as const;

function MobileMenu({
  isOpen,
  onOpenChange,
  brand,
  navItems,
  // resourceItems,
  isActivePath,
  authUser,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  brand: BrandConfig;
  navItems: typeof navigationItems;
  // resourceItems: typeof resourceItems;
  isActivePath: (path: string) => boolean;
  authUser?: AuthUser | null;
}) {
  return (
    <div className="flex md:hidden items-center space-x-2">
      <ThemeSwitcher />
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-80">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b">
              <Link
                to="/"
                className="flex items-center space-x-2 font-bold text-xl"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {brand.logo.icon ? (
                    <img
                      src={brand.logo.icon}
                      alt={brand.name}
                      className="h-6 w-6"
                    />
                  ) : (
                    <span className="text-sm font-bold">
                      {brand.logo.text}
                    </span>
                  )}
                </div>
                <span>{brand.name}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-4 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActivePath(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => onOpenChange(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* {resourceItems.length > 0 && (
                <div className="space-y-2">
                  <div className="text-lg font-medium text-muted-foreground">
                    Resources
                  </div>
                  {resourceItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block pl-4 text-base text-muted-foreground hover:text-primary"
                      onClick={() => onOpenChange(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )} */}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-auto space-y-4">
              {authUser ? (
                <Button className="w-full" asChild>
                  <Link to="/app/dashboard" onClick={() => onOpenChange(false)}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/login" onClick={() => onOpenChange(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => onOpenChange(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="mt-auto space-y-4">
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/login" onClick={() => onOpenChange(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/register" onClick={() => onOpenChange(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function PublicHeader({ brand }: PublicHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { featureFlags } = useCore();
  const { authUser } = useAuth();

  const isActivePath = (path: string) => location.pathname === path;

  const visibleNavItems = navigationItems.filter(
    (item) => featureFlags[item.flag as keyof typeof featureFlags]
  );

  // const visibleResourceItems = resourceItems.filter(
  //   (item) => featureFlags[item.flag as keyof typeof featureFlags]
  // );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {brand.logo.icon ? (
              <img
                src={brand.logo.icon}
                alt={brand.name}
                className="h-6 w-6"
              />
            ) : (
              <span className="text-sm font-bold">{brand.logo.text}</span>
            )}
          </div>
          <span>{brand.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {visibleNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActivePath(item.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeSwitcher />
          {authUser ? (
            <Button asChild>
              <Link to="/app/dashboard">
                <LayoutDashboardIcon className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">
                  Get Started
                </Link>
              </Button>
            </>
          )}
          {/* <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button> */}
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
          brand={brand}
          navItems={visibleNavItems}
          // resourceItems={visibleResourceItems}
          isActivePath={isActivePath}
          authUser={authUser}
        />
      </div>
    </header>
  );
}