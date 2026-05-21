import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';

type BackPageButtonProps = {
  label?: string;
};

const BackPageButton = ({ label = 'Назад' }: BackPageButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button variant='secondary' className='rounded-2xl text-slate-600 ' onClick={() => navigate(-1)}>
      <ArrowLeft size={14}/>
      {label}
    </Button>
  );
};

export default BackPageButton;