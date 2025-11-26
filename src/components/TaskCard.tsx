import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageSquare, AlertCircle } from "lucide-react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "HELP_NEEDED";
  assignee: {
    name: string;
    avatar?: string;
  };
  deadline: string;
  commentCount: number;
  department: string;
  isOverdue?: boolean;
  onClick?: () => void;
}

const statusStyles = {
  TODO: "bg-status-todo/10 text-status-todo border-status-todo/20",
  IN_PROGRESS: "bg-status-inprogress/10 text-status-inprogress border-status-inprogress/20",
  DONE: "bg-status-done/10 text-status-done border-status-done/20",
  HELP_NEEDED: "bg-status-help/10 text-status-help border-status-help/20",
};

const priorityStyles = {
  LOW: "bg-priority-low/10 text-priority-low border-priority-low/20",
  MEDIUM: "bg-priority-medium/10 text-priority-medium border-priority-medium/20",
  HIGH: "bg-priority-high/10 text-priority-high border-priority-high/20",
};

const statusLabels = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  HELP_NEEDED: "Help Needed",
};

export function TaskCard({ 
  title, 
  description, 
  priority, 
  status, 
  assignee, 
  deadline, 
  commentCount, 
  department,
  isOverdue,
  onClick 
}: TaskCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer group" 
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          {status === "HELP_NEEDED" && (
            <AlertCircle className="h-5 w-5 text-status-help ml-2 flex-shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className={statusStyles[status]}>
            {statusLabels[status]}
          </Badge>
          <Badge variant="outline" className={priorityStyles[priority]}>
            {priority}
          </Badge>
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            {department}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignee.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(assignee.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{assignee.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {commentCount > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{commentCount}</span>
              </div>
            )}
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              <Clock className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
