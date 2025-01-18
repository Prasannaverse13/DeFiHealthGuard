import { Link } from "wouter";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Info, HelpCircle, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MenuBar() {
  return (
    <NavigationMenu className="max-w-full w-full px-4 py-2 border-b">
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <Link href="/how-it-works">
            <Button variant="ghost" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              How It Works
            </Button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/user-guide">
            <Button variant="ghost" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              User Guide
            </Button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/bitscrunch-integration">
            <Button variant="ghost" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              BitsCrunch Integration
            </Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}