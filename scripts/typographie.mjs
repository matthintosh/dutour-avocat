/**
 * Typographie française — exécuté après `astro build`, sur les fichiers de dist/.
 *
 * Applique les espaces insécables imposées par l'usage français :
 *   — espace insécable (U+00A0) avant « : », et à l'intérieur des guillemets ;
 *   — espace fine insécable (U+202F) avant « ; », « ? », « ! », « % » ;
 *   — espace insécable entre un nombre et son unité (240 € TTC, 75003 Paris).
 *
 * Seuls les nœuds de texte sont traités : le contenu des balises <script>,
 * <style> et <pre>, ainsi que toutes les valeurs d'attributs, sont laissés
 * intacts (sans quoi les URL et le JSON-LD seraient corrompus).
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const INSECABLE = ' ';
const FINE = ' ';

/** Réécrit un fragment de texte brut (jamais du balisage). */
function corriger(texte) {
  return (
    texte
      // Espace fine insécable avant les ponctuations hautes doubles
      .replace(/[  ]+([;?!])/g, `${FINE}$1`)
      // Espace insécable avant le deux-points
      .replace(/[  ]+:/g, `${INSECABLE}:`)
      // Guillemets français : collés à leur contenu par une insécable
      .replace(/«[  ]*/g, `«${INSECABLE}`)
      .replace(/[  ]*»/g, `${INSECABLE}»`)
      // Nombre suivi d'un symbole monétaire (€ n'est pas un caractère de mot :
      // pas de \b possible après lui)
      .replace(/(\d)[ ]+€/g, `$1${INSECABLE}€`)
      // Nombre suivi d'une unité
      .replace(/(\d)[ ]+(km|kg|h)\b/g, `$1${INSECABLE}$2`)
      // Pourcentage : fine insécable
      .replace(/(\d)[  ]*%/g, `$1${FINE}%`)
      // « n° 71-1130 », « article L. 111-1 » : on garde le nombre soudé au sigle
      .replace(/\bn°[ ]+(\d)/g, `n°${INSECABLE}$1`)
      .replace(/\bL\.[ ]+(\d)/g, `L.${INSECABLE}$1`)
  );
}

/** Traite un document HTML en ne touchant qu'aux nœuds de texte. */
function traiterHtml(html) {
  const opaques = new Set(['script', 'style', 'pre', 'textarea', 'code']);
  let dans = null;
  let resultat = '';
  let i = 0;

  while (i < html.length) {
    const debut = html.indexOf('<', i);

    if (debut === -1) {
      resultat += dans ? html.slice(i) : corriger(html.slice(i));
      break;
    }

    const texte = html.slice(i, debut);
    resultat += dans ? texte : corriger(texte);

    const fin = html.indexOf('>', debut);
    if (fin === -1) {
      resultat += html.slice(debut);
      break;
    }

    const balise = html.slice(debut, fin + 1);
    resultat += balise;

    const nom = /^<\/?\s*([a-zA-Z0-9-]+)/.exec(balise)?.[1]?.toLowerCase();
    if (nom && opaques.has(nom)) {
      dans = balise.startsWith('</') ? null : nom;
    }

    i = fin + 1;
  }

  return resultat;
}

async function* fichiers(racine) {
  for (const entree of await readdir(racine, { withFileTypes: true })) {
    const chemin = join(racine, entree.name);
    if (entree.isDirectory()) yield* fichiers(chemin);
    else if (extname(entree.name) === '.html') yield chemin;
  }
}

let traites = 0;
let corrections = 0;

for await (const chemin of fichiers('dist')) {
  const avant = await readFile(chemin, 'utf8');
  const apres = traiterHtml(avant);
  if (avant !== apres) {
    await writeFile(chemin, apres, 'utf8');
    corrections += [...apres].filter(
      (c) => c === INSECABLE || c === FINE,
    ).length;
  }
  traites += 1;
}

console.log(
  `typographie : ${traites} page(s) traitée(s), ${corrections} espace(s) insécable(s) posée(s)`,
);
