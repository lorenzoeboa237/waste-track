import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState('connected');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationItems = [
    { label: 'Tableau de bord', path: '/', icon: 'LayoutDashboard', description: 'Vue d\'ensemble' },
    { label: 'Tournées', path: '/tournees', icon: 'Route', description: 'Planification' },
    { label: 'Sites', path: '/sites', icon: 'Building2', description: 'Centres de transfert' },
    { label: 'Chauffeurs', path: '/chauffeurs', icon: 'User', description: 'Effectifs' },
    { label: 'Camions', path: '/camions', icon: 'Truck', description: 'Parc véhicules' },
    { label: 'Unités', path: '/unites', icon: 'Users', description: 'Unités opérationnelles' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'connected':
        return 'bg-success';
      case 'syncing':
        return 'bg-warning';
      case 'disconnected':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const getStatusLabel = () => {
    switch (systemStatus) {
      case 'connected':
        return 'Système en ligne';
      case 'syncing':
        return 'Synchronisation…';
      case 'disconnected':
        return 'Connexion perdue';
      default:
        return 'Inconnu';
    }
  };

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
  };

  const handleParametres = () => {
    setUserMenuOpen(false);
    navigate('/parametres');
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-[60px] bg-card shadow-elevation-2 z-[1000] border-b border-border overflow-x-hidden">
      <div className="h-full flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 w-full min-w-0 max-w-[100vw]">
        {/* Logo Section - ne rétrécit pas */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-md transition-smooth shrink-0">
            <Icon name="Recycle" size={22} color="var(--color-primary)" />
          </div>
          <span className="text-base sm:text-xl font-semibold text-foreground truncate hidden sm:block">
            Gestion des déchets
          </span>
        </div>

        {/* Desktop Navigation - visible seulement à partir de lg pour éviter overflow */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center min-w-0 overflow-x-auto scrollbar-hide py-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-2 rounded-md text-left whitespace-nowrap shrink-0
                transition-smooth font-medium text-sm
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              title={item?.description}
            >
              <Icon 
                name={item?.icon} 
                size={17} 
                color={isActivePath(item?.path) ? 'currentColor' : 'var(--color-foreground)'} 
              />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section: System Status & User Menu */}
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          {/* System Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 bg-muted/50 rounded-md shrink-0">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${systemStatus === 'syncing' ? 'animate-pulse-subtle' : ''}`} />
            <span className="text-xs font-caption text-muted-foreground whitespace-nowrap">
              {getStatusLabel()}
            </span>
          </div>

          {/* User Context Menu */}
          <div className="relative shrink-0" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-muted/50 rounded-md hover:bg-muted transition-smooth min-w-0"
              aria-label="Menu utilisateur"
              aria-expanded={userMenuOpen}
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              <div className="hidden md:flex flex-col items-start min-w-0 max-w-[140px] xl:max-w-none">
                <span className="text-sm font-medium text-foreground truncate">Responsable opérations</span>
                <span className="text-xs text-muted-foreground font-caption truncate">Administrateur</span>
              </div>
              <Icon 
                name={userMenuOpen ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                color="var(--color-muted-foreground)" 
                className="shrink-0"
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover rounded-md shadow-elevation-3 py-2 z-[1100] animate-slide-in border border-border">
                <button
                  type="button"
                  onClick={handleParametres}
                  className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center gap-2"
                >
                  <Icon name="Settings" size={16} color="var(--color-foreground)" />
                  Paramètres
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center gap-2"
                >
                  <Icon name="LogOut" size={16} color="var(--color-foreground)" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle - affiché sur écrans plus petits que lg */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth shrink-0"
            aria-label="Ouvrir le menu"
          >
            <Icon 
              name={mobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              color="var(--color-foreground)" 
            />
          </button>
        </div>
      </div>
      {/* Mobile / Tablette Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-14 sm:top-[60px] left-0 right-0 bg-card shadow-elevation-3 z-[1100] animate-slide-in">
          <nav className="flex flex-col p-4 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md
                  transition-smooth font-medium text-sm
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActivePath(item?.path) ? 'currentColor' : 'var(--color-foreground)'} 
                />
                <div className="flex flex-col">
                  <span>{item?.label}</span>
                  <span className="text-xs opacity-70 font-caption">{item?.description}</span>
                </div>
              </Link>
            ))}

            {/* Mobile System Status */}
            <div className="flex items-center gap-2 px-4 py-3 mt-2 bg-muted/50 rounded-md">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${systemStatus === 'syncing' ? 'animate-pulse-subtle' : ''}`} />
              <span className="text-sm font-caption text-muted-foreground">
                {getStatusLabel()}
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;