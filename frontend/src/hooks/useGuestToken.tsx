import { useState, useCallback } from 'react';

interface GuestTokenResult {
    token: string | null;
    isCopied: boolean;
    copyToken: () => Promise<void>;
    resetCopy: () => void;
}

export function useGuestToken(
    projectToken: string | null | undefined,

): GuestTokenResult {
    const [isCopied, setIsCopied] = useState(false);

    const copyToken = useCallback(async () => {
        if (!projectToken) return;
        try {
            await navigator.clipboard.writeText(projectToken);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Не удалось скопировать токен', err);
        }
    }, [projectToken]);

    return {
        token: projectToken ?? null,
        isCopied,
        copyToken,
        resetCopy: () => setIsCopied(false),
    };
}