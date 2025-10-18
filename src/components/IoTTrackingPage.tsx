import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { UserDashboardSidebar } from "./UserDashboardSidebar";
import { 
  MapPin, 
  Navigation, 
  Battery, 
  Gauge,
  Thermometer,
  Zap,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Radio
} from "lucide-react";

interface IoTTrackingPageProps {
  onNavigate: (page: string) => void;
}

interface VehicleData {
  id: string;
  name: string;
  registrationNumber: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  speed: number;
  batteryLevel: number;
  temperature: number;
  odometer: number;
  status: 'moving' | 'parked' | 'charging';
  lastUpdate: Date;
  route: { lat: number; lng: number }[];
}

export function IoTTrackingPage({ onNavigate }: IoTTrackingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserDashboardSidebar currentPage="iot-tracking" onNavigate={onNavigate} />
      <div className="ml-[var(--user-sidebar-width,280px)] transition-all pt-24 p-6 min-h-screen">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <div className="animate-pulse">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <Navigation className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">IoT Vehicle Tracking</h2>
                <p className="text-muted-foreground mb-4">This service is coming soon. Live vehicle tracking will be available here shortly.</p>
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
