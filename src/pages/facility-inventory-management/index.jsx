import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import FacilityTreeNode from './components/FacilityTreeNode';
import CapacityGauge from './components/CapacityGauge';
import EquipmentStatusCard from './components/EquipmentStatusCard';
import ActivityTimeline from './components/ActivityTimeline';
import InventoryTable from './components/InventoryTable';
import AlertsPanel from './components/AlertsPanel';
import IntegrationStatus from './components/IntegrationStatus';

const FacilityInventoryManagement = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState(null);

  const facilities = [];
  const wasteStreams = [];
  const equipment = [];
  const activities = [];
  const inventoryItems = [];

  const alerts = [];
  const integrations = [];

  const viewModeOptions = [
    { value: 'dashboard', label: 'Dashboard View' },
    { value: 'inventory', label: 'Inventory Table' }
  ];

  useEffect(() => {
    if (facilities?.length > 0 && !selectedFacility) {
      setSelectedFacility(facilities?.[0]);
    }
  }, []);

  const handleToggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev?.[nodeId]
    }));
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  const handleEquipmentClick = (equipment) => {
    console.log('Equipment clicked:', equipment);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    console.log('Item selected:', item);
  };

  const handleBulkAction = (action, itemIds) => {
    console.log('Bulk action:', action, itemIds);
  };

  const handleAlertAction = (action, alertId) => {
    console.log('Alert action:', action, alertId);
  };

  const handleExport = (type) => {
    console.log('Export:', type);
  };

  return (
    <>
      <Helmet>
        <title>Facility & Inventory Management - WasteTracker</title>
        <meta
          name="description"
          content="Comprehensive oversight of disposal facilities, equipment inventory, and capacity monitoring for waste management operations"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[60px]">
          <div className="h-[calc(100vh-60px)] flex">
            {/* Left Panel - Facility Navigation */}
            <aside className="w-full lg:w-1/4 border-r border-border bg-card overflow-y-auto scrollbar-custom hidden lg:block">
              <div className="p-4 md:p-5 lg:p-6 border-b border-border sticky top-0 bg-card z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                    Sites
                  </h2>
                  <Button variant="outline" size="sm" iconName="Plus">
                    Ajouter
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={activeTab === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('all')}
                    fullWidth
                  >
                    All
                  </Button>
                  <Button
                    variant={activeTab === 'alerts' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('alerts')}
                    fullWidth
                  >
                    Alerts
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {facilities?.map((facility) => (
                  <FacilityTreeNode
                    key={facility?.id}
                    facility={facility}
                    onSelect={handleFacilitySelect}
                    selectedId={selectedFacility?.id}
                    isExpanded={expandedNodes?.[facility?.id]}
                    onToggle={handleToggleNode}
                  />
                ))}
              </div>
            </aside>

            {/* Center Panel - Main Dashboard */}
            <section className="flex-1 overflow-y-auto scrollbar-custom">
              <div className="p-4 md:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                      {selectedFacility?.name || 'Facility Management'}
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Real-time facility monitoring and inventory management
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Select
                      options={viewModeOptions}
                      value={viewMode}
                      onChange={setViewMode}
                      className="w-48"
                    />
                    <Button variant="outline" iconName="Download" onClick={() => handleExport('compliance')}>
                      Exporter
                    </Button>
                    <Button variant="default" iconName="RefreshCw">
                      Actualiser
                    </Button>
                  </div>
                </div>

                {viewMode === 'dashboard' ? (
                  <>
                    {/* Capacity Gauges */}
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                        Waste Stream Capacity
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                        {wasteStreams?.map((stream) => (
                          <CapacityGauge key={stream?.id} {...stream} />
                        ))}
                      </div>
                    </div>

                    {/* Equipment Status */}
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                          Equipment Status
                        </h3>
                        <Button variant="ghost" size="sm" iconName="ArrowRight">
                          View All
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {equipment?.map((item) => (
                          <EquipmentStatusCard
                            key={item?.id}
                            equipment={item}
                            onClick={handleEquipmentClick}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                        Activité récente
                      </h3>
                      <div className="bg-card rounded-lg p-4 md:p-5 lg:p-6 shadow-elevation-1 border border-border">
                        <ActivityTimeline activities={activities} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-card rounded-lg p-4 md:p-5 lg:p-6 shadow-elevation-1 border border-border">
                    <InventoryTable
                      items={inventoryItems}
                      onItemSelect={handleItemSelect}
                      onBulkAction={handleBulkAction}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Right Panel - Alerts & Integrations */}
            <aside className="w-full lg:w-1/4 border-l border-border bg-card overflow-y-auto scrollbar-custom hidden lg:block">
              <div className="p-4 md:p-5 lg:p-6">
                {/* Alerts Section */}
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                      Active Alerts
                    </h3>
                    <span className="flex items-center justify-center w-6 h-6 bg-error text-error-foreground text-xs font-semibold rounded-full">
                      {alerts?.length}
                    </span>
                  </div>
                  <AlertsPanel alerts={alerts} onAlertAction={handleAlertAction} />
                </div>

                {/* Integration Status */}
                <IntegrationStatus integrations={integrations} />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default FacilityInventoryManagement;