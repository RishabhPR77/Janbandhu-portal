import { Shield, User, LogOut, LayoutDashboard, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Navbar() {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: BarChart3,
    }
  ];

  return (
    <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-600 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left - Government Emblem & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-xl font-bold tracking-wide">JanBandhu</h1>
                <p className="text-xs text-orange-100">जनबंधु - Citizen Services Portal</p>
              </div>
            </div>
          </div>

          {/* Right - User Profile */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-sm text-orange-100">
              Government of India
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-orange-800/20 p-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="hidden sm:block text-sm">Admin</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Sub Header with Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-800">Authority Dashboard</h2>
              <div className="hidden md:block h-4 w-px bg-gray-300"></div>
              <span className="hidden md:block text-sm text-gray-600">Civic Issue Management System</span>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="flex space-x-1 ml-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-orange-100 text-orange-700 border border-orange-200"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
          
          <div className="text-xs text-gray-500">
            Last Updated: {new Date().toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </header>
  );
}