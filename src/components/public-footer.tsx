import type { BrandConfig } from "@kit/configs/content-config";
import type { FeatureFlags } from "@kit/configs/feature-flags";
import { useCore } from "@kit/contexts/core-context";
// import { useFeatureFlags } from "@kit/hooks/use-feature-flags";
import { Link } from "react-router-dom";

interface PublicFooterProps {
  brand: BrandConfig;
}

interface FooterLink {
  href: string;
  label: string;
  flag: keyof FeatureFlags | "auth";
}

const productLinks: FooterLink[] = [
  { href: "/features", label: "Features", flag: "features" },
  { href: "/pricing", label: "Pricing", flag: "pricing" },
  // { href: "/integrations", label: "Integrations", flag: "integrations" },
  // { href: "/security", label: "Security", flag: "security" },
] as const;

const companyLinks: FooterLink[] = [
  { href: "/about", label: "About Us", flag: "about" },
  { href: "/careers", label: "Careers", flag: "careers" },
  // { href: "/team", label: "Team", flag: "team" },
  // { href: "/contact", label: "Contact", flag: "contact" },
] as const;

const resourceLinks: FooterLink[] = [
  // { href: "/blog", label: "Blog", flag: "blog" },
  // { href: "/docs", label: "Documentation", flag: "documentation" },
  // { href: "/help", label: "Help Center", flag: "helpCenter" },
  // { href: "/changelog", label: "Changelog", flag: "changelog" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy", flag: "privacyPolicy" },
  { href: "/terms", label: "Terms of Service", flag: "termsOfService" },
  // { href: "/cookies", label: "Cookie Policy", flag: "cookiePolicy" },
];

interface SocialPlatform {
  key: string;
  label: string;
  url: string;
}

export function PublicFooter({ brand }: PublicFooterProps) {
  // const featureFlags = useFeatureFlags();
  const { featureFlags } = useCore();
  const currentYear = new Date().getFullYear();

  const visibleProductLinks = productLinks.filter(link => 
    featureFlags[link.flag as keyof typeof featureFlags]
  );

  const visibleCompanyLinks = companyLinks.filter(link => 
    featureFlags[link.flag as keyof typeof featureFlags]
  );

  const visibleResourceLinks = resourceLinks.filter(link => 
    featureFlags[link.flag as keyof typeof featureFlags]
  );

  const visibleLegalLinks = legalLinks.filter(link => 
    featureFlags[link.flag as keyof typeof featureFlags]
  );

  const socialPlatforms: SocialPlatform[] = [
    // { key: "twitter", label: "Twitter", url: brand.social.twitter },
    // { key: "linkedin", label: "LinkedIn", url: brand.social.linkedin },
    // { key: "github", label: "GitHub", url: brand.social.github },
    // { key: "discord", label: "Discord", url: brand.social.discord },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-12">
        <div
          // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          className="flex justify-between"
        >
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {brand.logo.icon ? (
                  <img src={brand.logo.icon} alt={brand.name} className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-bold">{brand.logo.text}</span>
                )}
              </div>
              <span>{brand.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {brand.description}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialPlatforms.map(platform => 
                platform.url && (
                  <a
                    key={platform.key}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={platform.label}
                  >
                    <div className="h-5 w-5">
                      {platform.key === 'twitter' && (
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      )}
                      {platform.key === 'linkedin' && (
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {platform.key === 'github' && (
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                      {platform.key === 'discord' && (
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.120.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.210 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.210 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                      )}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Product Links */}
          {visibleProductLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-4">Product</h3>
              <ul className="space-y-3">
                {visibleProductLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company Links */}
          {visibleCompanyLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-3">
                {visibleCompanyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resource Links */}
          {visibleResourceLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-4">Resources</h3>
              <ul className="space-y-3">
                {visibleResourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Links */}
          {visibleLegalLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-4">Legal</h3>
              <ul className="space-y-3">
                {visibleLegalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {brand.legal.companyName}. All rights reserved.
          </p>

          {brand.contact && brand.contact.email && (
            <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
              <a 
                href={`mailto:${brand.contact.email}`}
                className="hover:text-primary transition-colors"
              >
                {brand.contact.email}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
