import { useState, useCallback } from 'react';

export function useEditableForm<T>(onSave: (data: T) => void, initialValues?: T) {
    const [formData, setFormData] = useState<T>(
        initialValues ?? ({} as T)
    );
    const [isEditing, setIsEditing] = useState(false);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );
    const [error, setError] = useState<string | null>(null);

    const handleValueChange = useCallback((name: keyof T, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    const handleReset = () => {
        setFormData(initialValues);
        setIsEditing(false);
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