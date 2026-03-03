import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

export const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  className 
}: DashboardCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("DashboardCard clicked:", title);
    console.log("onClick function:", onClick);
    onClick();
  };
  
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-300 group h-full flex flex-col dashboard-card p-5 border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20",
          className
        )}
        onClick={handleClick}
      >
        <CardHeader className="pb-4 flex-shrink-0 px-0 pt-0">
          <div className="dashboard-card-header flex items-start gap-4">
            <motion.div 
              className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600/20 to-emerald-600/20 group-hover:from-blue-600/30 group-hover:to-emerald-600/30 transition-all duration-300 flex-shrink-0 dashboard-card-icon p-3"
              whileHover={{ scale: 1.1 }}
            >
              <Icon className="text-blue-400 flex-shrink-0 w-6 h-6" />
            </motion.div>
            <div className="min-w-0 flex-grow">
              <CardTitle className="text-base md:text-lg font-bold text-white card-title group-hover:text-blue-300 transition-colors">{title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-2 px-0 dashboard-card-content">
          <p className="text-sm text-slate-400 leading-relaxed card-description group-hover:text-slate-300 transition-colors">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};