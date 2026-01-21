import {
  Home,
  User,
  Grid3X3,
  Folder,
  Quote,
  Mail,
  Timer,
  Book,
  Settings,
  TrendingUp,
  Cog,
  FileText,
  Users,
  Microscope,
  BarChart3,
  Search,
  Network,
  Linkedin,
  MapPin,
  Route,
  Bolt,
  type LucideIcon,
} from "lucide-react";

/**
 * Central icon registry
 * Add new icons here ONCE and use them everywhere via string keys
 */
export const ICON_REGISTRY = {
  home: Home,
  user: User,
  grid: Grid3X3,
  folder: Folder,
  quote: Quote,
  email: Mail,
  timeline: Timer,
  book: Book,
  settings: Settings,
  trendingUp: TrendingUp,
  cog: Cog,
  fileText: FileText,
  users: Users,
  microscope: Microscope,
  barChart3: BarChart3,
  search: Search,
  network: Network,
  linkedin: Linkedin,
  mapPin: MapPin,
  route: Route,
  bolt: Bolt,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICON_REGISTRY;

/**
 * Safe icon resolver
 * Always returns a valid Lucide icon
 */
export function getIcon(key: string): LucideIcon {
  return ICON_REGISTRY[key as IconKey] ?? Grid3X3;
}
