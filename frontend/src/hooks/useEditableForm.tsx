import { useState, useCallback, useEffect } from 'react';

export function useEditableForm<T>(onSave: (data: T) => void, initialValues?: T) {
    const [formData, setFormData] = useState<T>(
        (initialValues ?? {}) as T
    );
    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialValues) {
            setFormData(prev => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

    const handleChange = useCallback(
        (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            const { name, value, type } = target;

            let processedValue: any = value;
            if (type === 'number') processedValue = value === '' ? null : Number(value);

            setFormData((prev) => ({ ...prev, [name]: processedValue }));
        },
        []
    );

    const handleValueChange = useCallback((name: keyof T, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSave = async () => {
        try {
            await onSave(formData);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка сохранения');
        }
    };

    const handleReset = () => {
        setFormData((initialValues ?? {}) as T);
        setIsEditing(false);
        setError(null);
    };

    return {
        formData,
        setFormData,
        isEditing,
        setIsEditing,
        handleChange,
        handleValueChange,
        handleSave,
        handleReset,
        error,
        setError,
    };
}