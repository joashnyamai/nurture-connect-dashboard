
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Home, LogOut, Users, Heart, PieChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function PortalLayout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navigation based on role on first load
  useEffect(() => {
    if (location.pathname === "/" && user) {
      switch(user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "caregiver":
          navigate("/caregiver");
          break;
        case "donor":
          navigate("/donor");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, location.pathname, navigate]);

  const navItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/",
      roles: ["admin", "caregiver", "donor"],
    },
    {
      name: "Admin Portal",
      icon: <PieChart className="h-5 w-5" />,
      href: "/admin",
      roles: ["admin"],
    },
    {
      name: "Caregiver Portal",
      icon: <Users className="h-5 w-5" />,
      href: "/caregiver",
      roles: ["admin", "caregiver"],
    },
    {
      name: "Donor Portal",
      icon: <Heart className="h-5 w-5" />,
      href: "/donor",
      roles: ["admin", "donor"],
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role as string)
  );

  function isCurrentPath(href: string) {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Mobile header */}
      <header className="flex h-14 items-center border-b px-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="ml-4 text-lg font-semibold">
          Children's Home Management
        </div>
      </header>

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed inset-0 z-20 flex w-full flex-col border-r bg-sidebar p-6 transition-transform md:relative md:translate-x-0 md:w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold md:text-xl">
            Children's Home
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <div className="mt-8 flex flex-col">
          {user && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-blue-100 p-3 dark:border-blue-900">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {filteredNavItems.map((item) => (
              <Button
                key={item.href}
                variant={isCurrentPath(item.href) ? "default" : "ghost"}
                className={cn(
                  "justify-start gap-2",
                  isCurrentPath(item.href) && "bg-primary text-primary-foreground"
                )}
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-7xl py-6">
          <Outlet />
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
