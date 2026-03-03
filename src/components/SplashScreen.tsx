import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Building, 
  Globe, 
  CreditCard, 
  PieChart, 
  Target,
  Activity
} from "lucide-react";
import "../App.css";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [businessMetrics, setBusinessMetrics] = useState({
    revenue: 0,
    customers: 0,
    orders: 0,
    growth: 0
  });
  const [activeChart, setActiveChart] = useState(0);

  useEffect(() => {
    // Simulate business metrics loading
    const metricInterval = setInterval(() => {
      setBusinessMetrics(prev => ({
        revenue: Math.min(1000000, prev.revenue + 5000),
        customers: Math.min(10000, prev.customers + 5),
        orders: Math.min(50000, prev.orders + 10),
        growth: Math.min(98, prev.growth + 0.5)
      }));
    }, 50);

    // Auto-hide after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearInterval(metricInterval);
      clearTimeout(timer);
    };
  }, []);



  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">

      


      {/* Dynamic geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden">
          {/* Form header with gradient strip */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500"></div>
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl backdrop-blur-sm border border-white/10 mb-8">
                <Building className="h-16 w-16 text-blue-400" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  KILANGO
                </span>
              </h1>
              <p className="text-2xl text-slate-300 mb-10">
                INVESTMENT LTD
              </p>
            </div>
          </div>
          
          <div className="px-12 pb-12">
            {/* Business Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { icon: DollarSign, label: "REVENUE", value: `$${Math.floor(businessMetrics.revenue).toLocaleString()}`, color: "text-emerald-400" },
                { icon: Users, label: "CUSTOMERS", value: Math.floor(businessMetrics.customers).toLocaleString(), color: "text-blue-400" },
                { icon: ShoppingCart, label: "ORDERS", value: Math.floor(businessMetrics.orders).toLocaleString(), color: "text-cyan-400" },
                { icon: TrendingUp, label: "GROWTH", value: `${Math.floor(businessMetrics.growth)}%`, color: "text-amber-400" }
              ].map((metric, index) => (
                <div 
                  key={index}
                  className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-5 transition-all duration-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <metric.icon className={`h-10 w-10 ${metric.color} mx-auto mb-3`} />
                  <div className="text-xs text-slate-400 uppercase tracking-wider text-center">{metric.label}</div>
                  <div className={`text-xl font-bold ${metric.color} text-center mt-1`}>{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Business Performance Bar */}
            <div className="relative w-full max-w-2xl mx-auto mb-10">
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${businessMetrics.growth}%` }}
                ></div>
              </div>
              <div className="text-sm text-slate-400 mt-3 uppercase tracking-wider flex justify-between">
                <span>BUSINESS PERFORMANCE</span>
                <span>{Math.round(businessMetrics.growth)}%</span>
              </div>
            </div>

            {/* Business Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600">
                <div className="text-2xl font-bold text-emerald-400 mb-2">500+</div>
                <div className="text-sm text-slate-400">Active Businesses</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600">
                <div className="text-2xl font-bold text-blue-400 mb-2">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600">
                <div className="text-2xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};