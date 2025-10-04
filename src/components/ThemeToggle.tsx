import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return theme === "dark" ? (
    <Button
      className="cursor-pointer"
      size="icon"
      variant="ghost"
      onClick={() => setTheme("light")}
    >
      <Sun />
    </Button>
  ) : (
    <Button
      className="cursor-pointer"
      size="icon"
      variant="ghost"
      onClick={() => setTheme("dark")}
    >
      <Moon />
    </Button>
  );
}
