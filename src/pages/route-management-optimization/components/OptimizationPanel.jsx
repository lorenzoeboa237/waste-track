import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const OptimizationPanel = ({ onOptimize, onApplyFilters }) => {
  const [optimizationMode, setOptimizationMode] = useState('balanced');
  const [vehicleCapacity, setVehicleCapacity] = useState('5000');
  const [maxStops, setMaxStops] = useState('50');
  const [constraints, setConstraints] = useState({
    respectTimeWindows: true,
    avoidTollRoads: false,
    prioritizeUrgent: true,
    minimizeFuel: true
  });
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizationModes = [
    { value: 'fastest', label: 'Fastest Route', description: 'Minimize total travel time' },
    { value: 'shortest', label: 'Shortest Distance', description: 'Minimize total mileage' },
    { value: 'balanced', label: 'Balanced', description: 'Optimize time and distance' },
    { value: 'fuel', label: 'Fuel Efficient', description: 'Minimize fuel consumption' }
  ];

  const vehicleTypes = [
    { value: '5000', label: 'Standard Truck (5,000 lbs)' },
    { value: '10000', label: 'Large Truck (10,000 lbs)' },
    { value: '15000', label: 'Heavy Duty (15,000 lbs)' }
  ];

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      onOptimize({
        mode: optimizationMode,
        capacity: vehicleCapacity,
        maxStops,
        constraints
      });
      setIsOptimizing(false);
    }, 2000);
  };

  const handleConstraintChange = (key, value) => {
    setConstraints(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
        <div className="flex items-center gap-2 md:gap-3">
          <Icon name="Zap" size={20} color="var(--color-accent)" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Route Optimization
          </h3>
        </div>
        <button
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          title="Reset to defaults"
        >
          <Icon name="RotateCcw" size={18} color="var(--color-foreground)" />
        </button>
      </div>
      {/* Optimization Controls */}
      <div className="flex-1 overflow-y-auto scrollbar-custom p-3 md:p-4 space-y-4 md:space-y-6">
        {/* Optimization Mode */}
        <div>
          <Select
            label="Optimization Strategy"
            description="Choose how to optimize the route"
            options={optimizationModes}
            value={optimizationMode}
            onChange={setOptimizationMode}
          />
        </div>

        {/* Vehicle Configuration */}
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Icon name="Truck" size={16} color="var(--color-primary)" />
            Vehicle Configuration
          </h4>
          
          <Select
            label="Vehicle Capacity"
            options={vehicleTypes}
            value={vehicleCapacity}
            onChange={setVehicleCapacity}
          />

          <Input
            label="Maximum Stops per Route"
            type="number"
            value={maxStops}
            onChange={(e) => setMaxStops(e?.target?.value)}
            min="1"
            max="200"
            description="Limit the number of stops in a single route"
          />
        </div>

        {/* Optimization Constraints */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Icon name="Settings" size={16} color="var(--color-primary)" />
            Constraints & Preferences
          </h4>

          <div className="space-y-3 bg-muted/30 rounded-md p-3">
            <Checkbox
              label="Respect Time Windows"
              description="Honor customer-specified pickup times"
              checked={constraints?.respectTimeWindows}
              onChange={(e) => handleConstraintChange('respectTimeWindows', e?.target?.checked)}
            />

            <Checkbox
              label="Avoid Toll Roads"
              description="Route around toll roads when possible"
              checked={constraints?.avoidTollRoads}
              onChange={(e) => handleConstraintChange('avoidTollRoads', e?.target?.checked)}
            />

            <Checkbox
              label="Prioritize Urgent Pickups"
              description="Schedule high-priority stops first"
              checked={constraints?.prioritizeUrgent}
              onChange={(e) => handleConstraintChange('prioritizeUrgent', e?.target?.checked)}
            />

            <Checkbox
              label="Minimize Fuel Consumption"
              description="Optimize for fuel efficiency"
              checked={constraints?.minimizeFuel}
              onChange={(e) => handleConstraintChange('minimizeFuel', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
            Expected Improvements
          </h4>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-success/10 border border-success/20 rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-caption text-muted-foreground">Distance Reduction</span>
                <span className="text-sm font-semibold text-success">-12.4%</span>
              </div>
              <div className="w-full bg-success/20 rounded-full h-1.5">
                <div className="bg-success h-1.5 rounded-full" style={{ width: '87.6%' }} />
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-caption text-muted-foreground">Time Savings</span>
                <span className="text-sm font-semibold text-success">-18.7%</span>
              </div>
              <div className="w-full bg-success/20 rounded-full h-1.5">
                <div className="bg-success h-1.5 rounded-full" style={{ width: '81.3%' }} />
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-caption text-muted-foreground">Fuel Cost Savings</span>
                <span className="text-sm font-semibold text-success">$4.20</span>
              </div>
              <div className="w-full bg-success/20 rounded-full h-1.5">
                <div className="bg-success h-1.5 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Historical Performance */}
        <div className="bg-muted/30 rounded-md p-3 md:p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="History" size={16} color="var(--color-primary)" />
            <h4 className="text-sm font-medium text-foreground">Historical Performance</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg. Route Efficiency</span>
              <span className="font-semibold text-foreground">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">On-Time Completion Rate</span>
              <span className="font-semibold text-foreground">96.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg. Stops per Route</span>
              <span className="font-semibold text-foreground">38</span>
            </div>
          </div>
        </div>
      </div>
      {/* Action Footer */}
      <div className="border-t border-border p-3 md:p-4 space-y-2">
        <Button
          variant="default"
          fullWidth
          loading={isOptimizing}
          iconName="Zap"
          iconPosition="left"
          onClick={handleOptimize}
        >
          {isOptimizing ? 'Optimizing Route...' : 'Optimize Route'}
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            fullWidth
            iconName="Save"
            iconPosition="left"
          >
            Save Configuration
          </Button>
          <Button
            variant="ghost"
            fullWidth
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptimizationPanel;