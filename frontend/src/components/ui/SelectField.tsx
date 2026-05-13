import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export type SelectFieldItem = {
    value: string;
    label: string;
};

interface SelectFieldProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    items: SelectFieldItem[];
    placeholder?: string;
    className?: string;
}

const SelectField = ({
    label,
    value,
    onValueChange,
    items,
    placeholder = 'Выберите из списка',
    className = '',
}: SelectFieldProps) => {
    return (
        <div className={`grid gap-2 ${className}`}>
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>

            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 outline-none focus:border-indigo-300 ">
                    <SelectValue
                        placeholder={placeholder}
                    />
                </SelectTrigger>

                <SelectContent>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectField;