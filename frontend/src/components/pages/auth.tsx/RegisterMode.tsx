import { Button } from "@/components/ui/button";
import Field from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { useEditableForm } from "@/hooks/useEditableForm";
import type { User } from "@/types/user";

export default function () {
    const {
        error,
        handleRegister,
    } = useAuth();
    const {
        formData,
        handleChange,
        handleSave,
    } = useEditableForm<User>(handleRegister);
    return (
        <div className="grid gap-3">
            <Field
                editing
                label="Имя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Иван Иванов"
            />
            <Field
                editing
                label="E-mail"
                name="email"
                value={formData.email}
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
            <Field
                editing
                label="Подтвердите пароль"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
            />

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <div className="flex flex-col gap-1 sm:items-center sm:justify-center my-3">
                <Button variant="indigo" className='px-7' onClick={handleSave}>
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    )
}