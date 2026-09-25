/**
 * Source unique de vérité pour les coordonnées et les données du cabinet.
 * Toute modification d'adresse, de téléphone ou de tarif se fait ici.
 */

export const cabinet = {
  nom: 'Élodie Dutour',
  titre: 'Avocat au barreau de Paris',
  specialite: 'Droit de la famille, des personnes et de leur patrimoine',
  site: 'https://dutour-avocat.fr',

  telephone: '01 81 80 04 27',
  telephoneLien: '+33181800427',
  fax: '01 76 54 86 26',
  courriel: 'e.dutour@dutour-avocat.fr',

  adresse: {
    rue: '92 boulevard de Sébastopol',
    codePostal: '75003',
    ville: 'Paris',
    pays: 'France',
    latitude: 48.866385,
    longitude: 2.352849,
  },

  metro: [
    { station: 'Réaumur — Sébastopol', lignes: '3 et 4' },
    { station: 'Arts et Métiers', lignes: '3 et 11' },
  ],

  accueil: 'Sur rendez-vous uniquement',

  premiereConsultation: '240 € TTC',

  siret: '809 658 842 00046',
} as const;

export const adresseComplete = `${cabinet.adresse.rue}, ${cabinet.adresse.codePostal} ${cabinet.adresse.ville}`;

/**
 * Point de configuration du formulaire de contact.
 *
 * Renseignez la clé d'accès de votre service de formulaire (Web3Forms,
 * Formspree…) pour activer l'envoi direct. Tant que la valeur reste vide,
 * le formulaire bascule automatiquement sur l'ouverture d'un courriel
 * pré-rempli : aucune donnée ne transite par un tiers.
 */
export const FORMULAIRE_ENDPOINT = '';

/* -------------------------------------------------------------------------- */

export interface Domaine {
  slug: string;
  /** Libellé court, pour la navigation */
  court: string;
  /** Titre complet de la page */
  titre: string;
  /** Phrase de situation, à hauteur du lecteur */
  situation: string;
  /** Résumé affiché sur la page d'accueil */
  resume: string;
  /** Interventions concrètes, reprises du site existant */
  interventions: string[];
  /** Libellé du lien depuis l'accueil — propre à chaque domaine */
  invitation: string;
}

export const domaines: Domaine[] = [
  {
    slug: 'divorce-et-separation',
    court: 'Divorce et séparation',
    titre: 'Divorce et séparation',
    situation:
      'Vous envisagez de vous séparer, ou votre conjoint vient de vous l’annoncer.',
    resume:
      'Divorce par consentement mutuel ou contentieux, rupture de PACS, séparation de concubins : organiser la fin d’une vie commune sans y perdre ses droits.',
    interventions: [
      'Divorce par consentement mutuel',
      'Divorce contentieux (acceptation du principe, altération définitive du lien conjugal, faute)',
      'Mesures provisoires : logement, pension alimentaire, résidence des enfants',
      'Dissolution de PACS',
      'Séparation de concubins',
    ],
    invitation: 'Les procédures possibles',
  },
  {
    slug: 'patrimoine',
    court: 'Patrimoine',
    titre: 'Patrimoine du couple et de la famille',
    situation:
      'Un logement acheté ensemble, une entreprise, une succession : il faut démêler ce qui appartient à qui.',
    resume:
      'Liquidation des intérêts patrimoniaux, régimes matrimoniaux, conventions de PACS ou de concubinage : sécuriser ce que vous avez construit.',
    interventions: [
      'Liquidation des intérêts patrimoniaux',
      'Partage des biens indivis et licitation',
      'Changement de régime matrimonial',
      'Convention de PACS ou de concubinage',
      'Conseils en matière patrimoniale',
    ],
    invitation: 'Comment se fait le partage',
  },
  {
    slug: 'enfants-et-filiation',
    court: 'Enfants et filiation',
    titre: 'Enfants et filiation',
    situation:
      'Le désaccord porte sur vos enfants : où ils vivent, quand vous les voyez, qui décide.',
    resume:
      'Autorité parentale, résidence, droit de visite, pension alimentaire, adoption, filiation, droits des grands-parents.',
    interventions: [
      'Fixation et révision des modalités d’exercice de l’autorité parentale : résidence habituelle, droit de visite et d’hébergement, contribution à l’entretien et à l’éducation de l’enfant',
      'Procédures en assistance éducative',
      'Procédures d’adoption',
      'Droits des grands-parents',
      'Recherche de maternité ou de paternité, contestation de paternité',
    ],
    invitation: 'Ce qui se décide, et par qui',
  },
  {
    slug: 'droit-penal',
    court: 'Droit pénal',
    titre: 'Droit pénal',
    situation:
      'Vous êtes convoqué, placé en garde à vue, ou vous avez été victime d’une infraction.',
    resume:
      'Assistance des victimes comme des personnes mises en cause, de l’enquête jusqu’à l’audience de jugement.',
    interventions: [
      'Assistance au stade de l’enquête : auditions libres et gardes à vue',
      'Assistance au cours de l’instruction',
      'Représentation devant les juridictions de jugement',
      'Constitution de partie civile et indemnisation du préjudice',
    ],
    invitation: 'Vos droits à chaque étape',
  },
];

export const getDomaine = (slug: string): Domaine => {
  const d = domaines.find((x) => x.slug === slug);
  if (!d) throw new Error(`Domaine inconnu : ${slug}`);
  return d;
};
