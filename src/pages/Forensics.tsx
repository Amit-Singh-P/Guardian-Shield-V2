import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, AlertTriangle, CheckCircle, Clock, FileWarning, Search } from "lucide-react";
import { useState } from "react";

interface DocumentAnalysis {
  id: string;
  fileName: string;
  status: "safe" | "suspicious" | "dangerous";
  uploadedAt: string;
  findings: string[];
  riskScore: number;
}

const mockAnalyses: DocumentAnalysis[] = [
  {
    id: "1",
    fileName: "offer_letter_techcorp.pdf",
    status: "dangerous",
    uploadedAt: "2 hours ago",
    findings: ["Metadata stripped", "Non-standard fonts", "Suspicious links detected"],
    riskScore: 87,
  },
  {
    id: "2",
    fileName: "employment_contract.docx",
    status: "suspicious",
    uploadedAt: "5 hours ago",
    findings: ["Modified after creation", "Generic company template"],
    riskScore: 45,
  },
  {
    id: "3",
    fileName: "google_internship.pdf",
    status: "safe",
    uploadedAt: "1 day ago",
    findings: ["Valid digital signature", "Authentic metadata"],
    riskScore: 8,
  },
];

export default function Forensics() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentAnalysis | null>(null);

  const getStatusConfig = (status: DocumentAnalysis["status"]) => {
    switch (status) {
      case "dangerous":
        return { badge: "danger" as const, icon: AlertTriangle, color: "text-danger" };
      case "suspicious":
        return { badge: "warning" as const, icon: FileWarning, color: "text-warning" };
      case "safe":
        return { badge: "safe" as const, icon: CheckCircle, color: "text-safe" };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Document Forensics</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Analyze offer letters, contracts, and documents for scam indicators</p>
          </div>
          <Button variant="cyber" size="sm" className="gap-2 self-start sm:self-auto">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Document</span>
            <span className="sm:hidden">Upload</span>
          </Button>
        </div>

        {/* Upload Zone */}
        <Card className="glass-card border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
            <div className="p-3 md:p-4 rounded-full bg-primary/20 mb-3 md:mb-4">
              <FileText className="w-6 md:w-8 h-6 md:h-8 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">Drop documents here</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 text-center px-4">
              PDF, DOCX, or images of offer letters and contracts
            </p>
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Analyses */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Recent Analyses
              </CardTitle>
              <CardDescription>Documents you've analyzed for authenticity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAnalyses.map((doc) => {
                const config = getStatusConfig(doc.status);
                const Icon = config.icon;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-4 rounded-lg bg-secondary/30 border border-border/50 cursor-pointer transition-all hover:bg-secondary/50 ${
                      selectedDoc?.id === doc.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-secondary ${config.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.fileName}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3" />
                            {doc.uploadedAt}
                          </div>
                        </div>
                      </div>
                      <Badge variant={config.badge}>{doc.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Analysis Details */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Analysis Details</CardTitle>
              <CardDescription>
                {selectedDoc ? selectedDoc.fileName : "Select a document to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDoc ? (
                <div className="space-y-6">
                  {/* Risk Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Risk Score</span>
                      <span className="text-2xl font-bold">{selectedDoc.riskScore}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          selectedDoc.riskScore > 70
                            ? "bg-danger"
                            : selectedDoc.riskScore > 40
                            ? "bg-warning"
                            : "bg-safe"
                        }`}
                        style={{ width: `${selectedDoc.riskScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Findings */}
                  <div>
                    <h4 className="font-medium mb-3">Forensic Findings</h4>
                    <div className="space-y-2">
                      {selectedDoc.findings.map((finding, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30"
                        >
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span className="text-sm">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="cyber" className="flex-1">
                      Full Report
                    </Button>
                    <Button variant="danger" className="flex-1">
                      Report Scam
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mb-4 opacity-50" />
                  <p>Select a document to view analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
