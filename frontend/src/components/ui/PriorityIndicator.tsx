import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prioritys, type TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";

interface PriorityIndicatorProps {
  priority: string;
  onPriorityChange?: (newPriority: TaskPriority) => void;
}

const priorityStyles: Record<TaskPriority, string> = {
   'low': 'bg-emerald-100 text-emerald-700',
  'medium': 'bg-yellow-100 text-yellow-700',
  'high': 'bg-orange-100 text-orange-700',
  'urgent': 'bg-red-100 text-red-700',
};

export default function PriorityIndicator({ priority, onPriorityChange }: PriorityIndicatorProps) {
  
  const badgeContent = (
    <span className={cn(
      "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-default",
      priorityStyles[priority],
       "cursor-pointer"
    )}>
      {priority}
    </span>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {badgeContent}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-xl">
        {prioritys.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() => onPriorityChange(s)}
            className={cn(
              "text-xs rounded-lg cursor-pointer",
              s === priority && "bg-slate-50 font-semibold"
            )}
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
