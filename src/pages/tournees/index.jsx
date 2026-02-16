import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useData } from '../../context/DataContext';

const STATUS_OPTIONS = [
  { value: "À l'heure", label: "À l'heure" },
  { value: 'En retard', label: 'En retard' },
  { value: 'Critique', label: 'Critique' },
];

const SECTEUR_OPTIONS = [
  { value: 'Yaoundé Centre', label: 'Yaoundé Centre' },
  { value: 'Yaoundé Nord', label: 'Yaoundé Nord' },
  { value: 'Yaoundé Est', label: 'Yaoundé Est' },
  { value: 'Yaoundé Sud', label: 'Yaoundé Sud' },
  { value: 'Douala', label: 'Douala' },
  { value: 'Autre', label: 'Autre' },
];

const Tournees = () => {
  const { tournees, chauffeurs, camions, unites, addTournee, updateTournee, deleteTournee, getToday } = useData();
  const today = getToday();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterDate, setFilterDate] = useState(today);
  const [form, setForm] = useState({
    name: '',
    chauffeurId: '',
    camionId: '',
    uniteId: '',
    status: "À l'heure",
    completion: 50,
    secteur: 'Yaoundé Centre',
    datePrevue: today,
  });

  const chauffeurOptions = useMemo(
    () => chauffeurs.map((c) => ({ value: c.id, label: c.nom })),
    [chauffeurs]
  );
  const camionOptions = useMemo(
    () => [{ value: '', label: '— Aucun —' }, ...camions.map((c) => ({ value: c.id, label: `${c.numero}${c.capacite ? ' (' + c.capacite + ')' : '' }` }))],
    [camions]
  );
  const uniteOptions = useMemo(
    () => [{ value: '', label: '— Aucune —' }, ...unites.map((u) => ({ value: u.id, label: u.nom }))],
    [unites]
  );

  const tourneesFiltrees = useMemo(
    () => tournees.filter((t) => (t.datePrevue || today) === filterDate),
    [tournees, filterDate, today]
  );

  const getChauffeurNom = (chauffeurId) => chauffeurs.find((c) => c.id === chauffeurId)?.nom || '—';
  const getCamionNumero = (camionId) => camions.find((c) => c.id === camionId)?.numero || '—';
  const getUniteNom = (uniteId) => unites.find((u) => u.id === uniteId)?.nom || '—';

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      chauffeurId: chauffeurs[0]?.id || '',
      camionId: '',
      uniteId: '',
      status: "À l'heure",
      completion: 50,
      secteur: 'Yaoundé Centre',
      datePrevue: today,
    });
    setShowForm(true);
  };

  const handleOpenEdit = (t) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      chauffeurId: t.chauffeurId || '',
      camionId: t.camionId || '',
      uniteId: t.uniteId || '',
      status: t.status,
      completion: t.completion ?? 0,
      secteur: t.secteur || 'Yaoundé Centre',
      datePrevue: t.datePrevue || today,
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.chauffeurId) return;
    const completion = Math.min(100, Math.max(0, Number(form.completion) || 0));
    const payload = {
      name: form.name,
      chauffeurId: form.chauffeurId,
      camionId: form.camionId || undefined,
      uniteId: form.uniteId || undefined,
      status: form.status,
      secteur: form.secteur,
      datePrevue: form.datePrevue,
      completion,
    };
    if (editingId) {
      updateTournee(editingId, payload);
    } else {
      addTournee(payload);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette tournée ?')) deleteTournee(id);
  };

  return (
    <>
      <Helmet>
        <title>Tournées – Gestion des déchets Cameroun</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-14 sm:pt-[60px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Planification des tournées</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm font-medium text-foreground">Afficher les tournées du :</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-card text-foreground text-sm"
              />
            </div>
            <Button variant="primary" iconName="Plus" iconPosition="left" onClick={handleOpenAdd} className="shrink-0">
              Programmer une tournée
            </Button>
          </div>

          {showForm && (
            <div className="bg-card rounded-lg border border-border p-4 md:p-6 mb-6 shadow-elevation-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {editingId ? 'Modifier la tournée' : 'Nouvelle tournée'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Quartier / secteur de collecte"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Quartier Bastos"
                  required
                />
                <Select
                  label="Secteur (zone)"
                  options={SECTEUR_OPTIONS}
                  value={form.secteur}
                  onChange={(v) => setForm((f) => ({ ...f, secteur: v }))}
                />
                <Select
                  label="Chauffeur"
                  options={chauffeurOptions}
                  value={form.chauffeurId}
                  onChange={(v) => setForm((f) => ({ ...f, chauffeurId: v }))}
                  placeholder="Choisir un chauffeur"
                />
                <Select
                  label="Camion / Benne"
                  options={camionOptions}
                  value={form.camionId}
                  onChange={(v) => setForm((f) => ({ ...f, camionId: v }))}
                />
                <Select
                  label="Unité opérationnelle"
                  options={uniteOptions}
                  value={form.uniteId}
                  onChange={(v) => setForm((f) => ({ ...f, uniteId: v }))}
                />
                <Input
                  label="Date prévue de collecte"
                  type="date"
                  value={form.datePrevue}
                  onChange={(e) => setForm((f) => ({ ...f, datePrevue: e.target.value }))}
                />
                <Select
                  label="Statut"
                  options={STATUS_OPTIONS}
                  value={form.status}
                  onChange={(v) => setForm((f) => ({ ...f, status: v }))}
                />
                <Input
                  label="Progression (%)"
                  type="number"
                  min={0}
                  max={100}
                  value={form.completion}
                  onChange={(e) => setForm((f) => ({ ...f, completion: e.target.value }))}
                />
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" variant="primary">{editingId ? 'Enregistrer' : 'Programmer'}</Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>Annuler</Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-card rounded-xl shadow-elevation-2 border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="p-3 font-medium text-foreground">Date</th>
                    <th className="p-3 font-medium text-foreground">Secteur</th>
                    <th className="p-3 font-medium text-foreground">Tournée</th>
                    <th className="p-3 font-medium text-foreground">Chauffeur</th>
                    <th className="p-3 font-medium text-foreground">Camion</th>
                    <th className="p-3 font-medium text-foreground">Unité</th>
                    <th className="p-3 font-medium text-foreground">Statut</th>
                    <th className="p-3 font-medium text-foreground">Progression</th>
                    <th className="p-3 font-medium text-foreground w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tourneesFiltrees.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-muted-foreground">
                        Aucune tournée pour cette date. Programmez une tournée et choisissez la date.
                      </td>
                    </tr>
                  ) : (
                    tourneesFiltrees.map((r) => (
                      <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3 text-muted-foreground">{r.datePrevue || '—'}</td>
                        <td className="p-3 text-foreground">{r.secteur || '—'}</td>
                        <td className="p-3 font-medium text-foreground">{r.name}</td>
                        <td className="p-3 text-foreground">{getChauffeurNom(r)}</td>
                        <td className="p-3 text-muted-foreground">{getCamionNumero(r.camionId)}</td>
                        <td className="p-3 text-muted-foreground">{getUniteNom(r.uniteId)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            r.status === "À l'heure" ? 'bg-success/10 text-success' :
                            r.status === 'En retard' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-foreground">{r.completion} %</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button type="button" onClick={() => handleOpenEdit(r)} className="text-xs text-primary hover:underline">Modifier</button>
                            <button type="button" onClick={() => handleDelete(r.id)} className="text-xs text-error hover:underline">Supprimer</button>
                          </div>
                        </td>
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

export default Tournees;
