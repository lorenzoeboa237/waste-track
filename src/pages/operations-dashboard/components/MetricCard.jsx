import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'error':
        return 'bg-error/10 text-error';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-5 transition-smooth hover:shadow-elevation-3 hover:border-primary/20">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={22} color="currentColor" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} color="currentColor" />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;