import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RouteMapPanel from './components/RouteMapPanel';
import RouteListPanel from './components/RouteListPanel';
import OptimizationPanel from './components/OptimizationPanel';
import RouteFilterBar from './components/RouteFilterBar';
import QuickActionsBar from './components/QuickActionsBar';
import Icon from '../../components/AppIcon';

const RouteManagementOptimization = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [filters, setFilters] = useState({
    wasteType: 'all',
    priority: 'all',
    zone: 'all',
    dateRange: 'today'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobilePanel, setShowMobilePanel] = useState('map');

  const handleWaypointDragEnd = (waypoint, newPosition) => {
    console.log('Waypoint dragged:', waypoint, newPosition);
  };

  const handleAddWaypoint = () => {
    console.log('Add waypoint clicked');
  };

  const handleReorderStops = (draggedStop, targetStop) => {
    console.log('Reorder stops:', draggedStop, targetStop);
  };

  const handleOptimize = (optimizationConfig) => {
    console.log('Optimize route with config:', optimizationConfig);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action triggered:', actionId);
  };

  return (
    <>
      <Helmet>
        <title>Route Management & Optimization - WasteTracker</title>
        <meta 
          name="description" 
          content="Streamline waste collection routes with intelligent optimization, real-time tracking, and efficient scheduling for field coordinators and operations managers." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-[60px]">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
            {/* Page Header */}
            <div className="mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                    Route Management & Optimization
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Plan, optimize, and track waste collection routes for maximum efficiency
                  </p>
                </div>

                {/* System Status */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-md shadow-elevation-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle" />
                    <span className="text-xs font-caption text-muted-foreground">
                      GPS Tracking Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-md shadow-elevation-1">
                    <Icon name="Truck" size={16} color="var(--color-primary)" />
                    <span className="text-xs font-caption text-foreground font-medium">
                      {routes.length} tournée{routes.length !== 1 ? 's' : ''} active{routes.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActionsBar onAction={handleQuickAction} />

            {/* Filters */}
            <RouteFilterBar 
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />

            {/* Mobile Panel Toggle */}
            <div className="lg:hidden mb-4">
              <div className="flex gap-2 bg-card rounded-lg p-2 shadow-elevation-2">
                <button
                  onClick={() => setShowMobilePanel('map')}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-smooth text-sm font-medium
                    ${showMobilePanel === 'map' ?'bg-primary text-primary-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name="Map" size={18} color="currentColor" />
                  Map
                </button>
                <button
                  onClick={() => setShowMobilePanel('list')}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-smooth text-sm font-medium
                    ${showMobilePanel === 'list' ?'bg-primary text-primary-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name="List" size={18} color="currentColor" />
                  Stops
                </button>
                <button
                  onClick={() => setShowMobilePanel('optimize')}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-smooth text-sm font-medium
                    ${showMobilePanel === 'optimize' ?'bg-primary text-primary-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name="Zap" size={18} color="currentColor" />
                  Optimize
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              {/* Left Panel - Map & Route List (60%) */}
              <div className="lg:col-span-7 space-y-4 md:space-y-6">
                {/* Map Panel */}
                <div className={`h-[400px] md:h-[500px] lg:h-[600px] ${showMobilePanel !== 'map' ? 'hidden lg:block' : ''}`}>
                  <RouteMapPanel
                    selectedRoute={selectedRoute}
                    onWaypointDragEnd={handleWaypointDragEnd}
                    onAddWaypoint={handleAddWaypoint}
                  />
                </div>

                {/* Route List Panel */}
                <div className={`h-[500px] md:h-[600px] ${showMobilePanel !== 'list' ? 'hidden lg:block' : ''}`}>
                  <RouteListPanel
                    routes={routes}
                    selectedRoute={selectedRoute}
                    onSelectRoute={setSelectedRoute}
                    onReorderStops={handleReorderStops}
                  />
                </div>
              </div>

              {/* Right Panel - Optimization Tools (40%) */}
              <div className={`lg:col-span-5 h-[600px] md:h-[700px] lg:h-[1236px] ${showMobilePanel !== 'optimize' ? 'hidden lg:block' : ''}`}>
                <OptimizationPanel
                  onOptimize={handleOptimize}
                  onApplyFilters={handleFilterChange}
                />
              </div>
            </div>

            {/* Integration Status Footer */}
            <div className="mt-6 md:mt-8 bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Link" size={18} color="var(--color-primary)" />
                <h3 className="text-sm md:text-base font-heading font-semibold text-foreground">
                  System Integration Status
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-md">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-caption text-muted-foreground">GPS Tracking</div>
                    <div className="text-sm font-medium text-foreground">Connected</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-md">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-caption text-muted-foreground">Customer System</div>
                    <div className="text-sm font-medium text-foreground">Synced</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-md">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-caption text-muted-foreground">Vehicle Maintenance</div>
                    <div className="text-sm font-medium text-foreground">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RouteManagementOptimization;