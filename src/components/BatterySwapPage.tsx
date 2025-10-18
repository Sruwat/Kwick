import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { UserDashboardSidebar } from "./UserDashboardSidebar";
import { 
  Battery, 
  MapPin, 
  Clock,
  Navigation,
  Zap,
  Phone,
  Star,
  CheckCircle,
  Search,
  Filter
} from "lucide-react";
import { toast } from "sonner";

interface BatterySwapPageProps {
  onNavigate: (page: string) => void;
}

interface SwapStation {
  id: string;
  name: string;
  address: string;
  distance: number;
  availableBatteries: number;
  totalSlots: number;
  operatingHours: string;
  rating: number;
  swapTime: number;
  price: number;
  amenities: string[];
  phone: string;
}

export function BatterySwapPage({ onNavigate }: BatterySwapPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserDashboardSidebar currentPage="battery-swap" onNavigate={onNavigate} />
      <div className="ml-[var(--user-sidebar-width,280px)] transition-all pt-24 p-6 min-h-screen">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <div className="animate-pulse">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <Battery className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Battery Swap</h2>
                <p className="text-muted-foreground mb-4">This service is coming soon. We're working to bring battery swap to your dashboard.</p>
                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-2 bg-primary w-1/3 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
