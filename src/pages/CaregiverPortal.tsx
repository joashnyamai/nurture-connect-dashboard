
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, AlertTriangle, Camera, Check, Clock, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

// Mock data for children
const myChildren = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 8,
    avatar: "https://i.pravatar.cc/150?img=32",
    medicalStatus: "Healthy",
    statusColor: "bg-green-500",
    lastCheckup: "2023-05-20",
    allergies: ["Peanuts", "Penicillin"],
  },
  {
    id: 2,
    name: "James Wilson",
    age: 6,
    avatar: "https://i.pravatar.cc/150?img=65",
    medicalStatus: "Minor Concern",
    statusColor: "bg-yellow-500",
    lastCheckup: "2023-06-05",
    allergies: ["Dairy"],
  },
  {
    id: 3,
    name: "Sophia Lee",
    age: 10,
    avatar: "https://i.pravatar.cc/150?img=47",
    medicalStatus: "Healthy",
    statusColor: "bg-green-500",
    lastCheckup: "2023-06-10",
    allergies: [],
  },
  {
    id: 4,
    name: "Noah Garcia",
    age: 7,
    avatar: "https://i.pravatar.cc/150?img=59",
    medicalStatus: "Medical Attention",
    statusColor: "bg-red-500",
    lastCheckup: "2023-06-12",
    allergies: ["Bee stings", "Shellfish"],
  },
];

// Mock tasks
const dailyTasks = [
  { id: 1, description: "Morning medication - Noah Garcia", time: "8:00 AM", completed: true },
  { id: 2, description: "School preparation", time: "7:30 AM", completed: true },
  { id: 3, description: "Afternoon activities", time: "3:30 PM", completed: false },
  { id: 4, description: "Evening medication - James Wilson", time: "7:00 PM", completed: false },
  { id: 5, description: "Bedtime routine", time: "8:30 PM", completed: false },
];

const CaregiverPortal = () => {
  const [tasks, setTasks] = useState(dailyTasks);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleTaskToggle = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const completionPercentage = (completedTasksCount / tasks.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Caregiver Portal</h1>
        <p className="text-muted-foreground">
          Manage your assigned children, daily tasks, and incident reports.
        </p>
      </div>

      <Tabs defaultValue="children" className="space-y-4">
        <TabsList>
          <TabsTrigger value="children">My Children</TabsTrigger>
          <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
          <TabsTrigger value="incident">Incident Reporting</TabsTrigger>
          <TabsTrigger value="health">Health Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="children" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myChildren.map((child) => (
              <Card key={child.id} className="overflow-hidden">
                <div className={`h-2 w-full ${child.statusColor}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{child.name}</CardTitle>
                      <CardDescription>{child.age} years old</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-medium ${
                        child.medicalStatus === "Healthy" 
                          ? "text-green-600" 
                          : child.medicalStatus === "Minor Concern" 
                            ? "text-yellow-600" 
                            : "text-red-600"
                      }`}>
                        {child.medicalStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last checkup:</span>
                      <span className="font-medium">{new Date(child.lastCheckup).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allergies:</span>
                      <span className="font-medium">
                        {child.allergies.length > 0 ? child.allergies.join(", ") : "None"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Tasks Checklist</CardTitle>
              <CardDescription>
                Track and complete your assigned tasks for today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Today's Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedTasksCount} of {tasks.length} tasks completed
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
              
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center space-x-2 p-2 rounded-md transition-all ${
                      task.completed
                        ? "bg-green-50 dark:bg-green-900/10"
                        : "bg-white dark:bg-slate-900"
                    }`}
                  >
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-sm font-medium cursor-pointer ${
                          task.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.description}
                      </label>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {task.time}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {task.completed ? (
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 py-1 px-2 rounded-full flex items-center">
                          <Check className="mr-1 h-3 w-3" />
                          Done
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add New Task</Button>
              <Button>Update Tasks</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="incident" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Reporting Form</CardTitle>
              <CardDescription>
                Document any incidents or concerns with the children
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="child">Child</Label>
                  <select
                    id="child"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a child</option>
                    {myChildren.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="incident-type">Incident Type</Label>
                  <select
                    id="incident-type"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select incident type</option>
                    <option value="behavioral">Behavioral Issue</option>
                    <option value="health">Health Concern</option>
                    <option value="accident">Accident/Injury</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date and Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what happened in detail..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="actions">Actions Taken</Label>
                  <Textarea
                    id="actions"
                    placeholder="Describe the actions taken in response to the incident..."
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Photo Upload (Optional)</Label>
                  <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="photo-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {previewUrl ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-[150px] rounded-md mb-2"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, or JPEG (max. 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="health" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Children Health Overview</CardTitle>
                <CardDescription>
                  Summary of health status for your assigned children
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myChildren.map((child) => (
                    <div key={child.id} className="flex items-center space-x-3 border-b pb-3">
                      <div className={`w-3 h-3 rounded-full ${child.statusColor}`}></div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={child.avatar} alt={child.name} />
                        <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{child.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Last checkup: {new Date(child.lastCheckup).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs py-1 px-2 rounded-full ${
                          child.medicalStatus === "Healthy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : child.medicalStatus === "Minor Concern"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {child.medicalStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Health Records
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Medical Appointments</CardTitle>
                <CardDescription>
                  Scheduled appointments and medical check-ups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="text-sm font-medium">Dental Check-up: James Wilson</p>
                      <p className="text-xs text-muted-foreground">
                        June 25, 2023 at 10:00 AM
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full">
                      Upcoming
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="text-sm font-medium">Annual Check-up: Sophia Lee</p>
                      <p className="text-xs text-muted-foreground">
                        July 3, 2023 at 9:30 AM
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full">
                      Upcoming
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="text-sm font-medium">Allergy Test: Noah Garcia</p>
                      <p className="text-xs text-muted-foreground">
                        July 10, 2023 at 2:00 PM
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full">
                      Upcoming
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Schedule New Appointment
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Alert variant="default">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Health Alert</AlertTitle>
            <AlertDescription>
              Noah Garcia needs to take medication for fever at 3:00 PM today. Please ensure this task is completed and recorded.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaregiverPortal;
