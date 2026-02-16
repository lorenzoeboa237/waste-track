import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

import Button from '../../../components/ui/Button';

const RouteFilterBar = ({ onFilterChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [wasteTypeFilter, setWasteTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const wasteTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'menager', label: 'Ordures ménagères' },
    { value: 'plastique', label: 'Plastiques' },
    { value: 'organique', label: 'Biodéchets' },
    { value: 'deee', label: 'DEEE' },
    { value: 'dasri', label: 'DASRI' },
    { value: 'dangereux', label: 'Déchets dangereux' }
  ];

  const priorities = [
    { value: 'all', label: 'Toutes priorités' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'Haute' },
    { value: 'normal', label: 'Normale' }
  ];

  const zones = [
    { value: 'all', label: 'Toutes les régions' },
    { value: 'centre', label: 'Centre (Yaoundé)' },
    { value: 'littoral', label: 'Littoral (Douala)' },
    { value: 'ouest', label: 'Ouest' },
    { value: 'nord', label: 'Nord' },
    { value: 'nord-ouest', label: 'Nord-Ouest' },
    { value: 'sud', label: 'Sud' },
    { value: 'est', label: 'Est' }
  ];

  const dateRanges = [
    { value: 'today', label: "Aujourd'hui" },
    { value: 'tomorrow', label: 'Demain' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'custom', label: 'Période personnalisée' }
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const filters = {
      wasteType: wasteTypeFilter,
      priority: priorityFilter,
      zone: zoneFilter,
      dateRange: dateRange
    };
    filters[filterType] = value;
    
    switch (filterType) {
      case 'wasteType':
        setWasteTypeFilter(value);
        break;
      case 'priority':
        setPriorityFilter(value);
        break;
      case 'zone':
        setZoneFilter(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
    }
    
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setWasteTypeFilter('all');
    setPriorityFilter('all');
    setZoneFilter('all');
    setDateRange('today');
    onFilterChange({
      wasteType: 'all',
      priority: 'all',
      zone: 'all',
      dateRange: 'today'
    });
  };

  const activeFilterCount = [wasteTypeFilter, priorityFilter, zoneFilter]?.filter(f => f !== 'all')?.length;

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-3 md:p-4 mb-4 md:mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              color="var(--color-muted-foreground)" 
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search routes, customers, or addresses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            iconName="Filter"
            iconPosition="left"
            className="flex-1 lg:flex-none"
          >
            Filtres
            {activeFilterCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            className="hidden md:flex"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Select
          label="Période"
          options={dateRanges}
          value={dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          label="Waste Type"
          options={wasteTypes}
          value={wasteTypeFilter}
          onChange={(value) => handleFilterChange('wasteType', value)}
        />

        <Select
          label="Priorité"
          options={priorities}
          value={priorityFilter}
          onChange={(value) => handleFilterChange('priority', value)}
        />

        <Select
          label="Geographic Zone"
          options={zones}
          value={zoneFilter}
          onChange={(value) => handleFilterChange('zone', value)}
        />
      </div>
      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-caption text-muted-foreground">Filtres actifs :</span>
            {wasteTypeFilter !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md flex items-center gap-1">
                {wasteTypes?.find(w => w?.value === wasteTypeFilter)?.label}
                <button onClick={() => handleFilterChange('wasteType', 'all')}>
                  <Icon name="X" size={12} color="currentColor" />
                </button>
              </span>
            )}
            {priorityFilter !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md flex items-center gap-1">
                {priorities?.find(p => p?.value === priorityFilter)?.label}
                <button onClick={() => handleFilterChange('priority', 'all')}>
                  <Icon name="X" size={12} color="currentColor" />
                </button>
              </span>
            )}
            {zoneFilter !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md flex items-center gap-1">
                {zones?.find(z => z?.value === zoneFilter)?.label}
                <button onClick={() => handleFilterChange('zone', 'all')}>
                  <Icon name="X" size={12} color="currentColor" />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={handleClearFilters}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Tout effacer
          </button>
        </div>
      )}
    </div>
  );
};

export default RouteFilterBar;