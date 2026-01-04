"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  // Get data from URL params
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");
  const tonnes = parseFloat(searchParams.get("tonnes") || "0");
  const beneficiaryName = searchParams.get("beneficiaryName");
  const publicMessage = searchParams.get("publicMessage") || "";
  const pricePerCredit = parseFloat(searchParams.get("pricePerCredit") || "0");
  const creditCost = parseFloat(searchParams.get("creditCost") || "0");
  const platformFee = parseFloat(searchParams.get("platformFee") || "0");
  const totalCost = parseFloat(searchParams.get("totalCost") || "0");

  // Validate required params
  useEffect(() => {
    if (!projectId || !tonnes || !beneficiaryName || !firstName || !email) {
      router.push("/projects");
    }
  }, [projectId, tonnes, beneficiaryName, firstName, email, router]);

  const fillTestData = () => {
    setPaymentData({
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "12/25",
      cvv: "123",
      cardholderName: "Test User",
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    setLoading(true);

    try {
      // Create retirement via API
      const response = await fetch("/api/retirements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          firstName,
          lastName,
          email,
          beneficiaryName,
          purpose: publicMessage || null,
          creditsRetired: tonnes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to process retirement");
        setLoading(false);
        return;
      }

      const result = await response.json();

      // Redirect to certificate page with retirement ID
      router.push(`/certificate/${result.retirement.id}`);
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!projectId || !tonnes || !beneficiaryName || !firstName || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Project:</span>
              <span className="font-semibold">{projectName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tonnes to retire:</span>
              <span className="font-semibold">{tonnes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Price per tonne:</span>
              <span className="font-semibold">
                ${pricePerCredit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Credit cost:</span>
              <span className="font-semibold">${creditCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Platform fees:</span>
              <span className="font-semibold">${platformFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Total:</span>
                <span className="font-bold text-lg">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={paymentData.cardholderName}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      cardholderName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      cardNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        expiryDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cvv: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={fillTestData}
                className="w-full"
              >
                Enter Test Details
              </Button>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue to Payment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
