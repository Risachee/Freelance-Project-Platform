interface ProjectProgressProps {
    progress: number;
}

export default function ProjectProgress({ progress }: ProjectProgressProps) {
    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                Прогресс
            </div>
            <p className="mt-1 text-lg font-semibold text-slate-900">
                {Math.round(progress)}%
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div
                    className="h-2 rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}