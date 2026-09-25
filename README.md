# dutour-avocat.fr

Site du cabinet de Maître Élodie Dutour, avocat au barreau de Paris — droit de
la famille, des personnes et de leur patrimoine.

Site statique construit avec [Astro](https://astro.build), hébergé sur Firebase
Hosting. Aucun JavaScript côté client hormis le menu mobile et le formulaire de
contact ; aucune requête vers un service tiers, aucun cookie, aucun traceur.

---

## Avant la mise en ligne — deux informations à compléter

Deux mentions obligatoires manquent, faute d'avoir l'information. Elles sont
signalées en rouge sur la page `/mentions-legales` :

1. **L'assurance de responsabilité civile professionnelle** — nom et adresse de
   l'assureur, numéro de police, couverture géographique. Ces éléments figurent
   sur l'attestation annuelle communiquée par l'Ordre.
2. **L'hébergeur** — vérifier l'entité exacte au moment de la mise en ligne.

Les deux se corrigent dans `src/pages/mentions-legales.astro`, dans les blocs
`<div class="a-completer">` (supprimer le bloc une fois le texte renseigné).

---

## Commandes

| Commande | Effet |
| --- | --- |
| `npm install` | Installe les dépendances (une seule fois) |
| `npm run dev` | Serveur local de développement sur http://localhost:4321 |
| `npm run build` | Génère le site dans `dist/` puis applique la typographie française |
| `npm run preview` | Sert le site généré, tel qu'il sera en ligne |
| `firebase deploy` | Publie `dist/` sur dutour-avocat.fr |

Mise en ligne : `npm run build && firebase deploy`.

---

## Où modifier quoi

### Coordonnées, tarif, domaines

Tout est centralisé dans **`src/data/cabinet.ts`** : adresse, téléphone, fax,
courriel, métro, SIRET, montant de la première consultation, et la liste des
quatre domaines d'intervention. Une modification faite là se répercute sur
l'ensemble du site — en-tête, pied de page, pages, données structurées.

### Textes des pages

Une page par fichier dans `src/pages/` :

| Fichier | Adresse en ligne |
| --- | --- |
| `index.astro` | `/` |
| `le-cabinet.astro` | `/le-cabinet` |
| `divorce-et-separation.astro` | `/divorce-et-separation` |
| `patrimoine.astro` | `/patrimoine` |
| `enfants-et-filiation.astro` | `/enfants-et-filiation` |
| `droit-penal.astro` | `/droit-penal` |
| `honoraires.astro` | `/honoraires` |
| `contact.astro` | `/contact` |
| `mentions-legales.astro` | `/mentions-legales` |
| `politique-de-confidentialite.astro` | `/politique-de-confidentialite` |

Chaque page de domaine contient, en haut du fichier, ses **étapes** (« Comment
ça se passe ») et sa **foire aux questions** sous forme de listes : il suffit
d'y ajouter ou retirer une entrée.

Les questions/réponses alimentent automatiquement les données structurées
`FAQPage` lues par Google.

### Apparence

- `src/styles/global.css` — couleurs, typographie, échelle de tailles.
- Chaque composant et chaque page portent leur propre `<style>`, dont la portée
  est limitée au fichier.

---

## Formulaire de contact

Par défaut, `FORMULAIRE_ENDPOINT` est vide dans `src/data/cabinet.ts`. Dans cet
état, le formulaire **ouvre le logiciel de messagerie du visiteur avec un
message pré-rempli** : aucune donnée ne transite par un tiers, et rien n'est à
configurer.

Pour recevoir les demandes directement par courriel, créez un compte sur un
service de formulaire (Web3Forms ou Formspree, offres gratuites, serveurs
européens disponibles) et renseignez l'URL d'envoi :

```ts
export const FORMULAIRE_ENDPOINT = 'https://api.web3forms.com/submit';
```

Il faut alors ajouter le champ caché contenant votre clé d'accès dans
`src/pages/contact.astro`. L'envoi bascule automatiquement en AJAX, avec message
de confirmation et repli sur le courriel en cas d'échec.

> Le formulaire affiche en permanence un avertissement demandant de **ne pas
> transmettre d'éléments confidentiels** : le secret professionnel s'exerce par
> téléphone ou au cabinet, pas dans un formulaire web.

---

## Choix techniques

- **Polices auto-hébergées** (Spectral et Archivo, via `@fontsource`). Aucune
  requête vers Google Fonts : le chargement à distance transmet l'adresse IP des
  visiteurs à un tiers, ce que le RGPD n'autorise pas sans base légale.
- **Images optimisées à la compilation** par Astro (AVIF/WebP, tailles
  multiples, dimensions déclarées). Le portrait passe de 733 Ko à une vingtaine
  de kilo-octets à l'affichage.
- **Pas de carte interactive.** L'ancienne carte Mapbox imposait une clé d'API,
  un gros script et des requêtes vers un tiers ; elle est remplacée par
  l'adresse, les stations de métro et un lien d'itinéraire.
- **Typographie française appliquée à la compilation** par
  `scripts/typographie.mjs` : espaces insécables avant `: ; ? !`, à l'intérieur
  des guillemets, et entre un nombre et son unité. Inutile de les saisir à la
  main dans les textes.
- **Déontologie.** Les textes respectent l'article 10 du RIN : pas de
  témoignages clients, pas de taux de réussite, aucune mention comparative ou
  superlative.

---

## Poids des pages

| Page | Poids total (première visite, polices comprises) |
| --- | --- |
| Accueil | ~209 Ko |
| Pages de domaine | 26–33 Ko |
| Mentions légales | ~14 Ko |

Pour mémoire, l'ancien site chargeait plusieurs mégaoctets d'images non
compressées, le SDK Firebase et Mapbox GL sur une page unique.
