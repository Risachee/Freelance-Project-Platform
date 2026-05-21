import { Edit2 } from 'lucide-react';

type EditButtonProps = {
    onClick: () => void;
    label?: string;
};

const EditButton = ({
    onClick,
    label = 'Редактировать',
}: EditButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
        >
            <Edit2 size={14} />
            {label}
        </button>
    );
};

export default EditButton;