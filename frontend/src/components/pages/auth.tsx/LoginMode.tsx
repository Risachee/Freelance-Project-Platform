import Field from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function () {
    const {
        loginForm,
        handleLoginChange,
        error,
        handleLogin,
        goToGuest,
    } = useAuth();
    return (
        <div>
            <div className="grid gap-5">
                <Field
                    editing
                    label="E-mail"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    type="email"
                    placeholder="index@mail.ru"
                />
                <Field
                    editing
                    label="Пароль"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    type="password"
                    placeholder="••••••••"
                />
            </div>

            {error && <p className="text-sm text-rose-600 mt-3">{error}</p>}

            <div className="flex flex-col gap-1 sm:items-center sm:justify-center my-5">
                <Button
                    className="px-10"
                    variant="indigo"
                    onClick={handleLogin}
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