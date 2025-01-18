import { Home, Shield, LineChart, Bell } from "lucide-react";
import { Link, useLocation } from "wouter";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "NFT Validation", href: "/nft-validation", icon: Shield },
  { name: "Protocol Analytics", href: "/analytics", icon: LineChart },
  { name: "Alerts", href: "/alerts", icon: Bell },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-sidebar-foreground">DeFi Health Monitor</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <a
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                            ${isActive 
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                            }
                          `}
                        >
                          <Icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
