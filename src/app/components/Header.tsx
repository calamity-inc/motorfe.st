"use client";
import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <header className="bg-white shadow-md p-6 mx-auto relative">
        <div className="flex flex-row items-center justify-between">
          <Link
            className="text-yellow-600 text-xl font-bold tracking-tight"
            href="/"
          >
            The Crew Motorfest Tools
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`bg-yellow-600 h-0.5 w-6 rounded-sm transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1/2" : "mb-1"
              }`}
            ></span>
            <span
              className={`bg-yellow-600 h-0.5 w-6 rounded-sm transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "mb-1"
              }`}
            ></span>
            <span
              className={`bg-yellow-600 h-0.5 w-6 rounded-sm transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1/2" : ""
              }`}
            ></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-4">
                <NavigationMenuItem>
                  <Link
                    className={navigationMenuTriggerStyle()}
                    href="https://tcminteractivemap.netlify.app/"
                  >
                    Interactive Map
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    className={navigationMenuTriggerStyle()}
                    href="/grand-races"
                  >
                    Grand Races
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    className={navigationMenuTriggerStyle()}
                    href="https://builds.militiagamingco.com/"
                  >
                    Pro Settings
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    className={navigationMenuTriggerStyle()}
                    href="https://tunes-motorfest.netlify.app/"
                  >
                    Updated Pro Settings
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    className={navigationMenuTriggerStyle()}
                    href="https://motorfest-tools.militiagamingco.com/"
                  >
                    Motorfest CheckList
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-full gap-2">
              <NavigationMenuItem className="w-full">
                <Link
                  className={`${navigationMenuTriggerStyle()} w-full justify-center`}
                  href="https://tcminteractivemap.netlify.app/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Interactive Map
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link
                  className={`${navigationMenuTriggerStyle()} w-full justify-center`}
                  href="/grand-races"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Grand Races
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link
                  className={`${navigationMenuTriggerStyle()} w-full justify-center`}
                  href="https://builds.militiagamingco.com/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pro Settings
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link
                  className={`${navigationMenuTriggerStyle()} w-full justify-center`}
                  href="https://tunes-motorfest.netlify.app/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Updated Pro Settings
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link
                  className={`${navigationMenuTriggerStyle()} w-full justify-center`}
                  href="https://motorfest-tools.militiagamingco.com/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Motorfest CheckList
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </div>
  );
}
