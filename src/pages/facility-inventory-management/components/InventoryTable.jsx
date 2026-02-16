import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InventoryTable = ({ items, onItemSelect, onBulkAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'containers', label: 'Containers' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'supplies', label: 'Supplies' },
    { value: 'safety', label: 'Safety Gear' }
  ];

  const filteredItems = items?.filter(item =>
      item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
      (categoryFilter === 'all' || item?.category === categoryFilter)
    )?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      const direction = sortConfig?.direction === 'asc' ? 1 : -1;

      if (typeof aValue === 'string') {
        return aValue?.localeCompare(bValue) * direction;
      }
      return (aValue - bValue) * direction;
    });

  const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems?.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedItems(filteredItems?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev?.includes(itemId)
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return 'bg-success/10 text-success border-success/20';
      case 'low-stock':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'out-of-stock':
        return 'bg-error/10 text-error border-error/20';
      case 'on-order':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={categories}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Filter by category"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedItems?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 p-3 md:p-4 bg-primary/5 rounded-lg border border-primary/20">
          <span className="text-sm font-medium text-foreground">
            {selectedItems?.length} items selected
          </span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowRightLeft"
              onClick={() => onBulkAction('transfer', selectedItems)}
            >
              Transfer
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              onClick={() => onBulkAction('schedule', selectedItems)}
            >
              Schedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ShoppingCart"
              onClick={() => onBulkAction('order', selectedItems)}
            >
              Order
            </Button>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="flex-1 overflow-x-auto scrollbar-custom">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              <th className="w-12 px-3 md:px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === filteredItems?.length && filteredItems?.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-border"
                />
              </th>
              <th
                className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Item Name
                  <Icon
                    name={sortConfig?.key === 'name' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={14}
                    color="var(--color-foreground)"
                  />
                </div>
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                Category
              </th>
              <th
                className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex items-center gap-2">
                  Quantity
                  <Icon
                    name={sortConfig?.key === 'quantity' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                    size={14}
                    color="var(--color-foreground)"
                  />
                </div>
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                Location
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                Next Maintenance
              </th>
              <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                Vendor
              </th>
              <th className="w-24 px-3 md:px-4 py-3 text-center text-xs md:text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems?.map((item) => (
              <tr
                key={item?.id}
                className="border-b border-border hover:bg-muted/30 transition-smooth cursor-pointer"
                onClick={() => onItemSelect(item)}
              >
                <td className="px-3 md:px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectItem(item?.id);
                    }}
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="px-3 md:px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Icon name={item?.icon} size={18} color="var(--color-primary)" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item?.name}</div>
                      <div className="text-xs text-muted-foreground">{item?.itemId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 md:px-4 py-3 text-sm text-foreground">{item?.category}</td>
                <td className="px-3 md:px-4 py-3">
                  <div className="text-sm font-medium text-foreground">{item?.quantity}</div>
                  <div className="text-xs text-muted-foreground">Min: {item?.minQuantity}</div>
                </td>
                <td className="px-3 md:px-4 py-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                </td>
                <td className="px-3 md:px-4 py-3 text-sm text-foreground">{item?.location}</td>
                <td className="px-3 md:px-4 py-3 text-sm text-foreground">{item?.nextMaintenance || 'N/A'}</td>
                <td className="px-3 md:px-4 py-3 text-sm text-foreground">{item?.vendor}</td>
                <td className="px-3 md:px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onItemSelect(item);
                      }}
                      className="p-1.5 hover:bg-muted rounded transition-smooth"
                      title="View details"
                    >
                      <Icon name="Eye" size={16} color="var(--color-foreground)" />
                    </button>
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        console.log('Edit item:', item?.id);
                      }}
                      className="p-1.5 hover:bg-muted rounded transition-smooth"
                      title="Edit item"
                    >
                      <Icon name="Edit" size={16} color="var(--color-foreground)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 mt-4 md:mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems?.length)} of {filteredItems?.length} items
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    w-8 h-8 rounded-md text-sm font-medium transition-smooth
                    ${currentPage === pageNum
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;