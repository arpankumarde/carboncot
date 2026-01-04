"use client";

import { useState } from "react";
import { Project } from "@/generated/prisma/client";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const AnalyseRequirement = ({ project }: { project: Project }) => {
  const [businessInfo, setBusinessInfo] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!businessInfo.trim()) {
      setError("Please enter your business information");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch(
        `/api/projects/${project.id}/analyze-match`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ businessInfo: businessInfo.trim() }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate analysis");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze Match</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Enter your business information to see if this project is a good match
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your business information, industry, sustainability goals, carbon footprint, or any relevant details..."
          value={businessInfo}
          onChange={(e) => setBusinessInfo(e.target.value)}
          className="min-h-32 resize-none"
          disabled={loading}
        />

        <Button
          onClick={handleAnalyze}
          disabled={loading || !businessInfo.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Match...
            </>
          ) : (
            "Analyze Match"
          )}
        </Button>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        {analysis && (
          <div className="prose prose-slate max-w-none bg-slate-50 border border-slate-200 rounded-lg p-4">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyseRequirement;
