import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [activeFilters, setActiveFilters] = useState(new Set());

  const savedViews = [
    { value: 'all', label: 'Toutes les tournées' },
    { value: 'active', label: 'Tournées actives' },
    { value: 'delayed', label: 'En retard' },
    { value: 'completed', label: 'Terminées aujourd\'hui' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: "Aujourd'hui" },
    { value: 'yesterday', label: 'Hier' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' }
  ];

  const statusFilters = [
    { id: 'on-time', label: 'À l\'heure', color: 'success' },
    { id: 'delayed', label: 'En retard', color: 'warning' },
    { id: 'critical', label: 'Critique', color: 'error' }
  ];

  const toggleFilter = (filterId) => {
    const newFilters = new Set(activeFilters);
    if (newFilters?.has(filterId)) {
      newFilters?.delete(filterId);
    } else {
      newFilters?.add(filterId);
    }
    setActiveFilters(newFilters);
    onFilterChange?.({ filters: Array.from(newFilters), search: searchQuery, view: selectedView, dateRange });
  };

  const handleSearch = (e) => {
    setSearchQuery(e?.target?.value);
    onFilterChange?.({ filters: Array.from(activeFilters), search: e?.target?.value, view: selectedView, dateRange });
  };

  const clearAllFilters = () => {
    setActiveFilters(new Set());
    setSearchQuery('');
    setSelectedView('all');
    setDateRange('today');
    onFilterChange?.({ filters: [], search: '', view: 'all', dateRange: 'today' });
  };

  const getFilterColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning';
      case 'error':
        return 'bg-error/10 text-error border-error';
      default:
        return 'bg-muted text-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-3 md:p-4">
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Input
              type="search"
              placeholder="Rechercher tournées, chauffeurs..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-9"
            />
            <Icon
              name="Search"
              size={16}
              color="var(--color-muted-foreground)"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <Select
            options={savedViews}
            value={selectedView}
            onChange={setSelectedView}
            placeholder="Vue"
          />
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Période"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAllFilters}
            className="px-3 py-2 text-xs bg-muted text-foreground rounded-md transition-smooth hover:bg-muted/80 flex items-center gap-1 whitespace-nowrap"
          >
            <Icon name="X" size={14} color="currentColor" />
            Clear
          </button>
          <button className="p-2 bg-primary text-primary-foreground rounded-md transition-smooth hover:bg-primary/90">
            <Icon name="SlidersHorizontal" size={16} color="currentColor" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-muted-foreground font-caption">Statut :</span>
        {statusFilters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => toggleFilter(filter?.id)}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-smooth ${
              activeFilters?.has(filter?.id)
                ? getFilterColor(filter?.color)
                : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {filter?.label}
          </button>
        ))}
        {activeFilters?.size > 0 && (
          <span className="ml-2 text-xs text-muted-foreground font-caption">
            {activeFilters?.size} filter{activeFilters?.size > 1 ? 's' : ''} active
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;