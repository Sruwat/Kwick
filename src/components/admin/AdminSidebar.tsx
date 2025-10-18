import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Car,
  Bell,
  Newspaper,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { Badge } from '../ui/badge';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();

  // Expose sidebar state to parent components via CSS variable
  React.useEffect(() => {
    document.documentElement.style.setProperty('--admin-sidebar-width', sidebarOpen ? '280px' : '80px');
  }, [sidebarOpen]);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, page: 'admin-dashboard', badge: null },
    { label: 'User Management', icon: Users, page: 'admin-users', badge: '3' },
    { label: 'KYC Management', icon: FileText, page: 'admin-kyc', badge: '1' },
    { label: 'Payments', icon: CreditCard, page: 'admin-payments', badge: null },
    { label: 'Fleet Management', icon: Car, page: 'admin-fleet', badge: null },
    { label: 'Notifications', icon: Bell, page: 'admin-notifications', badge: '5' },
    { label: 'Blog CMS', icon: Newspaper, page: 'admin-blog', badge: null },
    { label: 'Career CMS', icon: Briefcase, page: 'admin-careers', badge: null },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className="fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 overflow-y-auto z-40 shadow-lg"
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full justify-start mb-4 hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {sidebarOpen && <span className="ml-2">Close Menu</span>}
        </Button>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === item.page
                  ? 'bg-red-500 text-white shadow-md'
                  : 'hover:bg-red-50 group'
              } ${!sidebarOpen ? 'justify-center' : ''}`}
            >
              <item.icon 
                className={`w-5 h-5 ${
                  currentPage === item.page
                    ? 'text-white'
                    : 'text-gray-600 group-hover:text-red-500'
                }`}
              />
              {sidebarOpen && (
                <>
                  <span className={`flex-1 text-left whitespace-nowrap ${
                    currentPage === item.page ? 'text-white' : 'group-hover:text-red-500'
                  }`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge className={currentPage === item.page ? 'bg-white text-red-500' : 'bg-red-500'}>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <button
          onClick={() => {
            logout();
            onNavigate('admin-login');
          }}
          className="w-full px-4 py-3 flex items-center gap-3 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Logout
        </button>
      </div>
    </motion.aside>
  );
};
