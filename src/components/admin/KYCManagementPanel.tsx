import React, { useState } from 'react';
import { Search, Download, Check, X, Eye, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { AdminSidebar } from './AdminSidebar';
import { motion } from 'motion/react';

const mockKYCApplications = [
  {
    id: 'USR001',
    name: 'Raj Kumar',
    email: 'raj.kumar@email.com',
    phone: '+91 98765 43210',
    status: 'pending',
    submitted: '1/20/2024',
    documents: {
      aadhar: { url: 'https://images.unsplash.com/photo-1758928807847-ed94f9ed3cad?w=400', status: 'pending' },
      pan: { url: 'https://images.unsplash.com/photo-1758928807847-ed94f9ed3cad?w=400', status: 'pending' },
      dl: { url: 'https://images.unsplash.com/photo-1758928807847-ed94f9ed3cad?w=400', status: 'pending' },
      photo: 'https://images.unsplash.com/photo-1758928807847-ed94f9ed3cad?w=200',
    },
    personalInfo: {
      fullName: 'Raj Kumar',
      dob: '15/03/1995',
      address: 'Sector 112, Noida, Uttar Pradesh',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
    },
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      ifsc: 'HDFC0001234',
      accountHolder: 'Raj Kumar',
    },
    documentCount: 3,
  },
];

interface KYCManagementPanelProps {
  onNavigate?: (page: string) => void;
}

