import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell } from "lucide-react";
import { Alert as AlertType } from "@/types/protocol";

export default function Alerts() {
  const { data: alerts, isLoading } = useQuery<AlertType[]>({
    queryKey: ["/api/alerts"],
  });

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Alerts
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {alerts?.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.severity === 'HIGH' ? 'text-red-500' :
                      alert.severity === 'MEDIUM' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium">{alert.type}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
