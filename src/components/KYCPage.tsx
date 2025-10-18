import { motion } from "motion/react";
import { Upload, CheckCircle, XCircle, Clock, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";

export function KYCPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-foreground mb-2">KYC Verification</h2>
          <p className="text-muted-foreground">Complete your verification to start renting</p>
        </div>
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-4 md:mt-0 w-fit">
          <CheckCircle className="w-4 h-4 mr-2" />
          Verified
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Rahul Sharma" defaultValue="Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="rahul@example.com" defaultValue="rahul@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" defaultValue="1995-06-15" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea 
                  placeholder="Complete address" 
                  defaultValue="123 MG Road, Connaught Place, New Delhi - 110001"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="New Delhi" defaultValue="New Delhi" />
                </div>
                <div className="space-y-2">
                  <Label>PIN Code</Label>
                  <Input placeholder="110001" defaultValue="110001" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alternate Contact Number</Label>
                <Input placeholder="+91 98765 43211" defaultValue="+91 98765 43211" />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="space-y-3">
                <Label>Profile Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG (max. 2MB)</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>profile_photo.jpg uploaded</span>
                </div>
              </div>

              {/* Aadhar Card */}
              <div className="space-y-3">
                <Label>Aadhar Card (Front & Back)</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Front Side</p>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Back Side</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Both sides uploaded successfully</span>
                </div>
              </div>

              {/* PAN Card */}
              <div className="space-y-3">
                <Label>PAN Card</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Click to upload PAN Card</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, PDF (max. 2MB)</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>pan_card.pdf uploaded</span>
                </div>
              </div>

              {/* Driving License */}
              <div className="space-y-3">
                <Label>Driving License (Front & Back)</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Front Side</p>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Back Side</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Both sides uploaded successfully</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input placeholder="HDFC Bank" defaultValue="HDFC Bank" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input placeholder="xxxx xxxx xxxx 1234" defaultValue="xxxx xxxx xxxx 1234" />
                </div>
                <div className="space-y-2">
                  <Label>IFSC Code</Label>
                  <Input placeholder="HDFC0001234" defaultValue="HDFC0001234" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input placeholder="Rahul Sharma" defaultValue="Rahul Sharma" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Verification Status */}
          <Card className="border-green-500/50 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Approved</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verified On</span>
                <span className="text-foreground">Oct 6, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verified By</span>
                <span className="text-foreground">Admin Team</span>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download KYC PDF
              </Button>
            </CardContent>
          </Card>

          {/* Document Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Document Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Profile Photo", status: "approved" },
                { name: "Aadhar Card", status: "approved" },
                { name: "PAN Card", status: "approved" },
                { name: "Driving License", status: "approved" },
                { name: "Bank Details", status: "approved" }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-foreground">{doc.name}</span>
                  {doc.status === "approved" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {doc.status === "pending" && (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  {doc.status === "rejected" && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="bg-muted">
            <CardContent className="p-6">
              <h4 className="text-foreground mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                If you're facing any issues with your KYC verification, our support team is here to help.
              </p>
              <Button variant="outline" className="w-full" size="sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
