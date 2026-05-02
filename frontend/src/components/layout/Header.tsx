import { Bell,  } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b bg-white dark:bg-gray-900 px-6 flex items-center justify-end">
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-xl">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
  );
}