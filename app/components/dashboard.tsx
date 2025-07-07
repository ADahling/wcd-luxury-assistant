
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/components/header';
import { QuickActions } from '@/components/quick-actions';
import { StatsCards } from '@/components/stats-cards';
import { RecentActivity } from '@/components/recent-activity';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalClients: number;
  activeJobs: number;
  pendingFollowUps: number;
  recentDocuments: any[];
}

export function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-secondary opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      
      {/* Pixel Hive Main Content */}
      <main className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-20"
          >
            {/* Pixel Hive Hero Section */}
            <section className="relative text-center py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="display-xl">
                    Executive Command Center
                  </h1>
                  <div className="max-w-3xl mx-auto space-y-4">
                    <p className="text-2xl text-muted-foreground">
                      Welcome back, <span className="text-gradient font-bold">{session?.user?.name || 'Grant Kelly'}</span>
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Your luxury concierge operations center. Orchestrate premium detailing services with unparalleled efficiency and sophistication.
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="inline-flex items-center space-x-3 px-6 py-3 card-pixel"
                >
                  <div className="w-3 h-3 bg-gradient-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    All systems operational
                  </span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <span className="text-sm font-medium text-gradient">
                    Ready for executive tasks
                  </span>
                </motion.div>
              </motion.div>
            </section>

            {/* Stats Dashboard */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <StatsCards stats={stats} loading={loading} />
            </motion.section>

            {/* Executive Actions */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <QuickActions />
            </motion.section>

            {/* Recent Operations */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <RecentActivity documents={stats?.recentDocuments || []} loading={loading} />
            </motion.section>

            {/* Footer CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center py-16"
            >
              <div className="card-pixel max-w-4xl mx-auto p-12">
                <div className="space-y-6">
                  <h3 className="display-s text-gradient">
                    Elevate Your Operations
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Experience the future of luxury service management with AI-powered efficiency and white-glove precision.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-pixel-primary">
                      Schedule Consultation
                    </button>
                    <button className="btn-pixel-secondary">
                      View Analytics
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
