import { motion } from "motion/react";
import { Filter, Download, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function PaymentsPage() {
  const payments = [
    {
      id: "TXN001234",
      date: "Oct 11, 2025",
      amount: "₹2,999",
      plan: "Monthly Pro",
      method: "UPI",
      status: "success",
      utr: "325478965412",
      type: "auto"
    },
    {
      id: "TXN001233",
      date: "Sep 11, 2025",
      amount: "₹2,999",
      plan: "Monthly Pro",
      method: "UPI",
      status: "success",
      utr: "325478965411",
      type: "auto"
    },
    {
      id: "ADM00523",
      date: "Sep 5, 2025",
      amount: "₹500",
      plan: "Late Fee",
      method: "Manual",
      status: "pending",
      utr: "N/A",
      type: "manual"
    },
    {
      id: "TXN001232",
      date: "Aug 11, 2025",
      amount: "₹2,999",
      plan: "Monthly Pro",
      method: "UPI",
      status: "success",
      utr: "325478965410",
      type: "auto"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-foreground mb-2">My Payments</h2>
          <p className="text-muted-foreground">View all your transaction history</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-1">Total Paid</p>
              <h3 className="text-foreground">₹11,996</h3>
              <p className="text-sm text-green-600 mt-1">+₹2,999 this month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-1">Successful</p>
              <h3 className="text-foreground">12</h3>
              <p className="text-sm text-muted-foreground mt-1">Transactions</p>
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
              <p className="text-muted-foreground mb-1">Pending</p>
              <h3 className="text-foreground">1</h3>
              <p className="text-sm text-yellow-600 mt-1">Awaiting confirmation</p>
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
              <p className="text-muted-foreground mb-1">Next Payment</p>
              <h3 className="text-foreground">₹2,999</h3>
              <p className="text-sm text-primary mt-1">Due in 2 days</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search by transaction ID or UTR..." />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>UTR</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.utr}</TableCell>
                      <TableCell className="font-semibold">{payment.amount}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        {payment.type === "manual" ? (
                          <Badge variant="outline" className="text-xs">
                            Manual Entry
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                            Auto
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
