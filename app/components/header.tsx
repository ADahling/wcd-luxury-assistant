
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LayoutDashboard, Users, FileText, LogOut, Menu, X, Sparkles, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'CRM', href: '/crm', icon: Users },
  { name: 'Documents', href: '/documents', icon: FileText },
];

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'WCD';
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Pixel Hive Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                <span className="text-gradient font-['Space_Grotesk']">WCD</span>
              </h1>
              <p className="hidden sm:block text-sm text-muted-foreground font-medium">
                Luxury Executive Assistant
              </p>
            </div>
          </motion.div>

          {/* Pixel Hive Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative group flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavItem"
                        className="absolute inset-0 bg-gradient-primary rounded-2xl shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`relative z-10 flex items-center space-x-3 ${
                      !isActive ? 'group-hover:scale-105' : ''
                    } transition-transform duration-200`}>
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:hidden"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-3 rounded-2xl text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* User Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative p-1 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <Avatar className="relative h-11 w-11 border-2 border-white/20 shadow-lg">
                        <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold">
                          {getInitials(session?.user?.name || 'WCD')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 card-pixel border-white/10 shadow-2xl mt-2" 
                  align="end"
                  sideOffset={8}
                >
                  <div className="px-4 py-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/30">
                        <AvatarFallback className="bg-gradient-primary text-white font-bold">
                          {getInitials(session?.user?.name || 'WCD')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white">{session?.user?.name || 'Grant Kelly'}</p>
                        <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                        <div className="flex items-center mt-1">
                          <Sparkles className="h-3 w-3 text-accent mr-1" />
                          <span className="text-xs text-accent font-medium">Executive Assistant</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="mx-2 my-2 px-3 py-3 rounded-xl text-destructive hover:text-white hover:bg-destructive/20 transition-all duration-200 cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>

        {/* Pixel Hive Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <nav className="py-6 space-y-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`relative group flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-white'
                            : 'text-muted-foreground hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-primary rounded-2xl shadow-lg opacity-90" />
                        )}
                        <div className="relative z-10 flex items-center space-x-4">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {!isActive && (
                          <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
