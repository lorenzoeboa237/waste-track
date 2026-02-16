import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatus = ({ integrations }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-success/10 text-success border-success/20';
      case 'syncing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      case 'disconnected':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'syncing':
        return { name: 'RefreshCw', color: 'var(--color-warning)' };
      case 'error':
        return { name: 'XCircle', color: 'var(--color-error)' };
      case 'disconnected':
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
      default:
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-5 shadow-elevation-1 border border-border">
      <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">
        System Integrations
      </h4>
      <div className="space-y-3">
        {integrations?.map((integration) => {
          const icon = getStatusIcon(integration?.status);
          return (
            <div
              key={integration?.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Icon name={integration?.icon} size={20} color="var(--color-primary)" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {integration?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last sync: {integration?.lastSync}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(integration?.status)}`}>
                  <div className="flex items-center gap-1">
                    <Icon
                      name={icon?.name}
                      size={12}
                      color={icon?.color}
                      className={integration?.status === 'syncing' ? 'animate-spin' : ''}
                    />
                    {integration?.status}
                  </div>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationStatus;