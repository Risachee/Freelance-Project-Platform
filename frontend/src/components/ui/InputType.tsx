import type { InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';

type InputTypeProps = InputHTMLAttributes<HTMLInputElement> & {
  textLabel: string;
  id: string;
};

const InputType = ({
  textLabel,
  id,
  placeholder = '',
  type = 'text',
  ...props 
}: InputTypeProps) => (
  <div className="grid gap-2">
    <label 
      htmlFor={id}  
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {textLabel}
    </label>
    <Input 
      id={id} 
      type={type} 
      placeholder={placeholder} 
      {...props}  
    />
  </div>
);

export default InputType;