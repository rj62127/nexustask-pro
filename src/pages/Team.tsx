import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Mail, Phone, MapPin, Plus, Filter } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  role: "Admin" | "Manager" | "Employee";
  department: string;
  location: string;
  timezone: string;
  tasksAssigned: number;
  tasksCompleted: number;
  avatar?: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Rajan Kumar",
    employeeId: "EMP001",
    email: "rajan.kumar@nexustask.com",
    phone: "+91 98765 43210",
    role: "Manager",
    department: "Backend",
    location: "Mumbai, India",
    timezone: "Asia/Kolkata (IST)",
    tasksAssigned: 12,
    tasksCompleted: 45,
  },
  {
    id: "2",
    name: "Dhruv Patel",
    employeeId: "EMP002",
    email: "dhruv.patel@nexustask.com",
    phone: "+971 50 123 4567",
    role: "Employee",
    department: "Backend",
    location: "Dubai, UAE",
    timezone: "Asia/Dubai (GST)",
    tasksAssigned: 8,
    tasksCompleted: 32,
  },
  {
    id: "3",
    name: "Sarah Chen",
    employeeId: "EMP003",
    email: "sarah.chen@nexustask.com",
    phone: "+1 555 123 4567",
    role: "Employee",
    department: "Frontend",
    location: "San Francisco, USA",
    timezone: "America/Los_Angeles (PST)",
    tasksAssigned: 10,
    tasksCompleted: 38,
  },
  {
    id: "4",
    name: "Michael Lee",
    employeeId: "EMP004",
    email: "michael.lee@nexustask.com",
    phone: "+44 20 7123 4567",
    role: "Employee",
    department: "Backend",
    location: "London, UK",
    timezone: "Europe/London (GMT)",
    tasksAssigned: 6,
    tasksCompleted: 28,
  },
  {
    id: "5",
    name: "Priya Sharma",
    employeeId: "EMP005",
    email: "priya.sharma@nexustask.com",
    phone: "+91 97654 32109",
    role: "Employee",
    department: "Backend",
    location: "Bangalore, India",
    timezone: "Asia/Kolkata (IST)",
    tasksAssigned: 7,
    tasksCompleted: 35,
  },
  {
    id: "6",
    name: "Alex Johnson",
    employeeId: "EMP006",
    email: "alex.johnson@nexustask.com",
    phone: "+1 555 987 6543",
    role: "Admin",
    department: "HR",
    location: "New York, USA",
    timezone: "America/New_York (EST)",
    tasksAssigned: 5,
    tasksCompleted: 42,
  },
  {
    id: "7",
    name: "Emma Wilson",
    employeeId: "EMP007",
    email: "emma.wilson@nexustask.com",
    phone: "+61 2 9876 5432",
    role: "Employee",
    department: "QA",
    location: "Sydney, Australia",
    timezone: "Australia/Sydney (AEDT)",
    tasksAssigned: 9,
    tasksCompleted: 30,
  },
  {
    id: "8",
    name: "Carlos Rodriguez",
    employeeId: "EMP008",
    email: "carlos.rodriguez@nexustask.com",
    phone: "+34 91 123 4567",
    role: "Manager",
    department: "Frontend",
    location: "Madrid, Spain",
    timezone: "Europe/Madrid (CET)",
    tasksAssigned: 11,
    tasksCompleted: 40,
  },
];

const roleColors = {
  Admin: "bg-destructive/10 text-destructive border-destructive/20",
  Manager: "bg-primary/10 text-primary border-primary/20",
  Employee: "bg-muted text-muted-foreground border-border",
};

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
    const matchesRole = roleFilter === "all" || emp.role === roleFilter;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Directory</h1>
            <p className="text-muted-foreground mt-1">View and manage your organization's employees</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{mockEmployees.length}</div>
              <p className="text-xs text-muted-foreground">Total Employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{mockEmployees.filter(e => e.department === "Backend").length}</div>
              <p className="text-xs text-muted-foreground">Backend Team</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{mockEmployees.filter(e => e.department === "Frontend").length}</div>
              <p className="text-xs text-muted-foreground">Frontend Team</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{mockEmployees.filter(e => e.role === "Manager").length}</div>
              <p className="text-xs text-muted-foreground">Managers</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or employee ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEmployees.length} of {mockEmployees.length} employees
          </p>
          {(departmentFilter !== "all" || roleFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDepartmentFilter("all");
                setRoleFilter("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{employee.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{employee.employeeId}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Badge variant="outline" className={roleColors[employee.role]}>
                    {employee.role}
                  </Badge>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    {employee.department}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{employee.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Assigned</p>
                      <p className="font-semibold">{employee.tasksAssigned}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-semibold text-status-done">{employee.tasksCompleted}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rate</p>
                      <p className="font-semibold">
                        {Math.round((employee.tasksCompleted / (employee.tasksCompleted + employee.tasksAssigned)) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Team;
