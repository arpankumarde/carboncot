"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InfoIcon, FileTextIcon, ChevronDownIcon, CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RetirementFormProps {
  projectId: string;
  projectName: string;
  pricePerCredit: number;
  availableTonnes: number;
}

export default function RetirementForm({
  projectId,
  projectName,
  pricePerCredit,
  availableTonnes,
}: RetirementFormProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tonnes, setTonnes] = useState<string>("");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("");
  const [publicMessage, setPublicMessage] = useState<string>("");
  const [isAfterExpanded, setIsAfterExpanded] = useState(true);

  // Calculate prices
  const tonnesNum = parseFloat(tonnes) || 0;
  const creditCost = tonnesNum * pricePerCredit;
  const platformFeePerTon = 1;
  const platformFeeFlat = 5;
  const platformFee = tonnesNum * platformFeePerTon + platformFeeFlat;
  const totalCost = creditCost + platformFee;

  // Update price display in sidebar
  useEffect(() => {
    const amountDisplay = document.getElementById("amount-display");
    const platformFeesDisplay = document.getElementById("platform-fees");
    const totalCostDisplay = document.getElementById("total-cost");

    if (amountDisplay) {
      amountDisplay.textContent = `${tonnesNum.toLocaleString()} tonne${tonnesNum !== 1 ? "s" : ""}`;
    }

    if (platformFeesDisplay) {
      platformFeesDisplay.textContent = `$${platformFee.toFixed(2)}`;
    }

    if (totalCostDisplay) {
      totalCostDisplay.textContent = `$${totalCost.toFixed(2)}`;
    }
  }, [tonnesNum, platformFee, totalCost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tonnes || tonnesNum <= 0) {
      alert("Please enter a valid number of tonnes to retire.");
      return;
    }

    if (tonnesNum > availableTonnes) {
      alert(
        `You cannot retire more than ${availableTonnes.toLocaleString()} tonnes.`
      );
      return;
    }

    if (!firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!beneficiaryName.trim()) {
      alert("Please enter a beneficiary name.");
      return;
    }

    // Build URL params for payment page
    const params = new URLSearchParams({
      projectId,
      projectName,
      firstName: firstName.trim(),
      lastName: lastName.trim() || "",
      email: email.trim(),
      tonnes: tonnesNum.toString(),
      beneficiaryName: beneficiaryName.trim(),
      publicMessage: publicMessage.trim() || "",
      pricePerCredit: pricePerCredit.toString(),
      creditCost: creditCost.toFixed(2),
      platformFee: platformFee.toFixed(2),
      totalCost: totalCost.toFixed(2),
    });

    // Redirect to payment page with all data in params
    router.push(`/retire/payment?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Retirement Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5 text-slate-600" />
            <CardTitle>Retirement Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Information */}
          <div className="space-y-4 pb-4 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <div className="mt-2">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Tonnes Input */}
          <div>
            <Label htmlFor="tonnes" className="text-sm font-medium">
              How many tonnes of carbon would you like to retire?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2">
              <div className="text-xs text-slate-500 mb-2">
                Available: {availableTonnes.toLocaleString()}
              </div>
              <Input
                id="tonnes"
                type="number"
                min="0"
                max={availableTonnes}
                step="0.01"
                placeholder="Tonnes"
                value={tonnes}
                onChange={(e) => setTonnes(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Beneficiary Name */}
          <div>
            <Label htmlFor="beneficiary" className="text-sm font-medium">
              Who will this retirement be credited to?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2">
              <Input
                id="beneficiary"
                type="text"
                placeholder="Beneficiary name"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Public Message */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              Public message
            </Label>
            <div className="mt-2 relative">
              <Textarea
                id="message"
                placeholder="personal trip, business activity, or sustainability milestone (e.g. 'family summer vacation trip' or 'Q1 2025 emissions - EU operations')"
                value={publicMessage}
                onChange={(e) => setPublicMessage(e.target.value)}
                rows={4}
                className="w-full pr-10"
              />
              <div className="absolute bottom-2 right-2">
                <FileTextIcon className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="mt-2 flex items-start gap-2 text-xs text-slate-600">
              <InfoIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>
                This message is permanent and public. Don&apos;t include
                personal information.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
      >
        Continue to Payment
      </Button>

      {/* What happens after section */}
      <Collapsible open={isAfterExpanded} onOpenChange={setIsAfterExpanded}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between hover:bg-slate-50 transition-colors">
              <CardTitle>What happens after I click RETIRE CARBON?</CardTitle>
              <ChevronDownIcon
                className={`w-5 h-5 text-slate-600 transition-transform ${
                  isAfterExpanded ? "rotate-180" : ""
                }`}
              />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-slate-700">
                  Enter your payment information, complete the secure payment
                  transaction, and your retirement will be recorded on-chain.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-slate-700">
                  You&apos;ll get a digital certificate and a downloadable
                  certificate (PDF).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-slate-700">
                  The credits are permanently removed from circulation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-slate-700">
                  Your impact will be visible, traceable and auditable by third
                  parties via our tooling.
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </form>
  );
}

