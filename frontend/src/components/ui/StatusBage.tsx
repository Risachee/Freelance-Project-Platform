import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProjectStatus } from "@/types/project";
import  { statuses } from "@/types/project";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProjectStatus;
  onStatusChange?: (newStatus: ProjectStatus) => void;
}

const statusStyles: Record<ProjectStatus, string> = {
  'Обсуждение': 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  'В работе': 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  'На паузе': 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  'Завершен': 'bg-slate-100 text-slate-700 hover:bg-slate-200',
};

export default function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  
  const badgeContent = (
    <span className={cn(
      "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-default",
      statusStyles[status],
       "cursor-pointer"
    )}>
      {status}
    </span>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {badgeContent}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded-xl">
        {statuses.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() => onStatusChange(s)}
            className={cn(
              "text-xs rounded-lg cursor-pointer",
              s === status && "bg-slate-50 font-semibold"
            )}
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}