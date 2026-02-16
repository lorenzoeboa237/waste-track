import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LiveMapPanel = ({ vehicles, selectedVehicle, onSelectVehicle }) => {
  const [mapView, setMapView] = useState('standard');

  const getVehicleStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'delayed':
        return 'bg-warning';
      case 'stopped':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-md shadow-elevation-2 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
        <h3 className="text-sm md:text-base font-semibold text-foreground">Live Route Tracking</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapView('standard')}
            className={`px-3 py-1 text-xs rounded-md transition-smooth ${
              mapView === 'standard' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setMapView('satellite')}
            className={`px-3 py-1 text-xs rounded-md transition-smooth ${
              mapView === 'satellite' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            }`}
          >
            Satellite
          </button>
          <button className="p-1.5 hover:bg-muted rounded transition-smooth">
            <Icon name="Maximize2" size={16} color="var(--color-muted-foreground)" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative bg-muted/30">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Waste Collection Routes Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
          className="border-0"
        />
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-md shadow-elevation-3 p-3 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Truck" size={16} color="var(--color-primary)" />
            <span className="text-sm font-semibold text-foreground">Active Vehicles: {vehicles?.length}</span>
          </div>
          <div className="space-y-1.5">
            {vehicles?.slice(0, 3)?.map((vehicle) => (
              <button
                key={vehicle?.id}
                onClick={() => onSelectVehicle(vehicle?.id)}
                className={`w-full flex items-center gap-2 p-2 rounded-md transition-smooth hover:bg-muted ${
                  selectedVehicle === vehicle?.id ? 'bg-primary/10' : ''
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${getVehicleStatusColor(vehicle?.status)}`} />
                <span className="flex-1 text-left text-xs text-foreground font-medium line-clamp-1">
                  {vehicle?.name}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{vehicle?.progress}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapPanel;