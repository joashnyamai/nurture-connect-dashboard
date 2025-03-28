
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth-provider";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to appropriate portal based on user role
  const redirectToPortal = () => {
    if (user) {
      switch (user.role) {
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
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Children's Home Management System
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Welcome</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user ? `${user.name}` : "Guest"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user ? `Role: ${user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}` : "Not logged in"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Portal</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user ? `${user.role?.charAt(0).toUpperCase() + user.role?.slice(1)} Portal` : "Guest"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user ? "Click below to access your portal" : "Please log in to access your portal"}
            </p>
            <Button 
              className="mt-4 w-full" 
              onClick={redirectToPortal}
              disabled={!user}
            >
              Go to My Portal
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Info</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">v1.0.0</div>
            <p className="text-xs text-muted-foreground">
              Children's Home Management System
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>About This System</CardTitle>
            <CardDescription>
              The Children's Home Management System is designed to help manage all aspects of running a children's home.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Administrator Portal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage staff, view key metrics, generate reports, and configure system settings.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Caregiver Portal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track assigned children, manage daily tasks, report incidents, and monitor health status.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">Donor Portal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View impact statistics, make donations, and explore volunteer opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
