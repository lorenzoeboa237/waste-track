import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useData } from '../../context/DataContext';

const Unites = () => {
  const { unites, addUnite, updateUnite, deleteUnite } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ nom: '', secteur: '' });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ nom: '', secteur: '' });
    setShowForm(true);
  };

  const handleOpenEdit = (u) => {
    setEditingId(u.id);
    setForm({ nom: u.nom || '', secteur: u.secteur || '' });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom.trim()) return;
    if (editingId) {
      updateUnite(editingId, form);
    } else {
      addUnite(form);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette unité ?')) deleteUnite(id);
  };

  return (
    <>
      <Helmet>
        <title>Unités – Gestion des déchets Cameroun</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-14 sm:pt-[60px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Unités opérationnelles</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <p className="text-sm text-muted-foreground sm:max-w-xl">
              Unités de collecte par secteur (ex. Unité Yaoundé-Centre).
            </p>
            <Button variant="primary" iconName="Plus" iconPosition="left" onClick={handleOpenAdd} className="shrink-0">
              Ajouter une unité
            </Button>
          </div>

          {showForm && (
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-6 shadow-elevation-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {editingId ? 'Modifier l\'unité' : 'Nouvelle unité'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nom de l'unité"
                  value={form.nom}
                  onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                  placeholder="Ex: Unité Yaoundé-Centre"
                  required
                />
                <Input
                  label="Secteur"
                  value={form.secteur}
                  onChange={(e) => setForm((f) => ({ ...f, secteur: e.target.value }))}
                  placeholder="Ex: Yaoundé Centre"
                />
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" variant="primary">{editingId ? 'Enregistrer' : 'Ajouter'}</Button>
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
                    <th className="p-3 font-medium text-foreground">Nom</th>
                    <th className="p-3 font-medium text-foreground">Secteur</th>
                    <th className="p-3 font-medium text-foreground w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {unites.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-muted-foreground">
                        Aucune unité. Cliquez sur « Ajouter une unité ».
                      </td>
                    </tr>
                  ) : (
                    unites.map((u) => (
                      <tr key={u.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3 font-medium text-foreground">{u.nom}</td>
                        <td className="p-3 text-muted-foreground">{u.secteur || '—'}</td>
                        <td className="p-3">
                          <button type="button" onClick={() => handleOpenEdit(u)} className="text-xs text-primary hover:underline mr-2">Modifier</button>
                          <button type="button" onClick={() => handleDelete(u.id)} className="text-xs text-error hover:underline">Supprimer</button>
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

export default Unites;
