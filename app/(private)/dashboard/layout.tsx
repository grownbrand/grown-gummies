import { DashboardNav } from "@/components/DashboardNav";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
