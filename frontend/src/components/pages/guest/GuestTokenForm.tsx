import Field from '@/components/ui/Field';
import { Button } from '@/components/ui/button';
import { CircleArrowRight } from 'lucide-react';

interface GuestTokenFormProps {
    token: string;
    error: string | null;
    onTokenChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: () => void;
}

export default function GuestTokenForm({
    token,
    error,
    onTokenChange,
    onSubmit,
}: GuestTokenFormProps) {
    return (
        <>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
                Проверка статуса проекта
            </h2>
            <p className="mb-6 text-sm text-slate-600">
                Введите токен из приглашения, чтобы увидеть актуальную информацию о проекте.
            </p>

            <div className="grid gap-4">
                <Field
                    editing
                    label="Токен"
                    name="token"
                    value={token}
                    onChange={onTokenChange}
                    placeholder="Введите ваш токен"
                />
            </div>

            {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

            <div className="mt-6 flex justify-end">
                <Button variant="indigo" onClick={onSubmit}>
                    <CircleArrowRight size={18} className="mr-2" />
                    Проверить
                </Button>
            </div>
        </>
    );
}