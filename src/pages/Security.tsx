import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, RefreshCw, Smartphone, Mail } from "lucide-react";

export default function Security() {
  const securityScore = 78;

  const securityChecks = [
    { name: "Email Verification", status: "complete", icon: Mail },
    { name: "Two-Factor Authentication", status: "incomplete", icon: Smartphone },
    { name: "Privacy Settings Review", status: "complete", icon: Eye },
    { name: "Connected Apps Audit", status: "warning", icon: RefreshCw },
  ];

  const privacySettings = [
    { name: "Share threat data anonymously", description: "Help protect others by sharing anonymized scam patterns", enabled: true },
    { name: "Real-time scam alerts", description: "Get instant notifications when new scam patterns emerge", enabled: true },
    { name: "Email digest", description: "Receive weekly security summary reports", enabled: false },
    { name: "Browser extension sync", description: "Sync protection across all your devices", enabled: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Security Center</h1>
          <p className="text-xs md:text-sm text-muted-foreground">Manage your account security and privacy settings</p>
        </div>

        {/* Security Score */}
        <Card className="glass-card">
          <CardContent className="py-4 md:py-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <div className="relative w-20 md:w-24 h-20 md:h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-secondary"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${securityScore * 2.51} 251`}
                    className="text-primary"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold">{securityScore}</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-base md:text-lg font-semibold">Security Score</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  Your account is well protected. Complete remaining checks to improve your score.
                </p>
                <Badge variant="cyber">Good Standing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Checklist */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Checklist
              </CardTitle>
              <CardDescription>Complete these steps to maximize your protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {securityChecks.map((check) => {
                const Icon = check.icon;
                return (
                  <div
                    key={check.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        check.status === "complete" 
                          ? "bg-safe/20 text-safe" 
                          : check.status === "warning"
                          ? "bg-warning/20 text-warning"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{check.name}</span>
                    </div>
                    {check.status === "complete" ? (
                      <CheckCircle className="w-5 h-5 text-safe" />
                    ) : check.status === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    ) : (
                      <Button size="sm" variant="cyber">Enable</Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control how your data is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {privacySettings.map((setting) => (
                <div
                  key={setting.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex-1 mr-4">
                    <p className="font-medium text-sm">{setting.name}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="glass-card border-danger/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-danger/10 border border-danger/20">
              <div>
                <p className="font-medium text-sm">Delete all scan history</p>
                <p className="text-xs text-muted-foreground">Permanently remove all analyzed documents and messages</p>
              </div>
              <Button variant="danger" size="sm">Delete</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-danger/10 border border-danger/20">
              <div>
                <p className="font-medium text-sm">Deactivate account</p>
                <p className="text-xs text-muted-foreground">Temporarily disable your ScamShield account</p>
              </div>
              <Button variant="danger" size="sm">Deactivate</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
