"use client";

import { useState } from "react";
import { Project } from "@/generated/prisma/client";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const SummarizeProject = ({ project }: { project: Project }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch(`/api/projects/${project.id}/summarize`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate summary");
      }

      const data = await response.json();
      setSummary(data.summary);
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
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Summarizing with AI...
              </>
            ) : (
              "Summarize with AI"
            )}
          </Button>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          {summary && (
            <div className="prose prose-slate max-w-none bg-slate-50 border border-slate-200 rounded-lg p-4">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarizeProject;
