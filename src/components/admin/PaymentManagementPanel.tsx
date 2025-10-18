import React, { useState } from 'react';
import { Search, Download, Plus, Eye, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { AdminSidebar } from './AdminSidebar';
import { motion } from 'motion/react';

const mockPaymentData = [
  {
    id: 'USR001',
    name: 'Raj Kumar',
    email: 'raj.kumar@email.com',
    phone: '+91 98765 43210',
    totalPaid: 3386,
    pendingAmount: 0,
    lastPayment: '1/15/2024',
    payments: [
      {
        id: 'PAY001',
        date: '1/15/2024',
        amount: 2000,
        plan: 'Weekly Plan',
        method: 'UPI',
        utr: 'UTR123456789',
        proof: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        status: 'completed',
      },
      {
        id: 'PAY002',
        date: '1/8/2024',
        amount: 1386,
        plan: 'Weekly Plan',
        method: 'UPI',
        utr: 'UTR987654321',
        proof: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        status: 'completed',
      },
    ],
  },
  {
    id: 'USR002',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43211',
    totalPaid: 0,
    pendingAmount: 2000,
    lastPayment: '-',
    payments: [],
  },
];

interface PaymentManagementPanelProps {
  onNavigate?: (page: string) => void;
}

export const PaymentManagementPanel: React.FC<PaymentManagementPanelProps> = ({ onNavigate }) => {
  const [selectedUser, setSelectedUser] = useState(mockPaymentData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    userId: '',
    amount: '',
    plan: '',
    method: 'UPI',
    utr: '',
    proof: null as File | null,
  });

  const exportData = (format: 'pdf' | 'excel') => {
    alert(`Exporting payment data as ${format.toUpperCase()}...`);
  };

  const handleAddPayment = () => {
    alert('Payment added successfully!');
    setAddPaymentOpen(false);
    setNewPayment({ userId: '', amount: '', plan: '', method: 'UPI', utr: '', proof: null });
  };

  const verifyPayment = (paymentId: string) => {
    alert(`Payment ${paymentId} verified!`);
  };

  const stats = [
    { label: 'Total Revenue', value: '₹3,386', color: 'text-green-500' },
    { label: 'Pending Payments', value: '₹2,000', color: 'text-yellow-500' },
    { label: 'Completed', value: '2', color: 'text-blue-500' },
    { label: 'Failed', value: '0', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="admin-payments" onNavigate={onNavigate} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 p-6 space-y-6 min-h-screen"
        style={{ marginLeft: 'var(--admin-sidebar-width, 280px)', transition: 'margin-left 0.3s' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Payment Management</h2>
          <p className="text-gray-500">Track and manage all user payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setAddPaymentOpen(true)} size="sm" className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </Button>
          <Button onClick={() => exportData('pdf')} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - User List */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* User Cards */}
          <div className="space-y-2">
            {mockPaymentData.map((user) => (
              <Card
                key={user.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedUser.id === user.id ? 'ring-2 ring-red-500 bg-red-50' : ''
                } ${user.pendingAmount > 0 ? 'border-l-4 border-l-red-500' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p>{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">{user.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500">₹{user.totalPaid}</p>
                      {user.pendingAmount > 0 && (
                        <p className="text-xs text-red-500">₹{user.pendingAmount} due</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last payment: {user.lastPayment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - Payment Details */}
        <div className="lg:col-span-8">
          <Card>
            <CardContent className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl">{selectedUser.name}</h3>
                <p className="text-gray-500">User ID: {selectedUser.id}</p>
              </div>

              {/* Payment Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-green-500">₹{selectedUser.totalPaid}</div>
                    <div className="text-sm text-gray-500 mt-1">Total Paid</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-red-500">₹{selectedUser.pendingAmount}</div>
                    <div className="text-sm text-gray-500 mt-1">Pending</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-blue-500">{selectedUser.payments.length}</div>
                    <div className="text-sm text-gray-500 mt-1">Transactions</div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment History */}
              <div>
                <h4 className="mb-4">Payment History</h4>
                {selectedUser.payments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedUser.payments.map((payment) => (
                      <Card key={payment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p>{payment.plan}</p>
                              <p className="text-sm text-gray-500">Payment ID: {payment.id}</p>
                              <p className="text-xs text-gray-400">{payment.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl text-green-500">₹{payment.amount}</p>
                              <Badge className="bg-green-500 mt-1">{payment.status}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3 p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm text-gray-500">Payment Method</p>
                              <p>{payment.method}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">UTR Number</p>
                              <p>{payment.utr}</p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-2">Payment Proof</p>
                            <ImageWithFallback
                              src={payment.proof}
                              alt="Payment Proof"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={() => window.open(payment.proof, '_blank')} variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View Full
                            </Button>
                            {payment.status === 'pending' && (
                              <>
                                <Button onClick={() => verifyPayment(payment.id)} size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                                  <Check className="w-4 h-4 mr-2" />
                                  Verify
                                </Button>
                                <Button variant="destructive" size="sm" className="flex-1">
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No payment history</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Payment Modal */}
      <Dialog open={addPaymentOpen} onOpenChange={setAddPaymentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Manual Payment</DialogTitle>
            <DialogDescription>
              Manually record a payment received from a user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                placeholder="Enter User ID (e.g., USR001)"
                value={newPayment.userId}
                onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="2000"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="plan">Plan</Label>
                <Select value={newPayment.plan} onValueChange={(value) => setNewPayment({ ...newPayment, plan: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly Plan</SelectItem>
                    <SelectItem value="monthly">Monthly Plan</SelectItem>
                    <SelectItem value="security">Security Deposit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select value={newPayment.method} onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="utr">UTR/Transaction ID</Label>
                <Input
                  id="utr"
                  placeholder="UTR123456789"
                  value={newPayment.utr}
                  onChange={(e) => setNewPayment({ ...newPayment, utr: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="proof">Payment Proof (Optional)</Label>
              <Input
                id="proof"
                type="file"
                accept="image/*"
                onChange={(e) => setNewPayment({ ...newPayment, proof: e.target.files?.[0] || null })}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddPayment} className="flex-1 bg-red-500 hover:bg-red-600">
                Add Payment
              </Button>
              <Button onClick={() => setAddPaymentOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </motion.div>
    </div>
  );
};
