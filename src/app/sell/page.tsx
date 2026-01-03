"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import standards from "@/data/standards";
import methodologies from "@/data/methodologies";

export default function SellPage() {
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [otherStandard, setOtherStandard] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    methodology: "",
  });

  const handleStandardChange = (standard: string, checked: boolean) => {
    if (checked) {
      setSelectedStandards([...selectedStandards, standard]);
    } else {
      setSelectedStandards(selectedStandards.filter((s) => s !== standard));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      ...formData,
      standards: selectedStandards,
      otherStandard: otherStandard || undefined,
    });
  };

  const hasOtherStandard = selectedStandards.includes("Other");

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Become a supplier on CarbonCot
        </h1>
        <div className="h-1 w-24 bg-green-600 mx-auto mt-4"></div>
      </div>

      <Card className="border-green-200 bg-white pt-0">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800 text-2xl pt-6">
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="border-green-300 focus:border-green-700"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="border-green-300 focus:border-green-700"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Business Email */}
            <div>
              <label
                htmlFor="businessEmail"
                className="block text-sm font-medium text-green-800 mb-1"
              >
                Business email
              </label>
              <Input
                id="businessEmail"
                type="email"
                required
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData({ ...formData, businessEmail: e.target.value })
                }
                className="border-green-300 focus:border-green-700"
                placeholder="john.doe@company.com"
              />
            </div>

            {/* Carbon Credits Section */}
            <div className="pt-6 border-t border-green-200">
              <div className="bg-green-50 -mx-6 px-6 py-4 mb-6 border-l-4 border-green-600">
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  Carbon Credits
                </h3>
              </div>

              {/* Standards Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-green-800 mb-3">
                  What carbon standards do you currently develop/trade projects
                  under?
                </label>
                <div className="space-y-3">
                  {standards.map((standard) => (
                    <div
                      key={standard}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-green-200 hover:border-green-400 transition-colors bg-white"
                    >
                      <Checkbox
                        id={`standard-${standard}`}
                        checked={selectedStandards.includes(standard)}
                        onCheckedChange={(checked) =>
                          handleStandardChange(
                            standard,
                            checked === true || checked === "indeterminate"
                          )
                        }
                        className="border-green-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
                      />
                      <label
                        htmlFor={`standard-${standard}`}
                        className="text-sm text-green-800 cursor-pointer flex-1"
                      >
                        {standard}
                      </label>
                    </div>
                  ))}
                  {/* Other option */}
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-green-200 hover:border-green-400 transition-colors bg-white">
                    <Checkbox
                      id="standard-Other"
                      checked={selectedStandards.includes("Other")}
                      onCheckedChange={(checked) =>
                        handleStandardChange(
                          "Other",
                          checked === true || checked === "indeterminate"
                        )
                      }
                      className="border-green-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
                    />
                    <label
                      htmlFor="standard-Other"
                      className="text-sm text-green-800 cursor-pointer flex-1"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </div>

              {/* Other Standard Input */}
              {hasOtherStandard && (
                <div className="mb-6">
                  <label
                    htmlFor="otherStandard"
                    className="block text-sm font-medium text-green-800 mb-1"
                  >
                    Other Applicable Carbon Standard
                  </label>
                  <p className="text-xs text-green-700 mb-2">
                    If you selected &quot;Other&quot;, please indicate which
                    carbon standard here.
                  </p>
                  <Input
                    id="otherStandard"
                    type="text"
                    value={otherStandard}
                    onChange={(e) => setOtherStandard(e.target.value)}
                    className="border-green-300 focus:border-green-700"
                    placeholder="Enter carbon standard name"
                  />
                </div>
              )}

              {/* Methodology Selection */}
              <div>
                <label
                  htmlFor="methodology"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Methodology
                </label>
                <Select
                  value={formData.methodology}
                  onValueChange={(value) =>
                    setFormData({ ...formData, methodology: value })
                  }
                >
                  <SelectTrigger
                    id="methodology"
                    className="w-full border-green-300 focus:border-green-700"
                  >
                    <SelectValue placeholder="Select a methodology" />
                  </SelectTrigger>
                  <SelectContent>
                    {methodologies.map((methodology) => (
                      <SelectItem
                        key={methodology.id}
                        value={methodology.id}
                        className="focus:bg-green-50"
                      >
                        {methodology.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-green-200">
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white py-6 text-lg font-semibold"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
