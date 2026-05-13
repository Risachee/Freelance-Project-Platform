import { useState, useCallback } from 'react';

export function useEditableForm<T>(initialValues: T, onSave: (data: T) => void) {
    const [formData, setFormData] = useState<T>(initialValues);
    const [isEditing, setIsEditing] = useState(false);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

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
    };
}