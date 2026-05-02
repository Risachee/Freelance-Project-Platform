import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InputSelectProps {
  textLabel: string;
  id: string;
  items: string[];
  placeholder?: string;
  className?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  textLabel,
  id,
  items: clients,
  placeholder = 'Выберите из списка',
  className = '',
}) => (
  <div className={`grid gap-2 ${className}`}>
    <label 
      htmlFor={id} 
      className="text-sm font-medium"
    >
      {textLabel}
    </label>
    <Select>
      <SelectTrigger id={id} className="w-full"> 
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem key={client} value={client}>
            {client}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default InputSelect;