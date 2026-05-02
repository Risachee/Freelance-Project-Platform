import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  DollarSign, 
  Calendar 
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Дашборд' },
  { to: '/projects', icon: FolderOpen, label: 'Проекты' },
  { to: '/clients', icon: Users, label: 'Клиенты' },
  { to: '/tasks', icon: Calendar, label: 'Задачи' },
  { to: '/finances', icon: DollarSign, label: 'Финансы' },
];

export default function Sidebar() {
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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-full" />
          <div>
            <p className="font-medium text-sm">Ты</p>
            <p className="text-xs text-gray-500">Фрилансер</p>
          </div>
        </div>
      </div>
    </div>
  );
}
