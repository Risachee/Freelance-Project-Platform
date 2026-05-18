import type { ButtonHTMLAttributes } from 'react';

type FilteredProps<T extends string = string> = {
    filteredType: T[];
    activeFilter: T;
    setActiveFilter: (filter: T) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Filtered = <T extends string = string>({
    filteredType,
    activeFilter,
    setActiveFilter,
    className = '',
    ...props
}: FilteredProps<T>) => (
    <div className={`flex flex-wrap gap-2 mb-4 ${className}`}>
        {filteredType.map((status) => (
            <button
                key={status}
                type="button"
                onClick={() => setActiveFilter(status)}
                className={`
          px-4 py-2 rounded-2xl text-sm font-medium transition-colors
          ${activeFilter === status
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }
        `}
                aria-pressed={activeFilter === status}
                {...props}
            >
                {status}
            </button>
        ))}
    </div>
);

export default Filtered;