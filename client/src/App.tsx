import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./_core/hooks/useAuth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AnimeDetails from "./pages/AnimeDetails";
import Watch from "./pages/Watch";
import LibraryPage from "./pages/Library";
import Browse from "./pages/Browse";
import { Route, Switch, Link, useLocation } from "wouter";
import { Compass, History, Home as HomeIcon, Library, Menu, Search, Tags, Tv, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const nav = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/genres", label: "Genres", icon: Tags },
  { href: "/schedule", label: "Schedule", icon: Tv },
  { href: "/history", label: "History", icon: History },
  { href: "/watchlist", label: "Watchlist", icon: Library },
];

function isActive(location: string, href: string) {
  return href === "/" ? location === href : location === href || location.startsWith(`${href}/`);
}

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="app-shell min-h-screen text-white">
      <header className="app-header sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:gap-6 lg:px-8">
          <button className="icon-button lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
          <Link href="/" className="brand-mark" onClick={() => setOpen(false)} aria-label="anidaku home">ani<span>daku</span></Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {nav.slice(0, 4).map(({ href, label }) => <Link key={href} href={href} className={`nav-link ${isActive(location, href) ? "is-active" : ""}`}>{label}</Link>)}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/search" className="search-trigger" aria-label="Search anime"><Search /><span className="hidden sm:inline">Search anime</span></Link>
            {user ? <button onClick={() => void logout()} className="header-action hidden md:inline-flex">Log out</button> : <button onClick={() => toast.info("Sign in is still under development.")} className="header-action hidden md:inline-flex">Sign in</button>}
          </div>
        </div>
        {open && <nav className="mobile-menu lg:hidden" aria-label="Mobile navigation">{[...nav, { href: "/search", label: "Search", icon: Search }].map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`mobile-nav-link ${isActive(location, href) ? "is-active" : ""}`}><Icon />{label}</Link>)}</nav>}
      </header>
      <main>{children}</main>
      <nav className="bottom-nav lg:hidden" aria-label="Quick navigation">{nav.slice(0, 5).map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`bottom-nav-link ${isActive(location, href) ? "is-active" : ""}`}><Icon /><span>{label}</span></Link>)}</nav>
    </div>
  );
}

function Router() { return <Shell><Switch><Route path="/" component={Home} /><Route path="/explore" component={() => <Browse mode="explore" />} /><Route path="/search" component={() => <Browse mode="search" />} /><Route path="/trending" component={() => <Browse mode="trending" />} /><Route path="/popular" component={() => <Browse mode="popular" />} /><Route path="/latest" component={() => <Browse mode="latest" />} /><Route path="/upcoming" component={() => <Browse mode="upcoming" />} /><Route path="/genres" component={() => <Browse mode="genre" />} /><Route path="/genre/:genre" component={() => <Browse mode="genre" />} /><Route path="/anime/:id" component={AnimeDetails} /><Route path="/schedule" component={LibraryPage} /><Route path="/history" component={LibraryPage} /><Route path="/watchlist" component={LibraryPage} /><Route path="/watch/:id/:episode" component={Watch} /><Route component={NotFound} /></Switch></Shell>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
