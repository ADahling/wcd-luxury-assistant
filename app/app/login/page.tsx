
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { Crown, Sparkles } from "lucide-react";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Pixel Hive Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-secondary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-accent opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Pixel Hive Login Card */}
          <div className="card-pixel p-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-6">
              {/* Logo */}
              <div className="flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-2xl">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="display-l text-gradient">
                  World Class Detailing
                </h1>
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-lg text-muted-foreground font-medium">
                    Executive Command Center
                  </span>
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center">
                <div className="w-32 h-px bg-gradient-primary opacity-50"></div>
              </div>
            </div>

            {/* Login Form */}
            <LoginForm />

          </div>
        </div>
      </div>
    </div>
  );
}
