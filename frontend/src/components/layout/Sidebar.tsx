import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Users, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; 

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Дашборд' },
  { to: '/projects', icon: FolderOpen, label: 'Проекты' },
  { to: '/clients', icon: Users, label: 'Клиенты' },
  { to: '/tasks', icon: Calendar, label: 'Задачи' },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">FreelanceHub</h1>
        <p className="text-sm text-gray-500">Управление проектами</p>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                     hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <LogOut className="w-5 h-5" />
          Выйти из системы
        </button>
      </div>
    </div>
  );
}