import { useState, useEffect } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { motion } from "framer-motion";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Wallet, 
  Truck,
  Settings,
  User,
  Shield,
  FileText,
  Bot,
  Scan,
  AlertTriangle,
  Printer,
  Building,
  PiggyBank,
  LayoutTemplate,
  TrendingUp,
  DollarSign,
  Activity,
  Star
} from "lucide-react";
import { hasModuleAccess, getCurrentUserRole } from "@/utils/salesPermissionUtils";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface ComprehensiveDashboardProps {
  username: string;
  onNavigate: (module: string) => void;
  onLogout: () => void;
}

export const ComprehensiveDashboard = ({ username, onNavigate, onLogout }: ComprehensiveDashboardProps) => {
  console.log("=== ComprehensiveDashboard RENDERING ===");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalModules: 0,
    activeUsers: 0,
    systemPerformance: 0,
    uptime: 0
  });
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalModules: 0,
    activeUsers: 0,
    systemPerformance: 0,
    uptime: 0
  });
  console.log("Initial state - userRole:", userRole, "isRoleLoading:", isRoleLoading);
  
  useEffect(() => {
    console.log("useEffect triggered");
    const fetchUserRole = async () => {
      try {
        console.log("Fetching user role...");
        const role = await getCurrentUserRole();
        console.log("Fetched user role:", role);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        console.log("Setting isRoleLoading to false");
        setIsRoleLoading(false);
      }
    };
    
    fetchUserRole();
  }, []);

  // Animate dashboard metrics
  useEffect(() => {
    if (!isRoleLoading && modules.length > 0) {
      const targetMetrics = {
        totalModules: modules.length,
        activeUsers: Math.floor(Math.random() * 50) + 100,
        systemPerformance: Math.floor(Math.random() * 20) + 80,
        uptime: 99.9
      };
      
      setDashboardMetrics(targetMetrics);
      
      // Animate metrics counting up
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedMetrics({
          totalModules: Math.floor(targetMetrics.totalModules * progress),
          activeUsers: Math.floor(targetMetrics.activeUsers * progress),
          systemPerformance: Math.floor(targetMetrics.systemPerformance * progress),
          uptime: parseFloat((99 + (0.9 * progress)).toFixed(1))
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedMetrics(targetMetrics);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [isRoleLoading]);

  const allModules: Module[] = [
    {
      id: "inventory",
      title: "Inventory Management",
      description: "Manage products, stock levels, and inventory tracking",
      icon: Package,
      color: "bg-white border border-gray-200"
    },
    {
      id: "sales",
      title: "Sales Management",
      description: "Manage sales transactions and customer relationships",
      icon: ShoppingCart,
      color: "bg-white border border-gray-200"
    },
    {
      id: "purchase",
      title: "Purchase Management",
      description: "Handle supplier orders and purchase transactions",
      icon: Truck,
      color: "bg-white border border-gray-200"
    },
    {
      id: "finance",
      title: "Financial Management",
      description: "Track expenses, debts, and financial reporting",
      icon: Wallet,
      color: "bg-white border border-gray-200"
    },
    {
      id: "customers",
      title: "Customer Management",
      description: "Manage customer information and loyalty programs",
      icon: Users,
      color: "bg-white border border-gray-200"
    },
    {
      id: "suppliers",
      title: "Supplier Management",
      description: "Manage supplier information and vendor relationships",
      icon: Truck,
      color: "bg-white border border-gray-200"
    },
    {
      id: "employees",
      title: "Employee Management",
      description: "Manage staff information and payroll",
      icon: User,
      color: "bg-white border border-gray-200"
    },
    {
      id: "expenses",
      title: "Expense Tracking",
      description: "Record and categorize business expenses",
      icon: PiggyBank,
      color: "bg-white border border-gray-200"
    },
    {
      id: "returns",
      title: "Return Management",
      description: "Process product returns and refunds",
      icon: AlertTriangle,
      color: "bg-white border border-gray-200"
    },
    {
      id: "debts",
      title: "Debt Management",
      description: "Track receivables and payables",
      icon: FileText,
      color: "bg-white border border-gray-200"
    },
    {
      id: "customer-settlements",
      title: "Customer Settlements",
      description: "Manage customer payments and settlements",
      icon: Users,
      color: "bg-white border border-gray-200"
    },
    {
      id: "supplier-settlements",
      title: "Supplier Settlements",
      description: "Manage supplier payments and settlements",
      icon: Truck,
      color: "bg-white border border-gray-200"
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      description: "View financial reports and business analytics",
      icon: BarChart3,
      color: "bg-white border border-gray-200"
    },
    {
      id: "access-logs",
      title: "Access Logs",
      description: "Monitor user activity and system access",
      icon: Shield,
      color: "bg-white border border-gray-200"
    },
    {
      id: "settings",
      title: "System Settings",
      description: "Configure POS system preferences and options",
      icon: Settings,
      color: "bg-white border border-gray-200"
    },
    {
      id: "scanner",
      title: "Scan Items",
      description: "Quickly add products using barcode scanner",
      icon: Scan,
      color: "bg-white border border-gray-200"
    },
    {
      id: "automated",
      title: "Automated Dashboard",
      description: "View automated business insights and recommendations",
      icon: Bot,
      color: "bg-white border border-gray-200"
    },
    {
      id: "assets",
      title: "Assets Management",
      description: "Manage company assets, depreciation, and asset tracking",
      icon: Building,
      color: "bg-white border border-gray-200"
    },
    {
      id: "templates",
      title: "Business Templates",
      description: "Professional templates for your business documents",
      icon: LayoutTemplate,
      color: "bg-white border border-gray-200"
    },
    {
      id: "grn-inventory-dashboard",
      title: "GRN Inventory Dashboard",
      description: "View and manage your Goods Received Notes inventory",
      icon: Package,
      color: "bg-white border border-gray-200"
    },
    {
      id: "registered-outlets",
      title: "Registered Outlets",
      description: "Manage and monitor your registered business outlets",
      icon: Building,
      color: "bg-white border border-gray-200"
    }
  ];

  // TEMPORARY FIX: Always show all modules including GRN
  const modules = allModules;
  console.log("=== MODULES BEING RENDERED ===");
  console.log("Total modules:", modules.length);
  console.log("Module IDs:", modules.map(m => m.id));
  console.log("GRN module present:", modules.some(m => m.id === "grn-inventory-dashboard"));
  console.log("GRN module details:", modules.find(m => m.id === "grn-inventory-dashboard"));

  const handleNavigate = async (moduleId: string) => {
    console.log("handleNavigate called with moduleId:", moduleId);
    
    // Special handling for reports module
    if (moduleId === "reports") {
      console.log("Navigating to statements-reports");
      onNavigate("statements-reports");
      return;
    }
    // Special handling for financial statements module
    if (moduleId === "financial-statements") {
      console.log("Navigating to financial-reports");
      onNavigate("financial-reports");
      return;
    }
    
    // Navigate to specific modules
    switch (moduleId) {
      case "inventory":
        console.log("Navigating to products");
        onNavigate("products");
        break;
      case "sales":
        console.log("Navigating to sales");
        onNavigate("sales");
        break;
      case "purchase":
        console.log("Navigating to purchase");
        onNavigate("purchase");
        break;
      case "finance":
        console.log("Navigating to finance");
        onNavigate("finance");
        break;
      case "assets":
        console.log("Navigating to assets");
        onNavigate("assets");
        break;
      case "employees":
        console.log("Navigating to employees");
        onNavigate("employees");
        break;
      case "customers":
        console.log("Navigating to customers");
        onNavigate("customers");
        break;
      case "suppliers":
        console.log("Navigating to suppliers");
        onNavigate("suppliers");
        break;
      case "expenses":
        console.log("Navigating to expenses");
        onNavigate("expenses");
        break;
      case "returns":
        console.log("Navigating to returns");
        onNavigate("returns");
        break;
      case "debts":
        console.log("Navigating to debts");
        onNavigate("debts");
        break;
      case "customer-settlements":
        console.log("Navigating to customer-settlements");
        onNavigate("customer-settlements");
        break;
      case "supplier-settlements":
        console.log("Navigating to supplier-settlements");
        onNavigate("supplier-settlements");
        break;
      case "access-logs":
        console.log("Navigating to access-logs");
        onNavigate("access-logs");
        break;
      case "settings":
        console.log("Navigating to settings");
        onNavigate("settings");
        break;
      case "scanner":
        console.log("Navigating to scanner");
        onNavigate("scanner");
        break;
      case "automated":
        console.log("Navigating to automated");
        onNavigate("automated");
        break;
      case "capital":
        console.log("Navigating to capital");
        onNavigate("capital");
        break;
      case "templates":
        console.log("Navigating to templates");
        onNavigate("templates");
        break;
      case "grn-inventory-dashboard":
        console.log("Navigating to grn-inventory-dashboard");
        onNavigate("grn-inventory-dashboard");
        break;
      case "registered-outlets":
        console.log("Navigating to registered-outlets");
        onNavigate("registered-outlets");
        break;
      default:
        console.log("Navigating to default:", moduleId);
        onNavigate(moduleId);
    }
  };

  // Show loading state while fetching role
  if (isRoleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center p-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Dashboard</h2>
          <p className="text-slate-400">Preparing your business modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <main className="container mx-auto p-4 sm:p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Enhanced header with metrics */}
          <div className="mb-8 sm:mb-10">
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white"
              >
                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{username}</span>!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto"
              >
                Select a module to manage your business operations
              </motion.p>
            </div>
            
            {/* Dashboard Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { icon: Package, label: "TOTAL MODULES", value: animatedMetrics.totalModules, color: "text-blue-400", suffix: "" },
                { icon: Users, label: "ACTIVE USERS", value: animatedMetrics.activeUsers, color: "text-emerald-400", suffix: "+" },
                { icon: Activity, label: "PERFORMANCE", value: animatedMetrics.systemPerformance, color: "text-cyan-400", suffix: "%" },
                { icon: Star, label: "SYSTEM UPTIME", value: animatedMetrics.uptime, color: "text-amber-400", suffix: "%" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <metric.icon className={`h-8 w-8 ${metric.color} mx-auto mb-2`} />
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{metric.label}</div>
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}{metric.suffix}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {modules.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 auto-rows-fr"
          >
            {modules.map((module, index) => {
              console.log("Rendering module:", module.id, module.title);
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.8 + (index * 0.05),
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="flex"
                >
                  <DashboardCard
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    onClick={() => handleNavigate(module.id)}
                    className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 text-white"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Access</h3>
            <p className="text-muted-foreground mb-4">
              You don't have permission to access any modules.
            </p>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
};