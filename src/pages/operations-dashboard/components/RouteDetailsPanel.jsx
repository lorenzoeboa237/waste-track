import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteDetailsPanel = ({ route }) => {
  if (!route) {
    return (
      <div className="bg-card rounded-md shadow-elevation-2 p-4 md:p-5 h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="MapPin" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">Select a route to view details</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'bg-success text-success-foreground';
      case 'delayed':
        return 'bg-warning text-warning-foreground';
      case 'critical':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-4 md:p-5 h-full overflow-y-auto scrollbar-custom">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{route?.name}</h3>
          <p className="text-xs text-muted-foreground font-caption">{route?.id}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(route?.status)}`}>
          {route?.status}
        </span>
      </div>
      <div className="space-y-4">
        <div className="bg-muted/50 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-caption">Route Progress</span>
            <span className="text-sm font-semibold text-foreground">{route?.completion}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${route?.completion}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="User" size={14} color="var(--color-primary)" />
              <span className="text-xs text-muted-foreground font-caption">Driver</span>
            </div>
            <p className="text-sm font-medium text-foreground line-clamp-1">{route?.driver}</p>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Truck" size={14} color="var(--color-primary)" />
              <span className="text-xs text-muted-foreground font-caption">Vehicle</span>
            </div>
            <p className="text-sm font-medium text-foreground">{route?.vehicle}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground font-caption">Start Time</span>
            </div>
            <span className="text-sm text-foreground">{route?.startTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground font-caption">Est. Completion</span>
            </div>
            <span className="text-sm text-foreground">{route?.estimatedCompletion}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Trash2" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground font-caption">Bins Collected</span>
            </div>
            <span className="text-sm text-foreground">{route?.binsCollected}/{route?.totalBins}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Weight" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground font-caption">Total Weight</span>
            </div>
            <span className="text-sm text-foreground">{route?.totalWeight} kg</span>
          </div>
        </div>

        {route?.delays && route?.delays?.length > 0 && (
          <div className="border-t border-border pt-3">
            <h4 className="text-sm font-semibold text-foreground mb-2">Active Delays</h4>
            <div className="space-y-2">
              {route?.delays?.map((delay, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-warning/10 rounded-md">
                  <Icon name="AlertCircle" size={14} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground font-medium line-clamp-1">{delay?.reason}</p>
                    <p className="text-xs text-muted-foreground">{delay?.duration} delay</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:bg-primary/90">
            <Icon name="Phone" size={16} color="currentColor" />
            Contact Driver
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-muted text-foreground rounded-md text-sm font-medium transition-smooth hover:bg-muted/80">
            <Icon name="MoreVertical" size={16} color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailsPanel;