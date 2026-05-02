import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type BackPageButtonProps = {
  label?: string;
};

const BackPageButton = ({ label = 'Назад' }: BackPageButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
    >
      <ArrowLeft size={14} />
      {label}
    </button>
  );
};

export default BackPageButton;