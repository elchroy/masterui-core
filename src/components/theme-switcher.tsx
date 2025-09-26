import { Button } from "@kit/components/ui/button";
import { useCore } from "@kit/contexts/core-context";
import { cn } from "@core/lib/utils";
import { Moon, Sun } from "lucide-react";

type ThemeSwitcherProps = {
  className?: string;
} & React.ComponentProps<typeof Button>;

function ThemeSwitcher({className, ...props}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useCore();
  return (
    <Button
      size="icon"
      className={cn("w-6 h-6", className)}
      onClick={toggleTheme}
      {...props}
    >
      <span className="p-1">{ theme === 'dark' ? <Sun /> : <Moon />}</span>
      <span className="sr-only">
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </span>
    </Button>
  );
}

export default ThemeSwitcher;