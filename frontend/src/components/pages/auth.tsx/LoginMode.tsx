import Field from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useEditableForm } from "@/hooks/useEditableForm";
import type { User } from "@/types/user";

export default function () {
    const {
        error,
        handleLogin,
        goToGuest,
    } = useAuth();
    const {
        formData,
        handleChange,
        handleSave,
    } = useEditableForm<User>(handleLogin);
    return (
        <div>
            <div className="grid gap-5">
                <Field
                    editing
                    label="Имя пользователя"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="email"
                    placeholder="index@mail.ru"
                />
                <Field
                    editing
                    label="Пароль"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                />
            </div>

            {error && <p className="text-sm text-rose-600 mt-3">{error}</p>}

            <div className="flex flex-col gap-1 sm:items-center sm:justify-center my-5">
                <Button
                    className="px-10"
                    variant="indigo"
                    onClick={handleSave}
                >
                    Войти
                </Button>
                <Button variant="link" onClick={goToGuest}>
                    Войти в гостевой режим
                </Button>
            </div>
        </div>
    )
}