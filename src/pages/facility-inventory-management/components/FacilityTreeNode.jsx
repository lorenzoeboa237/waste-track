import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FacilityTreeNode = ({ facility, level = 0, onSelect, selectedId, isExpanded, onToggle }) => {
  const hasChildren = facility?.children && facility?.children?.length > 0;
  const isSelected = selectedId === facility?.id;
  const expanded = isExpanded || false;

  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'maintenance':
        return { name: 'AlertTriangle', color: 'var(--color-warning)' };
      case 'offline':
        return { name: 'XCircle', color: 'var(--color-error)' };
      default:
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  const statusIcon = getStatusIcon(facility?.status);

  return (
    <div className="w-full">
      <div
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-smooth
          ${isSelected ? 'bg-primary text-primary-foreground shadow-elevation-1' : 'hover:bg-muted'}
        `}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => onSelect(facility)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onToggle(facility?.id);
            }}
            className="p-0.5 hover:bg-background/20 rounded transition-smooth"
          >
            <Icon
              name={expanded ? 'ChevronDown' : 'ChevronRight'}
              size={16}
              color={isSelected ? 'currentColor' : 'var(--color-foreground)'}
            />
          </button>
        )}
        {!hasChildren && <div className="w-5" />}

        <Icon
          name={statusIcon?.name}
          size={14}
          color={isSelected ? 'currentColor' : statusIcon?.color}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium truncate ${isSelected ? '' : 'text-foreground'}`}>
              {facility?.name}
            </span>
            {facility?.alertCount > 0 && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-error text-error-foreground text-xs font-semibold rounded-full">
                {facility?.alertCount}
              </span>
            )}
          </div>
          <div className={`text-xs ${isSelected ? 'opacity-90' : 'text-muted-foreground'}`}>
            {facility?.capacity}% capacity
          </div>
        </div>

        <div className={`text-xs font-medium ${isSelected ? '' : getCapacityColor(facility?.capacity)}`}>
          {facility?.capacity}%
        </div>
      </div>
      {hasChildren && expanded && (
        <div className="mt-1">
          {facility?.children?.map((child) => (
            <FacilityTreeNode
              key={child?.id}
              facility={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              isExpanded={isExpanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FacilityTreeNode;