"use client";

import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";

const PrintButton = () => {
  return (
    <Button
      onClick={() => window.print()}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <PrinterIcon className="w-4 h-4 mr-2" />
      Print Certificate
    </Button>
  );
};

export default PrintButton;
