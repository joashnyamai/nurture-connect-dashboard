
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { AlertCircle, Heart, Calendar, Clock, CreditCard, DollarSign, Users, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for impact statistics
const impactStats = [
  {
    title: "Children Helped",
    value: 248,
    increase: "12% from last year",
    icon: <Users className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Meals Provided",
    value: "32,450",
    increase: "8% from last year",
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
  },
  {
    title: "Educational Support",
    value: 156,
    increase: "15% from last year",
    icon: <CreditCard className="h-5 w-5 text-orange-500" />,
  },
];

// Mock data for donation distribution
const donationDistribution = [
  { name: "Food & Nutrition", value: 35, color: "#4A90E2" },
  { name: "Education", value: 25, color: "#F5A623" },
  { name: "Healthcare", value: 20, color: "#7ED321" },
  { name: "Infrastructure", value: 10, color: "#9013FE" },
  { name: "Staff & Admin", value: 10, color: "#BD10E0" },
];

// Mock data for monthly donations
const monthlyDonationData = [
  { month: "Jan", amount: 18600 },
  { month: "Feb", amount: 15400 },
  { month: "Mar", amount: 21800 },
  { month: "Apr", amount: 19500 },
  { month: "May", amount: 24300 },
  { month: "Jun", amount: 22100 },
];

// Mock success stories
const successStories = [
  {
    id: 1,
    name: "David",
    age: 15,
    story: "David came to our children's home when he was 8 years old. With the help of our educational programs and mentorship, he has excelled academically and has been accepted into a prestigious high school on a full scholarship.",
    image: "https://i.pravatar.cc/150?img=51",
  },
  {
    id: 2,
    name: "Maria",
    age: 12,
    story: "Maria showed exceptional talent in music when she arrived at our home at age 6. Through donor-funded music programs, she has mastered the piano and violin, and recently performed in a regional youth orchestra.",
    image: "https://i.pravatar.cc/150?img=44",
  },
];

// Mock volunteer opportunities
const volunteerOpportunities = [
  {
    id: 1,
    title: "Weekend Tutoring",
    description: "Help children with homework and studies on weekends",
    commitment: "4 hours every Saturday",
    status: "Open",
  },
  {
    id: 2,
    title: "Sports Coach",
    description: "Teach sports and organize physical activities",
    commitment: "2 hours, twice a week",
    status: "Open",
  },
  {
    id: 3,
    title: "Arts & Crafts Instructor",
    description: "Lead creative arts and crafts sessions",
    commitment: "3 hours every Sunday",
    status: "Filled",
  },
];

const DonorPortal = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donor Portal</h1>
        <p className="text-muted-foreground">
          View impact statistics, make donations, and explore volunteer opportunities.
        </p>
      </div>

      <Tabs defaultValue="impact" className="space-y-4">
        <TabsList>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="donate">Donate</TabsTrigger>
          <TabsTrigger value="transparency">Transparency</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="impact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {impactStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.increase}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Impact</CardTitle>
                <CardDescription>
                  Donation impact over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyDonationData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Donations"]} />
                      <Bar dataKey="amount" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Distribution</CardTitle>
                <CardDescription>
                  How your donations are allocated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {donationDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
              <CardDescription>
                How your donations have transformed lives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {successStories.map((story) => (
                  <div key={story.id} className="flex space-x-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{story.name}, {story.age}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {story.story}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Read More Success Stories
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="donate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Support our children's home with a one-time or recurring donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donation-amount">Donation Amount</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" type="button" className="h-9">$25</Button>
                    <Button variant="outline" type="button" className="h-9">$50</Button>
                    <Button variant="outline" type="button" className="h-9">$100</Button>
                    <Button variant="outline" type="button" className="h-9">$250</Button>
                  </div>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="donation-amount"
                      placeholder="Custom amount"
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="donation-type">Donation Type</Label>
                  <Select defaultValue="one-time">
                    <SelectTrigger>
                      <SelectValue placeholder="Select donation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time Donation</SelectItem>
                      <SelectItem value="monthly">Monthly Recurring</SelectItem>
                      <SelectItem value="quarterly">Quarterly Recurring</SelectItem>
                      <SelectItem value="annually">Annual Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="donation-allocation">Donation Allocation (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Where should your donation go?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Fund</SelectItem>
                      <SelectItem value="education">Education Programs</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="nutrition">Food & Nutrition</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure Improvements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Name</Label>
                  <Input id="donor-name" placeholder="Your full name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="donor-email">Email</Label>
                  <Input id="donor-email" type="email" placeholder="Your email address" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a personal message with your donation"
                    className="min-h-[80px]"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Complete Donation
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your donation is secure and tax-deductible. You will receive a receipt via email.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="transparency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fund Utilization</CardTitle>
              <CardDescription>
                Detailed breakdown of how donations are used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", food: 6200, education: 4500, healthcare: 3900, infrastructure: 2000, admin: 2000 },
                      { month: "Feb", food: 5400, education: 3800, healthcare: 3200, infrastructure: 1500, admin: 1500 },
                      { month: "Mar", food: 7600, education: 5500, healthcare: 4400, infrastructure: 2200, admin: 2100 },
                      { month: "Apr", food: 6800, education: 4900, healthcare: 3900, infrastructure: 2000, admin: 1900 },
                      { month: "May", food: 8500, education: 6100, healthcare: 4900, infrastructure: 2400, admin: 2400 },
                      { month: "Jun", food: 7700, education: 5500, healthcare: 4400, infrastructure: 2200, admin: 2300 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Line type="monotone" dataKey="food" stroke="#4A90E2" name="Food & Nutrition" />
                    <Line type="monotone" dataKey="education" stroke="#F5A623" name="Education" />
                    <Line type="monotone" dataKey="healthcare" stroke="#7ED321" name="Healthcare" />
                    <Line type="monotone" dataKey="infrastructure" stroke="#9013FE" name="Infrastructure" />
                    <Line type="monotone" dataKey="admin" stroke="#BD10E0" name="Admin & Staff" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Annual Reports</CardTitle>
                <CardDescription>
                  Download our detailed financial and impact reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">2022 Annual Report</p>
                        <p className="text-xs text-muted-foreground">
                          Published April 15, 2023
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">2021 Annual Report</p>
                        <p className="text-xs text-muted-foreground">
                          Published April 10, 2022
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">2020 Annual Report</p>
                        <p className="text-xs text-muted-foreground">
                          Published April 5, 2021
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accreditations & Compliance</CardTitle>
                <CardDescription>
                  Our commitment to transparency and ethical standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 border-b pb-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Charity Navigator</p>
                      <p className="text-sm text-muted-foreground">
                        4-star rating for financial transparency and accountability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border-b pb-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">GuideStar Platinum</p>
                      <p className="text-sm text-muted-foreground">
                        Highest level of recognition for nonprofit transparency
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Better Business Bureau</p>
                      <p className="text-sm text-muted-foreground">
                        Accredited charity meeting all 20 standards for charity accountability
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tax Information</AlertTitle>
            <AlertDescription>
              All donations are tax-deductible under Section 501(c)(3) of the Internal Revenue Code. Our tax ID number is 12-3456789.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        <TabsContent value="volunteer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
              <CardDescription>
                Join us in making a difference in children's lives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteerOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {opportunity.description}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {opportunity.commitment}
                        </div>
                      </div>
                      <span
                        className={`text-xs py-1 px-2 rounded-full ${
                          opportunity.status === "Open"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {opportunity.status}
                      </span>
                    </div>
                    {opportunity.status === "Open" && (
                      <Button size="sm" className="mt-4">
                        Apply Now
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Alert variant="default" className="mb-2 border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Background Check Required</AlertTitle>
                <AlertDescription>
                  All volunteers working directly with children must pass a background check. We prioritize the safety and security of our children.
                </AlertDescription>
              </Alert>
              <Button className="w-full">
                View All Volunteer Opportunities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonorPortal;
