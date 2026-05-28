import { useCallback } from "react";

export function useDelete<T>(onDelete: (data: T) => void, object: T, onClose?: () => void,) {
    const handleDelete = useCallback(() => {
        if (window.confirm('Вы уверенны, что хотите удалить?')) {
            onDelete(object);
            onClose();
        }
    }, [])
    return {
        handleDelete
    }
}