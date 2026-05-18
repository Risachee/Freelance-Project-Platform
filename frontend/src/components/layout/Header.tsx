import { Bell , User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b bg-white dark:bg-gray-900 px-6 flex items-center justify-end">
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-xl">
          <Bell size={20} />
        </button>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center"><User size={20} /></div>
      </div>
    </header>
  );
}