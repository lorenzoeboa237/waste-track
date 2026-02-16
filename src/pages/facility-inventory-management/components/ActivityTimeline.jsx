import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'intake':
        return { name: 'ArrowDownCircle', color: 'var(--color-success)' };
      case 'disposal':
        return { name: 'ArrowUpCircle', color: 'var(--color-primary)' };
      case 'maintenance':
        return { name: 'Wrench', color: 'var(--color-warning)' };
      case 'alert':
        return { name: 'AlertTriangle', color: 'var(--color-error)' };
      case 'transfer':
        return { name: 'ArrowRightLeft', color: 'var(--color-accent)' };
      default:
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {activities?.map((activity, index) => {
        const icon = getActivityIcon(activity?.type);
        return (
          <div key={activity?.id} className="flex gap-3 md:gap-4">
            <div className="flex flex-col items-center">
              <div
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted/50 flex-shrink-0"
                style={{ backgroundColor: `${icon?.color}15` }}
              >
                <Icon name={icon?.name} size={16} color={icon?.color} />
              </div>
              {index < activities?.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" style={{ minHeight: '20px' }} />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-3 md:pb-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h5 className="text-sm md:text-base font-medium text-foreground">
                  {activity?.title}
                </h5>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTime(activity?.timestamp)}
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1 line-clamp-2">
                {activity?.description}
              </p>
              {activity?.user && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon name="User" size={12} color="var(--color-muted-foreground)" />
                  <span>{activity?.user}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;