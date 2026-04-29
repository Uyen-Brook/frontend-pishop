import React from "react";
import Card from "../card/Card";

import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  growth?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  growth,
  trend = "up",
  icon: Icon,
  color = "bg-blue-100 text-blue-600",
}) => {
  return (
    <Card extra="p-5">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>

          {/* GROWTH */}
          {growth && (
            <div
              className={`mt-2 flex items-center gap-1 text-sm font-medium ${
                trend === "down"
                  ? "text-red-500"
                  : trend === "neutral"
                  ? "text-gray-500"
                  : "text-green-500"
              }`}
            >
              {trend === "down" ? (
                <TrendingDown className="h-4 w-4" />
              ) : trend === "neutral" ? (
                <Minus className="h-4 w-4" />
              ) : (
                <TrendingUp className="h-4 w-4" />
              )}

              <span>{growth}</span>
            </div>
          )}
        </div>

        {/* RIGHT ICON */}
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;