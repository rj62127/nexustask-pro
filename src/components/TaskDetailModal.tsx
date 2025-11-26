import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Edit, 
  Trash2, 
  Send, 
  AlertCircle,
  Clock,
  User,
  Tag,
  Calendar,
} from "lucide-react";

interface TaskDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: {
    id: string;
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    status: "TODO" | "IN_PROGRESS" | "DONE" | "HELP_NEEDED";
    assignee: { name: string; avatar?: string };
    deadline: string;
    department: string;
    ccUsers: string[];
    comments: Array<{
      id: string;
      author: string;
      text: string;
      timestamp: string;
    }>;
    activityLog: Array<{
      id: string;
      user: string;
      action: string;
      timestamp: string;
    }>;
  };
}

export function TaskDetailModal({ open, onOpenChange, task }: TaskDetailModalProps) {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <div className="grid grid-cols-3 h-full">
          {/* Main Content */}
          <div className="col-span-2 p-6">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <DialogTitle className="text-2xl pr-8">{task.title}</DialogTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Status and Priority */}
              <div className="flex gap-2">
                <Badge className="bg-status-inprogress/10 text-status-inprogress border-status-inprogress/20">
                  {task.status.replace("_", " ")}
                </Badge>
                <Badge className="bg-priority-medium/10 text-priority-medium border-priority-medium/20">
                  {task.priority}
                </Badge>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Assigned To
                  </h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {task.assignee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Deadline
                  </h4>
                  <p className="text-sm">{task.deadline}</p>
                </div>
              </div>

              {/* CC Users */}
              <div>
                <h4 className="text-sm font-semibold mb-2">CC (Observers)</h4>
                <div className="flex flex-wrap gap-2">
                  {task.ccUsers.map((user, idx) => (
                    <Badge key={idx} variant="outline">{user}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-destructive border-destructive">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Request Help
                </Button>
              </div>

              <Separator />

              {/* Comments Section */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Comments & Discussion</h4>
                <ScrollArea className="h-64 mb-4">
                  <div className="space-y-4">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-xs">
                            {comment.author.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Add Comment */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a comment... Type @ to mention someone"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1"
                    rows={3}
                  />
                  <Button size="icon" className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="border-l border-border bg-muted/30 p-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Activity Log
            </h3>
            <ScrollArea className="h-[calc(90vh-8rem)]">
              <div className="space-y-4">
                {task.activityLog.map((log) => (
                  <div key={log.id} className="text-sm">
                    <p className="font-medium text-foreground">{log.user}</p>
                    <p className="text-muted-foreground mt-1">{log.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
