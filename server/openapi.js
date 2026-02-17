/**
 * Spécification OpenAPI 3.0 pour l'API Gestion des déchets (Waste Management).
 * Utilisée par Swagger UI à /api-docs.
 */
const basePath = process.env.API_BASE_PATH || '';

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API Gestion des déchets',
    description: 'API REST pour le système de gestion des déchets (chauffeurs, camions, unités, sites, tournées). Backend Express + MongoDB.',
    version: '1.0.0',
  },
  servers: [
    { url: basePath || '/', description: 'Serveur actuel' },
  ],
  tags: [
    { name: 'Health', description: 'Santé du service' },
    { name: 'Chauffeurs', description: 'Effectifs chauffeurs' },
    { name: 'Camions', description: 'Parc véhicules' },
    { name: 'Unités', description: 'Unités opérationnelles' },
    { name: 'Sites', description: 'Centres de transfert' },
    { name: 'Tournées', description: 'Planification des tournées' },
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Santé du service',
        responses: {
          200: {
            description: 'Service opérationnel',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { ok: { type: 'boolean', example: true } } },
              },
            },
          },
        },
      },
    },
    '/api/chauffeurs': {
      get: {
        tags: ['Chauffeurs'],
        summary: 'Liste des chauffeurs',
        responses: {
          200: {
            description: 'Liste des chauffeurs',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Chauffeur' },
                },
              },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
      post: {
        tags: ['Chauffeurs'],
        summary: 'Créer un chauffeur',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nom: { type: 'string', example: 'Jean Dupont' },
                  telephone: { type: 'string', example: '+237 6XX XXX XXX' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Chauffeur créé',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Chauffeur' } },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/chauffeurs/{id}': {
      put: {
        tags: ['Chauffeurs'],
        summary: 'Modifier un chauffeur',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nom: { type: 'string' },
                  telephone: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Chauffeur mis à jour',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Chauffeur' } },
            },
          },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
      delete: {
        tags: ['Chauffeurs'],
        summary: 'Supprimer un chauffeur',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Supprimé' },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/camions': {
      get: {
        tags: ['Camions'],
        summary: 'Liste des camions',
        responses: {
          200: {
            description: 'Liste des camions',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Camion' },
                },
              },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
      post: {
        tags: ['Camions'],
        summary: 'Créer un camion',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  numero: { type: 'string', example: 'CAM-001' },
                  capacite: { type: 'string', example: '10' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Camion créé',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Camion' } },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/camions/{id}': {
      put: {
        tags: ['Camions'],
        summary: 'Modifier un camion',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  numero: { type: 'string' },
                  capacite: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Camion mis à jour',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Camion' } },
            },
          },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
      delete: {
        tags: ['Camions'],
        summary: 'Supprimer un camion',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Supprimé' },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/unites': {
      get: {
        tags: ['Unités'],
        summary: 'Liste des unités',
        responses: {
          200: {
            description: 'Liste des unités',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Unite' },
                },
              },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
      post: {
        tags: ['Unités'],
        summary: 'Créer une unité',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nom: { type: 'string' },
                  secteur: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Unité créée',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Unite' } },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/unites/{id}': {
      put: {
        tags: ['Unités'],
        summary: 'Modifier une unité',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nom: { type: 'string' },
                  secteur: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Unité mise à jour',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Unite' } },
            },
          },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
      delete: {
        tags: ['Unités'],
        summary: 'Supprimer une unité',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Supprimé' },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/sites': {
      get: {
        tags: ['Sites'],
        summary: 'Liste des sites',
        responses: {
          200: {
            description: 'Liste des sites (centres de transfert)',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Site' },
                },
              },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
      post: {
        tags: ['Sites'],
        summary: 'Créer un site',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  capacity: { type: 'number', minimum: 0, maximum: 100 },
                  status: { type: 'string', example: 'Opérationnel' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Site créé',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Site' } },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/sites/{id}': {
      put: {
        tags: ['Sites'],
        summary: 'Modifier un site',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  capacity: { type: 'number', minimum: 0, maximum: 100 },
                  status: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Site mis à jour',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Site' } },
            },
          },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
      delete: {
        tags: ['Sites'],
        summary: 'Supprimer un site',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Supprimé' },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/tournees': {
      get: {
        tags: ['Tournées'],
        summary: 'Liste des tournées',
        responses: {
          200: {
            description: 'Liste des tournées',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Tournee' },
                },
              },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
      post: {
        tags: ['Tournées'],
        summary: 'Créer une tournée',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  chauffeurId: { type: 'string', nullable: true },
                  camionId: { type: 'string', nullable: true },
                  uniteId: { type: 'string', nullable: true },
                  status: { type: 'string', example: "À l'heure" },
                  completion: { type: 'number', minimum: 0, maximum: 100 },
                  secteur: { type: 'string' },
                  datePrevue: { type: 'string', format: 'date', example: '2026-02-16' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Tournée créée',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Tournee' } },
            },
          },
          500: { description: 'Erreur serveur' },
        },
      },
    },
    '/api/tournees/{id}': {
      put: {
        tags: ['Tournées'],
        summary: 'Modifier une tournée',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  chauffeurId: { type: 'string', nullable: true },
                  camionId: { type: 'string', nullable: true },
                  uniteId: { type: 'string', nullable: true },
                  status: { type: 'string' },
                  completion: { type: 'number', minimum: 0, maximum: 100 },
                  secteur: { type: 'string' },
                  datePrevue: { type: 'string', format: 'date' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Tournée mise à jour',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Tournee' } },
            },
          },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
      delete: {
        tags: ['Tournées'],
        summary: 'Supprimer une tournée',
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Supprimé' },
          404: { description: 'Non trouvé' },
          500: { description: 'Erreur serveur' },
        },
      },
    },
  },
  components: {
    parameters: {
      Id: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Identifiant MongoDB (ObjectId)',
        schema: { type: 'string', example: '507f1f77bcf86cd799439011' },
      },
    },
    schemas: {
      Chauffeur: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ObjectId hex' },
          nom: { type: 'string' },
          telephone: { type: 'string' },
        },
      },
      Camion: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          numero: { type: 'string' },
          capacite: { type: 'string' },
        },
      },
      Unite: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nom: { type: 'string' },
          secteur: { type: 'string' },
        },
      },
      Site: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          capacity: { type: 'number' },
          status: { type: 'string', example: 'Opérationnel' },
        },
      },
      Tournee: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          chauffeurId: { type: 'string', nullable: true },
          camionId: { type: 'string', nullable: true },
          uniteId: { type: 'string', nullable: true },
          status: { type: 'string' },
          completion: { type: 'number' },
          secteur: { type: 'string' },
          datePrevue: { type: 'string', format: 'date' },
        },
      },
    },
  },
};
