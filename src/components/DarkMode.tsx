import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useState } from "react";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  }

  const icon = darkMode ? <SunIcon className="w-auto h-18" color="#ec4e20" /> : <MoonIcon className="w-auto h-18" color="#ec4e20" />;

  return (
    <IconButton variant="ghost" onClick={handleDarkMode} className="hover:bg-inherit">
      {icon}
    </IconButton>
  )
}
