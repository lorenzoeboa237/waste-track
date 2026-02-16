import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RouteDataGrid = ({ routes, onSelectRoute, selectedRoute }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedRows(new Set(routes.map(r => r.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected?.has(id)) {
      newSelected?.delete(id);
    } else {
      newSelected?.add(id);
    }
    setSelectedRows(newSelected);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-success';
      case 'delayed':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-md shadow-elevation-2 overflow-hidden">
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <h3 className="text-sm md:text-base font-semibold text-foreground">Active Routes</h3>
          {selectedRows?.size > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
              {selectedRows?.size} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-md transition-smooth hover:bg-muted/80 flex items-center gap-1">
            <Icon name="Download" size={14} color="currentColor" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="p-1.5 hover:bg-muted rounded transition-smooth">
            <Icon name="RefreshCw" size={16} color="var(--color-muted-foreground)" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows?.size === routes?.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Route ID
                  <Icon name="ArrowUpDown" size={12} color="currentColor" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('driver')}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Driver
                  <Icon name="ArrowUpDown" size={12} color="currentColor" />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('completion')}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Progress
                  <Icon name="ArrowUpDown" size={12} color="currentColor" />
                </button>
              </th>
              <th className="p-3 text-left">
                <span className="text-xs font-semibold text-foreground">Status</span>
              </th>
              <th className="p-3 text-left">
                <span className="text-xs font-semibold text-foreground">Bins</span>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('estimatedCompletion')}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Est. Completion
                  <Icon name="ArrowUpDown" size={12} color="currentColor" />
                </button>
              </th>
              <th className="p-3 text-left">
                <span className="text-xs font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {routes?.map((route) => (
              <tr
                key={route?.id}
                onClick={() => onSelectRoute(route?.id)}
                className={`border-b border-border transition-smooth hover:bg-muted/30 cursor-pointer ${
                  selectedRoute === route?.id ? 'bg-primary/5' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows?.has(route?.id)}
                    onChange={() => handleSelectRow(route?.id)}
                    onClick={(e) => e?.stopPropagation()}
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <span className="text-sm font-medium text-foreground">{route?.id}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground line-clamp-1">{route?.driver}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${route?.completion}%` }}
                      />
                    </div>
                    <span className="text-sm text-foreground whitespace-nowrap">{route?.completion}%</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`text-sm font-medium ${getStatusColor(route?.status)}`}>
                    {route?.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {route?.binsCollected}/{route?.totalBins}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground whitespace-nowrap">{route?.estimatedCompletion}</span>
                </td>
                <td className="p-3">
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                    }}
                    className="p-1 hover:bg-muted rounded transition-smooth"
                  >
                    <Icon name="MoreVertical" size={16} color="var(--color-muted-foreground)" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RouteDataGrid;