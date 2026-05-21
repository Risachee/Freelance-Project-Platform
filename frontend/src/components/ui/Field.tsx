import React from 'react';

type FieldProps = {
  label?: string;
  name: string;
  value: string | number;
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea';
  type?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
};

const Field = ({
  label,
  name,
  value,
  editing,
  onChange,
  as = 'input',
  type = 'text',
  placeholder,
  className = '',
  icon,
}: FieldProps) => {
  if (!editing) {
    return (
      <div className={className}>
        {label && (
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1 text-slate-700">
          {icon}
          <span>{value}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
      )}

      <div className="mt-1">
        {as === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300"
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2  text-slate-700 outline-none focus:border-indigo-300"
          />
        )}
      </div>
    </div>
  );
};

export default Field;