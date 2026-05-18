import { Button } from "@/components/ui/button";
import Field from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";

export default function () {
    const {
        registerForm,
        handleRegisterChange,
        error,
        handleRegister,
    } = useAuth();
    return (
        <div className="grid gap-3">
            <Field
                editing
                label="Имя"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                placeholder="Иван Иванов"
            />
            <Field
                editing
                label="E-mail"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                type="email"
                placeholder="index@mail.ru"
            />
            <Field
                editing
                label="Пароль"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                type="password"
                placeholder="••••••••"
            />
            <Field
                editing
                label="Подтвердите пароль"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                type="password"
                placeholder="••••••••"
            />

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <div className="flex flex-col gap-1 sm:items-center sm:justify-center my-3">
                <Button variant="indigo" className='px-7' onClick={handleRegister}>
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    )
}