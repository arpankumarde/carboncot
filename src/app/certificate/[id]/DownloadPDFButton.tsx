"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

const DownloadPDFButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    const certificateElement = document.getElementById("certificate-content");
    if (!certificateElement) {
      console.error("Certificate element not found");
      alert("Certificate element not found. Please refresh the page.");
      return;
    }

    setIsGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const html2canvasModule = await import("html2canvas");
      const html2canvas = html2canvasModule.default || html2canvasModule;

      // Import jspdf - handle different versions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let jsPDFClass: any;
      try {
        const jsPDFModule = await import("jspdf");
        // jspdf v4 uses named export { jsPDF }, v3 uses default export
        if (jsPDFModule.jsPDF) {
          jsPDFClass = jsPDFModule.jsPDF;
        } else if (jsPDFModule.default) {
          jsPDFClass = jsPDFModule.default;
        } else {
          jsPDFClass = jsPDFModule;
        }

        if (!jsPDFClass) {
          throw new Error("jsPDF class not found in module");
        }
      } catch (importError) {
        console.error("Failed to import jspdf:", importError);
        throw new Error(
          `Failed to load PDF library: ${
            importError instanceof Error ? importError.message : "Unknown error"
          }`
        );
      }

      // Wait a bit for any animations or transitions to complete
      await new Promise((resolve) => setTimeout(resolve, 200));

      console.log("Starting html2canvas conversion...");
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: true, // Enable for debugging
        backgroundColor: "#ffffff",
        width: certificateElement.scrollWidth,
        height: certificateElement.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: certificateElement.scrollWidth,
        windowHeight: certificateElement.scrollHeight,
      });

      console.log(
        "Canvas created, dimensions:",
        canvas.width,
        "x",
        canvas.height
      );
      const imgData = canvas.toDataURL("image/png", 1.0);

      if (!imgData || imgData === "data:,") {
        throw new Error("Failed to convert canvas to image data");
      }

      console.log("Creating PDF instance...");
      // Create PDF - handle both v3 and v4 syntax
      const pdf = new jsPDFClass({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      console.log("Saving PDF file...");
      pdf.save(`carbon-certificate-${Date.now()}.pdf`);
      console.log("PDF saved successfully!");
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "No stack trace"
      );
      setIsGenerating(false);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(
        `PDF generation failed: ${errorMessage}\n\nPlease check the browser console (F12) for more details.`
      );
    }
  };

  return (
    <Button
      onClick={downloadPDF}
      disabled={isGenerating}
      className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
    >
      <DownloadIcon className="w-4 h-4 mr-2" />
      {isGenerating ? "Generating PDF..." : "Download as PDF"}
    </Button>
  );
};

export default DownloadPDFButton;
