import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Palette, Globe, Download } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
          <p className="text-xs md:text-sm text-muted-foreground">Manage your account preferences and configuration</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4 md:space-y-6">
          <TabsList className="glass-card p-1 flex flex-wrap gap-1 h-auto">
            <TabsTrigger value="profile" className="gap-1 md:gap-2 text-xs md:text-sm">
              <User className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1 md:gap-2 text-xs md:text-sm">
              <Bell className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-1 md:gap-2 text-xs md:text-sm">
              <Palette className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-1 md:gap-2 text-xs md:text-sm">
              <Globe className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-secondary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="New York, USA" className="bg-secondary/30" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="cyber">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how and when you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Critical threat alerts", description: "Immediate notifications for high-risk scams", enabled: true },
                  { name: "Weekly security digest", description: "Summary of threats and tips every Monday", enabled: true },
                  { name: "New scam pattern alerts", description: "Updates when new scam types are detected", enabled: false },
                  { name: "Community reports", description: "Notifications about scams reported by others", enabled: false },
                  { name: "Product updates", description: "New features and improvements", enabled: true },
                ].map((notification) => (
                  <div
                    key={notification.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                  >
                    <div>
                      <p className="font-medium">{notification.name}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Switch defaultChecked={notification.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of ScamShield</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {["Dark", "Light", "System"].map((theme) => (
                      <button
                        key={theme}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === "Dark"
                            ? "border-primary bg-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium">{theme}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Accent Color</Label>
                  <div className="flex gap-3">
                    {["#22d3ee", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-2 ${
                          color === "#22d3ee" ? "border-white" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage integrations with external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Email Scanner", description: "Automatically scan incoming emails", connected: true, icon: "📧" },
                  { name: "WhatsApp Monitor", description: "Analyze WhatsApp messages for scams", connected: false, icon: "💬" },
                  { name: "Browser Extension", description: "Real-time protection while browsing", connected: true, icon: "🌐" },
                  { name: "LinkedIn Shield", description: "Verify recruiters on LinkedIn", connected: false, icon: "💼" },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <Button variant={integration.connected ? "outline" : "cyber"} size="sm">
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Export */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Data Export
                </CardTitle>
                <CardDescription>Download a copy of your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Export all your scan history, reports, and settings</p>
                    <p className="text-xs text-muted-foreground mt-1">Last export: Never</p>
                  </div>
                  <Button variant="outline">Request Export</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
