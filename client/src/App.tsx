import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/dashboard";
import NftValidation from "@/pages/nft-validation";
import Analytics from "@/pages/analytics";
import Alerts from "@/pages/alerts";
import HowItWorks from "@/pages/how-it-works";
import UserGuide from "@/pages/user-guide";
import BitsCrunchIntegration from "@/pages/bitscrunch-integration";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/nft-validation" component={NftValidation} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/user-guide" component={UserGuide} />
      <Route path="/bitscrunch-integration" component={BitsCrunchIntegration} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;