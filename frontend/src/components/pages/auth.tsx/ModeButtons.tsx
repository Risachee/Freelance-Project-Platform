import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function () {
    const {
        mode,
        setMode,
    } = useAuth();
    return (
        <div className="mb-4 flex justify-center gap-4">
            <Button
                variant={mode === 'login' ? 'default' : 'outline'}
                className="rounded-2xl px-6"
                onClick={() => setMode('login')}
            >
                Вход
            </Button>
            <Button
                variant={mode === 'register' ? 'default' : 'outline'}
                className="rounded-2xl px-6"
                onClick={() => setMode('register')}
            >
                Регистрация
            </Button>
        </div>
    )
}