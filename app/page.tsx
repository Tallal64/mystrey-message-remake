"use client";

import { Button } from "@/components/ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <Button size={"icon"} onClick={toggleTheme}>
        <SunMoon size={25} />
      </Button>
    </div>
  );
}
