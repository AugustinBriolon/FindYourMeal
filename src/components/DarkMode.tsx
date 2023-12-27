import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useState } from "react";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  }

  const icon = darkMode ? <SunIcon className="w-auto h-18 fill-black" /> : <MoonIcon className="w-auto h-18 fill-black" />;

  return (
    <div className="absolute top-4 right-4">
      <IconButton variant="ghost" onClick={handleDarkMode}>
        {icon}
      </IconButton>
    </div>
  )
}
