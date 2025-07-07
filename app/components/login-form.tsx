
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogIn, Crown, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Access Denied",
          description: "Invalid credentials. Please verify your executive access.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome to WCD Executive Suite",
          description: "Successfully authenticated. Accessing your command center.",
        });
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "System Error",
        description: "Authentication service temporarily unavailable. Please retry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Form Fields */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          <Label htmlFor="email" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Executive Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="grant@wcd954.com"
              required
              className="input-pixel h-14 text-base pl-12 pr-4"
            />
            <Crown className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <Label htmlFor="password" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Access Code
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your secure access code"
              required
              className="input-pixel h-14 text-base pl-12 pr-4"
            />
            <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button
          type="submit"
          disabled={loading}
          className="w-full btn-pixel-primary h-14 text-base font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              <LogIn className="mr-3 h-5 w-5" />
              Access Executive Suite
            </>
          )}
        </Button>
      </motion.div>


    </motion.form>
  );
}
