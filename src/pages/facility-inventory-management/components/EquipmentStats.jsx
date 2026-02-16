import React from 'react';
import Icon from '../../../components/AppIcon';

const EquipmentStatusCard = ({ equipment, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-success/10 text-success border-success/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'offline':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle2';
      case 'maintenance':
        return 'Wrench';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div
      onClick={() => onClick(equipment)}
      className="bg-card rounded-lg p-3 md:p-4 shadow-elevation-1 border border-border hover:shadow-elevation-2 transition-smooth cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Icon name={equipment?.icon} size={20} color="var(--color-primary)" />
          <h5 className="text-sm md:text-base font-semibold text-foreground truncate">
            {equipment?.name}
          </h5>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(equipment?.status)}`}
        >
          {equipment?.status}
        </span>
      </div>
      <div className="space-y-1.5 md:space-y-2">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">ID:</span>
          <span className="text-foreground font-medium">{equipment?.id}</span>
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Location:</span>
          <span className="text-foreground font-medium truncate ml-2">{equipment?.location}</span>
        </div>
        {equipment?.nextMaintenance && (
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground">Next Service:</span>
            <span className="text-foreground font-medium">{equipment?.nextMaintenance}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentStatusCard;