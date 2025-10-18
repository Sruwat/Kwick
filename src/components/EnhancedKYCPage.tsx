import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  ArrowLeft,
  Camera,
  User,
  Home,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import * as kycApi from "../utils/kyc";

interface KYCData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  aadhaarNumber: string;
  licenseNumber: string;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  licenseFront: File | null;
  licenseBack: File | null;
  photo: File | null;
}

interface EnhancedKYCPageProps {
  onNavigate: (page: string) => void;
}

export function EnhancedKYCPage({ onNavigate }: EnhancedKYCPageProps) {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kycData, setKycData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadhaarNumber: "",
    licenseNumber: "",
    aadhaarFront: null as File | null,
    aadhaarBack: null as File | null,
    licenseFront: null as File | null,
    licenseBack: null as File | null,
    photo: null as File | null
  } as KYCData);

  const handleFileUpload = (field: keyof KYCData, file: File | null) => {
    setKycData({ ...kycData, [field]: file });
  };

  const handleInputChange = (field: keyof KYCData, value: string) => {
    setKycData({ ...kycData, [field]: value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!kycData.fullName || !kycData.email || !kycData.phone) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (step === 2) {
      if (!kycData.address || !kycData.city || !kycData.pincode) {
        toast.error("Please fill all address fields");
        return;
      }
    } else if (step === 3) {
      if (!kycData.aadhaarNumber || !kycData.licenseNumber) {
        toast.error("Please enter both Aadhaar and License numbers");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onNavigate("dashboard");
    }
  };

  const handleSubmit = () => {
    if (!kycData.aadhaarFront || !kycData.licenseFront || !kycData.photo) {
      toast.error("Please upload all required documents");
      return;
    }

    (async () => {
      try {
        setIsSubmitting(true);
        // Build payload with both camelCase and snake_case keys so backend bindings match
        const payload = {
          // personal
          fullName: kycData.fullName,
          full_name: kycData.fullName,
          email: kycData.email,
          phone: kycData.phone,
          phone_number: kycData.phone,

          // address
          address: `${kycData.address}, ${kycData.city}, ${kycData.state} - ${kycData.pincode}`,
          street_address: kycData.address,
          city: kycData.city,
          state: kycData.state,
          pincode: kycData.pincode,

          // documents
          aadhaar: kycData.aadhaarNumber,
          aadhaar_number: kycData.aadhaarNumber,
          license: kycData.licenseNumber,
          license_number: kycData.licenseNumber,

          // misc
          location: `${kycData.city}, ${kycData.state}`,
          submitted_at: new Date().toISOString()
        } as any;

        // If files present, call public multipart upload which saves form+files and returns kycId
        const files: File[] = [];
        if (kycData.aadhaarFront) files.push(kycData.aadhaarFront);
        if (kycData.aadhaarBack) files.push(kycData.aadhaarBack);
        if (kycData.licenseFront) files.push(kycData.licenseFront);
        if (kycData.licenseBack) files.push(kycData.licenseBack);
        if (kycData.photo) files.push(kycData.photo);

        let kycId: number | null = null;
        if (files.length > 0) {
          // prefer various possible user id fields from auth context
          const detectedUserId = Number(user?.id ?? user?.userId ?? user?.user_id ?? 0) || undefined;
          const created = await kycApi.uploadKycPublic(payload, files, detectedUserId);
          kycId = created?.kycId || created?.kyc_id || null;
        } else {
          // fallback: submit JSON which returns PDF blob
          const detectedUserId = Number(user?.id ?? user?.userId ?? user?.user_id ?? 0) || undefined;
          if (detectedUserId) {
            // add both variants to payload
            payload.userId = detectedUserId;
            payload.user_id = detectedUserId;
          }
          const pdfBlob = await kycApi.submitKycJson(payload);
          // trigger download of returned PDF
          const url = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `KWICK_KYC_${kycData.fullName.replace(/\s/g, '_')}_${Date.now()}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          updateUser({ kycStatus: 'pending', name: kycData.fullName, email: kycData.email, phone: kycData.phone });
          toast.success('KYC submitted successfully! PDF downloaded.');
          setIsSubmitting(false);
          return;
        }

        // If we have a kycId, request the generated PDF and download it
        if (kycId) {
          try {
            const pdfBlob = await kycApi.downloadKycPdf(Number(kycId));
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `KWICK_KYC_${kycData.fullName.replace(/\s/g, '_')}_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            updateUser({ kycStatus: 'pending', name: kycData.fullName, email: kycData.email, phone: kycData.phone });
            toast.success('KYC submitted successfully! PDF downloaded.');
          } catch (err) {
            // PDF generation might be async on backend; still mark pending and notify user
            console.warn('PDF download failed after upload', err);
            updateUser({ kycStatus: 'pending', name: kycData.fullName, email: kycData.email, phone: kycData.phone });
            toast.success('KYC submitted successfully! PDF will be available shortly.');
          }
        } else {
          toast.success('KYC submitted successfully! Pending admin approval.');
          updateUser({ kycStatus: 'pending', name: kycData.fullName, email: kycData.email, phone: kycData.phone });
        }

      } catch (err: any) {
        console.error(err);
        toast.error('KYC submission failed: ' + (err?.message || 'unknown'));
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const downloadKYCForm = () => {
    // Generate KYC form content
    const kycContent = `
KWICK EV RENTAL - KYC VERIFICATION FORM
========================================

PERSONAL INFORMATION:
---------------------
Full Name: ${kycData.fullName}
Email: ${kycData.email}
Phone: ${kycData.phone}

ADDRESS:
--------
Street Address: ${kycData.address}
City: ${kycData.city}
State: ${kycData.state}
Pincode: ${kycData.pincode}

DOCUMENT INFORMATION:
--------------------
Aadhaar Number: ${kycData.aadhaarNumber}
License Number: ${kycData.licenseNumber}

Documents Uploaded:
- Aadhaar Front: ${kycData.aadhaarFront?.name || "Not uploaded"}
- Aadhaar Back: ${kycData.aadhaarBack?.name || "Not uploaded"}
- License Front: ${kycData.licenseFront?.name || "Not uploaded"}
- License Back: ${kycData.licenseBack?.name || "Not uploaded"}
- Photo: ${kycData.photo?.name || "Not uploaded"}

Submission Date: ${new Date().toLocaleDateString()}
Status: ${user?.kycStatus || "Pending"}

========================================
KWICK - India's #1 EV Rental Platform
Noida Sector 112 | hello@kwick.in
========================================
    `;

    // Create blob and download
    const blob = new Blob([kycContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KWICK_KYC_${kycData.fullName.replace(/\s/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("KYC form downloaded successfully!");
  };

  const renderStep = () => {
    // If user already approved, show download view
    if (user?.kycStatus === 'approved') {
      return (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>KYC Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your KYC is approved. You can download your KYC record below.</p>
              <Button onClick={() => window.open(kycApi.getKycPdfUrl(Number(user?.id)), '_blank')} className="bg-primary">Download KYC PDF</Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                </div>
              </div>

              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={kycData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={kycData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={kycData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">Address Details</h3>
                  <p className="text-sm text-muted-foreground">Where can we reach you?</p>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={kycData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="House/Flat No, Street Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={kycData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Noida"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={kycData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Uttar Pradesh"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={kycData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="201301"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">Document Information</h3>
                  <p className="text-sm text-muted-foreground">Enter your document numbers</p>
                </div>
              </div>

              <div>
                <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                <Input
                  id="aadhaar"
                  value={kycData.aadhaarNumber}
                  onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
                  placeholder="XXXX XXXX XXXX"
                  maxLength={12}
                />
              </div>

              <div>
                <Label htmlFor="license">Driving License Number *</Label>
                <Input
                  id="license"
                  value={kycData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  placeholder="DL-XXXXXXXXXX"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground">Upload clear photos of your documents</p>
                </div>
              </div>

              {/* Aadhaar Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aadhaar Card</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Front Side *</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("aadhaarFront", e.target.files?.[0] || null)}
                        className="hidden"
                        id="aadhaar-front"
                      />
                      <label
                        htmlFor="aadhaar-front"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {kycData.aadhaarFront ? kycData.aadhaarFront.name : "Click to upload"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>Back Side</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("aadhaarBack", e.target.files?.[0] || null)}
                        className="hidden"
                        id="aadhaar-back"
                      />
                      <label
                        htmlFor="aadhaar-back"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {kycData.aadhaarBack ? kycData.aadhaarBack.name : "Click to upload"}
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driving License */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Driving License</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Front Side *</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("licenseFront", e.target.files?.[0] || null)}
                        className="hidden"
                        id="license-front"
                      />
                      <label
                        htmlFor="license-front"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {kycData.licenseFront ? kycData.licenseFront.name : "Click to upload"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>Back Side</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("licenseBack", e.target.files?.[0] || null)}
                        className="hidden"
                        id="license-back"
                      />
                      <label
                        htmlFor="license-back"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {kycData.licenseBack ? kycData.licenseBack.name : "Click to upload"}
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selfie Photo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Selfie Photo *</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("photo", e.target.files?.[0] || null)}
                        className="hidden"
                        id="photo"
                      />
                      <label
                        htmlFor="photo"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Camera className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {kycData.photo ? kycData.photo.name : "Click to upload selfie"}
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // If user is not logged in, redirect to home
  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl mb-4">Please Login</h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access KYC verification.
            </p>
            <Button onClick={() => onNavigate("home")}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If KYC already submitted
  if (user?.kycStatus === "approved" || user?.kycStatus === "pending" || user?.kycStatus === "rejected") {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2">
            <CardContent className="p-8 text-center">
              {user?.kycStatus === "approved" ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl mb-4">KYC Verified!</h2>
                  <p className="text-muted-foreground mb-8">
                    Your account has been verified. You can now rent vehicles.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={downloadKYCForm} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download KYC Form
                    </Button>
                    <Button onClick={() => onNavigate("rent")} className="bg-primary">
                      Rent Vehicle Now
                    </Button>
                  </div>
                </>
              ) : user?.kycStatus === "pending" ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h2 className="text-3xl mb-4">KYC Under Review</h2>
                  <p className="text-muted-foreground mb-8">
                    Your KYC is being verified by our team. This usually takes 2-4 hours.
                  </p>
                  <Button onClick={downloadKYCForm} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download KYC Form
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h2 className="text-3xl mb-4">KYC Rejected</h2>
                  <p className="text-muted-foreground mb-8">
                    Your KYC was rejected. Please resubmit with correct documents.
                  </p>
                  <Button onClick={() => updateUser({ kycStatus: "incomplete" })}>
                    Resubmit KYC
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 p-6 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-4xl mb-2">Complete Your KYC</h1>
          <p className="text-muted-foreground">
            Verify your identity to start renting KWICK EV scooters
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= stepNum
                      ? "bg-primary border-primary text-white"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                </div>
                <span className="text-xs mt-2 text-center">
                  {stepNum === 1 && "Personal"}
                  {stepNum === 2 && "Address"}
                  {stepNum === 3 && "Documents"}
                  {stepNum === 4 && "Upload"}
                </span>
              </div>
              {stepNum < 4 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${
                    step > stepNum ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {step === 1 ? "Cancel" : "Previous"}
              </Button>

              {step < 4 ? (
                <Button onClick={handleNext} className="bg-primary">
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit KYC'}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Why KYC is Required?</h4>
                <p className="text-sm text-muted-foreground">
                  KYC verification helps us ensure the safety and security of all riders. Your information is encrypted and stored securely. Once approved, you'll be able to download your KYC form anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
