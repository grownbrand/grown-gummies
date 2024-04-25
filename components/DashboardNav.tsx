import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const dashLinks = [
  { icon: Home, label: "Dashboard", active: true, href: "/dashboard" },
  {
    icon: ShoppingCart,
    label: "Orders",
    active: false,
    href: "/dashboard/orders",
  },
  {
    icon: Package,
    label: "Products",
    active: false,
    href: "/dashboard/products",
  },
  {
    icon: Users2,
    label: "Customers",
    active: false,
    href: "/dashboard/customers",
  },
  {
    icon: LineChart,
    label: "Analytics",
    active: false,
    href: "/dashboard/analytics",
  },
];

export function DashboardNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Grown Gummies logo</span>
        </div>
        {dashLinks.map((link) => (
          <Tooltip key={link.label}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  link.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{link.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
