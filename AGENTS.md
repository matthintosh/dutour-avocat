# Site du cabinet Élodie Dutour — notes pour agents

Site statique Astro, français, déployé sur Firebase Hosting. Voir `README.md`
pour les commandes et l'organisation des fichiers.

## Règles propres à ce projet

- **Les faits du cabinet ne s'inventent pas.** Adresse, téléphone, SIRET,
  diplômes, date de création (2019), tarif de la première consultation
  (240 € TTC) : tout est dans `src/data/cabinet.ts` et provient du site
  existant. Ne jamais compléter une information manquante par une supposition —
  la signaler comme à compléter, à la manière des blocs `.a-completer` de
  `src/pages/mentions-legales.astro`.
- **Déontologie (RIN art. 10).** La publicité des avocats doit rester digne et
  non trompeuse. Interdits : témoignages de clients, taux de réussite, résultats
  chiffrés, mentions comparatives ou superlatives (« le meilleur avocat… »).
- **Pas de requête vers un tiers.** Polices auto-hébergées, aucune carte
  externe, aucun traceur, aucun cookie — la politique de confidentialité
  l'affirme, le code doit le tenir.
- **Typographie.** Ne pas saisir d'espaces insécables à la main :
  `scripts/typographie.mjs` les pose à la compilation.
- **Images.** Toujours passer par `<Image>` d'`astro:assets` avec `widths` et
  `sizes`. Pas de photo décorative de palais de justice, de marteau d'audience
  ni de balance : le parti pris est typographique, le portrait est la seule
  photographie du site.
- **Interpolations JSX.** Attention aux espaces avalées entre deux expressions
  placées sur des lignes différentes (`{a}\n{b}` colle les deux valeurs).
  Utiliser un gabarit `{`${a} ${b}`}` ou `{' '}`.

## Vérifications avant de livrer

```
npm run build && npm run preview
```

Puis : aucune erreur console, aucun débordement horizontal à 360 px, contraste
AA, navigation au clavier, `sitemap-0.xml` à jour, JSON-LD valide.