export const KYCManagementPanel: React.FC<KYCManagementPanelProps> = ({ onNavigate }) => {
  const [selectedApplication, setSelectedApplication] = useState(mockKYCApplications[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documentStatuses, setDocumentStatuses] = useState({
    aadhar: 'pending',
    pan: 'pending',
    dl: 'pending',
  });

  const exportData = (format: 'pdf' | 'excel') => {
    alert(`Exporting KYC data as ${format.toUpperCase()}...`);
  };

  const approveDocument = (docType: string) => {
    setDocumentStatuses({ ...documentStatuses, [docType]: 'approved' });
  };

  const rejectDocument = (docType: string) => {
    setDocumentStatuses({ ...documentStatuses, [docType]: 'rejected' });
  };

  const approveAll = () => {
    alert('All documents approved for ' + selectedApplication.name);
    setDocumentStatuses({ aadhar: 'approved', pan: 'approved', dl: 'approved' });
  };

  const rejectAll = () => {
    if (confirm('Are you sure you want to reject this KYC application?')) {
      alert('KYC application rejected');
    }
  };

  const downloadKYCPDF = () => {
    alert('Downloading KYC PDF for ' + selectedApplication.name);
  };

  const stats = [
    { label: 'Total Applications', value: '1', color: 'text-blue-500' },
    { label: 'Pending', value: '1', color: 'text-yellow-500' },
    { label: 'Approved', value: '0', color: 'text-green-500' },
    { label: 'Rejected', value: '0', color: 'text-red-500' },
    { label: 'Incomplete', value: '0', color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar currentPage="admin-kyc" onNavigate={onNavigate} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 p-6 space-y-6 min-h-screen"
        style={{ marginLeft: 'var(--admin-sidebar-width, 280px)', transition: 'margin-left 0.3s' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">KYC Management</h2>
          <p className="text-gray-500">Review and verify user identity documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            हिंदी
          </Button>
          <Button onClick={() => exportData('pdf')} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
        {/* Left Sidebar - Applications List */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Application Cards */}
          <div className="space-y-2">
            {mockKYCApplications.map((app) => (
              <Card
                key={app.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedApplication.id === app.id ? 'ring-2 ring-red-500 bg-red-50' : ''
                }`}
                onClick={() => setSelectedApplication(app)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p>{app.name}</p>
                      <p className="text-sm text-gray-500">{app.email}</p>
                      <p className="text-xs text-gray-400">{app.phone}</p>
                      <p className="text-xs text-gray-400 mt-1">Submitted: {app.submitted}</p>
                    </div>
                    <Badge
                      variant={app.status === 'pending' ? 'default' : 'secondary'}
                      className={app.status === 'pending' ? 'bg-yellow-500' : ''}
                    >
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{app.documentCount} docs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - Application Details */}
        <div className="lg:col-span-8">
          <Card>
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl">{selectedApplication.name}</h3>
                  <p className="text-gray-500">KYC Application ID: {selectedApplication.id}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-yellow-500">{selectedApplication.status}</Badge>
                    <p className="text-sm text-gray-500">Submitted: {selectedApplication.submitted}</p>
                  </div>
                </div>
                <Button onClick={downloadKYCPDF} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedApplication.phone}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p>{selectedApplication.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p>{selectedApplication.personalInfo.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p>{selectedApplication.personalInfo.city}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{selectedApplication.personalInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pincode</p>
                    <p>{selectedApplication.personalInfo.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="mb-6">
                <h4 className="mb-3">Bank Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Bank Name</p>
                    <p>{selectedApplication.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p>{selectedApplication.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IFSC Code</p>
                    <p>{selectedApplication.bankDetails.ifsc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Holder</p>
                    <p>{selectedApplication.bankDetails.accountHolder}</p>
                  </div>
                </div>
              </div>

              {/* Submitted Documents */}
              <div>
                <h4 className="mb-3">Submitted Documents</h4>
                <p className="text-sm text-gray-500 mb-4">Review each document carefully before approval</p>

                <div className="space-y-4">
                  {/* Aadhar Card */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p>Aadhar Card</p>
                          <p className="text-sm text-gray-500">Uploaded: {selectedApplication.submitted}</p>
                        </div>
                        <Badge className={documentStatuses.aadhar === 'approved' ? 'bg-green-500' : documentStatuses.aadhar === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}>
                          {documentStatuses.aadhar}
                        </Badge>
                      </div>
                      <ImageWithFallback
                        src={selectedApplication.documents.aadhar.url}
                        alt="Aadhar Card"
                        className="w-full h-64 object-cover rounded-lg mb-3"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => window.open(selectedApplication.documents.aadhar.url, '_blank')} variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button onClick={() => approveDocument('aadhar')} size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button onClick={() => rejectDocument('aadhar')} variant="destructive" size="sm" className="flex-1">
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PAN Card */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p>PAN Card</p>
                          <p className="text-sm text-gray-500">Uploaded: {selectedApplication.submitted}</p>
                        </div>
                        <Badge className={documentStatuses.pan === 'approved' ? 'bg-green-500' : documentStatuses.pan === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}>
                          {documentStatuses.pan}
                        </Badge>
                      </div>
                      <ImageWithFallback
                        src={selectedApplication.documents.pan.url}
                        alt="PAN Card"
                        className="w-full h-64 object-cover rounded-lg mb-3"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => window.open(selectedApplication.documents.pan.url, '_blank')} variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button onClick={() => approveDocument('pan')} size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button onClick={() => rejectDocument('pan')} variant="destructive" size="sm" className="flex-1">
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Driving License */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p>Driving License</p>
                          <p className="text-sm text-gray-500">Uploaded: {selectedApplication.submitted}</p>
                        </div>
                        <Badge className={documentStatuses.dl === 'approved' ? 'bg-green-500' : documentStatuses.dl === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}>
                          {documentStatuses.dl}
                        </Badge>
                      </div>
                      <ImageWithFallback
                        src={selectedApplication.documents.dl.url}
                        alt="Driving License"
                        className="w-full h-64 object-cover rounded-lg mb-3"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => window.open(selectedApplication.documents.dl.url, '_blank')} variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button onClick={() => approveDocument('dl')} size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button onClick={() => rejectDocument('dl')} variant="destructive" size="sm" className="flex-1">
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Final Actions */}
                <div className="flex gap-3 mt-6">
                  <Button onClick={approveAll} className="flex-1 bg-green-500 hover:bg-green-600">
                    <Check className="w-4 h-4 mr-2" />
                    Approve All & Complete KYC
                  </Button>
                  <Button onClick={rejectAll} variant="destructive" className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </motion.div>
    </div>
  );
};
