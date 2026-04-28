import {
  Flame, Wind, Sparkles, Leaf, Droplet, Circle, Hexagon, BookOpen, Package,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Flame, Wind, Sparkles, Leaf, Droplet, Circle, Hexagon, BookOpen, Package,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Package;
  return <Icon className={className} />;
}
