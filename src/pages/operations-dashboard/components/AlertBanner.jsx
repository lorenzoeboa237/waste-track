import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertBanner = ({ alerts }) => {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error/10 border-error text-error';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning';
      case 'info':
        return 'bg-primary/10 border-primary text-primary';
      default:
        return 'bg-muted border-border text-foreground';
    }
  };

  if (!alerts || alerts?.length === 0) return null;

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="Bell" size={18} color="var(--color-foreground)" />
        <h3 className="text-sm md:text-base font-semibold text-foreground">Active Alerts</h3>
        <span className="ml-auto text-xs font-caption bg-error text-error-foreground px-2 py-0.5 rounded-full">
          {alerts?.length}
        </span>
      </div>
      <div className="space-y-2 max-h-20 overflow-y-auto scrollbar-custom">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`flex items-start gap-2 p-2 rounded-md border transition-smooth ${getAlertColor(alert?.severity)}`}
          >
            <Icon name={getAlertIcon(alert?.severity)} size={16} color="currentColor" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium line-clamp-1">{alert?.title}</p>
              <p className="text-xs opacity-80 line-clamp-1">{alert?.message}</p>
            </div>
            <span className="text-xs whitespace-nowrap opacity-70">{alert?.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertBanner;