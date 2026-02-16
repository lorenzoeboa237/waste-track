import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsBar = ({ onAction }) => {
  const quickActions = [
    { id: 'create-route', label: 'Nouvelle tournée', icon: 'Plus', variant: 'default', description: 'Créer une nouvelle tournée' },
    { id: 'duplicate-route', label: 'Dupliquer', icon: 'Copy', variant: 'outline', description: 'Copier une tournée existante' },
    { id: 'bulk-assign', label: 'Affectation groupée', icon: 'Users', variant: 'outline', description: 'Affecter plusieurs tournées aux chauffeurs' },
    { id: 'emergency-pickup', label: 'Urgence', icon: 'AlertCircle', variant: 'outline', description: 'Collecte urgente' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-3 md:p-4 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={18} color="var(--color-primary)" />
          <h3 className="text-sm md:text-base font-heading font-semibold text-foreground">
            Actions rapides
          </h3>
        </div>
        <button
          type="button"
          className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
          onClick={() => onAction?.('customize-actions')}
        >
          Personnaliser
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            onClick={() => onAction?.(action?.id)}
            className="justify-start"
            title={action?.description}
          >
            <span className="hidden sm:inline">{action?.label}</span>
          </Button>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Keyboard" size={14} color="var(--color-muted-foreground)" />
          <span className="font-caption">
            Raccourcis : <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">Ctrl+N</kbd> Nouvelle tournée,
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground ml-1">Ctrl+D</kbd> Dupliquer
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsBar;
