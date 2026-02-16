import React from 'react';
import Icon from '../../../components/AppIcon';

const CapacityGauge = ({ wasteType, current, capacity, unit, trend, predictedFull }) => {
  const percentage = Math.round((current / capacity) * 100);

  const getStatusColor = () => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusTextColor = () => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return { name: 'TrendingUp', color: 'var(--color-error)' };
    if (trend === 'down') return { name: 'TrendingDown', color: 'var(--color-success)' };
    return { name: 'Minus', color: 'var(--color-muted-foreground)' };
  };

  const trendIcon = getTrendIcon();

  return (
    <div className="bg-card rounded-lg p-4 md:p-5 lg:p-6 shadow-elevation-1 border border-border">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 truncate">
            {wasteType}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-muted-foreground">
              {current?.toLocaleString()} / {capacity?.toLocaleString()} {unit}
            </span>
            <Icon name={trendIcon?.name} size={14} color={trendIcon?.color} />
          </div>
        </div>
        <div className={`text-xl md:text-2xl font-bold ${getStatusTextColor()}`}>
          {percentage}%
        </div>
      </div>
      <div className="relative w-full h-3 md:h-4 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className={`absolute left-0 top-0 h-full ${getStatusColor()} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {predictedFull && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
          <span>Predicted full: {predictedFull}</span>
        </div>
      )}
    </div>
  );
};

export default CapacityGauge;