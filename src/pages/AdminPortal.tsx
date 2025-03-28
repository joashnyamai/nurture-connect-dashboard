
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell } from "recharts";
import { AlertCircle, Download, Plus, Settings, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for visualizations
const childrenData = [
  { name: "Boys", value: 18, color: "#4A90E2" },
  { name: "Girls", value: 21, color: "#F5A623" },
];

const monthlyDonations = [
  { month: "Jan", amount: 12400 },
  { month: "Feb", amount: 10900 },
  { month: "Mar", amount: 14600 },
  { month: "Apr", amount: 13200 },
  { month: "May", amount: 18900 },
  { month: "Jun", amount: 16800 },
];

const pendingApprovals = [
  { id: 1, name: "Staff onboarding - Sarah Jones", type: "HR", date: "2023-06-15" },
  { id: 2, name: "Expense approval - School supplies", type: "Finance", date: "2023-06-14" },
  { id: 3, name: "Volunteer application - Michael Chen", type: "Volunteer", date: "2023-06-13" },
];

const lowInventoryItems = [
  { id: 1, name: "Children's Multivitamins", remaining: 12, threshold: 20 },
  { id: 2, name: "Size 5 Diapers", remaining: 8, threshold: 15 },
  { id: 3, name: "Laundry Detergent", remaining: 5, threshold: 10 },
];

const AdminPortal = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administrator Portal</h1>
        <p className="text-muted-foreground">
          Monitor key metrics, manage staff, and generate reports.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Children</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">39</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={childrenData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {childrenData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  12 caregivers, 6 admin, 6 support
                </p>
                <div className="mt-3 h-[4px] w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[50%] bg-blue-500" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  50% capacity
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Donations</CardTitle>
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
                <div className="text-2xl font-bold">$16,800</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyDonations}
                      margin={{
                        top: 10,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                      <Area type="monotone" dataKey="amount" stroke="#F5A623" fill="#FFF3E0" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>
                  Items requiring your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <div className="font-medium">{approval.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {approval.type} · {new Date(approval.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Button size="sm">Review</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">No pending approvals</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Low Inventory Items</CardTitle>
                <CardDescription>
                  Items below recommended threshold
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lowInventoryItems.length > 0 ? (
                  <div className="space-y-4">
                    {lowInventoryItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.remaining} remaining (min: {item.threshold})
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Order</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">No low inventory items</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>System Maintenance</AlertTitle>
              <AlertDescription>
                Scheduled maintenance is planned for Sunday, June 18th at 2:00 AM. The system will be unavailable for approximately 2 hours.
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex justify-between">
            <div className="space-x-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Staff
              </Button>
            </div>
            <div>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>
                Create and download various reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4 hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-medium mb-1">Financial Report</h3>
                  <p className="text-sm text-muted-foreground mb-3">Monthly financial summary</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-medium mb-1">Children's Status</h3>
                  <p className="text-sm text-muted-foreground mb-3">Health and education status</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-medium mb-1">Staff Performance</h3>
                  <p className="text-sm text-muted-foreground mb-3">Staff activity and performance</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system preferences and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Role Management</h3>
                <p className="text-sm text-muted-foreground mb-3">Configure role permissions and access levels</p>
                <Button size="sm">Manage Roles</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Notification Settings</h3>
                <p className="text-sm text-muted-foreground mb-3">Configure email and system notifications</p>
                <Button size="sm">Configure Notifications</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Data Backup</h3>
                <p className="text-sm text-muted-foreground mb-3">Configure automatic backups and restore points</p>
                <Button size="sm">Backup Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
