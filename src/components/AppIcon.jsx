import React from 'react';
import {
  Route,
  Clock,
  Trash2,
  AlertTriangle,
  LayoutDashboard,
  Recycle,
  User,
  Truck,
  Users,
  Building2,
  ChevronUp,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  Map,
  List,
  Link,
  MapPin,
  Weight,
  AlertCircle,
  Phone,
  MoreVertical,
  Download,
  RefreshCw,
  ArrowUpDown,
  Maximize2,
  SlidersHorizontal,
  Filter,
  ChevronRight,
  Bell,
  Eye,
  Edit,
  Home,
  ArrowLeft,
  Navigation,
  Plus,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Package,
  RotateCcw,
  TrendingUp,
  History,
  Keyboard,
  Pencil,
  Minus,
  TrendingDown,
} from 'lucide-react';

const iconMap = {
  Route,
  Clock,
  Trash2,
  AlertTriangle,
  LayoutDashboard,
  Recycle,
  User,
  Truck,
  Users,
  Building2,
  ChevronUp,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  Map,
  List,
  Link,
  MapPin,
  Weight,
  AlertCircle,
  Phone,
  MoreVertical,
  Download,
  RefreshCw,
  ArrowUpDown,
  Maximize2,
  SlidersHorizontal,
  Filter,
  ChevronRight,
  Bell,
  Eye,
  Edit,
  Edit2: Pencil,
  Home,
  ArrowLeft,
  Navigation,
  Plus,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Package,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  History,
  Keyboard,
  Minus,
};

const AppIcon = ({ name, size = 20, color = 'currentColor', className = '' }) => {
  const IconComponent = name ? iconMap[name] : null;
  if (!IconComponent) {
    return (
      <span
        className={`inline-flex items-center justify-center flex-shrink-0 rounded bg-muted ${className}`}
        style={{ width: size, height: size, color, fontSize: Math.max(10, size - 6) }}
        aria-hidden
        title={name}
      >
        {name ? String(name).charAt(0).toUpperCase() : '?'}
      </span>
    );
  }
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={2}
      className={`flex-shrink-0 ${className}`}
      aria-hidden
    />
  );
};

export default AppIcon;
