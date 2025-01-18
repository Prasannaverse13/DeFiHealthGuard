import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MenuBar } from "./MenuBar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <MenuBar />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}