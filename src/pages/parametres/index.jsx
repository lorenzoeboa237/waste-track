import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';

const Parametres = () => {
  return (
    <>
      <Helmet>
        <title>Paramètres – Gestion des déchets Cameroun</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-14 sm:pt-[60px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Paramètres</h1>
            <p className="text-muted-foreground mb-6">
              Configuration de l'application. Les options avancées (thème, langue, export) seront disponibles avec le backend.
            </p>
            <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2 max-w-xl">
              <h2 className="font-semibold text-foreground mb-2">Application</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Données stockées localement dans le navigateur. Aucun compte requis pour cette version.
              </p>
              <Link to="/" className="text-sm font-medium text-primary hover:underline">
                ← Retour au tableau de bord
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Parametres;
