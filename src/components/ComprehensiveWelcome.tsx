import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Building2, 
  Globe, 
  CreditCard, 
  PieChart, 
  Target,
  Activity,
  ChevronRight,
  Star,
  Award,
  Zap,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import "../App.css";

interface ComprehensiveWelcomeProps {
  onContinue: () => void;
  username?: string;
}

export const ComprehensiveWelcome = ({ onContinue, username = "Valued User" }: ComprehensiveWelcomeProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [businessMetrics, setBusinessMetrics] = useState({
    revenue: 0,
    customers: 0,
    orders: 0,
    growth: 0,
    satisfaction: 0,
    uptime: 0
  });
  const [activeFeature, setActiveFeature] = useState(0);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Show metrics after a brief delay
    const metricsTimer = setTimeout(() => {
      setShowMetrics(true);
    }, 800);

    // Simulate business metrics loading
    const metricInterval = setInterval(() => {
      setBusinessMetrics(prev => ({
        revenue: Math.min(2500000, prev.revenue + 12500),
        customers: Math.min(15000, prev.customers + 8),
        orders: Math.min(75000, prev.orders + 15),
        growth: Math.min(96, prev.growth + 0.4),
        satisfaction: Math.min(98, prev.satisfaction + 0.5),
        uptime: Math.min(99.9, prev.uptime + 0.01)
      }));
    }, 60);

    // Auto-continue after 6 seconds
    const timer = setTimeout(() => {
      handleContinue();
    }, 6000);

    // Feature carousel
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(metricInterval);
      clearInterval(featureInterval);
      clearTimeout(timer);
      clearTimeout(metricsTimer);
    };
  }, []);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process transactions in milliseconds with our optimized system",
      color: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Enterprise-grade encryption protecting your business data",
      color: "text-blue-400"
    },
    {
      icon: Award,
      title: "Industry Leading",
      description: "Trusted by 500+ businesses worldwide for reliable operations",
      color: "text-amber-400"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance whenever you need help",
      color: "text-emerald-400"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Dynamic geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden"
        >
          {/* Header with gradient strip */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500"></div>
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl backdrop-blur-sm border border-white/10 mb-8"
              >
                <Building2 className="h-16 w-16 text-blue-400" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Welcome to Kilango
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-slate-300 mb-2"
              >
                Investment Ltd
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-slate-400 max-w-2xl mx-auto"
              >
                Transform your business operations with our comprehensive POS solution
              </motion.p>
            </div>
          </div>
          
          <div className="px-12 pb-12">
            {/* Business Metrics Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: showMetrics ? 1 : 0, y: showMetrics ? 0 : 30 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10"
            >
              {[
                { 
                  icon: DollarSign, 
                  label: "REVENUE", 
                  value: `$${Math.floor(businessMetrics.revenue).toLocaleString()}`, 
                  color: "text-emerald-400",
                  prefix: "$"
                },
                { 
                  icon: Users, 
                  label: "CUSTOMERS", 
                  value: Math.floor(businessMetrics.customers).toLocaleString(), 
                  color: "text-blue-400" 
                },
                { 
                  icon: ShoppingCart, 
                  label: "ORDERS", 
                  value: Math.floor(businessMetrics.orders).toLocaleString(), 
                  color: "text-cyan-400" 
                },
                { 
                  icon: TrendingUp, 
                  label: "GROWTH", 
                  value: `${Math.floor(businessMetrics.growth)}%`, 
                  color: "text-amber-400" 
                },
                { 
                  icon: Star, 
                  label: "SATISFACTION", 
                  value: `${Math.floor(businessMetrics.satisfaction)}%`, 
                  color: "text-yellow-400" 
                },
                { 
                  icon: Activity, 
                  label: "UPTIME", 
                  value: `${businessMetrics.uptime.toFixed(1)}%`, 
                  color: "text-green-400" 
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-4 transition-all duration-500 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 group"
                >
                  <metric.icon className={`h-8 w-8 ${metric.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                  <div className="text-xs text-slate-400 uppercase tracking-wider text-center mb-1">{metric.label}</div>
                  <div className={`text-lg font-bold ${metric.color} text-center`}>{metric.value}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Business Performance Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showMetrics ? 1 : 0, y: showMetrics ? 0 : 20 }}
              transition={{ delay: 1.2 }}
              className="relative w-full max-w-3xl mx-auto mb-10"
            >
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${businessMetrics.growth}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="text-sm text-slate-400 mt-3 uppercase tracking-wider flex justify-between">
                <span>BUSINESS PERFORMANCE</span>
                <span>{Math.round(businessMetrics.growth)}%</span>
              </div>
            </motion.div>

            {/* Key Features Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mb-10"
            >
              <h3 className="text-xl font-semibold text-white text-center mb-6">Why Choose Kilango?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`p-5 rounded-xl border transition-all duration-300 ${
                      activeFeature === index 
                        ? "bg-gradient-to-r from-blue-600/30 to-emerald-600/30 border-blue-500/50 shadow-lg shadow-blue-500/20" 
                        : "bg-slate-700/30 border-slate-600 hover:border-slate-500"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setActiveFeature(index)}
                  >
                    <feature.icon className={`h-10 w-10 ${feature.color} mb-3`} />
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Business Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="text-center p-5 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
                <div className="text-sm text-slate-400">Active Businesses</div>
                <div className="text-xs text-slate-500 mt-1">Trusting our solution</div>
              </div>
              <div className="text-center p-5 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                <div className="text-sm text-slate-400">System Uptime</div>
                <div className="text-xs text-slate-500 mt-1">Reliable operations</div>
              </div>
              <div className="text-center p-5 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-sm text-slate-400">Support Available</div>
                <div className="text-xs text-slate-500 mt-1">Always here to help</div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="text-center"
            >
              <Button
                onClick={handleContinue}
                className="h-14 px-8 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 group"
              >
                Continue to Dashboard
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                This welcome screen will automatically continue in 6 seconds
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};