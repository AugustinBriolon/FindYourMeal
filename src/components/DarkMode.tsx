import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useState, useEffect } from "react";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  }

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const icon = darkMode ? <SunIcon className="w-auto h-18" color="#ec4e20" /> : <MoonIcon className="w-auto h-18" color="#ec4e20" />;

  return (
    <IconButton variant="ghost" onClick={handleDarkMode} className="hover:bg-inherit">
      {icon}
    </IconButton>
  )
}