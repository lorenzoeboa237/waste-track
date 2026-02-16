import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useData } from '../../context/DataContext';

const STATUS_OPTIONS = [
  { value: 'Opérationnel', label: 'Opérationnel' },
  { value: 'Attention', label: 'Attention' },
  { value: 'Maintenance', label: 'Maintenance' },
];

const Sites = () => {
  const { sites, addSite, updateSite, deleteSite } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', capacity: 50, status: 'Opérationnel' });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ name: '', capacity: 50, status: 'Opérationnel' });
    setShowForm(true);
  };

  const handleOpenEdit = (s) => {
    setEditingId(s.id);
    setForm({ name: s.name, capacity: s.capacity ?? 0, status: s.status ?? 'Opérationnel' });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const capacity = Math.min(100, Math.max(0, Number(form.capacity) || 0));
    if (editingId) {
      updateSite(editingId, { ...form, capacity });
    } else {
      addSite({ ...form, capacity });
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce site ?')) deleteSite(id);
  };

  return (
    <>
      <Helmet>
        <title>Sites – Gestion des déchets Cameroun</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-14 sm:pt-[60px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Centres de transfert</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <p className="text-sm text-muted-foreground sm:max-w-xl">
              Suivi des capacités. Les sites à plus de 85 % apparaissent en alerte sur le tableau de bord (évacuation prioritaire).
            </p>
            <Button variant="primary" iconName="Plus" iconPosition="left" onClick={handleOpenAdd} className="shrink-0">
              Ajouter un centre
            </Button>
          </div>

          {showForm && (
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-6 shadow-elevation-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {editingId ? 'Modifier le centre' : 'Nouveau centre de transfert'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nom du centre"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Centre de transfert Yaoundé-Nord"
                  required
                />
                <Input
                  label="Capacité utilisée (%)"
                  type="number"
                  min={0}
                  max={100}
                  value={form.capacity}
                  onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
                />
                <Select
                  label="Statut"
                  options={STATUS_OPTIONS}
                  value={form.status}
                  onChange={(v) => setForm((f) => ({ ...f, status: v }))}
                />
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" variant="primary">
                    {editingId ? 'Enregistrer' : 'Ajouter'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sites.length === 0 ? (
              <div className="col-span-2 bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
                Aucun centre. Cliquez sur « Ajouter un centre » pour commencer.
              </div>
            ) : (
              sites.map((site) => (
                <div
                  key={site.id}
                  className="bg-card rounded-lg shadow-elevation-2 border border-border p-4 md:p-5"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{site.name}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(site)}
                        className="text-xs text-primary hover:underline"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(site.id)}
                        className="text-xs text-error hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacité utilisée</span>
                    <span className="font-medium text-foreground">{site.capacity} %</span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        site.capacity >= 85 ? 'bg-warning' : site.capacity >= 95 ? 'bg-error' : 'bg-primary'
                      }`}
                      style={{ width: `${site.capacity}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{site.status}</p>
                </div>
              ))
            )}
          </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Sites;
