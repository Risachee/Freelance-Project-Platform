import {type ReactNode } from 'react';

interface ProjectStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
}

export default function ProjectStatCard({ icon, label, value, subValue }: ProjectStatCardProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
        {subValue && <span className="ml-2 text-sm font-normal text-slate-500">{subValue}</span>}
      </p>
    </div>
  );
}