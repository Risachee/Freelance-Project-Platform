import { useAuth } from '@/context/AuthContext';
import Intro from '../pages/auth.tsx/Intro';
import LoginMode from '../pages/auth.tsx/LoginMode';
import RegisterMode from '../pages/auth.tsx/RegisterMode';
import ModeButtons from '../pages/auth.tsx/ModeButtons';

export default function AuthScreen() {
    const {
        mode,
    } = useAuth();

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Intro />
            <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4">
                <div className="w-full rounded-3xl border border-slate-100 bg-white p-8 shadow-lg/15 shadow-indigo-500 sm:p-12">
                    <ModeButtons/>
                    {mode === 'login' && (<LoginMode />)}
                    {mode === 'register' && (<RegisterMode />)}
                </div>
            </div>
        </main>
    );
}