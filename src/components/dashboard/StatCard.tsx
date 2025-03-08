
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  percentageChange?: number;
  increaseIsGood?: boolean;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  subtitle,
  percentageChange,
  increaseIsGood = true,
  icon: Icon,
  iconBgColor,
  iconColor,
  delay = 0,
}: StatCardProps) => {
  const isPositiveChange = percentageChange && percentageChange > 0;
  const showChangeIndicator = percentageChange !== undefined;
  
  // Determine text color based on whether increase is good and the direction of change
  const getChangeTextColor = () => {
    if (!showChangeIndicator) return "text-gray-600";
    
    if ((isPositiveChange && increaseIsGood) || (!isPositiveChange && !increaseIsGood)) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold">{value.toLocaleString()}</h3>
          {subtitle && <p className="text-sm text-purple-600">{subtitle}</p>}
          {showChangeIndicator && (
            <p className={`text-sm flex items-center ${getChangeTextColor()}`}>
              {isPositiveChange ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(percentageChange)}% {increaseIsGood ? "Dari tahun sebelumnya" : "Dari tahun sebelumnya"}
            </p>
          )}
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
