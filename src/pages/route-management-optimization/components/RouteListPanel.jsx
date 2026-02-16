import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteListPanel = ({ routes, selectedRoute, onSelectRoute, onReorderStops }) => {
  const [expandedRoute, setExpandedRoute] = useState(selectedRoute?.id || null);
  const [draggedStop, setDraggedStop] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-error bg-error/10';
      case 'high':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const getWasteTypeIcon = (type) => {
    switch (type) {
      case 'recyclable':
        return 'Recycle';
      case 'organic':
        return 'Leaf';
      case 'hazardous':
        return 'AlertTriangle';
      default:
        return 'Trash2';
    }
  };

  const handleDragStart = (e, stop) => {
    setDraggedStop(stop);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStop) => {
    e?.preventDefault();
    if (draggedStop && draggedStop?.id !== targetStop?.id) {
      onReorderStops(draggedStop, targetStop);
    }
    setDraggedStop(null);
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
        <div className="flex items-center gap-2 md:gap-3">
          <Icon name="List" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Scheduled Pickups
          </h3>
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-caption rounded-md">
            {selectedRoute?.stops?.length || 0} stops
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowUpDown"
            iconPosition="left"
            className="hidden md:flex"
          >
            Optimize
          </Button>
          <button
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            title="More options"
          >
            <Icon name="MoreVertical" size={18} color="var(--color-foreground)" />
          </button>
        </div>
      </div>
      {/* Route Stops List */}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        {selectedRoute?.stops?.length > 0 ? (
          <div className="p-3 md:p-4 space-y-2">
            {selectedRoute?.stops?.map((stop, index) => (
              <div
                key={stop?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, stop)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stop)}
                className={`
                  bg-background rounded-md border border-border p-3 md:p-4 transition-smooth cursor-move
                  hover:shadow-elevation-2 hover:border-primary/30
                  ${draggedStop?.id === stop?.id ? 'opacity-50' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  {/* Stop Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>

                  {/* Stop Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                          {stop?.customerName}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">
                          {stop?.address}
                        </p>
                      </div>
                      
                      {stop?.priority !== 'normal' && (
                        <span className={`
                          px-2 py-0.5 rounded text-xs font-caption font-medium whitespace-nowrap
                          ${getPriorityColor(stop?.priority)}
                        `}>
                          {stop?.priority}
                        </span>
                      )}
                    </div>

                    {/* Stop Metadata */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                        <span>{stop?.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon name={getWasteTypeIcon(stop?.wasteType)} size={14} color="var(--color-muted-foreground)" />
                        <span className="capitalize">{stop?.wasteType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon name="Package" size={14} color="var(--color-muted-foreground)" />
                        <span>{stop?.binCount} bins</span>
                      </div>
                      {stop?.fillLevel && (
                        <div className="flex items-center gap-1.5">
                          <div className={`
                            w-2 h-2 rounded-full
                            ${stop?.fillLevel >= 90 ? 'bg-error' : stop?.fillLevel >= 70 ? 'bg-warning' : 'bg-success'}
                          `} />
                          <span>{stop?.fillLevel}% full</span>
                        </div>
                      )}
                    </div>

                    {/* Special Instructions */}
                    {stop?.specialInstructions && (
                      <div className="mt-2 flex items-start gap-2 p-2 bg-warning/10 rounded border border-warning/20">
                        <Icon name="AlertCircle" size={14} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground line-clamp-2">
                          {stop?.specialInstructions}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1">
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-smooth"
                      title="Edit stop"
                    >
                      <Icon name="Edit2" size={16} color="var(--color-muted-foreground)" />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-error/10 transition-smooth"
                      title="Remove stop"
                    >
                      <Icon name="Trash2" size={16} color="var(--color-error)" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Icon name="MapPin" size={32} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="text-base md:text-lg font-medium text-foreground mb-2">No stops scheduled</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Add waypoints to the map to create your route
            </p>
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Add First Stop
            </Button>
          </div>
        )}
      </div>
      {/* Footer Summary */}
      {selectedRoute?.stops?.length > 0 && (
        <div className="border-t border-border p-3 md:p-4 bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-caption">Total Collection Time</span>
            <span className="font-semibold text-foreground">{selectedRoute?.totalDuration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteListPanel;