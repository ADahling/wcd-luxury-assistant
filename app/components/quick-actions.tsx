
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, Users, Mail, Sparkles, Crown, PenTool, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ClientModal } from '@/components/modals/client-modal';
import { EmailModal } from '@/components/modals/email-modal';

const actions = [
  {
    name: 'Executive Quote',
    icon: PenTool,
    description: 'Craft premium service proposals',
    href: '/documents/create?type=QUOTE',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    category: 'Documents'
  },
  {
    name: 'Luxury Invoice',
    icon: Crown,
    description: 'Generate elegant billing statements',
    href: '/documents/create?type=INVOICE',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    category: 'Financial'
  },
  {
    name: 'New Client',
    icon: Users,
    description: 'Onboard exclusive clientele',
    modal: 'client',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    category: 'CRM'
  },
  {
    name: 'Smart Email',
    icon: Send,
    description: 'AI-powered correspondence',
    modal: 'email',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    category: 'Communication'
  },
];

export function QuickActions() {
  const router = useRouter();
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleAction = (action: typeof actions[0]) => {
    if (action.modal === 'client') {
      setClientModalOpen(true);
    } else if (action.modal === 'email') {
      setEmailModalOpen(true);
    } else if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <>
      <div className="space-y-10">
        {/* Pixel Hive Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="display-m text-gradient">
            Executive Actions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Streamlined workflow for luxury concierge operations
          </p>
        </motion.div>
        
        {/* Pixel Hive Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  bounce: 0.1
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div 
                  onClick={() => handleAction(action)}
                  className="card-pixel relative overflow-hidden cursor-pointer h-full p-6 group-hover:border-white/30 transition-all duration-300"
                >
                  {/* Background Gradient */}
                  <div 
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: action.gradient }}
                  />
                  
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
                    style={{ background: action.gradient }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6 h-full">
                    {/* Category Badge */}
                    <div className="self-start">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20">
                        {action.category}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <div className="relative group/icon flex-shrink-0">
                      <div 
                        className="absolute inset-0 rounded-2xl blur-lg opacity-30 group-hover/icon:opacity-60 transition-opacity duration-300"
                        style={{ background: action.gradient }}
                      />
                      <div 
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: action.gradient }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="font-bold text-white text-lg font-['Space_Grotesk'] group-hover:text-gradient-secondary transition-colors duration-300">
                        {action.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    
                    {/* Action Indicator */}
                    <div className="w-full">
                      <div className="flex items-center justify-center space-x-2 pt-4 border-t border-white/10">
                        <Sparkles className="h-3 w-3 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                        <span className="text-xs text-muted-foreground group-hover:text-white transition-colors duration-300 font-medium">
                          Click to execute
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center pt-8"
        >
          <p className="text-sm text-muted-foreground">
            Need custom assistance? 
            <span className="text-gradient font-medium ml-1 cursor-pointer hover:underline">
              Contact our concierge team
            </span>
          </p>
        </motion.div>
      </div>

      <ClientModal 
        open={clientModalOpen} 
        onOpenChange={setClientModalOpen}
        onSuccess={() => window.location.reload()}
      />
      
      <EmailModal 
        open={emailModalOpen} 
        onOpenChange={setEmailModalOpen}
      />
    </>
  );
}
