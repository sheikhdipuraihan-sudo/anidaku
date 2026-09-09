import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AnimeDetails from "./pages/AnimeDetails";
import Watch from "./pages/Watch";
import LibraryPage from "./pages/Library";
import { Route, Switch, Link, useLocation } from "wouter";
import {
  Compass,
  History,
  Home as HomeIcon,
  Library,
  Menu,
  Search,
  Tv,
  X,
} from "lucide-react";
import { useState } from "react";

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/genres", label: "Genres", icon: undefined },
    { href: "/schedule", label: "Schedule", icon: Tv },
    { href: "/history", label: "History", icon: History },
    { href: "/watchlist", label: "Watchlist", icon: Library },
  ];

  return (
    <div className="min-h-screen bg-[#090b12] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090b12]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 lg:px-8">

          {/* Mobile menu */}
          <button
            className="mr-1 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>

          {/* Anidaku name - logo removed */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <span className="text-xl font-black tracking-tight">
              ani<span className="text-[#a5f3fc]">daku</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.slice(0, 4).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10 ${
                  location === href
                    ? "text-[#a5f3fc]"
                    : "text-white/65"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">

            {/* Search */}
            <Link
              href="/search"
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 text-sm text-white/55 transition hover:border-white/20 hover:text-white"
            >
              <Search size={17} />

              <span className="hidden sm:inline">
                Search anime
              </span>

              <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] sm:inline">
                ⌘ K
              </kbd>
            </Link>

            {/* Sign in */}
            <button className="hidden rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15 md:block">
              Sign in
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-white/10 bg-[#0e111b] p-3 lg:hidden">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:bg-white/10"
              >
                {Icon && <Icon size={18} />}
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-2xl border border-white/10 bg-[#111522]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
        {nav.slice(0, 5).map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] ${
              location === href
                ? "text-[#a5f3fc]"
                : "text-white/45"
            }`}
          >
            {Icon && <Icon size={18} />}
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/search" component={Home} />

        <Route path="/explore" component={Home} />

        <Route
          path="/anime/:id"
          component={AnimeDetails}
        />

        <Route
          path="/genres"
          component={LibraryPage}
        />

        <Route
          path="/schedule"
          component={LibraryPage}
        />

        <Route
          path="/history"
          component={LibraryPage}
        />

        <Route
          path="/watchlist"
          component={LibraryPage}
        />

        <Route
          path="/watch/:id/:episode"
          component={Watch}
        />

        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
