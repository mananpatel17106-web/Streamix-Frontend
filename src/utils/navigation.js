import {
  Home,
  History,
  ListVideo,
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Home",
    icon: Home,
    path: "/",
  },
  {
    title: "Subscriptions",
    icon: Users,
    path: "/subscriptions",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Playlist",
    icon: ListVideo,
    path: "/playlist",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];