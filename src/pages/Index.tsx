import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Clock, AlertCircle, ListChecks, Plus, Filter } from "lucide-react";

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Fix API Authentication Issue",
    description: "The JWT token refresh mechanism is failing after 15 minutes. Need to investigate and patch the middleware.",
    priority: "HIGH" as const,
    status: "IN_PROGRESS" as const,
    assignee: { name: "Dhruv Patel", avatar: "" },
    deadline: "Today, 5:00 PM",
    commentCount: 8,
    department: "Backend",
    isOverdue: false,
    ccUsers: ["Rajan Kumar", "Sarah Chen"],
    comments: [
      { id: "1", author: "Dhruv Patel", text: "I am stuck, @Rajan please check the logs", timestamp: "10 mins ago" },
      { id: "2", author: "Rajan Kumar", text: "Looking into it now. Check the token expiry settings.", timestamp: "5 mins ago" },
    ],
    activityLog: [
      { id: "1", user: "Dhruv Patel", action: "Changed status from TODO to IN_PROGRESS", timestamp: "2 hours ago" },
      { id: "2", user: "Dhruv Patel", action: "Updated priority from MEDIUM to HIGH", timestamp: "1 hour ago" },
      { id: "3", user: "Dhruv Patel", action: "Added comment", timestamp: "10 mins ago" },
    ],
  },
  {
    id: "2",
    title: "Design New Dashboard Layout",
    description: "Create a modern, responsive dashboard with data visualization components for the analytics section.",
    priority: "MEDIUM" as const,
    status: "TODO" as const,
    assignee: { name: "Sarah Chen", avatar: "" },
    deadline: "Dec 20, 2025",
    commentCount: 3,
    department: "Frontend",
    isOverdue: false,
    ccUsers: ["Michael Lee"],
    comments: [
      { id: "1", author: "Sarah Chen", text: "Started working on the wireframes", timestamp: "1 day ago" },
    ],
    activityLog: [
      { id: "1", user: "Rajan Kumar", action: "Created task", timestamp: "3 days ago" },
      { id: "2", user: "Rajan Kumar", action: "Assigned to Sarah Chen", timestamp: "3 days ago" },
    ],
  },
  {
    id: "3",
    title: "Database Performance Optimization",
    description: "Query response time has increased. Need to add indexes and optimize the user query joins.",
    priority: "HIGH" as const,
    status: "HELP_NEEDED" as const,
    assignee: { name: "Michael Lee", avatar: "" },
    deadline: "Yesterday",
    commentCount: 12,
    department: "Backend",
    isOverdue: true,
    ccUsers: ["Rajan Kumar", "Dhruv Patel"],
    comments: [
      { id: "1", author: "Michael Lee", text: "Need help with query optimization @Rajan", timestamp: "30 mins ago" },
    ],
    activityLog: [
      { id: "1", user: "Michael Lee", action: "Changed status to HELP_NEEDED", timestamp: "30 mins ago" },
    ],
  },
  {
    id: "4",
    title: "Implement Email Notification System",
    description: "Set up automated email notifications for task assignments and status changes using SendGrid.",
    priority: "LOW" as const,
    status: "DONE" as const,
    assignee: { name: "Priya Sharma", avatar: "" },
    deadline: "Dec 10, 2025",
    commentCount: 5,
    department: "Backend",
    isOverdue: false,
    ccUsers: ["Rajan Kumar"],
    comments: [
      { id: "1", author: "Priya Sharma", text: "Email system is live and tested!", timestamp: "2 days ago" },
    ],
    activityLog: [
      { id: "1", user: "Priya Sharma", action: "Marked as DONE", timestamp: "2 days ago" },
    ],
  },
];

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<typeof mockTasks[0] | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = mockTasks.filter((task) => {
    if (departmentFilter !== "all" && task.department !== departmentFilter) return false;
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    return true;
  });

  const stats = {
    total: mockTasks.length,
    todo: mockTasks.filter(t => t.status === "TODO").length,
    inProgress: mockTasks.filter(t => t.status === "IN_PROGRESS").length,
    done: mockTasks.filter(t => t.status === "DONE").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Rajan! Here's your task overview.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon={ListChecks}
            color="blue"
            subtitle="Across all teams"
          />
          <StatCard
            title="To Do"
            value={stats.todo}
            icon={CheckSquare}
            color="gray"
            subtitle="Pending start"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
            color="yellow"
            subtitle="Active tasks"
          />
          <StatCard
            title="Completed"
            value={stats.done}
            icon={CheckSquare}
            color="green"
            subtitle="This week"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
          <Filter className="h-5 w-5 text-muted-foreground" />
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
              <SelectItem value="HELP_NEEDED">Help Needed</SelectItem>
            </SelectContent>
          </Select>

          {(departmentFilter !== "all" || statusFilter !== "all") && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setDepartmentFilter("all");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Task List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Tasks</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredTasks.length} of {mockTasks.length} tasks
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </DashboardLayout>
  );
};

export default Index;
