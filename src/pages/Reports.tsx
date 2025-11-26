import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Clock, CheckCircle2, Users, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Track team performance and task metrics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7days">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="department">By Department</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">87%</div>
                      <div className="flex items-center gap-1 text-sm text-status-done mt-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>+12% from last week</span>
                      </div>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-status-done" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">2.4d</div>
                      <div className="flex items-center gap-1 text-sm text-status-done mt-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>-8% faster</span>
                      </div>
                    </div>
                    <Clock className="h-8 w-8 text-status-inprogress" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">48</div>
                      <div className="flex items-center gap-1 text-sm text-status-help mt-1">
                        <TrendingDown className="h-4 w-4" />
                        <span>+15 from last week</span>
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Team Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">92%</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <span>Optimal range</span>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Task Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Status Distribution</CardTitle>
                  <CardDescription>Current breakdown of all tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium">156 (52%)</span>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">In Progress</span>
                      <span className="font-medium">78 (26%)</span>
                    </div>
                    <Progress value={26} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">To Do</span>
                      <span className="font-medium">48 (16%)</span>
                    </div>
                    <Progress value={16} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Help Needed</span>
                      <span className="font-medium">18 (6%)</span>
                    </div>
                    <Progress value={6} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Priority Breakdown</CardTitle>
                  <CardDescription>Tasks by priority level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">High Priority</span>
                      <span className="font-medium text-priority-high">42 (14%)</span>
                    </div>
                    <Progress value={14} className="h-2 [&>div]:bg-priority-high" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Medium Priority</span>
                      <span className="font-medium text-priority-medium">134 (45%)</span>
                    </div>
                    <Progress value={45} className="h-2 [&>div]:bg-priority-medium" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Low Priority</span>
                      <span className="font-medium text-priority-low">124 (41%)</span>
                    </div>
                    <Progress value={41} className="h-2 [&>div]:bg-priority-low" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overdue Tasks Alert */}
            <Card className="border-status-help">
              <CardHeader>
                <CardTitle className="text-status-help">Overdue Tasks Alert</CardTitle>
                <CardDescription>Tasks that have passed their deadline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground mt-1">Tasks require immediate attention</p>
                  </div>
                  <Button variant="destructive">View Overdue Tasks</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Member Performance</CardTitle>
                <CardDescription>Individual contribution metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Rajan Kumar", completed: 45, active: 12, rate: 87 },
                    { name: "Dhruv Patel", completed: 32, active: 8, rate: 82 },
                    { name: "Sarah Chen", completed: 38, active: 10, rate: 85 },
                    { name: "Michael Lee", completed: 28, active: 6, rate: 78 },
                    { name: "Priya Sharma", completed: 35, active: 7, rate: 83 },
                  ].map((member, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{member.name}</span>
                        <div className="flex gap-6 text-sm">
                          <span className="text-muted-foreground">Completed: <span className="font-medium text-foreground">{member.completed}</span></span>
                          <span className="text-muted-foreground">Active: <span className="font-medium text-foreground">{member.active}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={member.rate} className="flex-1 h-2" />
                        <span className="text-sm font-medium min-w-12">{member.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="department" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { dept: "Backend", tasks: 124, completed: 98, rate: 79 },
                { dept: "Frontend", tasks: 86, completed: 72, rate: 84 },
                { dept: "QA", tasks: 62, completed: 54, rate: 87 },
                { dept: "DevOps", tasks: 38, completed: 32, rate: 84 },
                { dept: "HR", tasks: 24, completed: 22, rate: 92 },
                { dept: "Documentation", tasks: 16, completed: 14, rate: 88 },
              ].map((dept) => (
                <Card key={dept.dept}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.dept}</CardTitle>
                    <CardDescription>{dept.tasks} total tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">{dept.rate}%</span>
                    </div>
                    <Progress value={dept.rate} className="h-2" />
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium text-status-done">{dept.completed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active</span>
                      <span className="font-medium text-status-inprogress">{dept.tasks - dept.completed}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
