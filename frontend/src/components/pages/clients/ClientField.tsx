type ClientFieldProps = {
  label?: string;
  value: string;
  editing: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea';
  icon?: React.ReactNode;
};

const ClientField = ({
  value,
  editing,
  name,
  onChange,
  as = 'input',
  icon,
}: ClientFieldProps) => {
  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        {icon}
        <span>{value}</span>
      </div>
    );
  }

  if (as === 'textarea') {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-indigo-300"
      />
    );
  }

  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-indigo-300"
    />
  );
};

export default ClientField;