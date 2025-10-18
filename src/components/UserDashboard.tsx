import { motion } from "motion/react";
import { Car, Battery, AlertCircle, CheckCircle, Bell, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";

export function UserDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-foreground mb-2">Welcome back, Rahul!</h2>
            <p className="text-muted-foreground">Here's your rental overview</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Alert - Plan Expiring */}
        <Alert className="border-primary/50 bg-primary/5 mb-6">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">
            Your monthly plan expires in <span className="font-semibold">2 days</span>. Renew now to continue riding!
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Current Plan</p>
                  <h3 className="text-foreground">Monthly Pro</h3>
                  <Badge className="mt-2 bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Vehicle No.</p>
              
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Battery Level</p>
                  
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Battery className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">KYC Status</p>
                  <h3 className="text-foreground">Pending</h3>
                  <Badge className="mt-2 bg-green-500/10 text-green-600 border-green-500/20">Approved</Badge>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Vehicle Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Current Vehicle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-24 h-24 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Vehicle Number</span>
                  <span className="text-foreground"></span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Chassis Number</span>
                  <span className="text-foreground"></span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Battery ID</span>
                  <span className="text-foreground"></span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Motor Number</span>
                  <span className="text-foreground"></span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Controller</span>
                  <span className="text-foreground"></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Insurance</span>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20"></Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Battery & Subscription */}
        <div className="space-y-6">
          {/* Battery Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Battery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Current Charge</span>
                      <span className="text-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Estimated Range</p>
                      <p className="text-foreground">62 km</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Health</p>
                      <p className="text-green-600">Excellent</p>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Battery className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-900">
                      Nearest swap station: 2.3 km away
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subscription Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle>Active Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-foreground">Monthly Pro</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Started</span>
                  <span className="text-foreground">Oct 11, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expires</span>
                  <span className="text-primary">Oct 13, 2025</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Days Remaining</span>
                    <span className="text-foreground">2 days</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Battery swapped", time: "2 hours ago", status: "success" },
                { action: "Payment received ₹2,999", time: "1 day ago", status: "success" },
                { action: "Vehicle inspection completed", time: "3 days ago", status: "success" },
                { action: "KYC documents verified", time: "5 days ago", status: "success" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <p className="text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
