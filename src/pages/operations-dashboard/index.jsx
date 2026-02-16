import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import { useData } from '../../context/DataContext';

const STATUS_ON_TIME = "À l'heure";
const STATUS_LATE = 'En retard';
const STATUS_CRITICAL = 'Critique';
const SEUIL_EVACUATION = 85;

const OperationsDashboard = () => {
  const { tournees, sites, chauffeurs, getToday } = useData();
  const today = getToday();
  const getChauffeurNom = (t) => {
    if (!t) return '—';
    if (t.chauffeurId) return chauffeurs.find((c) => c.id === t.chauffeurId)?.nom ?? '—';
    return t.driver || '—';
  };

  const tourneesDuJour = useMemo(
    () => tournees.filter((t) => (t.datePrevue || today) === today),
    [tournees, today]
  );

  const metrics = useMemo(() => {
    const total = tourneesDuJour.length;
    const onTime = tourneesDuJour.filter((t) => t.status === STATUS_ON_TIME).length;
    const late = tourneesDuJour.filter((t) => t.status === STATUS_LATE || t.status === STATUS_CRITICAL).length;
    const terminees = tourneesDuJour.filter((t) => (t.completion || 0) >= 100).length;
    const ponctualite = total ? Math.round((onTime / total) * 100) : 0;

    return [
      { title: 'Collecte du jour', value: String(total), unit: 'tournées prévues', icon: 'Route', trend: null, trendValue: null, color: 'primary' },
      { title: 'Terminées', value: String(terminees), unit: `sur ${total}`, icon: 'Clock', trend: null, trendValue: null, color: 'success' },
      { title: 'Ponctualité', value: String(ponctualite), unit: '% à l\'heure', icon: 'Trash2', trend: null, trendValue: null, color: 'primary' },
      { title: 'En retard', value: String(late), unit: 'tournées', icon: 'AlertTriangle', trend: null, trendValue: null, color: late > 0 ? 'warning' : 'primary' },
    ];
  }, [tourneesDuJour]);

  const sitesAEvacuer = useMemo(
    () => sites.filter((s) => (s.capacity || 0) >= SEUIL_EVACUATION),
    [sites]
  );

  const enRetardDuJour = useMemo(
    () => tourneesDuJour.filter((t) => t.status === STATUS_LATE || t.status === STATUS_CRITICAL),
    [tourneesDuJour]
  );

  return (
    <>
      <Helmet>
        <title>Tableau de bord – Gestion des déchets Cameroun</title>
        <meta name="description" content="Résumé opérationnel pour la collecte des déchets (type HYSACAM)." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-14 sm:pt-[60px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Résumé opérationnel</h1>
            <p className="text-muted-foreground mt-1.5 max-w-xl">
              Vue du jour pour suivre la collecte et les sites à évacuer.
            </p>
          </header>

          {(sitesAEvacuer.length > 0 || enRetardDuJour.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
              {sitesAEvacuer.length > 0 && (
                <div className="bg-warning/10 border border-warning/30 rounded-xl p-5 min-w-0 shadow-sm">
                  <h3 className="font-semibold text-foreground text-lg mb-1.5">Sites à évacuer en priorité</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Capacité ≥ {SEUIL_EVACUATION} % — prévoir une évacuation vers la décharge ou un centre de traitement.
                  </p>
                  <ul className="space-y-2.5 list-none">
                    {sitesAEvacuer.map((s) => (
                      <li key={s.id} className="flex items-start gap-2.5 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                        <span><strong className="font-medium">{s.name}</strong> — {s.capacity} % utilisée</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {enRetardDuJour.length > 0 && (
                <div className="bg-error/10 border border-error/30 rounded-xl p-5 min-w-0 shadow-sm">
                  <h3 className="font-semibold text-foreground text-lg mb-1.5">Tournées en retard aujourd'hui</h3>
                  <ul className="space-y-2.5 list-none">
                    {enRetardDuJour.map((t) => (
                      <li key={t.id} className="flex items-start gap-2.5 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" />
                        <span><strong className="font-medium">{t.name}</strong> ({t.secteur || '—'}) — {t.status} — {getChauffeurNom(t)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {metrics.map((m, i) => (
              <MetricCard key={i} {...m} />
            ))}
          </div>

          <div className="bg-card rounded-xl shadow-elevation-2 border border-border overflow-hidden min-w-0">
            <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold text-foreground">Collecte du jour</h2>
              <Link to="/tournees" className="text-sm font-medium text-primary hover:underline shrink-0">Voir tout et planifier →</Link>
            </div>
            <div className="overflow-x-auto scrollbar-custom">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="p-2 sm:p-3 font-medium text-foreground">Secteur</th>
                    <th className="p-2 sm:p-3 font-medium text-foreground">Tournée</th>
                    <th className="p-2 sm:p-3 font-medium text-foreground">Chauffeur</th>
                    <th className="p-2 sm:p-3 font-medium text-foreground">Statut</th>
                    <th className="p-2 sm:p-3 font-medium text-foreground">Progression</th>
                  </tr>
                </thead>
                <tbody>
                  {tourneesDuJour.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-muted-foreground">
                        Aucune tournée prévue aujourd'hui. Ajoutez des tournées et choisissez la date du jour.
                      </td>
                    </tr>
                  ) : (
                    tourneesDuJour.map((r) => (
                      <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-2 sm:p-3 text-foreground">{r.secteur || '—'}</td>
                        <td className="p-2 sm:p-3 font-medium text-foreground">{r.name}</td>
                        <td className="p-2 sm:p-3 text-foreground">{getChauffeurNom(r)}</td>
                        <td className="p-2 sm:p-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            r.status === STATUS_ON_TIME ? 'bg-success/10 text-success' :
                            r.status === STATUS_LATE ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-2 sm:p-3 text-foreground">{r.completion} %</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OperationsDashboard;
