import type { TextareaHTMLAttributes } from 'react';  // 
import { Textarea } from '@/components/ui/textarea';

interface InputTextareaProps {
  textLabel: string;
  id: string;
  placeholder?: string;  
}

const InputTextarea = ({ 
  textLabel = 'Описание',
  placeholder = 'Кратко опишите',
  id,
  ...props  
}: InputTextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="grid gap-2">
    <label 
      htmlFor={id}  
      className="text-sm font-medium"
    >
      {textLabel}
    </label>
    <Textarea 
      id={id} 
      placeholder={placeholder} 
      {...props}  
    />
  </div>
);

export default InputTextarea;