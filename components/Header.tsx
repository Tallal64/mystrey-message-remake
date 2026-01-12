"use client";

import { BrainCircuit, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function Header() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="container sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 py-10 mx-auto border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center text-lg font-bold rounded-lg w-8 h-8 bg-muted">
            <BrainCircuit
              className="text-primary"
              size={25}
              strokeWidth={2.2}
            />
          </div>
          <span className="text-xl font-semibold">Mystrey-Message</span>
        </div>

        <Button size={"icon"} onClick={toggleTheme}>
          <SunMoon size={25} />
        </Button>
      </div>
    </header>
  );
}
