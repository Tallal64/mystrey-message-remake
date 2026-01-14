"use client";

import { BrainCircuit, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { setTheme } = useTheme();
  const { data: session, status } = useSession();

  const user = session?.user;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="container z top-0 z-50 flex items-center justify-between w-full h-16 px-4 py-10 mx-auto border-b border-border">
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

        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden md:inline-flex"
          >
            <SunMoon />
          </Button>
          {user && (
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex capitalize">
                Welcome,
                <span className="font-semibold">
                  {user.username || user.email} !
                </span>
              </span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
