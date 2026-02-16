import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FacilityFilterTree = ({ facilities, selectedFacility, onSelectFacility }) => {
  const [expandedFacilities, setExpandedFacilities] = useState(new Set());

  const toggleExpand = (facilityId) => {
    const newExpanded = new Set(expandedFacilities);
    if (newExpanded?.has(facilityId)) {
      newExpanded?.delete(facilityId);
    } else {
      newExpanded?.add(facilityId);
    }
    setExpandedFacilities(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'critical':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-3 md:p-4 h-full overflow-y-auto scrollbar-custom">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm md:text-base font-semibold text-foreground">Facilities & Routes</h3>
        <button className="p-1 hover:bg-muted rounded transition-smooth">
          <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="space-y-1">
        {facilities?.map((facility) => (
          <div key={facility?.id}>
            <button
              onClick={() => toggleExpand(facility?.id)}
              className={`w-full flex items-center gap-2 p-2 rounded-md transition-smooth hover:bg-muted ${
                selectedFacility === facility?.id ? 'bg-primary/10' : ''
              }`}
            >
              <Icon
                name={expandedFacilities?.has(facility?.id) ? 'ChevronDown' : 'ChevronRight'}
                size={16}
                color="var(--color-muted-foreground)"
              />
              <Icon name="Building2" size={16} color="var(--color-primary)" />
              <span className="flex-1 text-left text-sm text-foreground font-medium line-clamp-1">
                {facility?.name}
              </span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(facility?.status)}`} />
            </button>
            {expandedFacilities?.has(facility?.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {facility?.routes?.map((route) => (
                  <button
                    key={route?.id}
                    onClick={() => onSelectFacility(facility?.id, route?.id)}
                    className={`w-full flex items-center gap-2 p-2 rounded-md transition-smooth hover:bg-muted ${
                      selectedFacility === route?.id ? 'bg-primary/10' : ''
                    }`}
                  >
                    <Icon name="Route" size={14} color="var(--color-secondary)" />
                    <span className="flex-1 text-left text-xs text-foreground line-clamp-1">{route?.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{route?.completion}%</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityFilterTree;