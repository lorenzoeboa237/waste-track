import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useData } from '../../context/DataContext';

const Chauffeurs = () => {
  const { chauffeurs, addChauffeur, updateChauffeur, deleteChauffeur } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ nom: '', telephone: '' });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ nom: '', telephone: '' });
    setShowForm(true);
  };

  const handleOpenEdit = (c) => {
    setEditingId(c.id);
    setForm({ nom: c.nom || '', telephone: c.telephone || '' });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom.trim()) return;
    if (editingId) {
      updateChauffeur(editingId, form);
    } else {
      addChauffeur(form);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce chauffeur ?')) deleteChauffeur(id);
  };

  return (
    <>
      <Helmet>
        <title>Chauffeurs – Gestion des déchets Cameroun</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-14 sm:pt-[60px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Chauffeurs</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <p className="text-sm text-muted-foreground sm:max-w-xl">
              Gérer les chauffeurs assignés aux tournées.
            </p>
            <Button variant="primary" iconName="Plus" iconPosition="left" onClick={handleOpenAdd} className="shrink-0">
              Ajouter un chauffeur
            </Button>
          </div>

          {showForm && (
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-6 shadow-elevation-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {editingId ? 'Modifier le chauffeur' : 'Nouveau chauffeur'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nom complet"
                  value={form.nom}
                  onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                  placeholder="Ex: Jean-Marie Mbarga"
                  required
                />
                <Input
                  label="Téléphone"
                  value={form.telephone}
                  onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                  placeholder="237 6XX XXX XXX"
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
                    <th className="p-3 font-medium text-foreground">Téléphone</th>
                    <th className="p-3 font-medium text-foreground w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {chauffeurs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-muted-foreground">
                        Aucun chauffeur. Cliquez sur « Ajouter un chauffeur ».
                      </td>
                    </tr>
                  ) : (
                    chauffeurs.map((c) => (
                      <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3 font-medium text-foreground">{c.nom}</td>
                        <td className="p-3 text-muted-foreground">{c.telephone || '—'}</td>
                        <td className="p-3">
                          <button type="button" onClick={() => handleOpenEdit(c)} className="text-xs text-primary hover:underline mr-2">Modifier</button>
                          <button type="button" onClick={() => handleDelete(c.id)} className="text-xs text-error hover:underline">Supprimer</button>
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

export default Chauffeurs;
