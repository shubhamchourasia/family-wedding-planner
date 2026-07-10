import {
  CalendarDays,
  ClipboardList,
  HandCoins,
  Home,
  Settings,
  Users,
  Building2,
  CheckSquare,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Guests",
    href: "/guests",
    icon: Users,
  },
  {
    title: "Budget",
    href: "/budget",
    icon: HandCoins,
  },
  {
    title: "Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    title: "Vendors",
    href: "/vendors",
    icon: Building2,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];