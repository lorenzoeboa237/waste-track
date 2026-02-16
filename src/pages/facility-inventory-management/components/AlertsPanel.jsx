import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts, onAlertAction }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'medium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'low':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'capacity':
        return { name: 'AlertTriangle', color: 'var(--color-error)' };
      case 'maintenance':
        return { name: 'Wrench', color: 'var(--color-warning)' };
      case 'inventory':
        return { name: 'Package', color: 'var(--color-accent)' };
      case 'compliance':
        return { name: 'FileText', color: 'var(--color-primary)' };
      case 'safety':
        return { name: 'Shield', color: 'var(--color-error)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
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
      {alerts?.map((alert) => {
        const icon = getAlertIcon(alert?.type);
        return (
          <div
            key={alert?.id}
            className="bg-card rounded-lg p-3 md:p-4 shadow-elevation-1 border border-border hover:shadow-elevation-2 transition-smooth"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: `${icon?.color}15` }}
              >
                <Icon name={icon?.name} size={18} color={icon?.color} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h5 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
                    {alert?.title}
                  </h5>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border flex-shrink-0 ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                  {alert?.description}
                </p>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                    <span className="truncate">{alert?.location}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTime(alert?.timestamp)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onAlertAction('view', alert?.id)}
                  >
                    View Details
                  </Button>
                  {alert?.actionable && (
                    <Button
                      variant="default"
                      size="xs"
                      onClick={() => onAlertAction('resolve', alert?.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertsPanel;