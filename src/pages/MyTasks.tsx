import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    ],
  },
  {
    id: "2",
    title: "Code Review - Payment Module",
    description: "Review the new Stripe payment integration module before production deployment.",
    priority: "MEDIUM" as const,
    status: "TODO" as const,
    assignee: { name: "Rajan Kumar", avatar: "" },
    deadline: "Tomorrow, 2:00 PM",
    commentCount: 2,
    department: "Backend",
    isOverdue: false,
    ccUsers: ["Michael Lee"],
    comments: [],
    activityLog: [],
  },
  {
    id: "3",
    title: "Update Team Documentation",
    description: "Add API endpoints documentation for the new authentication flow.",
    priority: "LOW" as const,
    status: "TODO" as const,
    assignee: { name: "Rajan Kumar", avatar: "" },
    deadline: "Dec 25, 2025",
    commentCount: 0,
    department: "Documentation",
    isOverdue: false,
    ccUsers: [],
    comments: [],
    activityLog: [],
  },
  {
    id: "4",
    title: "Deploy Staging Environment",
    description: "Set up and configure the staging environment with the latest codebase.",
    priority: "HIGH" as const,
    status: "DONE" as const,
    assignee: { name: "Rajan Kumar", avatar: "" },
    deadline: "Dec 15, 2025",
    commentCount: 5,
    department: "DevOps",
    isOverdue: false,
    ccUsers: ["Sarah Chen", "Dhruv Patel"],
    comments: [],
    activityLog: [],
  },
];

const MyTasks = () => {
  const [selectedTask, setSelectedTask] = useState<typeof mockTasks[0] | null>(null);
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filterByStatus = (status: string) => {
    return mockTasks.filter((task) => {
      if (status === "all") return true;
      return task.status === status;
    });
  };

  const filterByPriority = (tasks: typeof mockTasks) => {
    if (priorityFilter === "all") return tasks;
    return tasks.filter((task) => task.priority === priorityFilter);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage your assigned tasks and track progress</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="HIGH">High Priority</SelectItem>
              <SelectItem value="MEDIUM">Medium Priority</SelectItem>
              <SelectItem value="LOW">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          {priorityFilter !== "all" && (
            <Button variant="ghost" size="sm" onClick={() => setPriorityFilter("all")}>
              Clear Filter
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="all">All ({mockTasks.length})</TabsTrigger>
            <TabsTrigger value="TODO">To Do ({filterByStatus("TODO").length})</TabsTrigger>
            <TabsTrigger value="IN_PROGRESS">In Progress ({filterByStatus("IN_PROGRESS").length})</TabsTrigger>
            <TabsTrigger value="DONE">Done ({filterByStatus("DONE").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filterByPriority(mockTasks).map((task) => (
                <TaskCard key={task.id} {...task} onClick={() => setSelectedTask(task)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="TODO" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filterByPriority(filterByStatus("TODO")).map((task) => (
                <TaskCard key={task.id} {...task} onClick={() => setSelectedTask(task)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="IN_PROGRESS" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filterByPriority(filterByStatus("IN_PROGRESS")).map((task) => (
                <TaskCard key={task.id} {...task} onClick={() => setSelectedTask(task)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="DONE" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filterByPriority(filterByStatus("DONE")).map((task) => (
                <TaskCard key={task.id} {...task} onClick={() => setSelectedTask(task)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

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

export default MyTasks;
