import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Lock, User, Eye, EyeOff, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
// Import Supabase auth service
import { signIn } from "@/services/authService";
import { AuthErrorHandler } from '@/utils/authErrorHandler';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onNavigate?: (destination: string) => void;
}

export const LoginForm = ({ onLogin, onNavigate }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Try Supabase authentication first
      const result = await signIn(email, password);
      
      if (result.error) {
        // Handle refresh token errors specifically
        if (AuthErrorHandler.isSessionInvalid(result.error)) {
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // Handle specific email confirmation error
        if (result.error.message && result.error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Confirmation Required",
            description: "Please check your email and click the confirmation link before logging in.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // Show error message instead of falling back to mock authentication
        toast({
          title: "Authentication Error",
          description: result.error.message || "Failed to authenticate. Please check your credentials and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      } else {
        // Supabase auth successful
        onLogin({ username: email, password });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onNavigate) {
      onNavigate("register");
    } else {
      // Fallback to hash-based navigation
      window.location.hash = "#register";
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Dynamic geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Left side - Business information panel */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center p-12 relative z-10">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl backdrop-blur-sm border border-white/10 mb-6">
              <Building2 className="h-12 w-12 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Kilango Group
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Transform your business operations with our comprehensive POS solution
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="text-left p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-emerald-400">500+</div>
              <div className="text-sm text-slate-400">Active Businesses</div>
            </div>
            <div className="text-left p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-left p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-rose-400">24/7</div>
              <div className="text-sm text-slate-400">Support</div>
            </div>
            <div className="text-left p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-amber-400">10x</div>
              <div className="text-sm text-slate-400">ROI</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden">
            {/* Form header with gradient strip */}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500"></div>
              <div className="p-8 text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  Welcome Back
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-400"
                >
                  Sign in to access your business dashboard
                </motion.p>
              </div>
            </div>
            
            <CardContent className="pb-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</Label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 h-10 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full group-focus-within:opacity-100 opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 h-5 w-5 text-slate-400 ml-1" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }}
                        className={`pl-12 pr-4 py-4 text-base rounded-xl border border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 ${errors.email ? "border-red-500" : ""}`}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-medium text-slate-300">Password</Label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 h-10 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full group-focus-within:opacity-100 opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 h-5 w-5 text-slate-400 ml-1" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                        }}
                        className={`pl-12 pr-12 py-4 text-base rounded-xl border border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 ${errors.password ? "border-red-500" : ""}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-slate-400 hover:text-white transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between"
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>
              </form>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 pt-6 border-t border-slate-700"
              >
                <div className="text-center">
                  <p className="text-slate-400 mb-4">
                    Don't have an account?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full font-medium rounded-xl px-6 py-5 text-base border-slate-600 text-white hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300"
                    onClick={handleRegisterClick}
                    disabled={isLoading}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Create Account
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center"
          >
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Kilango Group. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};