import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const RouteMapPanel = ({ selectedRoute, onWaypointDragEnd, onAddWaypoint }) => {
  const [mapView, setMapView] = useState('standard');
  const [showTraffic, setShowTraffic] = useState(true);
  const [showBinLevels, setShowBinLevels] = useState(true);

  const mapViewOptions = [
    { id: 'standard', label: 'Standard', icon: 'Map' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-elevation-2">
      {/* Map Controls Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
        <div className="flex items-center gap-2 md:gap-3">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Interactive Route Map
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Map View Toggle */}
          <div className="hidden md:flex items-center gap-1 bg-muted rounded-md p-1">
            {mapViewOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => setMapView(option?.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded transition-smooth text-xs font-medium
                  ${mapView === option?.id 
                    ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                  }
                `}
                title={option?.label}
              >
                <Icon name={option?.icon} size={14} color="currentColor" />
                <span className="hidden lg:inline">{option?.label}</span>
              </button>
            ))}
          </div>

          {/* Layer Toggles */}
          <button
            onClick={() => setShowTraffic(!showTraffic)}
            className={`
              p-2 rounded-md transition-smooth
              ${showTraffic ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:text-foreground'}
            `}
            title="Toggle traffic layer"
          >
            <Icon name="Navigation" size={18} color="currentColor" />
          </button>
          
          <button
            onClick={() => setShowBinLevels(!showBinLevels)}
            className={`
              p-2 rounded-md transition-smooth
              ${showBinLevels ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:text-foreground'}
            `}
            title="Toggle bin fill levels"
          >
            <Icon name="Trash2" size={18} color="currentColor" />
          </button>
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative bg-muted/30 overflow-hidden">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Route Management Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
          className="border-0"
        />

        {/* Map Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Traffic Indicator */}
          {showTraffic && (
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-md shadow-elevation-2 p-2 md:p-3 pointer-events-auto">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle" />
                <span className="text-xs font-caption text-foreground">Light Traffic</span>
              </div>
            </div>
          )}

          {/* Bin Level Legend */}
          {showBinLevels && (
            <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-md shadow-elevation-2 p-2 md:p-3 pointer-events-auto">
              <div className="text-xs font-caption font-medium text-foreground mb-2">Bin Fill Levels</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-error rounded-full" />
                  <span className="text-xs text-muted-foreground">&gt;90% Full</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <span className="text-xs text-muted-foreground">70-90% Full</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span className="text-xs text-muted-foreground">&lt;70% Full</span>
                </div>
              </div>
            </div>
          )}

          {/* Route Statistics Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-card/95 backdrop-blur-sm rounded-md shadow-elevation-2 p-3 md:p-4 pointer-events-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-caption text-muted-foreground mb-1">Total Distance</span>
                <span className="text-base md:text-lg font-semibold text-foreground">42.3 mi</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-caption text-muted-foreground mb-1">Est. Duration</span>
                <span className="text-base md:text-lg font-semibold text-foreground">3h 45m</span>
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <span className="text-xs font-caption text-muted-foreground mb-1">Fuel Cost</span>
                <span className="text-base md:text-lg font-semibold text-success">$28.50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto">
          <button
            onClick={onAddWaypoint}
            className="w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-smooth flex items-center justify-center"
            title="Add waypoint"
          >
            <Icon name="Plus" size={20} color="currentColor" />
          </button>
          <button
            className="w-10 h-10 md:w-12 md:h-12 bg-card text-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-smooth flex items-center justify-center"
            title="Center map"
          >
            <Icon name="Crosshair" size={20} color="currentColor" />
          </button>
          <button
            className="w-10 h-10 md:w-12 md:h-12 bg-card text-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-smooth flex items-center justify-center"
            title="Zoom in"
          >
            <Icon name="ZoomIn" size={20} color="currentColor" />
          </button>
          <button
            className="w-10 h-10 md:w-12 md:h-12 bg-card text-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-smooth flex items-center justify-center"
            title="Zoom out"
          >
            <Icon name="ZoomOut" size={20} color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteMapPanel;