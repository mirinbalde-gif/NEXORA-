/* NEXORA v2.0 (ecrans, plans, voix, PDF + NEXORA STORE + NEXORA AI SECURITY) \u2014 script.js
Aucune d\u00e9pendance. Tout fonctionne dans le navigateur (pas de backend). */
(function () {
'use strict';

/* Decode un texte compact (base64 ASCII) en objet JSON : evite les caracteres invisibles au collage */
function unpack(b64) {
var bin = atob(b64), bytes = new Uint8Array(bin.length), i;
for (i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
return JSON.parse(new TextDecoder('utf-8').decode(bytes));
}

/* Les gros textes (base64) sont dans index.html : balises <script type="text/plain" id="pk..."> */
function D(id) { var n = document.getElementById(id); return n ? n.textContent.replace(/\s+/g, '') : ''; }

/* ---------- 1. DONN\u00c9ES ----------
Les sites officiels ont \u00e9t\u00e9 confirm\u00e9s \u00e0 la date VERIFIED.
Les descriptions et les plateformes sont INDICATIVES (non v\u00e9rifi\u00e9es une \u00e0 une). */
var VERIFIED = '2026-10-26';
var CATALOG = [
/* --- Applications --- */
{ id: 'notion', cat: 'apps', name: 'Notion', url: 'https://www.notion.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['notes', 'productivite', 'productivity', 'organisation', 'wiki', 'taches', 'tasks', 'documents'],
d: { fr: 'Notes, documents et gestion de t\u00e2ches au m\u00eame endroit.', en: 'Notes, documents and task management in one place.' } },
{ id: 'duolingo', cat: 'apps', name: 'Duolingo', url: 'https://www.duolingo.com', plat: ['web', 'ios', 'android'],
tags: ['langues', 'languages', 'apprendre', 'learn', 'education', 'anglais', 'english', 'espagnol', 'spanish'],
d: { fr: 'Apprendre une langue avec de courtes le\u00e7ons.', en: 'Learn a language with short lessons.' } },
{ id: 'canva', cat: 'apps', name: 'Canva', url: 'https://www.canva.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['design', 'creation', 'affiche', 'poster', 'logo', 'images', 'video', 'presentation'],
d: { fr: 'Cr\u00e9er des visuels, pr\u00e9sentations et vid\u00e9os simples.', en: 'Create visuals, presentations and simple videos.' } },
{ id: 'signal', cat: 'apps', name: 'Signal', url: 'https://signal.org', plat: ['ios', 'android', 'pc'],
tags: ['messagerie', 'messaging', 'chat', 'communication', 'confidentialite', 'privacy', 'securite', 'security'],
d: { fr: 'Messagerie ax\u00e9e sur la confidentialit\u00e9.', en: 'Privacy-focused messaging app.' } },
{ id: 'telegram', cat: 'apps', name: 'Telegram', url: 'https://telegram.org', plat: ['web', 'ios', 'android', 'pc'],
tags: ['messagerie', 'messaging', 'chat', 'communication', 'groupes', 'groups', 'canaux'],
d: { fr: 'Messagerie avec groupes, canaux et appels.', en: 'Messaging with groups, channels and calls.' } },
{ id: 'whatsapp', cat: 'apps', name: 'WhatsApp', url: 'https://www.whatsapp.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['messagerie', 'messaging', 'chat', 'communication', 'appels', 'calls'],
d: { fr: 'Messagerie et appels par internet.', en: 'Messaging and calls over the internet.' } },
{ id: 'khanacademy', cat: 'apps', name: 'Khan Academy', url: 'https://www.khanacademy.org', plat: ['web', 'ios', 'android'],
tags: ['education', 'cours', 'courses', 'apprendre', 'learn', 'mathematiques', 'math', 'sciences', 'ecole', 'school'],
d: { fr: 'Cours en ligne dans de nombreuses mati\u00e8res.', en: 'Online courses in many subjects.' } },
{ id: 'trello', cat: 'apps', name: 'Trello', url: 'https://trello.com', plat: ['web', 'ios', 'android'],
tags: ['taches', 'tasks', 'projets', 'projects', 'organisation', 'productivite', 'productivity', 'kanban'],
d: { fr: 'Tableaux et cartes pour organiser des t\u00e2ches et des projets.', en: 'Boards and cards to organise tasks and projects.' } },
{ id: 'bitwarden', cat: 'apps', name: 'Bitwarden', url: 'https://bitwarden.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['mots de passe', 'mot de passe', 'password', 'passwords', 'securite', 'security', 'confidentialite', 'privacy'],
d: { fr: 'Gestionnaire de mots de passe.', en: 'Password manager.' } },
{ id: 'obsidian', cat: 'apps', name: 'Obsidian', url: 'https://obsidian.md', plat: ['ios', 'android', 'pc'],
tags: ['notes', 'organisation', 'productivite', 'productivity', 'texte', 'markdown', 'connaissances'],
d: { fr: 'Prise de notes en fichiers texte reli\u00e9s entre eux.', en: 'Note-taking with linked text files.' } },
{ id: 'todoist', cat: 'apps', name: 'Todoist', url: 'https://www.todoist.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['taches', 'tasks', 'todo', 'organisation', 'productivite', 'productivity', 'rappels'],
d: { fr: 'Liste de t\u00e2ches et organisation personnelle.', en: 'To-do list and personal organisation.' } },
{ id: 'spotify', cat: 'apps', name: 'Spotify', url: 'https://www.spotify.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['musique', 'music', 'podcasts', 'audio', 'ecouter', 'listen'],
d: { fr: '\u00c9coute de musique et de podcasts en ligne.', en: 'Stream music and podcasts online.' } },
/* --- Jeux --- */
{ id: 'minecraft', cat: 'games', name: 'Minecraft', url: 'https://www.minecraft.net', plat: ['pc', 'console', 'ios', 'android'],
tags: ['bac a sable', 'sandbox', 'construction', 'building', 'aventure', 'adventure', 'creatif'],
d: { fr: 'Jeu de construction et d\'exploration en monde ouvert.', en: 'Open-world building and exploration game.' } },
{ id: 'chesscom', cat: 'games', name: 'Chess.com', url: 'https://www.chess.com', plat: ['web', 'ios', 'android'],
tags: ['echecs', 'chess', 'strategie', 'strategy', 'reflexion', 'puzzle'],
d: { fr: 'Jouer et apprendre les \u00e9checs en ligne.', en: 'Play and learn chess online.' } },
{ id: 'lichess', cat: 'games', name: 'Lichess', url: 'https://lichess.org', plat: ['web', 'ios', 'android'],
tags: ['echecs', 'chess', 'strategie', 'strategy', 'gratuit', 'free', 'open source'],
d: { fr: 'Plateforme d\'\u00e9checs libre.', en: 'Free and open-source chess platform.' } },
{ id: 'amongus', cat: 'games', name: 'Among Us', url: 'https://www.innersloth.com', plat: ['pc', 'console', 'ios', 'android'],
tags: ['multijoueur', 'multiplayer', 'amis', 'friends', 'deduction', 'social'],
d: { fr: 'Jeu multijoueur de d\u00e9duction sociale.', en: 'Multiplayer social deduction game.' } },
{ id: 'fortnite', cat: 'games', name: 'Fortnite', url: 'https://www.fortnite.com', plat: ['pc', 'console', 'ios', 'android'],
tags: ['battle royale', 'multijoueur', 'multiplayer', 'tir', 'shooter', 'amis', 'friends', 'creation'],
d: { fr: 'Jeu en ligne de type battle royale et mondes cr\u00e9\u00e9s par des joueurs.', en: 'Online battle royale game and player-made worlds.' } },
{ id: 'roblox', cat: 'games', name: 'Roblox', url: 'https://www.roblox.com', plat: ['pc', 'console', 'ios', 'android'],
tags: ['multijoueur', 'multiplayer', 'creation', 'amis', 'friends', 'mondes', 'worlds'],
d: { fr: 'Plateforme de jeux et de mondes cr\u00e9\u00e9s par des joueurs.', en: 'Platform of games and worlds made by players.' } },
{ id: 'genshin', cat: 'games', name: 'Genshin Impact', url: 'https://genshin.hoyoverse.com', plat: ['pc', 'console', 'ios', 'android'],
tags: ['aventure', 'adventure', 'monde ouvert', 'open world', 'rpg', 'fantasy'],
d: { fr: 'Jeu d\'aventure en monde ouvert.', en: 'Open-world adventure game.' } },
{ id: 'clashroyale', cat: 'games', name: 'Clash Royale', url: 'https://supercell.com/en/games/clashroyale/', plat: ['ios', 'android', 'pc'],
tags: ['strategie', 'strategy', 'cartes', 'cards', 'multijoueur', 'multiplayer', 'duel'],
d: { fr: 'Jeu de strat\u00e9gie en duels avec des cartes.', en: 'Card-based strategy duel game.' } },
{ id: 'stardew', cat: 'games', name: 'Stardew Valley', url: 'https://www.stardewvalley.net', plat: ['pc', 'console', 'ios', 'android'],
tags: ['simulation', 'ferme', 'farming', 'detente', 'relax', 'rpg', 'indie'],
d: { fr: 'Jeu de simulation de ferme et de vie \u00e0 la campagne.', en: 'Farming and country-life simulation game.' } },
{ id: 'candycrush', cat: 'games', name: 'Candy Crush Saga', url: 'https://www.king.com/game/candycrush/', plat: ['web', 'ios', 'android'],
tags: ['puzzle', 'casual', 'detente', 'relax', 'bonbons'],
d: { fr: 'Jeu de puzzle o\u00f9 l\'on associe des bonbons.', en: 'Puzzle game about matching candies.' } },
{ id: 'subway', cat: 'games', name: 'Subway Surfers', url: 'https://subwaysurfers.com', plat: ['ios', 'android'],
tags: ['course', 'runner', 'arcade', 'casual'],
d: { fr: 'Jeu de course sans fin dans des d\u00e9cors urbains.', en: 'Endless runner set in city scenes.' } },
/* --- Outils d'IA --- */
{ id: 'chatgpt', cat: 'ai', name: 'ChatGPT', url: 'https://chatgpt.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['redaction', 'writing', 'texte', 'text', 'assistant', 'chatbot', 'recherche', 'research', 'code'],
d: { fr: 'Assistant conversationnel pour \u00e9crire, expliquer et programmer.', en: 'Conversational assistant for writing, explaining and coding.' } },
{ id: 'claude', cat: 'ai', name: 'Claude', url: 'https://claude.ai', plat: ['web', 'ios', 'android', 'pc'],
tags: ['redaction', 'writing', 'texte', 'text', 'assistant', 'chatbot', 'analyse', 'analysis', 'code', 'documents'],
d: { fr: 'Assistant conversationnel pour \u00e9crire, analyser des documents et programmer.', en: 'Conversational assistant for writing, analysing documents and coding.' } },
{ id: 'gemini', cat: 'ai', name: 'Gemini', url: 'https://gemini.google.com', plat: ['web', 'ios', 'android'],
tags: ['assistant', 'chatbot', 'redaction', 'writing', 'texte', 'text', 'recherche', 'research', 'images', 'google'],
d: { fr: 'Assistant d\'IA de Google pour \u00e9crire, rechercher et cr\u00e9er.', en: 'Google\'s AI assistant for writing, searching and creating.' } },
{ id: 'mscopilot', cat: 'ai', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', plat: ['web', 'pc'],
tags: ['assistant', 'chatbot', 'redaction', 'writing', 'texte', 'text', 'recherche', 'research', 'microsoft', 'images'],
d: { fr: 'Assistant d\'IA de Microsoft.', en: 'Microsoft\'s AI assistant.' } },
{ id: 'perplexity', cat: 'ai', name: 'Perplexity', url: 'https://www.perplexity.ai', plat: ['web', 'ios', 'android'],
tags: ['recherche', 'research', 'sources', 'questions', 'search'],
d: { fr: 'Moteur de r\u00e9ponses qui cite ses sources.', en: 'Answer engine that cites its sources.' } },
{ id: 'midjourney', cat: 'ai', name: 'Midjourney', url: 'https://www.midjourney.com', plat: ['web'],
tags: ['image', 'images', 'art', 'illustration', 'design', 'creation'],
d: { fr: 'G\u00e9n\u00e9ration d\'images \u00e0 partir de texte.', en: 'Text-to-image generation.' } },
{ id: 'suno', cat: 'ai', name: 'Suno', url: 'https://suno.com', plat: ['web'],
tags: ['musique', 'music', 'chanson', 'song', 'audio', 'creation'],
d: { fr: 'Cr\u00e9ation de musique et de chansons avec l\'IA.', en: 'Create music and songs with AI.' } },
{ id: 'elevenlabs', cat: 'ai', name: 'ElevenLabs', url: 'https://elevenlabs.io', plat: ['web'],
tags: ['voix', 'voice', 'audio', 'synthese vocale', 'text to speech', 'doublage', 'voiceover'],
d: { fr: 'Voix et synth\u00e8se vocale par IA.', en: 'AI voices and text-to-speech.' } },
{ id: 'runway', cat: 'ai', name: 'Runway', url: 'https://runwayml.com', plat: ['web'],
tags: ['video', 'creation', 'montage', 'editing', 'animation', 'image'],
d: { fr: 'Cr\u00e9ation et \u00e9dition de vid\u00e9o avec l\'IA.', en: 'Create and edit video with AI.' } },
{ id: 'copilot', cat: 'ai', name: 'GitHub Copilot', url: 'https://github.com/features/copilot', plat: ['pc', 'web'],
tags: ['code', 'programmation', 'programming', 'developpeur', 'developer'],
d: { fr: 'Aide \u00e0 la programmation dans l\'\u00e9diteur de code.', en: 'Coding help inside the code editor.' } },
{ id: 'cursor', cat: 'ai', name: 'Cursor', url: 'https://cursor.com', plat: ['pc'],
tags: ['code', 'programmation', 'programming', 'developpeur', 'developer', 'editeur', 'editor'],
d: { fr: '\u00c9diteur de code avec assistant IA.', en: 'Code editor with an AI assistant.' } },
{ id: 'deepl', cat: 'ai', name: 'DeepL', url: 'https://www.deepl.com', plat: ['web', 'ios', 'android', 'pc'],
tags: ['traduction', 'translation', 'translate', 'traduire', 'langues', 'languages', 'texte', 'text', 'documents'],
d: { fr: 'Traduction automatique de textes et de documents.', en: 'Machine translation of texts and documents.' } },
{ id: 'huggingface', cat: 'ai', name: 'Hugging Face', url: 'https://huggingface.co', plat: ['web'],
tags: ['modeles', 'models', 'open source', 'developpeur', 'developer', 'datasets', 'machine learning'],
d: { fr: 'Plateforme de mod\u00e8les et d\'outils d\'IA partag\u00e9s par la communaut\u00e9.', en: 'Platform of AI models and tools shared by the community.' } }
];

/* v1.7 : 84 produits de plus (texte compact). ver = domaine revu dans les resultats web le 28/10/2026 ; u = adresse connue, non reconfirmee en ligne */
var PACK_CAT = D('pk4');
try { CATALOG = CATALOG.concat(unpack(PACK_CAT)); } catch (e) { /* on garde les 36 produits */ }

/* ---------- 2. TRADUCTIONS (interface) ---------- */
var I18N = {
fr: { language: 'Langue', tagline: 'D\u00e9couvre les apps, jeux et outils d\'IA vraiment utiles', search_ph: 'Rechercher une app, un jeu, un outil IA...', search: 'Chercher',
tab_all: 'Tout', tab_apps: 'Applications', tab_games: 'Jeux', tab_ai: 'Outils IA', platform: 'Plateforme', all_platforms: 'Toutes', favorites: 'Favoris',
sort: 'Tri', sort_rel: 'Pertinence', sort_az: 'A \u2192 Z', match: 'Correspond \u00e0', understood: 'Compris :',
results: 'r\u00e9sultat(s)', no_results: 'Aucun r\u00e9sultat. Essaie un autre mot ou une autre plateforme.', no_fav: 'Aucun favori pour le moment.',
details: 'D\u00e9tails', open_official: 'Site officiel', close: 'Fermer', add_fav: 'Ajouter aux favoris', remove_fav: 'Retirer des favoris',
link_checked: 'Site officiel confirm\u00e9 le', plat_note: 'Description et plateformes : indicatives, \u00e0 v\u00e9rifier sur le site officiel.',
untranslated: 'Description non traduite dans cette langue (affich\u00e9e en fran\u00e7ais ou anglais).',
reco_title: 'Pour toi', reco_why: 'Proche de ton favori',
history: 'R\u00e9cent :', clear: 'Effacer', ai_badge: 'v0.3 \u00b7 assistant \u00e0 r\u00e8gles', ai_note: 'Ce n\'est pas encore un vrai mod\u00e8le d\'IA : il cherche dans le catalogue avec des r\u00e8gles simples.',
ai_ph: 'D\u00e9cris ton besoin...', send: 'Envoyer', speak: 'Lire les r\u00e9ponses \u00e0 voix haute',
ai_hello: 'Bonjour ! Dis-moi ce que tu veux faire (ex. \u00ab apprendre l\'anglais \u00bb, \u00ab traduire un texte \u00bb, \u00ab jeu d\'\u00e9checs sur iPhone \u00bb).',
ai_clarify: 'Dis-moi ton objectif en quelques mots (ex. \u00ab traduire un texte \u00bb, \u00ab jeu de strat\u00e9gie \u00bb, \u00ab apprendre l\'anglais \u00bb).',
ai_none: 'Je n\'ai rien trouv\u00e9 dans le catalogue. Peux-tu pr\u00e9ciser ton objectif ou la plateforme (iPhone, Android, web) ?',
ai_found: 'Voici ce que je propose :', ai_why: 'correspond \u00e0', ai_filtered: 'Filtr\u00e9 pour :', ai_open: 'Ouvrir la fiche :',
ai_followup: 'Tu cherches plut\u00f4t une app, un jeu ou un outil IA ?',
ai_uncertain: 'Ces suggestions viennent de mots-cl\u00e9s du catalogue, pas d\'une analyse intelligente : v\u00e9rifie sur le site officiel.',
voice_unsupported: 'La voix n\'est pas prise en charge par ce navigateur : utilise le clavier.',
voice_listen: 'Je t\'\u00e9coute...', voice_err: 'Micro indisponible ou refus\u00e9.', cat_apps: 'Application', cat_games: 'Jeu', cat_ai: 'Outil IA',
footer_data: 'Sites officiels confirm\u00e9s. Descriptions et plateformes indicatives. Aucun avis, prix ni note invent\u00e9.',
p_web: 'Web', p_ios: 'iPhone', p_android: 'Android', p_pc: 'PC', p_console: 'Console', store_err: 'Stockage local indisponible : les favoris ne seront pas conserv\u00e9s.',
corrected: 'Corrig\u00e9 :', ai_intro_intent: 'Pour \u00ab {x} \u00bb, je te propose :', ai_why_label: 'Pourquoi', ai_avail: 'Disponible sur :',
ai_corrected: 'J\'ai corrig\u00e9 {pairs}.',
ai_limit_business: 'Je ne peux pas t\'aider sur les d\u00e9marches l\u00e9gales, fiscales ou financi\u00e8res : ce n\'est pas dans le catalogue. Renseigne-toi aupr\u00e8s d\'un professionnel ou d\'un organisme officiel de ton pays.',
ai_compare_head: 'Comparaison, uniquement d\'apr\u00e8s notre catalogue :', ai_compare_common: 'Disponibles tous les deux sur :',
ai_compare_nodata: 'Je n\'ai pas de donn\u00e9es fiables sur le prix, la qualit\u00e9 ou les avis : ouvre les fiches et v\u00e9rifie sur les sites officiels.',
ai_info_similar: 'Dans le m\u00eame esprit :', ai_thanks: 'Avec plaisir ! Dis-moi si tu veux autre chose.',
ai_hello2: 'Bonjour ! Que veux-tu faire ? Choisis un exemple ou \u00e9cris ton objectif.',
ai_more_none: 'Je n\'ai plus d\'autre suggestion pour cette demande dans le catalogue. Essaie une autre formulation ou une autre plateforme.',
ai_examples: ['Je veux cr\u00e9er une entreprise', 'Apprendre l\'anglais', 'Un jeu d\'\u00e9checs sur iPhone'],
chip_other: 'Autre chose', chip_android: 'Sur Android', chip_ios: 'Sur iPhone',
sec_badge: 'v0 \u00b7 v\u00e9rificateur \u00e0 r\u00e8gles',
sec_note: 'Colle un lien : NEXORA AI SECURITY cherche des signaux de risque avec des r\u00e8gles simples. Ce n\'est pas un antivirus et \u00e7a ne garantit jamais qu\'un lien est s\u00fbr.',
sec_ph: 'Colle ici un lien ou une adresse web',
sec_btn: 'V\u00e9rifier',
sec_empty: 'Colle d\'abord un lien \u00e0 v\u00e9rifier.',
sec_host: 'Domaine analys\u00e9 :',
sec_why: 'Signaux relev\u00e9s :',
sec_none: 'Aucun signal suspect trouv\u00e9 par nos r\u00e8gles.',
sec_limits: 'Limites : je ne visite pas le lien, je ne connais pas les sites d\'hame\u00e7onnage r\u00e9cents et je peux me tromper dans les deux sens. V\u00e9rifie toujours l\'adresse avant de saisir un mot de passe ou un paiement.',
sec_official_btn: 'Site officiel de {x}',
sec_lvl_known: 'Domaine officiel du catalogue',
sec_lvl_unknown: 'Aucun signal suspect (site inconnu)',
sec_lvl_caution: 'Prudence',
sec_lvl_high: 'Risque \u00e9lev\u00e9',
sec_lvl_invalid: 'Adresse non reconnue',
sec_adv_known: 'Ce domaine correspond \u00e0 un site officiel confirm\u00e9 dans notre catalogue. V\u00e9rifie quand m\u00eame l\'adresse compl\u00e8te avant de te connecter.',
sec_adv_unknown: 'Nos r\u00e8gles n\'ont rien trouv\u00e9 de suspect, mais ce site n\'est pas dans notre catalogue : cela ne prouve pas qu\'il est s\u00fbr.',
sec_adv_caution: 'Certains signaux demandent de la prudence. N\'entre ni mot de passe ni paiement avant d\'avoir v\u00e9rifi\u00e9 sur le site officiel.',
sec_adv_high: 'Plusieurs signaux de risque. Je te conseille de ne pas ouvrir ce lien ni de saisir des informations personnelles.',
sec_adv_invalid: 'Ce texte ne ressemble pas \u00e0 une adresse web (ex. https://exemple.com).',
r_known: 'Domaine identique au site officiel de {x}, confirm\u00e9 dans le catalogue le {d}.',
r_assumed: 'Pas de \u00ab https:// \u00bb \u00e9crit : j\'ai analys\u00e9 https://{x}.',
r_nohttps: 'Le lien n\'utilise pas https (connexion non chiffr\u00e9e).',
r_scheme: 'Type de lien inhabituel ou dangereux : {x}',
r_ip: 'L\'adresse est une suite de chiffres (IP) au lieu d\'un nom de site.',
r_puny: 'Le nom contient des caract\u00e8res sp\u00e9ciaux d\u00e9guis\u00e9s (xn--) qui peuvent imiter un autre site.',
r_userinfo: 'Le lien contient \u00ab @ \u00bb : ce qui pr\u00e9c\u00e8de n\'est pas le vrai site, c\'est un proc\u00e9d\u00e9 classique pour tromper.',
r_look_exact: 'Le nom ressemble \u00e0 {x}, mais ce n\'est pas le domaine confirm\u00e9 dans notre catalogue ({y}). Peut \u00eatre l\u00e9gitime : v\u00e9rifie.',
r_look_homo: 'Ressemble \u00e0 {x} avec des lettres ou chiffres \u00e9chang\u00e9s (ex. 0 pour o) : imitation probable.',
r_look_close: 'Tr\u00e8s proche du nom de {x} \u00e0 une lettre pr\u00e8s : imitation possible.',
r_look_contains: 'Le nom contient \u00ab {x} \u00bb mais le domaine n\'est pas celui du site officiel ({y}).',
r_short: 'Lien raccourci : on ne voit pas la vraie destination.',
r_port: 'Num\u00e9ro de port inhabituel ({x}).',
r_exe: 'Le lien pointe vers un fichier \u00e0 t\u00e9l\u00e9charger ({x}).',
r_kw: 'Mots souvent utilis\u00e9s dans les arnaques : {x}.',
r_kwdl: 'Mots li\u00e9s aux t\u00e9l\u00e9chargements douteux : {x}.',
r_tld: 'Extension \u00ab .{x} \u00bb plus souvent utilis\u00e9e dans des abus (signal faible).',
r_sub: 'Beaucoup de sous-domaines : l\'adresse est compliqu\u00e9e \u00e0 lire.',
r_long: 'Adresse tr\u00e8s longue.',
r_hyph: 'Beaucoup de tirets dans le nom du domaine.',
r_samehost: 'Le domaine est celui de {x}, mais cette page n\'est pas celle de notre catalogue.' },
en: { language: 'Language', tagline: 'Discover truly useful apps, games and AI tools', search_ph: 'Search an app, a game, an AI tool...', search: 'Search',
tab_all: 'All', tab_apps: 'Apps', tab_games: 'Games', tab_ai: 'AI tools', platform: 'Platform', all_platforms: 'All', favorites: 'Favorites',
sort: 'Sort', sort_rel: 'Relevance', sort_az: 'A \u2192 Z', match: 'Matches', understood: 'Understood:',
results: 'result(s)', no_results: 'No results. Try another word or platform.', no_fav: 'No favorites yet.',
details: 'Details', open_official: 'Official site', close: 'Close', add_fav: 'Add to favorites', remove_fav: 'Remove from favorites',
link_checked: 'Official site confirmed on', plat_note: 'Description and platforms: indicative, check the official site.',
untranslated: 'Description not translated in this language (shown in French or English).',
reco_title: 'For you', reco_why: 'Close to your favorite',
history: 'Recent:', clear: 'Clear', ai_badge: 'v0.3 \u00b7 rule-based assistant', ai_note: 'This is not a real AI model yet: it searches the catalogue with simple rules.',
ai_ph: 'Describe what you need...', send: 'Send', speak: 'Read answers aloud',
ai_hello: 'Hello! Tell me what you want to do (e.g. "learn English", "translate a text", "chess game on iPhone").',
ai_clarify: 'Tell me your goal in a few words (e.g. "translate a text", "strategy game", "learn English").',
ai_none: 'I found nothing in the catalogue. Can you clarify your goal or the platform (iPhone, Android, web)?',
ai_found: 'Here is what I suggest:', ai_why: 'matches', ai_filtered: 'Filtered for:', ai_open: 'Open card:',
ai_followup: 'Are you looking for an app, a game or an AI tool?',
ai_uncertain: 'These suggestions come from catalogue keywords, not from intelligent analysis: check the official site.',
voice_unsupported: 'Voice is not supported by this browser: use the keyboard.',
voice_listen: 'Listening...', voice_err: 'Microphone unavailable or denied.', cat_apps: 'App', cat_games: 'Game', cat_ai: 'AI tool',
footer_data: 'Official sites confirmed. Descriptions and platforms are indicative. No invented reviews, prices or ratings.',
p_web: 'Web', p_ios: 'iPhone', p_android: 'Android', p_pc: 'PC', p_console: 'Console', store_err: 'Local storage unavailable: favorites will not be saved.',
corrected: 'Corrected:', ai_intro_intent: 'For "{x}", I suggest:', ai_why_label: 'Why', ai_avail: 'Available on:',
ai_corrected: 'I corrected {pairs}.',
ai_limit_business: 'I cannot help with legal, tax or financial steps: that is not in the catalogue. Ask a professional or an official body in your country.',
ai_compare_head: 'Comparison, based only on our catalogue:', ai_compare_common: 'Both available on:',
ai_compare_nodata: 'I have no reliable data on price, quality or reviews: open the cards and check the official sites.',
ai_info_similar: 'In the same spirit:', ai_thanks: 'You\'re welcome! Tell me if you need anything else.',
ai_hello2: 'Hello! What do you want to do? Pick an example or write your goal.',
ai_more_none: 'I have no more suggestions for this request in the catalogue. Try another wording or platform.',
ai_examples: ['I want to start a business', 'Learn English', 'A chess game on iPhone'],
chip_other: 'Something else', chip_android: 'On Android', chip_ios: 'On iPhone',
sec_badge: 'v0 \u00b7 rule-based checker',
sec_note: 'Paste a link: NEXORA AI SECURITY looks for risk signals with simple rules. It is not an antivirus and never guarantees that a link is safe.',
sec_ph: 'Paste a link or web address here',
sec_btn: 'Check',
sec_empty: 'Paste a link to check first.',
sec_host: 'Domain analysed:',
sec_why: 'Signals found:',
sec_none: 'No suspicious signal found by our rules.',
sec_limits: 'Limits: I do not visit the link, I do not know recent phishing sites, and I can be wrong both ways. Always check the address before entering a password or a payment.',
sec_official_btn: 'Official site of {x}',
sec_lvl_known: 'Official domain from the catalogue',
sec_lvl_unknown: 'No suspicious signal (unknown site)',
sec_lvl_caution: 'Caution',
sec_lvl_high: 'High risk',
sec_lvl_invalid: 'Address not recognised',
sec_adv_known: 'This domain matches an official site confirmed in our catalogue. Still check the full address before signing in.',
sec_adv_unknown: 'Our rules found nothing suspicious, but this site is not in our catalogue: that does not prove it is safe.',
sec_adv_caution: 'Some signals call for caution. Do not enter a password or payment details before checking the official site.',
sec_adv_high: 'Several risk signals. I advise you not to open this link nor to enter personal information.',
sec_adv_invalid: 'This text does not look like a web address (e.g. https://example.com).',
r_known: 'Domain identical to the official site of {x}, confirmed in the catalogue on {d}.',
r_assumed: 'No "https://" written: I analysed https://{x}.',
r_nohttps: 'The link does not use https (unencrypted connection).',
r_scheme: 'Unusual or dangerous link type: {x}',
r_ip: 'The address is a string of numbers (IP) instead of a site name.',
r_puny: 'The name contains disguised special characters (xn--) that can imitate another site.',
r_userinfo: 'The link contains "@": what comes before it is not the real site, a classic trick to deceive.',
r_look_exact: 'The name looks like {x}, but it is not the domain confirmed in our catalogue ({y}). It may be legitimate: check.',
r_look_homo: 'Looks like {x} with swapped letters or digits (e.g. 0 for o): likely imitation.',
r_look_close: 'Very close to the name of {x}, one letter off: possible imitation.',
r_look_contains: 'The name contains "{x}" but the domain is not the official site ({y}).',
r_short: 'Shortened link: the real destination is hidden.',
r_port: 'Unusual port number ({x}).',
r_exe: 'The link points to a file to download ({x}).',
r_kw: 'Words often used in scams: {x}.',
r_kwdl: 'Words linked to dubious downloads: {x}.',
r_tld: 'Extension ".{x}" is more often used in abuse (weak signal).',
r_sub: 'Many subdomains: the address is hard to read.',
r_long: 'Very long address.',
r_hyph: 'Many hyphens in the domain name.',
r_samehost: 'The domain is that of {x}, but this page is not the one in our catalogue.' },
ar: { language: '\u0627\u0644\u0644\u063a\u0629', tagline: '\u0627\u0643\u062a\u0634\u0641 \u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0648\u0623\u0644\u0639\u0627\u0628 \u0648\u0623\u062f\u0648\u0627\u062a \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0645\u0641\u064a\u062f\u0629 \u0641\u0639\u0644\u0627\u064b', search_ph: '\u0627\u0628\u062d\u062b \u0639\u0646 \u062a\u0637\u0628\u064a\u0642 \u0623\u0648 \u0644\u0639\u0628\u0629 \u0623\u0648 \u0623\u062f\u0627\u0629...', search: '\u0628\u062d\u062b',
tab_all: '\u0627\u0644\u0643\u0644', tab_apps: '\u062a\u0637\u0628\u064a\u0642\u0627\u062a', tab_games: '\u0623\u0644\u0639\u0627\u0628', tab_ai: '\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a', platform: '\u0627\u0644\u0645\u0646\u0635\u0629', all_platforms: '\u0627\u0644\u0643\u0644', favorites: '\u0627\u0644\u0645\u0641\u0636\u0644\u0629',
sort: '\u0627\u0644\u062a\u0631\u062a\u064a\u0628', sort_rel: '\u0627\u0644\u0623\u0643\u062b\u0631 \u0635\u0644\u0629', sort_az: '\u0623 \u2192 \u064a', match: '\u064a\u0637\u0627\u0628\u0642', understood: '\u0641\u0647\u0645\u062a:',
results: '\u0646\u062a\u064a\u062c\u0629', no_results: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c. \u062c\u0631\u0651\u0628 \u0643\u0644\u0645\u0629 \u0623\u0648 \u0645\u0646\u0635\u0629 \u0623\u062e\u0631\u0649.', no_fav: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0641\u0636\u0644\u0627\u062a \u0628\u0639\u062f.',
details: '\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644', open_official: '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a', close: '\u0625\u063a\u0644\u0627\u0642', add_fav: '\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0645\u0641\u0636\u0644\u0629', remove_fav: '\u0623\u0632\u0644 \u0645\u0646 \u0627\u0644\u0645\u0641\u0636\u0644\u0629',
link_checked: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a \u0641\u064a', plat_note: '\u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0645\u0646\u0635\u0627\u062a: \u0625\u0631\u0634\u0627\u062f\u064a\u0629\u060c \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a.',
untranslated: '\u0627\u0644\u0648\u0635\u0641 \u063a\u064a\u0631 \u0645\u062a\u0631\u062c\u0645 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0644\u063a\u0629 (\u064a\u0638\u0647\u0631 \u0628\u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0623\u0648 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629).',
reco_title: '\u0644\u0623\u062c\u0644\u0643', reco_why: '\u0642\u0631\u064a\u0628 \u0645\u0646 \u0645\u0641\u0636\u0644\u062a\u0643',
history: '\u0627\u0644\u0623\u062e\u064a\u0631\u0629:', clear: '\u0645\u0633\u062d', ai_badge: 'v0.3 \u00b7 \u0645\u0633\u0627\u0639\u062f \u0642\u0627\u0626\u0645 \u0639\u0644\u0649 \u0642\u0648\u0627\u0639\u062f', ai_note: '\u0647\u0630\u0627 \u0644\u064a\u0633 \u0646\u0645\u0648\u0630\u062c \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a \u062d\u0642\u064a\u0642\u064a\u0627\u064b \u0628\u0639\u062f: \u064a\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0641\u0647\u0631\u0633 \u0628\u0642\u0648\u0627\u0639\u062f \u0628\u0633\u064a\u0637\u0629.',
ai_ph: '\u0635\u0641 \u0645\u0627 \u062a\u062d\u062a\u0627\u062c\u0647...', send: '\u0625\u0631\u0633\u0627\u0644', speak: '\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0625\u062c\u0627\u0628\u0627\u062a \u0628\u0635\u0648\u062a \u0639\u0627\u0644\u064d',
ai_hello: '\u0645\u0631\u062d\u0628\u0627\u064b! \u0623\u062e\u0628\u0631\u0646\u064a \u0645\u0627\u0630\u0627 \u062a\u0631\u064a\u062f \u0623\u0646 \u062a\u0641\u0639\u0644 (\u0645\u062b\u0644\u0627\u064b: \u062a\u0639\u0644\u0645 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629\u060c \u062a\u0631\u062c\u0645\u0629 \u0646\u0635\u060c \u0644\u0639\u0628\u0629 \u0634\u0637\u0631\u0646\u062c).',
ai_clarify: '\u0623\u062e\u0628\u0631\u0646\u064a \u0628\u0647\u062f\u0641\u0643 \u0641\u064a \u0643\u0644\u0645\u0627\u062a \u0642\u0644\u064a\u0644\u0629 (\u0645\u062b\u0644\u0627\u064b: \u062a\u0631\u062c\u0645\u0629 \u0646\u0635\u060c \u0644\u0639\u0628\u0629 \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629\u060c \u062a\u0639\u0644\u0645 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629).',
ai_none: '\u0644\u0645 \u0623\u062c\u062f \u0634\u064a\u0626\u0627\u064b \u0641\u064a \u0627\u0644\u0641\u0647\u0631\u0633. \u0647\u0644 \u064a\u0645\u0643\u0646\u0643 \u062a\u0648\u0636\u064a\u062d \u0647\u062f\u0641\u0643 \u0623\u0648 \u0627\u0644\u0645\u0646\u0635\u0629\u061f',
ai_found: '\u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a\u064a:', ai_why: '\u064a\u0637\u0627\u0628\u0642', ai_filtered: '\u062a\u0645\u062a \u0627\u0644\u062a\u0635\u0641\u064a\u0629 \u062d\u0633\u0628:', ai_open: '\u0627\u0641\u062a\u062d \u0627\u0644\u0628\u0637\u0627\u0642\u0629:',
ai_followup: '\u0647\u0644 \u062a\u0628\u062d\u062b \u0639\u0646 \u062a\u0637\u0628\u064a\u0642 \u0623\u0645 \u0644\u0639\u0628\u0629 \u0623\u0645 \u0623\u062f\u0627\u0629 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a\u061f',
ai_uncertain: '\u0647\u0630\u0647 \u0627\u0644\u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a \u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0643\u0644\u0645\u0627\u062a \u0645\u0641\u062a\u0627\u062d\u064a\u0629 \u0641\u064a \u0627\u0644\u0641\u0647\u0631\u0633 \u0648\u0644\u064a\u0633\u062a \u062a\u062d\u0644\u064a\u0644\u0627\u064b \u0630\u0643\u064a\u0627\u064b: \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a.',
voice_unsupported: '\u0627\u0644\u0635\u0648\u062a \u063a\u064a\u0631 \u0645\u062f\u0639\u0648\u0645 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u062a\u0635\u0641\u062d: \u0627\u0633\u062a\u062e\u062f\u0645 \u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0641\u0627\u062a\u064a\u062d.',
voice_listen: '\u0623\u0633\u062a\u0645\u0639...', voice_err: '\u0627\u0644\u0645\u064a\u0643\u0631\u0648\u0641\u0648\u0646 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u0623\u0648 \u0645\u0631\u0641\u0648\u0636.', cat_apps: '\u062a\u0637\u0628\u064a\u0642', cat_games: '\u0644\u0639\u0628\u0629', cat_ai: '\u0623\u062f\u0627\u0629 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a',
footer_data: '\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a\u0629 \u0645\u0624\u0643\u062f\u0629. \u0627\u0644\u0623\u0648\u0635\u0627\u0641 \u0648\u0627\u0644\u0645\u0646\u0635\u0627\u062a \u0625\u0631\u0634\u0627\u062f\u064a\u0629. \u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0631\u0627\u062c\u0639\u0627\u062a \u0623\u0648 \u0623\u0633\u0639\u0627\u0631 \u0623\u0648 \u062a\u0642\u064a\u064a\u0645\u0627\u062a \u0645\u062e\u062a\u0644\u0642\u0629.',
p_web: '\u0648\u064a\u0628', p_ios: '\u0622\u064a\u0641\u0648\u0646', p_android: '\u0623\u0646\u062f\u0631\u0648\u064a\u062f', p_pc: '\u062d\u0627\u0633\u0648\u0628', p_console: '\u062c\u0647\u0627\u0632 \u0623\u0644\u0639\u0627\u0628', store_err: '\u0627\u0644\u062a\u062e\u0632\u064a\u0646 \u0627\u0644\u0645\u062d\u0644\u064a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d: \u0644\u0646 \u062a\u064f\u062d\u0641\u0638 \u0627\u0644\u0645\u0641\u0636\u0644\u0629.',
corrected: '\u062a\u0645 \u0627\u0644\u062a\u0635\u062d\u064a\u062d:', ai_intro_intent: '\u0645\u0646 \u0623\u062c\u0644 \u00ab{x}\u00bb\u060c \u0623\u0642\u062a\u0631\u062d:', ai_why_label: '\u0627\u0644\u0633\u0628\u0628', ai_avail: '\u0645\u062a\u0648\u0641\u0631 \u0639\u0644\u0649:',
ai_corrected: '\u0635\u062d\u0651\u062d\u062a {pairs}.',
ai_limit_business: '\u0644\u0627 \u0623\u0633\u062a\u0637\u064a\u0639 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u0641\u064a \u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0623\u0648 \u0627\u0644\u0636\u0631\u064a\u0628\u064a\u0629 \u0623\u0648 \u0627\u0644\u0645\u0627\u0644\u064a\u0629: \u0647\u0630\u0627 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f \u0641\u064a \u0627\u0644\u0641\u0647\u0631\u0633. \u0627\u0633\u0623\u0644 \u0645\u062e\u062a\u0635\u0627\u064b \u0623\u0648 \u062c\u0647\u0629 \u0631\u0633\u0645\u064a\u0629 \u0641\u064a \u0628\u0644\u062f\u0643.',
ai_compare_head: '\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0639\u062a\u0645\u0627\u062f\u0627\u064b \u0639\u0644\u0649 \u0641\u0647\u0631\u0633\u0646\u0627 \u0641\u0642\u0637:', ai_compare_common: '\u0645\u062a\u0648\u0641\u0631\u0627\u0646 \u0645\u0639\u0627\u064b \u0639\u0644\u0649:',
ai_compare_nodata: '\u0644\u064a\u0633\u062a \u0644\u062f\u064a \u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0648\u062b\u0648\u0642\u0629 \u0639\u0646 \u0627\u0644\u0633\u0639\u0631 \u0623\u0648 \u0627\u0644\u062c\u0648\u062f\u0629 \u0623\u0648 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0627\u062a: \u0627\u0641\u062a\u062d \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0648\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a\u0629.',
ai_info_similar: '\u0628\u0646\u0641\u0633 \u0627\u0644\u0631\u0648\u062d:', ai_thanks: '\u0639\u0644\u0649 \u0627\u0644\u0631\u062d\u0628 \u0648\u0627\u0644\u0633\u0639\u0629! \u0623\u062e\u0628\u0631\u0646\u064a \u0625\u0646 \u0623\u0631\u062f\u062a \u0634\u064a\u0626\u0627\u064b \u0622\u062e\u0631.',
ai_hello2: '\u0645\u0631\u062d\u0628\u0627\u064b! \u0645\u0627\u0630\u0627 \u062a\u0631\u064a\u062f \u0623\u0646 \u062a\u0641\u0639\u0644\u061f \u0627\u062e\u062a\u0631 \u0645\u062b\u0627\u0644\u0627\u064b \u0623\u0648 \u0627\u0643\u062a\u0628 \u0647\u062f\u0641\u0643.',
ai_more_none: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a \u0623\u062e\u0631\u0649 \u0644\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0641\u064a \u0627\u0644\u0641\u0647\u0631\u0633. \u062c\u0631\u0651\u0628 \u0635\u064a\u0627\u063a\u0629 \u0623\u0648 \u0645\u0646\u0635\u0629 \u0623\u062e\u0631\u0649.',
ai_examples: ['\u0623\u0631\u064a\u062f \u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0631\u0648\u0639', '\u062a\u0639\u0644\u0645 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629', '\u0644\u0639\u0628\u0629 \u0634\u0637\u0631\u0646\u062c \u0639\u0644\u0649 \u0622\u064a\u0641\u0648\u0646'],
chip_other: '\u0634\u064a\u0621 \u0622\u062e\u0631', chip_android: '\u0639\u0644\u0649 \u0623\u0646\u062f\u0631\u0648\u064a\u062f', chip_ios: '\u0639\u0644\u0649 \u0622\u064a\u0641\u0648\u0646',
sec_badge: 'v0 \u00b7 \u0645\u062f\u0642\u0642 \u0642\u0627\u0626\u0645 \u0639\u0644\u0649 \u0642\u0648\u0627\u0639\u062f',
sec_note: '\u0627\u0644\u0635\u0642 \u0631\u0627\u0628\u0637\u0627\u064b: \u064a\u0628\u062d\u062b NEXORA AI SECURITY \u0639\u0646 \u0625\u0634\u0627\u0631\u0627\u062a \u062e\u0637\u0631 \u0628\u0642\u0648\u0627\u0639\u062f \u0628\u0633\u064a\u0637\u0629. \u0647\u0630\u0627 \u0644\u064a\u0633 \u0628\u0631\u0646\u0627\u0645\u062c \u062d\u0645\u0627\u064a\u0629 \u0645\u0646 \u0627\u0644\u0641\u064a\u0631\u0648\u0633\u0627\u062a \u0648\u0644\u0627 \u064a\u0636\u0645\u0646 \u0623\u0628\u062f\u0627\u064b \u0623\u0646 \u0627\u0644\u0631\u0627\u0628\u0637 \u0622\u0645\u0646.',
sec_ph: '\u0627\u0644\u0635\u0642 \u0647\u0646\u0627 \u0631\u0627\u0628\u0637\u0627\u064b \u0623\u0648 \u0639\u0646\u0648\u0627\u0646 \u0645\u0648\u0642\u0639',
sec_btn: '\u062a\u062d\u0642\u0642',
sec_empty: '\u0627\u0644\u0635\u0642 \u0631\u0627\u0628\u0637\u0627\u064b \u0644\u0644\u062a\u062d\u0642\u0642 \u0645\u0646\u0647 \u0623\u0648\u0644\u0627\u064b.',
sec_host: '\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u062d\u0644\u064e\u0651\u0644:',
sec_why: '\u0627\u0644\u0625\u0634\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u0631\u0635\u0648\u062f\u0629:',
sec_none: '\u0644\u0645 \u062a\u062c\u062f \u0642\u0648\u0627\u0639\u062f\u0646\u0627 \u0623\u064a \u0625\u0634\u0627\u0631\u0629 \u0645\u0634\u0628\u0648\u0647\u0629.',
sec_limits: '\u0627\u0644\u062d\u062f\u0648\u062f: \u0644\u0627 \u0623\u0632\u0648\u0631 \u0627\u0644\u0631\u0627\u0628\u0637\u060c \u0648\u0644\u0627 \u0623\u0639\u0631\u0641 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062a\u0635\u064a\u0651\u062f \u0627\u0644\u062d\u062f\u064a\u062b\u0629\u060c \u0648\u0642\u062f \u0623\u062e\u0637\u0626 \u0641\u064a \u0627\u0644\u0627\u062a\u062c\u0627\u0647\u064a\u0646. \u062a\u062d\u0642\u0642 \u062f\u0627\u0626\u0645\u0627\u064b \u0645\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0642\u0628\u0644 \u0625\u062f\u062e\u0627\u0644 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0623\u0648 \u062f\u0641\u0639.',
sec_official_btn: '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a \u0644\u0640 {x}',
sec_lvl_known: '\u0646\u0637\u0627\u0642 \u0631\u0633\u0645\u064a \u0645\u0646 \u0627\u0644\u0641\u0647\u0631\u0633',
sec_lvl_unknown: '\u0644\u0627 \u0625\u0634\u0627\u0631\u0627\u062a \u0645\u0634\u0628\u0648\u0647\u0629 (\u0645\u0648\u0642\u0639 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641)',
sec_lvl_caution: '\u0627\u062d\u062a\u064a\u0627\u0637',
sec_lvl_high: '\u062e\u0637\u0631 \u0645\u0631\u062a\u0641\u0639',
sec_lvl_invalid: '\u0639\u0646\u0648\u0627\u0646 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641',
sec_adv_known: '\u064a\u0637\u0627\u0628\u0642 \u0647\u0630\u0627 \u0627\u0644\u0646\u0637\u0627\u0642 \u0645\u0648\u0642\u0639\u0627\u064b \u0631\u0633\u0645\u064a\u0627\u064b \u0645\u0624\u0643\u062f\u0627\u064b \u0641\u064a \u0641\u0647\u0631\u0633\u0646\u0627. \u062a\u062d\u0642\u0642 \u0645\u0639 \u0630\u0644\u0643 \u0645\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0643\u0627\u0645\u0644 \u0642\u0628\u0644 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644.',
sec_adv_unknown: '\u0644\u0645 \u062a\u062c\u062f \u0642\u0648\u0627\u0639\u062f\u0646\u0627 \u0634\u064a\u0626\u0627\u064b \u0645\u0634\u0628\u0648\u0647\u0627\u064b\u060c \u0644\u0643\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f \u0641\u064a \u0641\u0647\u0631\u0633\u0646\u0627: \u0648\u0647\u0630\u0627 \u0644\u0627 \u064a\u062b\u0628\u062a \u0623\u0646\u0647 \u0622\u0645\u0646.',
sec_adv_caution: '\u0628\u0639\u0636 \u0627\u0644\u0625\u0634\u0627\u0631\u0627\u062a \u062a\u0633\u062a\u062f\u0639\u064a \u0627\u0644\u062d\u0630\u0631. \u0644\u0627 \u062a\u064f\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0648\u0644\u0627 \u0628\u064a\u0627\u0646\u0627\u062a \u062f\u0641\u0639 \u0642\u0628\u0644 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a.',
sec_adv_high: '\u0625\u0634\u0627\u0631\u0627\u062a \u062e\u0637\u0631 \u0645\u062a\u0639\u062f\u062f\u0629. \u0623\u0646\u0635\u062d\u0643 \u0628\u0639\u062f\u0645 \u0641\u062a\u062d \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0648\u0639\u062f\u0645 \u0625\u062f\u062e\u0627\u0644 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0634\u062e\u0635\u064a\u0629.',
sec_adv_invalid: '\u0647\u0630\u0627 \u0627\u0644\u0646\u0635 \u0644\u0627 \u064a\u0634\u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u0645\u0648\u0642\u0639 (\u0645\u062b\u0627\u0644: https://example.com).',
r_known: '\u0627\u0644\u0646\u0637\u0627\u0642 \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064a \u0644\u0640 {x}\u060c \u0645\u0624\u0643\u062f \u0641\u064a \u0627\u0644\u0641\u0647\u0631\u0633 \u0628\u062a\u0627\u0631\u064a\u062e {d}.',
r_assumed: '\u0644\u0645 \u064a\u064f\u0643\u062a\u0628 \u00abhttps://\u00bb: \u062d\u0644\u0651\u0644\u062a https://{x}.',
r_nohttps: '\u0627\u0644\u0631\u0627\u0628\u0637 \u0644\u0627 \u064a\u0633\u062a\u062e\u062f\u0645 https (\u0627\u062a\u0635\u0627\u0644 \u063a\u064a\u0631 \u0645\u0634\u0641\u0651\u0631).',
r_scheme: '\u0646\u0648\u0639 \u0631\u0627\u0628\u0637 \u063a\u064a\u0631 \u0645\u0639\u062a\u0627\u062f \u0623\u0648 \u062e\u0637\u064a\u0631: {x}',
r_ip: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u0631\u0642\u0627\u0645 (IP) \u0628\u062f\u0644 \u0627\u0633\u0645 \u0645\u0648\u0642\u0639.',
r_puny: '\u0627\u0644\u0627\u0633\u0645 \u064a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0623\u062d\u0631\u0641 \u062e\u0627\u0635\u0629 \u0645\u0645\u0648\u0651\u0647\u0629 (xn--) \u0642\u062f \u062a\u0642\u0644\u0651\u062f \u0645\u0648\u0642\u0639\u0627\u064b \u0622\u062e\u0631.',
r_userinfo: '\u0627\u0644\u0631\u0627\u0628\u0637 \u064a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u00ab@\u00bb: \u0645\u0627 \u0642\u0628\u0644\u0647\u0627 \u0644\u064a\u0633 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062d\u0642\u064a\u0642\u064a\u060c \u0648\u0647\u064a \u062d\u064a\u0644\u0629 \u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062e\u062f\u0627\u0639.',
r_look_exact: '\u0627\u0644\u0627\u0633\u0645 \u064a\u0634\u0628\u0647 {x} \u0644\u0643\u0646\u0647 \u0644\u064a\u0633 \u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0624\u0643\u062f \u0641\u064a \u0641\u0647\u0631\u0633\u0646\u0627 ({y}). \u0642\u062f \u064a\u0643\u0648\u0646 \u0645\u0634\u0631\u0648\u0639\u0627\u064b: \u062a\u062d\u0642\u0642.',
r_look_homo: '\u064a\u0634\u0628\u0647 {x} \u0645\u0639 \u062a\u0628\u062f\u064a\u0644 \u0623\u062d\u0631\u0641 \u0623\u0648 \u0623\u0631\u0642\u0627\u0645 (\u0645\u062b\u0644 0 \u0628\u062f\u0644 o): \u062a\u0642\u0644\u064a\u062f \u0645\u062d\u062a\u0645\u0644.',
r_look_close: '\u0642\u0631\u064a\u0628 \u062c\u062f\u0627\u064b \u0645\u0646 \u0627\u0633\u0645 {x} \u0628\u062d\u0631\u0641 \u0648\u0627\u062d\u062f: \u062a\u0642\u0644\u064a\u062f \u0645\u062d\u062a\u0645\u0644.',
r_look_contains: '\u0627\u0644\u0627\u0633\u0645 \u064a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u00ab{x}\u00bb \u0644\u0643\u0646 \u0627\u0644\u0646\u0637\u0627\u0642 \u0644\u064a\u0633 \u0645\u0648\u0642\u0639\u0647 \u0627\u0644\u0631\u0633\u0645\u064a ({y}).',
r_short: '\u0631\u0627\u0628\u0637 \u0645\u062e\u062a\u0635\u0631: \u0644\u0627 \u0646\u0631\u0649 \u0627\u0644\u0648\u062c\u0647\u0629 \u0627\u0644\u062d\u0642\u064a\u0642\u064a\u0629.',
r_port: '\u0631\u0642\u0645 \u0645\u0646\u0641\u0630 \u063a\u064a\u0631 \u0645\u0639\u062a\u0627\u062f ({x}).',
r_exe: '\u0627\u0644\u0631\u0627\u0628\u0637 \u064a\u0634\u064a\u0631 \u0625\u0644\u0649 \u0645\u0644\u0641 \u0644\u0644\u062a\u0646\u0632\u064a\u0644 ({x}).',
r_kw: '\u0643\u0644\u0645\u0627\u062a \u062a\u064f\u0633\u062a\u062e\u062f\u0645 \u0643\u062b\u064a\u0631\u0627\u064b \u0641\u064a \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0644: {x}.',
r_kwdl: '\u0643\u0644\u0645\u0627\u062a \u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u062a\u0646\u0632\u064a\u0644\u0627\u062a \u0645\u0634\u0628\u0648\u0647\u0629: {x}.',
r_tld: '\u0627\u0644\u0644\u0627\u062d\u0642\u0629 \u00ab.{x}\u00bb \u062a\u064f\u0633\u062a\u062e\u062f\u0645 \u0623\u0643\u062b\u0631 \u0641\u064a \u0627\u0644\u0625\u0633\u0627\u0621\u0627\u062a (\u0625\u0634\u0627\u0631\u0629 \u0636\u0639\u064a\u0641\u0629).',
r_sub: '\u0646\u0637\u0627\u0642\u0627\u062a \u0641\u0631\u0639\u064a\u0629 \u0643\u062b\u064a\u0631\u0629: \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0645\u0639\u0642\u0651\u062f \u0627\u0644\u0642\u0631\u0627\u0621\u0629.',
r_long: '\u0639\u0646\u0648\u0627\u0646 \u0637\u0648\u064a\u0644 \u062c\u062f\u0627\u064b.',
r_hyph: '\u0634\u0631\u0637\u0627\u062a \u0643\u062b\u064a\u0631\u0629 \u0641\u064a \u0627\u0633\u0645 \u0627\u0644\u0646\u0637\u0627\u0642.',
r_samehost: '\u0627\u0644\u0646\u0637\u0627\u0642 \u0647\u0648 \u0646\u0637\u0627\u0642 {x}\u060c \u0644\u0643\u0646 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u0644\u064a\u0633\u062a \u0627\u0644\u0645\u0648\u062c\u0648\u062f\u0629 \u0641\u064a \u0641\u0647\u0631\u0633\u0646\u0627.' },
es: { language: 'Idioma', tagline: 'Descubre apps, juegos y herramientas de IA realmente \u00fatiles', search_ph: 'Buscar una app, un juego, una herramienta IA...', search: 'Buscar',
tab_all: 'Todo', tab_apps: 'Apps', tab_games: 'Juegos', tab_ai: 'Herramientas IA', platform: 'Plataforma', all_platforms: 'Todas', favorites: 'Favoritos',
sort: 'Orden', sort_rel: 'Relevancia', sort_az: 'A \u2192 Z', match: 'Coincide con', understood: 'Entendido:',
results: 'resultado(s)', no_results: 'Sin resultados. Prueba otra palabra o plataforma.', no_fav: 'A\u00fan no hay favoritos.',
details: 'Detalles', open_official: 'Sitio oficial', close: 'Cerrar', add_fav: 'A\u00f1adir a favoritos', remove_fav: 'Quitar de favoritos',
link_checked: 'Sitio oficial confirmado el', plat_note: 'Descripci\u00f3n y plataformas: orientativas, verifica en el sitio oficial.',
untranslated: 'Descripci\u00f3n no traducida a este idioma (se muestra en franc\u00e9s o ingl\u00e9s).',
reco_title: 'Para ti', reco_why: 'Cercano a tu favorito',
history: 'Reciente:', clear: 'Borrar', ai_badge: 'v0.3 \u00b7 asistente por reglas', ai_note: 'A\u00fan no es un modelo de IA real: busca en el cat\u00e1logo con reglas simples.',
ai_ph: 'Describe lo que necesitas...', send: 'Enviar', speak: 'Leer respuestas en voz alta',
ai_hello: '\u00a1Hola! Dime qu\u00e9 quieres hacer (p. ej. \u00abaprender ingl\u00e9s\u00bb, \u00abtraducir un texto\u00bb, \u00abajedrez en iPhone\u00bb).',
ai_clarify: 'Dime tu objetivo en pocas palabras (p. ej. \u00abtraducir un texto\u00bb, \u00abjuego de estrategia\u00bb, \u00abaprender ingl\u00e9s\u00bb).',
ai_none: 'No encontr\u00e9 nada en el cat\u00e1logo. \u00bfPuedes precisar tu objetivo o la plataforma?',
ai_found: 'Esto te propongo:', ai_why: 'coincide con', ai_filtered: 'Filtrado por:', ai_open: 'Abrir ficha:',
ai_followup: '\u00bfBuscas m\u00e1s bien una app, un juego o una herramienta de IA?',
ai_uncertain: 'Estas sugerencias vienen de palabras clave del cat\u00e1logo, no de un an\u00e1lisis inteligente: verifica en el sitio oficial.',
voice_unsupported: 'Este navegador no admite voz: usa el teclado.',
voice_listen: 'Escuchando...', voice_err: 'Micr\u00f3fono no disponible o denegado.', cat_apps: 'App', cat_games: 'Juego', cat_ai: 'Herramienta IA',
footer_data: 'Sitios oficiales confirmados. Descripciones y plataformas orientativas. Sin rese\u00f1as, precios ni notas inventados.',
p_web: 'Web', p_ios: 'iPhone', p_android: 'Android', p_pc: 'PC', p_console: 'Consola', store_err: 'Almacenamiento local no disponible: los favoritos no se guardar\u00e1n.',
corrected: 'Corregido:', ai_intro_intent: 'Para \u00ab{x}\u00bb, te propongo:', ai_why_label: 'Por qu\u00e9', ai_avail: 'Disponible en:',
ai_corrected: 'Correg\u00ed {pairs}.',
ai_limit_business: 'No puedo ayudarte con tr\u00e1mites legales, fiscales o financieros: no est\u00e1n en el cat\u00e1logo. Consulta a un profesional o a un organismo oficial de tu pa\u00eds.',
ai_compare_head: 'Comparaci\u00f3n, solo seg\u00fan nuestro cat\u00e1logo:', ai_compare_common: 'Ambos disponibles en:',
ai_compare_nodata: 'No tengo datos fiables sobre precio, calidad ni rese\u00f1as: abre las fichas y verifica en los sitios oficiales.',
ai_info_similar: 'En la misma l\u00ednea:', ai_thanks: '\u00a1Con gusto! Dime si necesitas algo m\u00e1s.',
ai_hello2: '\u00a1Hola! \u00bfQu\u00e9 quieres hacer? Elige un ejemplo o escribe tu objetivo.',
ai_more_none: 'No tengo m\u00e1s sugerencias para esta petici\u00f3n en el cat\u00e1logo. Prueba otra formulaci\u00f3n u otra plataforma.',
ai_examples: ['Quiero crear un negocio', 'Aprender ingl\u00e9s', 'Ajedrez en iPhone'],
chip_other: 'Otra cosa', chip_android: 'En Android', chip_ios: 'En iPhone',
sec_badge: 'v0 \u00b7 verificador por reglas',
sec_note: 'Pega un enlace: NEXORA AI SECURITY busca se\u00f1ales de riesgo con reglas simples. No es un antivirus y nunca garantiza que un enlace sea seguro.',
sec_ph: 'Pega aqu\u00ed un enlace o direcci\u00f3n web',
sec_btn: 'Verificar',
sec_empty: 'Pega primero un enlace para verificar.',
sec_host: 'Dominio analizado:',
sec_why: 'Se\u00f1ales encontradas:',
sec_none: 'Nuestras reglas no encontraron ninguna se\u00f1al sospechosa.',
sec_limits: 'L\u00edmites: no visito el enlace, no conozco los sitios de phishing recientes y puedo equivocarme en ambos sentidos. Comprueba siempre la direcci\u00f3n antes de introducir una contrase\u00f1a o un pago.',
sec_official_btn: 'Sitio oficial de {x}',
sec_lvl_known: 'Dominio oficial del cat\u00e1logo',
sec_lvl_unknown: 'Sin se\u00f1ales sospechosas (sitio desconocido)',
sec_lvl_caution: 'Precauci\u00f3n',
sec_lvl_high: 'Riesgo alto',
sec_lvl_invalid: 'Direcci\u00f3n no reconocida',
sec_adv_known: 'Este dominio coincide con un sitio oficial confirmado en nuestro cat\u00e1logo. Aun as\u00ed, revisa la direcci\u00f3n completa antes de iniciar sesi\u00f3n.',
sec_adv_unknown: 'Nuestras reglas no encontraron nada sospechoso, pero este sitio no est\u00e1 en nuestro cat\u00e1logo: eso no prueba que sea seguro.',
sec_adv_caution: 'Algunas se\u00f1ales piden precauci\u00f3n. No introduzcas contrase\u00f1a ni datos de pago antes de comprobar el sitio oficial.',
sec_adv_high: 'Varias se\u00f1ales de riesgo. Te aconsejo no abrir este enlace ni introducir informaci\u00f3n personal.',
sec_adv_invalid: 'Este texto no parece una direcci\u00f3n web (p. ej. https://ejemplo.com).',
r_known: 'Dominio id\u00e9ntico al sitio oficial de {x}, confirmado en el cat\u00e1logo el {d}.',
r_assumed: 'No escribiste \u00abhttps://\u00bb: analic\u00e9 https://{x}.',
r_nohttps: 'El enlace no usa https (conexi\u00f3n sin cifrar).',
r_scheme: 'Tipo de enlace inusual o peligroso: {x}',
r_ip: 'La direcci\u00f3n es una serie de n\u00fameros (IP) en lugar de un nombre de sitio.',
r_puny: 'El nombre contiene caracteres especiales disfrazados (xn--) que pueden imitar otro sitio.',
r_userinfo: 'El enlace contiene \u00ab@\u00bb: lo anterior no es el sitio real, un truco cl\u00e1sico para enga\u00f1ar.',
r_look_exact: 'El nombre se parece a {x}, pero no es el dominio confirmado en nuestro cat\u00e1logo ({y}). Puede ser leg\u00edtimo: verifica.',
r_look_homo: 'Se parece a {x} con letras o cifras cambiadas (p. ej. 0 por o): probable imitaci\u00f3n.',
r_look_close: 'Muy cercano al nombre de {x}, a una letra de distancia: posible imitaci\u00f3n.',
r_look_contains: 'El nombre contiene \u00ab{x}\u00bb pero el dominio no es el del sitio oficial ({y}).',
r_short: 'Enlace acortado: no se ve el destino real.',
r_port: 'N\u00famero de puerto inusual ({x}).',
r_exe: 'El enlace apunta a un archivo para descargar ({x}).',
r_kw: 'Palabras usadas a menudo en estafas: {x}.',
r_kwdl: 'Palabras ligadas a descargas dudosas: {x}.',
r_tld: 'La extensi\u00f3n \u00ab.{x}\u00bb se usa m\u00e1s en abusos (se\u00f1al d\u00e9bil).',
r_sub: 'Muchos subdominios: la direcci\u00f3n es dif\u00edcil de leer.',
r_long: 'Direcci\u00f3n muy larga.',
r_hyph: 'Muchos guiones en el nombre del dominio.',
r_samehost: 'El dominio es el de {x}, pero esta p\u00e1gina no es la de nuestro cat\u00e1logo.' },
pt: { language: 'Idioma', tagline: 'Descubra apps, jogos e ferramentas de IA realmente \u00fateis', search_ph: 'Procurar um app, jogo ou ferramenta de IA...', search: 'Procurar',
tab_all: 'Tudo', tab_apps: 'Apps', tab_games: 'Jogos', tab_ai: 'Ferramentas IA', platform: 'Plataforma', all_platforms: 'Todas', favorites: 'Favoritos',
sort: 'Ordem', sort_rel: 'Relev\u00e2ncia', sort_az: 'A \u2192 Z', match: 'Corresponde a', understood: 'Entendido:',
results: 'resultado(s)', no_results: 'Sem resultados. Tente outra palavra ou plataforma.', no_fav: 'Ainda n\u00e3o h\u00e1 favoritos.',
details: 'Detalhes', open_official: 'Site oficial', close: 'Fechar', add_fav: 'Adicionar aos favoritos', remove_fav: 'Remover dos favoritos',
link_checked: 'Site oficial confirmado em', plat_note: 'Descri\u00e7\u00e3o e plataformas: indicativas, verifique no site oficial.',
untranslated: 'Descri\u00e7\u00e3o n\u00e3o traduzida neste idioma (exibida em franc\u00eas ou ingl\u00eas).',
reco_title: 'Para voc\u00ea', reco_why: 'Parecido com seu favorito',
history: 'Recente:', clear: 'Limpar', ai_badge: 'v0.3 \u00b7 assistente por regras', ai_note: 'Ainda n\u00e3o \u00e9 um modelo de IA real: busca no cat\u00e1logo com regras simples.',
ai_ph: 'Descreva o que precisa...', send: 'Enviar', speak: 'Ler respostas em voz alta',
ai_hello: 'Ol\u00e1! Diga o que quer fazer (ex.: "aprender ingl\u00eas", "traduzir um texto", "xadrez no iPhone").',
ai_clarify: 'Diga seu objetivo em poucas palavras (ex.: "traduzir um texto", "jogo de estrat\u00e9gia", "aprender ingl\u00eas").',
ai_none: 'N\u00e3o encontrei nada no cat\u00e1logo. Pode precisar o objetivo ou a plataforma?',
ai_found: 'Minhas sugest\u00f5es:', ai_why: 'corresponde a', ai_filtered: 'Filtrado por:', ai_open: 'Abrir ficha:',
ai_followup: 'Procura mais um app, um jogo ou uma ferramenta de IA?',
ai_uncertain: 'Estas sugest\u00f5es v\u00eam de palavras-chave do cat\u00e1logo, n\u00e3o de uma an\u00e1lise inteligente: verifique no site oficial.',
voice_unsupported: 'Este navegador n\u00e3o suporta voz: use o teclado.',
voice_listen: 'Ouvindo...', voice_err: 'Microfone indispon\u00edvel ou negado.', cat_apps: 'App', cat_games: 'Jogo', cat_ai: 'Ferramenta IA',
footer_data: 'Sites oficiais confirmados. Descri\u00e7\u00f5es e plataformas indicativas. Sem avalia\u00e7\u00f5es, pre\u00e7os ou notas inventados.',
p_web: 'Web', p_ios: 'iPhone', p_android: 'Android', p_pc: 'PC', p_console: 'Console', store_err: 'Armazenamento local indispon\u00edvel: favoritos n\u00e3o ser\u00e3o salvos.',
corrected: 'Corrigido:', ai_intro_intent: 'Para \u00ab{x}\u00bb, sugiro:', ai_why_label: 'Por qu\u00ea', ai_avail: 'Dispon\u00edvel em:',
ai_corrected: 'Corrigi {pairs}.',
ai_limit_business: 'N\u00e3o posso ajudar com tr\u00e2mites legais, fiscais ou financeiros: n\u00e3o est\u00e3o no cat\u00e1logo. Consulte um profissional ou um \u00f3rg\u00e3o oficial do seu pa\u00eds.',
ai_compare_head: 'Compara\u00e7\u00e3o, apenas segundo o nosso cat\u00e1logo:', ai_compare_common: 'Ambos dispon\u00edveis em:',
ai_compare_nodata: 'N\u00e3o tenho dados fi\u00e1veis sobre pre\u00e7o, qualidade ou avalia\u00e7\u00f5es: abra as fichas e verifique nos sites oficiais.',
ai_info_similar: 'Na mesma linha:', ai_thanks: 'Com prazer! Diga se precisar de mais alguma coisa.',
ai_hello2: 'Ol\u00e1! O que quer fazer? Escolha um exemplo ou escreva o seu objetivo.',
ai_more_none: 'N\u00e3o tenho mais sugest\u00f5es para este pedido no cat\u00e1logo. Tente outra formula\u00e7\u00e3o ou plataforma.',
ai_examples: ['Quero criar um neg\u00f3cio', 'Aprender ingl\u00eas', 'Xadrez no iPhone'],
chip_other: 'Outra coisa', chip_android: 'No Android', chip_ios: 'No iPhone',
sec_badge: 'v0 \u00b7 verificador por regras',
sec_note: 'Cole um link: o NEXORA AI SECURITY procura sinais de risco com regras simples. N\u00e3o \u00e9 um antiv\u00edrus e nunca garante que um link seja seguro.',
sec_ph: 'Cole aqui um link ou endere\u00e7o web',
sec_btn: 'Verificar',
sec_empty: 'Cole primeiro um link para verificar.',
sec_host: 'Dom\u00ednio analisado:',
sec_why: 'Sinais encontrados:',
sec_none: 'As nossas regras n\u00e3o encontraram nenhum sinal suspeito.',
sec_limits: 'Limites: n\u00e3o visito o link, n\u00e3o conhe\u00e7o os sites de phishing recentes e posso errar nos dois sentidos. Confira sempre o endere\u00e7o antes de digitar uma senha ou um pagamento.',
sec_official_btn: 'Site oficial de {x}',
sec_lvl_known: 'Dom\u00ednio oficial do cat\u00e1logo',
sec_lvl_unknown: 'Sem sinais suspeitos (site desconhecido)',
sec_lvl_caution: 'Cautela',
sec_lvl_high: 'Risco elevado',
sec_lvl_invalid: 'Endere\u00e7o n\u00e3o reconhecido',
sec_adv_known: 'Este dom\u00ednio corresponde a um site oficial confirmado no nosso cat\u00e1logo. Mesmo assim, confira o endere\u00e7o completo antes de entrar.',
sec_adv_unknown: 'As nossas regras n\u00e3o encontraram nada suspeito, mas este site n\u00e3o est\u00e1 no nosso cat\u00e1logo: isso n\u00e3o prova que seja seguro.',
sec_adv_caution: 'Alguns sinais pedem cautela. N\u00e3o digite senha nem dados de pagamento antes de conferir o site oficial.',
sec_adv_high: 'V\u00e1rios sinais de risco. Aconselho a n\u00e3o abrir este link nem inserir informa\u00e7\u00f5es pessoais.',
sec_adv_invalid: 'Este texto n\u00e3o parece um endere\u00e7o web (ex.: https://exemplo.com).',
r_known: 'Dom\u00ednio id\u00eantico ao site oficial de {x}, confirmado no cat\u00e1logo em {d}.',
r_assumed: 'N\u00e3o escreveu \u00abhttps://\u00bb: analisei https://{x}.',
r_nohttps: 'O link n\u00e3o usa https (liga\u00e7\u00e3o n\u00e3o cifrada).',
r_scheme: 'Tipo de link incomum ou perigoso: {x}',
r_ip: 'O endere\u00e7o \u00e9 uma s\u00e9rie de n\u00fameros (IP) em vez de um nome de site.',
r_puny: 'O nome cont\u00e9m caracteres especiais disfar\u00e7ados (xn--) que podem imitar outro site.',
r_userinfo: 'O link cont\u00e9m \u00ab@\u00bb: o que vem antes n\u00e3o \u00e9 o site real, um truque cl\u00e1ssico para enganar.',
r_look_exact: 'O nome parece {x}, mas n\u00e3o \u00e9 o dom\u00ednio confirmado no nosso cat\u00e1logo ({y}). Pode ser leg\u00edtimo: verifique.',
r_look_homo: 'Parece {x} com letras ou n\u00fameros trocados (ex.: 0 no lugar de o): prov\u00e1vel imita\u00e7\u00e3o.',
r_look_close: 'Muito pr\u00f3ximo do nome de {x}, a uma letra de dist\u00e2ncia: poss\u00edvel imita\u00e7\u00e3o.',
r_look_contains: 'O nome cont\u00e9m \u00ab{x}\u00bb mas o dom\u00ednio n\u00e3o \u00e9 o do site oficial ({y}).',
r_short: 'Link encurtado: o destino real fica escondido.',
r_port: 'N\u00famero de porta incomum ({x}).',
r_exe: 'O link aponta para um ficheiro para transferir ({x}).',
r_kw: 'Palavras muito usadas em burlas: {x}.',
r_kwdl: 'Palavras ligadas a transfer\u00eancias duvidosas: {x}.',
r_tld: 'A extens\u00e3o \u00ab.{x}\u00bb \u00e9 mais usada em abusos (sinal fraco).',
r_sub: 'Muitos subdom\u00ednios: o endere\u00e7o \u00e9 dif\u00edcil de ler.',
r_long: 'Endere\u00e7o muito longo.',
r_hyph: 'Muitos h\u00edfens no nome do dom\u00ednio.',
r_samehost: 'O dom\u00ednio \u00e9 o de {x}, mas esta p\u00e1gina n\u00e3o \u00e9 a do nosso cat\u00e1logo.' }
};
/* v1.5 : 8 langues de plus, stockees en texte compact (base64 ASCII) puis decodees au demarrage */
var PACK = JSON.parse(D('pk1'));
Object.keys(PACK).forEach(function (l) {
try {
var bin = atob(PACK[l]), bytes = new Uint8Array(bin.length), i;
for (i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
var obj = JSON.parse(new TextDecoder('utf-8').decode(bytes));
if (obj && typeof obj === 'object') I18N[l] = obj;
} catch (e) { /* langue ignoree si le decodage echoue */ }
});
/* v1.6 : a propos, createur et feuille de route (13 langues), texte compact base64 */
var PACK2 = D('pk2');
try {
var bin2 = atob(PACK2), bytes2 = new Uint8Array(bin2.length), j2;
for (j2 = 0; j2 < bin2.length; j2++) bytes2[j2] = bin2.charCodeAt(j2);
var more = JSON.parse(new TextDecoder('utf-8').decode(bytes2));
Object.keys(more).forEach(function (l) {
if (!I18N[l]) return;
Object.keys(more[l]).forEach(function (k) { I18N[l][k] = more[l][k]; });
});
} catch (e) { /* le texte francais de secours reste affiche */ }
/* v1.7 : voix, produits non reconfirmes, nouvelles intentions (13 langues), texte compact */
var PACK3 = D('pk3');
var NEW_INT = [], ADD_IDS = {};
try {
var more3 = unpack(PACK3);
Object.keys(more3.keys).forEach(function (l) {
if (!I18N[l]) return;
Object.keys(more3.keys[l]).forEach(function (k) { I18N[l][k] = more3.keys[l][k]; });
});
NEW_INT = more3.intents || [];
ADD_IDS = more3.addids || {};
} catch (e) { /* le francais de secours reste affiche */ }
/* textes des nouveaux ecrans (fr, en, es, pt, ar ; les autres langues affichent l'anglais) */
var V2 = { keys: { en: {} }, plans: {}, units: {}, tools: {}, examples: [] };
try {
V2 = unpack(D('pk5'));
Object.keys(I18N).forEach(function (l) {
var src = V2.keys[l] || V2.keys.en;
Object.keys(src).forEach(function (k) { I18N[l][k] = src[k]; });
});
} catch (e) { /* le francais de secours reste affiche */ }
var RTL = { ar: true };
var VOICE_LOCALE = { fr: 'fr-FR', en: 'en-US', ar: 'ar-SA', es: 'es-ES', pt: 'pt-PT', zh: 'zh-CN', hi: 'hi-IN', ru: 'ru-RU', de: 'de-DE', ja: 'ja-JP', ko: 'ko-KR', it: 'it-IT', tr: 'tr-TR' };
var PLATFORMS = ['web', 'ios', 'android', 'pc', 'console'];

/* Mots reconnus dans la recherche (\u00e9crits sans accents, en minuscules) */
var CAT_WORDS = { app: 'apps', apps: 'apps', appli: 'apps', applis: 'apps', application: 'apps', applications: 'apps',
jeu: 'games', jeux: 'games', game: 'games', games: 'games', juego: 'games', juegos: 'games', jogo: 'games', jogos: 'games',
ia: 'ai', ai: 'ai' };
var PLAT_WORDS = { iphone: 'ios', ios: 'ios', ipad: 'ios', apple: 'ios', android: 'android',
pc: 'pc', windows: 'pc', mac: 'pc', macos: 'pc', linux: 'pc', ordinateur: 'pc', desktop: 'pc', computer: 'pc',
web: 'web', navigateur: 'web', browser: 'web',
console: 'console', playstation: 'console', xbox: 'console', ps4: 'console', ps5: 'console' };
/* Synonymes : un mot cherch\u00e9 peut aussi chercher ces mots-l\u00e0 */
var SYN = {
ecrire: ['redaction', 'writing', 'texte'], rediger: ['redaction', 'writing', 'texte'], write: ['writing', 'redaction', 'texte'],
escribir: ['redaction', 'writing', 'texte'], escrever: ['redaction', 'writing', 'texte'],
texte: ['text', 'redaction'], text: ['texte', 'redaction'],
apprendre: ['learn', 'education', 'langues'], learn: ['education', 'langues', 'apprendre'], aprender: ['learn', 'education', 'langues'],
etudier: ['education', 'learn'], study: ['education', 'learn'],
langue: ['langues', 'languages'], langues: ['languages'], language: ['langues', 'languages'], languages: ['langues'],
traduire: ['traduction', 'translation', 'translate'], traduction: ['translation', 'traduire'], translate: ['traduction', 'translation', 'traduire'],
traducir: ['traduction', 'translation'], traduzir: ['traduction', 'translation'],
dessiner: ['image', 'design', 'art'], draw: ['image', 'design', 'art'], photo: ['image', 'images'], imagen: ['image', 'images'],
musique: ['music', 'audio'], music: ['musique', 'audio'], musica: ['musique', 'music'], chanson: ['song', 'musique'],
voix: ['voice', 'audio'], voice: ['voix', 'audio'],
coder: ['code', 'programmation'], programmer: ['programmation', 'programming', 'code'], developper: ['developpeur', 'developer', 'code'],
chercher: ['recherche', 'research', 'search'], recherche: ['research', 'search'], search: ['recherche', 'research'],
organiser: ['organisation', 'taches', 'tasks', 'productivite'], organize: ['organisation', 'taches', 'tasks'],
tache: ['taches', 'tasks'], todo: ['taches', 'tasks'], productivity: ['productivite'],
message: ['messagerie', 'messaging', 'chat'], messages: ['messagerie', 'messaging', 'chat'], discuter: ['chat', 'messagerie'],
securite: ['security', 'privacy', 'confidentialite'], password: ['mot de passe', 'mots de passe'], mdp: ['mot de passe', 'password'],
echec: ['echecs', 'chess'], echecs: ['chess'], chess: ['echecs'], ajedrez: ['echecs', 'chess'], xadrez: ['echecs', 'chess'],
strategie: ['strategy'], strategy: ['strategie'],
video: ['video', 'montage'], videos: ['video'], film: ['video'],
amis: ['friends', 'multijoueur'], friends: ['amis', 'multiplayer'],
detente: ['relax', 'casual'], relax: ['detente'], ferme: ['farming'], farm: ['farming', 'ferme']
};
var STOP = ['je', 'tu', 'veux', 'vouloir', 'un', 'une', 'le', 'la', 'les', 'l', 'de', 'des', 'du', 'd', 'et', 'ou', 'pour', 'mon', 'ma', 'mes',
'sur', 'en', 'dans', 'avec', 'quel', 'quelle', 'quels', 'quelles', 'outil', 'outils', 'cherche', 'trouver', 'besoin', 'comment', 'que', 'qui',
'est', 'ce', 'me', 'moi', 'to', 'the', 'a', 'an', 'i', 'want', 'need', 'and', 'for', 'of', 'in', 'on', 'with', 'tool', 'tools', 'how', 'my',
'is', 'it', 'some', 'best', 'meilleur', 'meilleure', 'quiero', 'para', 'el', 'los', 'las', 'con', 'como', 'uma', 'um', 'os', 'com', 'eu', 'quero'];
STOP = STOP.concat(['vais', 'vas', 'va', 'creer', 'faire', 'voudrais', 'aimerais', 'peux', 'puis', 'utiliser', 'donne', 'montre', 'propose',
'conseille', 'recommande', 'trouve', 'chose', 'quelque', 'quelques', 'svp', 'stp', 'please', 'make', 'create', 'build', 'find', 'show', 'give',
'recommend', 'can', 'you', 'do', 'something', 'else', 'more', 'am', 'going', 'gonna', 'would', 'like', 'crear', 'hacer', 'cosa', 'voy',
'criar', 'fazer', 'coisa', 'vou', 'no', 'na', 'ao', 'por', 'beaucoup', 'bien', 'tres', 'prendre', 'truc',
'bonjour', 'salut', 'hello', 'hi', 'hey', 'coucou', 'bonsoir', 'hola', 'ola', 'merci', 'thanks', 'thank', 'gracias', 'obrigado', 'obrigada',
'autre', 'autres', 'encore', 'another', 'other', 'otra', 'otro', 'outra', 'outro',
'\u0639\u0644\u0649', '\u0634\u064a\u0621', '\u0627\u0631\u064a\u062f', '\u0645\u0631\u062d\u0628\u0627', '\u0634\u0643\u0631\u0627', '\u0633\u0644\u0627\u0645', '\u0627\u062e\u0631', '\u0627\u062e\u0631\u0649']).map(plain);
var GREET = ['bonjour', 'salut', 'hello', 'hi', 'hey', 'coucou', 'bonsoir', 'hola', 'ola', '\u0645\u0631\u062d\u0628\u0627', '\u0633\u0644\u0627\u0645'].map(plain);
var THANKS = ['merci', 'thanks', 'thank', 'gracias', 'obrigado', 'obrigada', '\u0634\u0643\u0631\u0627'].map(plain);
var MORE = ['autre', 'autres', 'encore', 'another', 'other', 'more', 'else', 'otra', 'otro', 'outra', 'outro', '\u0622\u062e\u0631', '\u0627\u062e\u0631', '\u0623\u062e\u0631\u0649', '\u0627\u062e\u0631\u0649'].map(plain);
PLAT_WORDS['\u0627\u0646\u062f\u0631\u0648\u064a\u062f'] = 'android'; PLAT_WORDS['\u0627\u064a\u0641\u0648\u0646'] = 'ios'; PLAT_WORDS['\u0627\u064a\u0628\u0627\u062f'] = 'ios';

/* v1.5 : mots utiles dans les 8 nouvelles langues */
function addW(map, val, list) { list.split(' ').forEach(function (w) { var p = plain(w); if (p && p.indexOf(' ') === -1) map[p] = val; }); }
addW(CAT_WORDS, 'games', 'spiel spiele gioco giochi oyun oyunlar \u0438\u0433\u0440\u0430 \u0438\u0433\u0440\u044b \u0438\u0433\u0440\u0443 \u6e38\u620f \u30b2\u30fc\u30e0 \uac8c\uc784 \u0916\u0947\u0932 \u0917\u0947\u092e');
addW(CAT_WORDS, 'apps', 'anwendung anwendungen applicazione applicazioni uygulama uygulamalar \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u5e94\u7528 \u30a2\u30d7\u30ea \uc571 \u0910\u092a');
addW(CAT_WORDS, 'ai', '\u0438\u0438 ki zeka \u4eba\u5de5\u667a\u80fd \u4eba\u5de5\u77e5\u80fd \uc778\uacf5\uc9c0\ub2a5 \u090f\u0906\u0908');
addW(PLAT_WORDS, 'ios', '\u0430\u0439\u0444\u043e\u043d \u0430\u0439\u043f\u0430\u0434 \u82f9\u679c \u30a2\u30a4\u30d5\u30a9\u30f3 \uc544\uc774\ud3f0 \u0906\u0908\u092b\u094b\u0928');
addW(PLAT_WORDS, 'android', '\u0430\u043d\u0434\u0440\u043e\u0438\u0434 \u5b89\u5353 \u30a2\u30f3\u30c9\u30ed\u30a4\u30c9 \uc548\ub4dc\ub85c\uc774\ub4dc \u090f\u0902\u0921\u094d\u0930\u0949\u0907\u0921');
addW(PLAT_WORDS, 'pc', '\u043f\u043a \u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440 rechner bilgisayar \u7535\u8111 \u30d1\u30bd\u30b3\u30f3 \ucef4\ud4e8\ud130 \u0915\u0902\u092a\u094d\u092f\u0942\u091f\u0930');
addW(PLAT_WORDS, 'console', 'konsole konsol \u043a\u043e\u043d\u0441\u043e\u043b\u044c \u4e3b\u673a \u30b2\u30fc\u30e0\u6a5f \ucf58\uc194 \u0915\u0902\u0938\u094b\u0932');
addW(PLAT_WORDS, 'web', '\u0432\u0435\u0431 \u7f51\u9875 \u30a6\u30a7\u30d6 \uc6f9 \u0935\u0947\u092c');
function addList(arr, list) { list.split(' ').forEach(function (w) { var p = plain(w); if (p) arr.push(p); }); }
addList(STOP, 'ich moechte will ein eine einen der die das fuer und mit auf ist nach voglio vorrei un una il lo la gli le per di con che mi ben istiyorum bir ve icin ile bana lazim \u044f \u0445\u043e\u0447\u0443 \u043c\u043d\u0435 \u043d\u0443\u0436\u043d\u043e \u043d\u0443\u0436\u0435\u043d \u0434\u043b\u044f \u0438 \u043d\u0430 \u0441 \u043a\u0430\u043a \u092e\u0948\u0902 \u092e\u0941\u091d\u0947 \u091a\u093e\u0939\u093f\u090f \u0939\u0948 \u0915\u0947 \u0915\u0940 \u0915\u093e');
addList(GREET, 'hallo servus moin ciao buongiorno salve buonasera merhaba selam \u043f\u0440\u0438\u0432\u0435\u0442 \u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439 \u4f60\u597d \u60a8\u597d \u3053\u3093\u306b\u3061\u306f \uc548\ub155\ud558\uc138\uc694 \uc548\ub155 \u0928\u092e\u0938\u094d\u0924\u0947');
addList(THANKS, 'danke dankeschoen grazie tesekkurler tesekkur sagol \u0441\u043f\u0430\u0441\u0438\u0431\u043e \u0431\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u044e \u8c22\u8c22 \u591a\u8c22 \u3042\u308a\u304c\u3068\u3046 \u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059 \uac10\uc0ac\ud569\ub2c8\ub2e4 \uace0\ub9c8\uc6cc\uc694 \u0927\u0928\u094d\u092f\u0935\u093e\u0926 \u0936\u0941\u0915\u094d\u0930\u093f\u092f\u093e');
addList(MORE, 'noch andere anderes weitere altro altri altra diger baska \u0434\u0440\u0443\u0433\u043e\u0435 \u0434\u0440\u0443\u0433\u043e\u0439 \u0435\u0449\u0451 \u0435\u0449\u0435 \u5176\u4ed6 \u53e6\u5916 \u4ed6\u306e \ub2e4\ub978 \u0914\u0930 \u0926\u0942\u0938\u0930\u093e');

/* Intentions : ce que la personne veut FAIRE -> produits adapt\u00e9s (dans l'ordre de pr\u00e9f\u00e9rence).
k = mots/expressions d\u00e9clencheurs (toutes langues), ids = produits du catalogue, l = texte affich\u00e9. */
var INTENTS = [
{ id: 'business', k: ['entreprise', 'entreprises', 'business', 'boutique', 'startup', 'start up', 'societe', 'commerce', 'ecommerce', 'e commerce', 'company', 'empresa', 'negocio', 'negocios', 'loja', '\u0634\u0631\u0643\u0629', '\u0645\u0634\u0631\u0648\u0639', '\u062a\u062c\u0627\u0631\u0629'],
ids: ['canva', 'notion', 'trello', 'claude', 'chatgpt', 'todoist', 'perplexity'],
l: { fr: 'cr\u00e9er ou g\u00e9rer une entreprise', en: 'start or run a business', ar: '\u0625\u0646\u0634\u0627\u0621 \u0623\u0648 \u0625\u062f\u0627\u0631\u0629 \u0645\u0634\u0631\u0648\u0639', es: 'crear o gestionar un negocio', pt: 'criar ou gerir um neg\u00f3cio' } },
{ id: 'learn', k: ['apprendre', 'etudier', 'etude', 'cours', 'ecole', 'education', 'apprentissage', 'learn', 'learning', 'study', 'school', 'course', 'courses', 'aprender', 'estudiar', 'estudar', 'curso', 'cursos', 'escuela', 'escola', '\u062a\u0639\u0644\u0645', '\u062f\u0631\u0627\u0633\u0629', '\u062a\u0639\u0644\u064a\u0645', '\u062f\u0631\u0633'],
ids: ['khanacademy', 'duolingo', 'chatgpt', 'claude'],
l: { fr: 'apprendre et \u00e9tudier', en: 'learn and study', ar: '\u0627\u0644\u062a\u0639\u0644\u0645 \u0648\u0627\u0644\u062f\u0631\u0627\u0633\u0629', es: 'aprender y estudiar', pt: 'aprender e estudar' } },
{ id: 'languages', k: ['langue', 'langues', 'anglais', 'english', 'espagnol', 'spanish', 'allemand', 'italien', 'arabe', 'portugais', 'chinois', 'language', 'languages', 'idioma', 'idiomas', 'ingles', 'espanol', 'lingua', 'linguas', '\u0644\u063a\u0629', '\u0644\u063a\u0627\u062a', '\u0627\u0646\u062c\u0644\u064a\u0632\u064a\u0629'],
ids: ['duolingo', 'deepl'],
l: { fr: 'apprendre une langue', en: 'learn a language', ar: '\u062a\u0639\u0644\u0645 \u0644\u063a\u0629', es: 'aprender un idioma', pt: 'aprender um idioma' } },
{ id: 'translate', k: ['traduire', 'traduction', 'translate', 'translation', 'traducir', 'traduccion', 'traduzir', 'traducao', '\u062a\u0631\u062c\u0645\u0629', '\u062a\u0631\u062c\u0645'],
ids: ['deepl', 'chatgpt', 'claude', 'gemini'],
l: { fr: 'traduire un texte', en: 'translate a text', ar: '\u062a\u0631\u062c\u0645\u0629 \u0646\u0635', es: 'traducir un texto', pt: 'traduzir um texto' } },
{ id: 'write', k: ['ecrire', 'rediger', 'redaction', 'texte', 'lettre', 'email', 'mail', 'article', 'resume', 'write', 'writing', 'text', 'escribir', 'redactar', 'escrever', 'carta', '\u0643\u062a\u0627\u0628\u0629', '\u0627\u0643\u062a\u0628', '\u0646\u0635', '\u0631\u0633\u0627\u0644\u0629'],
ids: ['chatgpt', 'claude', 'gemini', 'mscopilot', 'deepl'],
l: { fr: '\u00e9crire et r\u00e9diger', en: 'write', ar: '\u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0648\u0627\u0644\u062a\u062d\u0631\u064a\u0631', es: 'escribir y redactar', pt: 'escrever e redigir' } },
{ id: 'design', k: ['logo', 'affiche', 'flyer', 'design', 'presentation', 'poster', 'miniature', 'branding', 'diseno', 'cartaz', '\u062a\u0635\u0645\u064a\u0645', '\u0634\u0639\u0627\u0631'],
ids: ['canva', 'midjourney'],
l: { fr: 'cr\u00e9er un logo, une affiche ou un visuel', en: 'create a logo, poster or visual', ar: '\u062a\u0635\u0645\u064a\u0645 \u0634\u0639\u0627\u0631 \u0623\u0648 \u0645\u0644\u0635\u0642', es: 'crear un logo, cartel o visual', pt: 'criar um log\u00f3tipo, cartaz ou visual' } },
{ id: 'image', k: ['image', 'images', 'photo', 'photos', 'dessin', 'dessiner', 'illustration', 'picture', 'pictures', 'imagen', 'imagem', 'desenho', '\u0635\u0648\u0631\u0629', '\u0635\u0648\u0631'],
ids: ['midjourney', 'canva', 'gemini', 'runway'],
l: { fr: 'cr\u00e9er des images', en: 'create images', ar: '\u0625\u0646\u0634\u0627\u0621 \u0635\u0648\u0631', es: 'crear im\u00e1genes', pt: 'criar imagens' } },
{ id: 'video', k: ['video', 'videos', 'film', 'montage', 'clip', 'clips', 'animation', '\u0641\u064a\u062f\u064a\u0648'],
ids: ['runway', 'canva'],
l: { fr: 'cr\u00e9er ou monter une vid\u00e9o', en: 'create or edit a video', ar: '\u0625\u0646\u0634\u0627\u0621 \u0623\u0648 \u062a\u062d\u0631\u064a\u0631 \u0641\u064a\u062f\u064a\u0648', es: 'crear o editar un v\u00eddeo', pt: 'criar ou editar um v\u00eddeo' } },
{ id: 'creator', k: ['contenu', 'createur', 'createurs', 'youtube', 'tiktok', 'reels', 'influenceur', 'content', 'creator', 'instagram', 'creador', 'criador', '\u0645\u062d\u062a\u0648\u0649'],
ids: ['canva', 'runway', 'elevenlabs', 'suno', 'chatgpt'],
l: { fr: 'cr\u00e9er du contenu', en: 'create content', ar: '\u0625\u0646\u0634\u0627\u0621 \u0645\u062d\u062a\u0648\u0649', es: 'crear contenido', pt: 'criar conte\u00fado' } },
{ id: 'music', k: ['musique', 'chanson', 'chansons', 'music', 'song', 'songs', 'ecouter', 'podcast', 'podcasts', 'musica', 'cancion', '\u0645\u0648\u0633\u064a\u0642\u0649', '\u0627\u063a\u0646\u064a\u0629'],
ids: ['spotify', 'suno'],
l: { fr: 'musique et audio', en: 'music and audio', ar: '\u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649 \u0648\u0627\u0644\u0635\u0648\u062a', es: 'm\u00fasica y audio', pt: 'm\u00fasica e \u00e1udio' } },
{ id: 'voice', k: ['voix', 'voice', 'voiceover', 'doublage', 'narration', 'synthese vocale', 'text to speech', 'voz', '\u0635\u0648\u062a'],
ids: ['elevenlabs'],
l: { fr: 'cr\u00e9er une voix', en: 'create a voice', ar: '\u0625\u0646\u0634\u0627\u0621 \u0635\u0648\u062a', es: 'crear una voz', pt: 'criar uma voz' } },
{ id: 'code', k: ['code', 'coder', 'programmer', 'programmation', 'developpeur', 'developper', 'developer', 'programming', 'python', 'javascript', 'site web', 'site internet', 'website', 'programar', 'programacao', 'programacion', '\u0628\u0631\u0645\u062c\u0629', '\u0643\u0648\u062f'],
ids: ['copilot', 'cursor', 'chatgpt', 'claude', 'huggingface'],
l: { fr: 'programmer', en: 'write code', ar: '\u0627\u0644\u0628\u0631\u0645\u062c\u0629', es: 'programar', pt: 'programar' } },
{ id: 'organize', k: ['organiser', 'organisation', 'taches', 'tache', 'todo', 'planning', 'planifier', 'rappels', 'projet', 'projets', 'productivite', 'productivity', 'organize', 'tasks', 'task', 'planificar', 'organizar', 'tarefas', 'tareas', '\u062a\u0646\u0638\u064a\u0645', '\u0645\u0647\u0627\u0645'],
ids: ['todoist', 'trello', 'notion', 'obsidian'],
l: { fr: 'organiser son travail', en: 'organise your work', ar: '\u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0639\u0645\u0644', es: 'organizar tu trabajo', pt: 'organizar o trabalho' } },
{ id: 'notes', k: ['notes', 'note', 'carnet', 'apuntes', 'anotacoes', '\u0645\u0644\u0627\u062d\u0638\u0627\u062a'],
ids: ['notion', 'obsidian'],
l: { fr: 'prendre des notes', en: 'take notes', ar: '\u062a\u062f\u0648\u064a\u0646 \u0627\u0644\u0645\u0644\u0627\u062d\u0638\u0627\u062a', es: 'tomar notas', pt: 'tomar notas' } },
{ id: 'chat', k: ['messagerie', 'message', 'messages', 'discuter', 'chat', 'appeler', 'appels', 'messaging', 'mensajes', 'mensagens', '\u0631\u0633\u0627\u0626\u0644', '\u0645\u0631\u0627\u0633\u0644\u0629'],
ids: ['whatsapp', 'telegram', 'signal'],
l: { fr: 'discuter et envoyer des messages', en: 'chat and send messages', ar: '\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u0648\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0626\u0644', es: 'chatear y enviar mensajes', pt: 'conversar e enviar mensagens' } },
{ id: 'privacy', k: ['securite', 'confidentialite', 'prive', 'privacy', 'security', 'mots de passe', 'mot de passe', 'password', 'passwords', 'mdp', 'contrasena', 'contrasenas', 'senha', 'senhas', '\u062e\u0635\u0648\u0635\u064a\u0629', '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631', '\u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0645\u0631\u0648\u0631', '\u0627\u0645\u0627\u0646'],
ids: ['bitwarden', 'signal'],
l: { fr: 's\u00e9curit\u00e9 et vie priv\u00e9e', en: 'security and privacy', ar: '\u0627\u0644\u0623\u0645\u0627\u0646 \u0648\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629', es: 'seguridad y privacidad', pt: 'seguran\u00e7a e privacidade' } },
{ id: 'research', k: ['recherche', 'rechercher', 'sources', 'research', 'investigar', 'pesquisar', 'pesquisa', '\u0628\u062d\u062b'],
ids: ['perplexity', 'gemini', 'chatgpt', 'claude'],
l: { fr: 'faire des recherches', en: 'do research', ar: '\u0627\u0644\u0628\u062d\u062b', es: 'investigar', pt: 'pesquisar' } },
{ id: 'chess', k: ['echecs', 'echec', 'chess', 'ajedrez', 'xadrez', '\u0634\u0637\u0631\u0646\u062c'],
ids: ['chesscom', 'lichess'],
l: { fr: 'jouer aux \u00e9checs', en: 'play chess', ar: '\u0644\u0639\u0628 \u0627\u0644\u0634\u0637\u0631\u0646\u062c', es: 'jugar al ajedrez', pt: 'jogar xadrez' } },
{ id: 'strategy', k: ['strategie', 'strategy', 'cartes', 'estrategia', 'duel', '\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629'],
ids: ['clashroyale', 'chesscom', 'lichess'],
l: { fr: 'jeux de strat\u00e9gie', en: 'strategy games', ar: '\u0623\u0644\u0639\u0627\u0628 \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629', es: 'juegos de estrategia', pt: 'jogos de estrat\u00e9gia' } },
{ id: 'friends', k: ['amis', 'multijoueur', 'multiplayer', 'friends', 'ensemble', 'amigos', 'multijugador', '\u0627\u0635\u062f\u0642\u0627\u0621'],
ids: ['amongus', 'roblox', 'fortnite', 'minecraft'],
l: { fr: 'jouer avec des amis', en: 'play with friends', ar: '\u0627\u0644\u0644\u0639\u0628 \u0645\u0639 \u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621', es: 'jugar con amigos', pt: 'jogar com amigos' } },
{ id: 'relax', k: ['detente', 'detendre', 'amuser', 'amusant', 'fun', 'divertir', 'relax', 'casual', 'puzzle', 'ennui', 'bored', 'relajar', 'relaxar', '\u0627\u0633\u062a\u0631\u062e\u0627\u0621'],
ids: ['candycrush', 'stardew', 'subway'],
l: { fr: 'se d\u00e9tendre', en: 'relax', ar: '\u0627\u0644\u0627\u0633\u062a\u0631\u062e\u0627\u0621', es: 'relajarse', pt: 'relaxar' } },
{ id: 'adventure', k: ['aventure', 'adventure', 'rpg', 'monde ouvert', 'open world', 'aventura', '\u0645\u063a\u0627\u0645\u0631\u0629'],
ids: ['genshin', 'stardew', 'minecraft'],
l: { fr: 'aventure et mondes ouverts', en: 'adventure and open worlds', ar: '\u0627\u0644\u0645\u063a\u0627\u0645\u0631\u0629 \u0648\u0627\u0644\u0639\u0648\u0627\u0644\u0645 \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629', es: 'aventura y mundos abiertos', pt: 'aventura e mundos abertos' } }
];
/* v1.7 : les nouveaux produits entrent dans les intentions existantes ; deux nouvelles intentions (argent, livres) */
Object.keys(ADD_IDS).forEach(function (id) {
INTENTS.forEach(function (n) { if (n.id === id) n.ids = n.ids.concat(ADD_IDS[id]); });
});
NEW_INT.forEach(function (x) { INTENTS.push({ id: x.id, k: x.k.split(' '), ids: x.ids, l: x.l }); });
/* v1.5 : 8 langues de plus (zh, hi, ru, de, ja, ko, it, tr) : libelles et mots-cles des intentions */
var EXTRA_INT = {"business": {"zh": ["\u521b\u4e1a\u6216\u7ecf\u8425\u4f01\u4e1a", "\u521b\u4e1a \u516c\u53f8 \u751f\u610f \u4f01\u4e1a \u5f00\u5e97 \u7535\u5546"], "hi": ["\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u093e \u092f\u093e \u091a\u0932\u093e\u0928\u093e", "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u092c\u093f\u091c\u093c\u0928\u0947\u0938 \u0915\u0902\u092a\u0928\u0940 \u0926\u0941\u0915\u093e\u0928 \u0938\u094d\u091f\u093e\u0930\u094d\u091f\u0905\u092a"], "ru": ["\u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0438\u043b\u0438 \u0432\u0435\u0441\u0442\u0438 \u0431\u0438\u0437\u043d\u0435\u0441", "\u0431\u0438\u0437\u043d\u0435\u0441 \u043f\u0440\u0435\u0434\u043f\u0440\u0438\u044f\u0442\u0438\u0435 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f \u0441\u0442\u0430\u0440\u0442\u0430\u043f \u043c\u0430\u0433\u0430\u0437\u0438\u043d \u0434\u0435\u043b\u043e"], "de": ["ein Unternehmen gr\u00fcnden oder f\u00fchren", "unternehmen firma geschaeft gruenden startup business"], "ja": ["\u8d77\u696d\u30fb\u4e8b\u696d\u904b\u55b6", "\u8d77\u696d \u4f1a\u793e \u4e8b\u696d \u30d3\u30b8\u30cd\u30b9 \u958b\u696d"], "ko": ["\uc0ac\uc5c5 \uc2dc\uc791\u00b7\uc6b4\uc601", "\uc0ac\uc5c5 \ucc3d\uc5c5 \ud68c\uc0ac \ube44\uc988\ub2c8\uc2a4 \uc1fc\ud551\ubab0"], "it": ["avviare o gestire un\u2019attivit\u00e0", "azienda impresa attivita business negozio startup"], "tr": ["i\u015fletme kurmak veya y\u00f6netmek", "isletme sirket is kurmak girisim ticaret"]}, "learn": {"zh": ["\u5b66\u4e60", "\u5b66\u4e60 \u8bfe\u7a0b \u6559\u80b2 \u5b66\u6821"], "hi": ["\u0938\u0940\u0916\u0928\u093e \u0914\u0930 \u092a\u0922\u093c\u0928\u093e", "\u0938\u0940\u0916\u0928\u093e \u092a\u0922\u093c\u093e\u0908 \u092a\u0922\u093c\u0928\u093e \u0936\u093f\u0915\u094d\u0937\u093e \u0915\u094b\u0930\u094d\u0938"], "ru": ["\u0443\u0447\u0438\u0442\u044c\u0441\u044f", "\u0443\u0447\u0438\u0442\u044c\u0441\u044f \u0443\u0447\u0451\u0431\u0430 \u0443\u0447\u0435\u0431\u0430 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043a\u0443\u0440\u0441 \u043a\u0443\u0440\u0441\u044b \u0438\u0437\u0443\u0447\u0438\u0442\u044c"], "de": ["lernen und studieren", "lernen studieren kurs kurse bildung schule"], "ja": ["\u5b66\u3076\u30fb\u52c9\u5f37\u3059\u308b", "\u5b66\u3076 \u52c9\u5f37 \u5b66\u7fd2 \u6388\u696d \u6559\u80b2"], "ko": ["\ubc30\uc6b0\uae30\uc640 \uacf5\ubd80", "\ubc30\uc6b0 \uacf5\ubd80 \ud559\uc2b5 \uac15\uc758 \uad50\uc721"], "it": ["imparare e studiare", "imparare studiare corso corsi scuola"], "tr": ["\u00f6\u011frenmek ve \u00e7al\u0131\u015fmak", "ogrenmek ogrenme ders kurs egitim okul"]}, "languages": {"zh": ["\u5b66\u4e60\u8bed\u8a00", "\u82f1\u8bed \u82f1\u6587 \u5916\u8bed \u897f\u73ed\u7259\u8bed \u6cd5\u8bed \u5fb7\u8bed \u65e5\u8bed \u8bed\u8a00"], "hi": ["\u092d\u093e\u0937\u093e \u0938\u0940\u0916\u0928\u093e", "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940 \u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940 \u092d\u093e\u0937\u093e \u092d\u093e\u0937\u093e\u090f\u0901"], "ru": ["\u0443\u0447\u0438\u0442\u044c \u044f\u0437\u044b\u043a", "\u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a \u044f\u0437\u044b\u043a\u0438 \u0438\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0439 \u043d\u0435\u043c\u0435\u0446\u043a\u0438\u0439 \u0444\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0438\u0439"], "de": ["eine Sprache lernen", "sprache sprachen englisch spanisch franzoesisch italienisch"], "ja": ["\u8a00\u8a9e\u3092\u5b66\u3076", "\u82f1\u8a9e \u5916\u56fd\u8a9e \u8a00\u8a9e \u8a9e\u5b66"], "ko": ["\uc5b8\uc5b4 \ubc30\uc6b0\uae30", "\uc601\uc5b4 \uc678\uad6d\uc5b4 \uc5b8\uc5b4 \uc5b4\ud559"], "it": ["imparare una lingua", "lingua lingue inglese spagnolo tedesco francese"], "tr": ["dil \u00f6\u011frenmek", "dil diller ingilizce ispanyolca almanca fransizca"]}, "translate": {"zh": ["\u7ffb\u8bd1\u6587\u672c", "\u7ffb\u8bd1 \u8bd1\u6210"], "hi": ["\u091f\u0947\u0915\u094d\u0938\u094d\u091f \u0915\u093e \u0905\u0928\u0941\u0935\u093e\u0926", "\u0905\u0928\u0941\u0935\u093e\u0926 \u0905\u0928\u0941\u0935\u093e\u0926 \u0915\u0930\u0928\u093e"], "ru": ["\u043f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0442\u0435\u043a\u0441\u0442", "\u043f\u0435\u0440\u0435\u0432\u043e\u0434 \u043f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0447\u0438\u043a"], "de": ["einen Text \u00fcbersetzen", "uebersetzen uebersetzung"], "ja": ["\u6587\u7ae0\u3092\u7ffb\u8a33\u3059\u308b", "\u7ffb\u8a33 \u7ffb\u8a33\u3059\u308b"], "ko": ["\ud14d\uc2a4\ud2b8 \ubc88\uc5ed", "\ubc88\uc5ed \ubc88\uc5ed\ud558"], "it": ["tradurre un testo", "tradurre traduzione"], "tr": ["metin \u00e7evirmek", "ceviri cevirmek tercume"]}, "write": {"zh": ["\u5199\u4f5c", "\u5199\u4f5c \u6587\u7ae0 \u90ae\u4ef6"], "hi": ["\u0932\u093f\u0916\u0928\u093e", "\u0932\u093f\u0916\u0928\u093e \u0932\u0947\u0916 \u0908\u092e\u0947\u0932 \u092a\u0924\u094d\u0930"], "ru": ["\u043f\u0438\u0441\u0430\u0442\u044c \u0442\u0435\u043a\u0441\u0442\u044b", "\u043f\u0438\u0441\u0430\u0442\u044c \u043d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0442\u0435\u043a\u0441\u0442 \u043f\u0438\u0441\u044c\u043c\u043e \u0441\u0442\u0430\u0442\u044c\u044f"], "de": ["schreiben und formulieren", "schreiben text brief artikel verfassen"], "ja": ["\u6587\u7ae0\u3092\u66f8\u304f", "\u66f8\u304f \u6587\u7ae0 \u4f5c\u6587 \u30e1\u30fc\u30eb \u624b\u7d19"], "ko": ["\uae00\uc4f0\uae30", "\uc4f0\uae30 \uae00\uc4f0\uae30 \uc791\ubb38 \uc774\uba54\uc77c \ud3b8\uc9c0"], "it": ["scrivere e redigere", "scrivere testo lettera articolo redigere"], "tr": ["yazmak", "yazmak metin mektup makale yazi"]}, "design": {"zh": ["\u8bbe\u8ba1\u6807\u5fd7\u3001\u6d77\u62a5\u6216\u89c6\u89c9", "\u8bbe\u8ba1 \u6807\u5fd7 \u6d77\u62a5 logo \u4f20\u5355"], "hi": ["\u0932\u094b\u0917\u094b, \u092a\u094b\u0938\u094d\u091f\u0930 \u092f\u093e \u0921\u093f\u091c\u093c\u093e\u0907\u0928 \u092c\u0928\u093e\u0928\u093e", "\u0921\u093f\u091c\u093c\u093e\u0907\u0928 \u0932\u094b\u0917\u094b \u092a\u094b\u0938\u094d\u091f\u0930"], "ru": ["\u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043b\u043e\u0433\u043e\u0442\u0438\u043f, \u0430\u0444\u0438\u0448\u0443 \u0438\u043b\u0438 \u0434\u0438\u0437\u0430\u0439\u043d", "\u0434\u0438\u0437\u0430\u0439\u043d \u043b\u043e\u0433\u043e\u0442\u0438\u043f \u0430\u0444\u0438\u0448\u0430 \u043f\u043b\u0430\u043a\u0430\u0442 \u043f\u043e\u0441\u0442\u0435\u0440"], "de": ["Logo, Plakat oder Grafik erstellen", "logo plakat poster grafik gestalten"], "ja": ["\u30ed\u30b4\u3084\u30dd\u30b9\u30bf\u30fc\u3092\u4f5c\u308b", "\u30c7\u30b6\u30a4\u30f3 \u30ed\u30b4 \u30dd\u30b9\u30bf\u30fc \u30c1\u30e9\u30b7"], "ko": ["\ub85c\uace0, \ud3ec\uc2a4\ud130 \ub514\uc790\uc778", "\ub514\uc790\uc778 \ub85c\uace0 \ud3ec\uc2a4\ud130 \uc804\ub2e8"], "it": ["creare un logo, un poster o una grafica", "logo poster locandina grafica design"], "tr": ["logo, afi\u015f veya g\u00f6rsel tasarlamak", "tasarim logo afis poster"]}, "image": {"zh": ["\u751f\u6210\u56fe\u7247", "\u56fe\u7247 \u56fe\u50cf \u7167\u7247 \u7ed8\u753b"], "hi": ["\u091a\u093f\u0924\u094d\u0930 \u092c\u0928\u093e\u0928\u093e", "\u091a\u093f\u0924\u094d\u0930 \u0924\u0938\u094d\u0935\u0940\u0930 \u092b\u094b\u091f\u094b \u0907\u092e\u0947\u091c"], "ru": ["\u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f", "\u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0430 \u0444\u043e\u0442\u043e \u0440\u0438\u0441\u0443\u043d\u043e\u043a \u0440\u0438\u0441\u043e\u0432\u0430\u0442\u044c"], "de": ["Bilder erstellen", "bild bilder foto zeichnen illustration"], "ja": ["\u753b\u50cf\u3092\u4f5c\u308b", "\u753b\u50cf \u5199\u771f \u30a4\u30e9\u30b9\u30c8"], "ko": ["\uc774\ubbf8\uc9c0 \ub9cc\ub4e4\uae30", "\uc774\ubbf8\uc9c0 \uc0ac\uc9c4 \uadf8\ub9bc \uc77c\ub7ec\uc2a4\ud2b8"], "it": ["creare immagini", "immagine immagini foto disegno disegnare"], "tr": ["g\u00f6rsel olu\u015fturmak", "gorsel resim fotograf cizim"]}, "video": {"zh": ["\u5236\u4f5c\u6216\u526a\u8f91\u89c6\u9891", "\u89c6\u9891 \u526a\u8f91 \u5f71\u7247 \u52a8\u753b"], "hi": ["\u0935\u0940\u0921\u093f\u092f\u094b \u092c\u0928\u093e\u0928\u093e \u092f\u093e \u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0928\u093e", "\u0935\u0940\u0921\u093f\u092f\u094b \u092b\u093c\u093f\u0932\u094d\u092e \u090f\u0928\u093f\u092e\u0947\u0936\u0928"], "ru": ["\u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u0438\u043b\u0438 \u043c\u043e\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0432\u0438\u0434\u0435\u043e", "\u0432\u0438\u0434\u0435\u043e \u043c\u043e\u043d\u0442\u0430\u0436 \u0440\u043e\u043b\u0438\u043a \u0444\u0438\u043b\u044c\u043c \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u044f"], "de": ["Videos erstellen oder schneiden", "video videos schneiden film animation"], "ja": ["\u52d5\u753b\u3092\u4f5c\u308b\u30fb\u7de8\u96c6\u3059\u308b", "\u52d5\u753b \u30d3\u30c7\u30aa \u6620\u50cf \u7de8\u96c6"], "ko": ["\ub3d9\uc601\uc0c1 \ub9cc\ub4e4\uae30\u00b7\ud3b8\uc9d1", "\ub3d9\uc601\uc0c1 \ube44\ub514\uc624 \uc601\uc0c1 \ud3b8\uc9d1"], "it": ["creare o montare video", "video montaggio film animazione"], "tr": ["video olu\u015fturmak veya d\u00fczenlemek", "video montaj film animasyon"]}, "creator": {"zh": ["\u521b\u4f5c\u5185\u5bb9", "\u5185\u5bb9\u521b\u4f5c \u521b\u4f5c \u535a\u4e3b \u81ea\u5a92\u4f53"], "hi": ["\u0915\u0902\u091f\u0947\u0902\u091f \u092c\u0928\u093e\u0928\u093e", "\u0915\u0902\u091f\u0947\u0902\u091f \u0915\u094d\u0930\u093f\u090f\u091f\u0930"], "ru": ["\u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043a\u043e\u043d\u0442\u0435\u043d\u0442", "\u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0431\u043b\u043e\u0433\u0435\u0440 \u0442\u0432\u043e\u0440\u0447\u0435\u0441\u0442\u0432\u043e"], "de": ["Inhalte erstellen", "inhalte content creator"], "ja": ["\u30b3\u30f3\u30c6\u30f3\u30c4\u3092\u4f5c\u308b", "\u30b3\u30f3\u30c6\u30f3\u30c4 \u914d\u4fe1 \u30af\u30ea\u30a8\u30a4\u30bf\u30fc"], "ko": ["\ucf58\ud150\uce20 \uc81c\uc791", "\ucf58\ud150\uce20 \ud06c\ub9ac\uc5d0\uc774\ud130 \uc720\ud29c\ube0c"], "it": ["creare contenuti", "contenuti creator contenuto"], "tr": ["i\u00e7erik \u00fcretmek", "icerik uretici icerik"]}, "music": {"zh": ["\u97f3\u4e50\u548c\u97f3\u9891", "\u97f3\u4e50 \u6b4c\u66f2 \u97f3\u9891"], "hi": ["\u0938\u0902\u0917\u0940\u0924 \u0914\u0930 \u0911\u0921\u093f\u092f\u094b", "\u0938\u0902\u0917\u0940\u0924 \u0917\u093e\u0928\u093e \u0917\u093e\u0928\u0947 \u0911\u0921\u093f\u092f\u094b"], "ru": ["\u043c\u0443\u0437\u044b\u043a\u0430 \u0438 \u0430\u0443\u0434\u0438\u043e", "\u043c\u0443\u0437\u044b\u043a\u0430 \u043f\u0435\u0441\u043d\u044f \u043f\u0435\u0441\u043d\u0438 \u0430\u0443\u0434\u0438\u043e"], "de": ["Musik und Audio", "musik lied lieder audio song"], "ja": ["\u97f3\u697d\u3068\u30aa\u30fc\u30c7\u30a3\u30aa", "\u97f3\u697d \u30aa\u30fc\u30c7\u30a3\u30aa"], "ko": ["\uc74c\uc545\uacfc \uc624\ub514\uc624", "\uc74c\uc545 \ub178\ub798 \uc624\ub514\uc624"], "it": ["musica e audio", "musica canzone canzoni audio"], "tr": ["m\u00fczik ve ses", "muzik sarki ses"]}, "voice": {"zh": ["\u751f\u6210\u58f0\u97f3", "\u914d\u97f3 \u8bed\u97f3 \u58f0\u97f3"], "hi": ["\u0906\u0935\u093e\u091c\u093c \u092c\u0928\u093e\u0928\u093e", "\u0906\u0935\u093e\u091c\u093c \u0906\u0935\u093e\u091c \u0935\u0949\u092f\u0938"], "ru": ["\u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0433\u043e\u043b\u043e\u0441", "\u0433\u043e\u043b\u043e\u0441 \u043e\u0437\u0432\u0443\u0447\u043a\u0430 \u043e\u0437\u0432\u0443\u0447\u0438\u0442\u044c"], "de": ["eine Stimme erzeugen", "stimme sprecher vertonen"], "ja": ["\u97f3\u58f0\u3092\u4f5c\u308b", "\u97f3\u58f0 \u30ca\u30ec\u30fc\u30b7\u30e7\u30f3"], "ko": ["\uc74c\uc131 \ub9cc\ub4e4\uae30", "\uc74c\uc131 \ubaa9\uc18c\ub9ac \ub354\ube59"], "it": ["creare una voce", "voce doppiaggio"], "tr": ["ses olu\u015fturmak", "ses seslendirme"]}, "code": {"zh": ["\u7f16\u5199\u4ee3\u7801", "\u4ee3\u7801 \u7f16\u7a0b \u7a0b\u5e8f \u5f00\u53d1"], "hi": ["\u0915\u094b\u0921 \u0932\u093f\u0916\u0928\u093e", "\u0915\u094b\u0921 \u0915\u094b\u0921\u093f\u0902\u0917 \u092a\u094d\u0930\u094b\u0917\u094d\u0930\u093e\u092e\u093f\u0902\u0917"], "ru": ["\u043f\u0438\u0441\u0430\u0442\u044c \u043a\u043e\u0434", "\u043a\u043e\u0434 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430"], "de": ["Code schreiben", "code programmieren programmierung entwickeln"], "ja": ["\u30b3\u30fc\u30c9\u3092\u66f8\u304f", "\u30b3\u30fc\u30c9 \u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0 \u958b\u767a"], "ko": ["\ucf54\ub4dc \uc791\uc131", "\ucf54\ub4dc \ucf54\ub529 \ud504\ub85c\uadf8\ub798\ubc0d \uac1c\ubc1c"], "it": ["scrivere codice", "codice programmare programmazione sviluppo"], "tr": ["kod yazmak", "kod kodlama programlama yazilim"]}, "organize": {"zh": ["\u7ba1\u7406\u5de5\u4f5c", "\u4efb\u52a1 \u5f85\u529e \u6548\u7387 \u7ba1\u7406 \u8ba1\u5212"], "hi": ["\u0915\u093e\u092e \u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093f\u0924 \u0915\u0930\u0928\u093e", "\u0915\u093e\u092e \u0915\u093e\u0930\u094d\u092f \u091f\u093e\u0938\u094d\u0915 \u092f\u094b\u091c\u0928\u093e \u0909\u0924\u094d\u092a\u093e\u0926\u0915\u0924\u093e"], "ru": ["\u043e\u0440\u0433\u0430\u043d\u0438\u0437\u043e\u0432\u0430\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u0443", "\u0437\u0430\u0434\u0430\u0447\u0438 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u043e\u0432\u0430\u0442\u044c \u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u0434\u0435\u043b\u0430"], "de": ["Arbeit organisieren", "aufgaben organisieren planen produktivitaet"], "ja": ["\u4ed5\u4e8b\u3092\u6574\u7406\u3059\u308b", "\u30bf\u30b9\u30af \u6574\u7406 \u8a08\u753b \u751f\u7523\u6027 \u7ba1\u7406"], "ko": ["\uc5c5\ubb34 \uc815\ub9ac", "\ud560 \uc77c \uc791\uc5c5 \uc815\ub9ac \uacc4\ud68d \uc0dd\uc0b0\uc131"], "it": ["organizzare il lavoro", "compiti attivita organizzare pianificare produttivita"], "tr": ["i\u015flerini d\u00fczenlemek", "gorev gorevler planlamak verimlilik duzenlemek"]}, "notes": {"zh": ["\u505a\u7b14\u8bb0", "\u7b14\u8bb0 \u8bb0\u5f55 \u5907\u5fd8"], "hi": ["\u0928\u094b\u091f\u094d\u0938 \u092c\u0928\u093e\u0928\u093e", "\u0928\u094b\u091f\u094d\u0938 \u0928\u094b\u091f"], "ru": ["\u0434\u0435\u043b\u0430\u0442\u044c \u0437\u0430\u043c\u0435\u0442\u043a\u0438", "\u0437\u0430\u043c\u0435\u0442\u043a\u0438 \u043a\u043e\u043d\u0441\u043f\u0435\u043a\u0442 \u0437\u0430\u043f\u0438\u0441\u0438"], "de": ["Notizen machen", "notizen notiz aufschreiben"], "ja": ["\u30e1\u30e2\u3092\u53d6\u308b", "\u30e1\u30e2 \u30ce\u30fc\u30c8 \u8a18\u9332"], "ko": ["\uba54\ubaa8\ud558\uae30", "\uba54\ubaa8 \ub178\ud2b8 \ud544\uae30"], "it": ["prendere appunti", "appunti note"], "tr": ["not almak", "not notlar"]}, "chat": {"zh": ["\u804a\u5929\u548c\u53d1\u6d88\u606f", "\u804a\u5929 \u6d88\u606f \u77ed\u4fe1 \u901a\u8baf"], "hi": ["\u091a\u0948\u091f \u0914\u0930 \u0938\u0902\u0926\u0947\u0936 \u092d\u0947\u091c\u0928\u093e", "\u091a\u0948\u091f \u0938\u0902\u0926\u0947\u0936 \u092e\u0948\u0938\u0947\u091c"], "ru": ["\u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0438 \u043f\u0438\u0441\u0430\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f", "\u0447\u0430\u0442 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043c\u0435\u0441\u0441\u0435\u043d\u0434\u0436\u0435\u0440 \u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0430"], "de": ["chatten und Nachrichten senden", "chat chatten nachricht nachrichten messenger"], "ja": ["\u30c1\u30e3\u30c3\u30c8\u30fb\u30e1\u30c3\u30bb\u30fc\u30b8", "\u30c1\u30e3\u30c3\u30c8 \u30e1\u30c3\u30bb\u30fc\u30b8 \u9023\u7d61"], "ko": ["\ucc44\ud305\uacfc \uba54\uc2dc\uc9c0", "\ucc44\ud305 \uba54\uc2dc\uc9c0 \uba54\uc2e0\uc800 \ub300\ud654"], "it": ["chattare e inviare messaggi", "chat messaggi messaggio messaggistica"], "tr": ["sohbet ve mesajla\u015fma", "sohbet mesaj mesajlasma"]}, "privacy": {"zh": ["\u5b89\u5168\u4e0e\u9690\u79c1", "\u5b89\u5168 \u9690\u79c1 \u5bc6\u7801 \u4fdd\u5bc6"], "hi": ["\u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0914\u0930 \u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e", "\u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921"], "ru": ["\u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c \u0438 \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0441\u0442\u044c", "\u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0441\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c \u043f\u0430\u0440\u043e\u043b\u0438 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c"], "de": ["Sicherheit und Datenschutz", "sicherheit datenschutz passwort passwoerter privatsphaere"], "ja": ["\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u3068\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc", "\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3 \u30d7\u30e9\u30a4\u30d0\u30b7\u30fc \u30d1\u30b9\u30ef\u30fc\u30c9 \u5b89\u5168"], "ko": ["\ubcf4\uc548\uacfc \uac1c\uc778\uc815\ubcf4", "\ubcf4\uc548 \uac1c\uc778\uc815\ubcf4 \ube44\ubc00\ubc88\ud638 \ud504\ub77c\uc774\ubc84\uc2dc"], "it": ["sicurezza e privacy", "sicurezza privacy password riservatezza"], "tr": ["g\u00fcvenlik ve gizlilik", "guvenlik gizlilik sifre parola"]}, "research": {"zh": ["\u505a\u7814\u7a76", "\u7814\u7a76 \u641c\u7d22 \u67e5\u8d44\u6599 \u8c03\u67e5"], "hi": ["\u0936\u094b\u0927 \u0915\u0930\u0928\u093e", "\u0936\u094b\u0927 \u0916\u094b\u091c \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u0930\u093f\u0938\u0930\u094d\u091a"], "ru": ["\u0438\u0441\u043a\u0430\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e", "\u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0438\u0441\u043a \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043d\u0430\u0439\u0442\u0438 \u0440\u0435\u0441\u0451\u0440\u0447"], "de": ["recherchieren", "recherche recherchieren forschen informationen"], "ja": ["\u8abf\u3079\u3082\u306e", "\u8abf\u67fb \u30ea\u30b5\u30fc\u30c1 \u691c\u7d22 \u8abf\u3079\u308b"], "ko": ["\uc870\uc0ac\ud558\uae30", "\uc870\uc0ac \ub9ac\uc11c\uce58 \uac80\uc0c9 \uc54c\uc544\ubcf4"], "it": ["fare ricerche", "ricerca ricerche cercare informazioni"], "tr": ["ara\u015ft\u0131rma yapmak", "arastirma arastirmak bilgi"]}, "chess": {"zh": ["\u4e0b\u56fd\u9645\u8c61\u68cb", "\u56fd\u9645\u8c61\u68cb \u8c61\u68cb"], "hi": ["\u0936\u0924\u0930\u0902\u091c \u0916\u0947\u0932\u0928\u093e", "\u0936\u0924\u0930\u0902\u091c"], "ru": ["\u0438\u0433\u0440\u0430\u0442\u044c \u0432 \u0448\u0430\u0445\u043c\u0430\u0442\u044b", "\u0448\u0430\u0445\u043c\u0430\u0442\u044b \u0448\u0430\u0445\u043c\u0430\u0442"], "de": ["Schach spielen", "schach"], "ja": ["\u30c1\u30a7\u30b9\u3092\u3059\u308b", "\u30c1\u30a7\u30b9"], "ko": ["\uccb4\uc2a4 \ub450\uae30", "\uccb4\uc2a4"], "it": ["giocare a scacchi", "scacchi"], "tr": ["satran\u00e7 oynamak", "satranc"]}, "strategy": {"zh": ["\u7b56\u7565\u6e38\u620f", "\u7b56\u7565 \u6218\u7565"], "hi": ["\u0930\u0923\u0928\u0940\u0924\u093f \u0935\u093e\u0932\u0947 \u0917\u0947\u092e", "\u0930\u0923\u0928\u0940\u0924\u093f \u0938\u094d\u091f\u094d\u0930\u0948\u091f\u0947\u091c\u0940"], "ru": ["\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438", "\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043a\u0430\u044f"], "de": ["Strategiespiele", "strategie strategiespiel"], "ja": ["\u6226\u7565\u30b2\u30fc\u30e0", "\u6226\u7565 \u30b9\u30c8\u30e9\u30c6\u30b8\u30fc"], "ko": ["\uc804\ub7b5 \uac8c\uc784", "\uc804\ub7b5 \uc2a4\ud2b8\ub798\ud2f0\uc9c0"], "it": ["giochi di strategia", "strategia strategico"], "tr": ["strateji oyunlar\u0131", "strateji"]}, "friends": {"zh": ["\u548c\u670b\u53cb\u4e00\u8d77\u73a9", "\u670b\u53cb \u597d\u53cb \u591a\u4eba \u8054\u673a"], "hi": ["\u0926\u094b\u0938\u094d\u0924\u094b\u0902 \u0915\u0947 \u0938\u093e\u0925 \u0916\u0947\u0932\u0928\u093e", "\u0926\u094b\u0938\u094d\u0924 \u0926\u094b\u0938\u094d\u0924\u094b\u0902 \u092e\u0932\u094d\u091f\u0940\u092a\u094d\u0932\u0947\u092f\u0930"], "ru": ["\u0438\u0433\u0440\u0430\u0442\u044c \u0441 \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438", "\u0434\u0440\u0443\u0437\u044c\u044f \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438 \u0434\u0440\u0443\u0437\u0435\u0439 \u043c\u0443\u043b\u044c\u0442\u0438\u043f\u043b\u0435\u0435\u0440 \u0432\u043c\u0435\u0441\u0442\u0435"], "de": ["mit Freunden spielen", "freunde freunden mehrspieler gemeinsam"], "ja": ["\u53cb\u9054\u3068\u904a\u3076", "\u53cb\u9054 \u53cb\u3060\u3061 \u30de\u30eb\u30c1\u30d7\u30ec\u30a4 \u307f\u3093\u306a\u3067"], "ko": ["\uce5c\uad6c\uc640 \ud568\uaed8 \ub180\uae30", "\uce5c\uad6c \uba40\ud2f0\ud50c\ub808\uc774 \uac19\uc774"], "it": ["giocare con gli amici", "amici amici multigiocatore insieme"], "tr": ["arkada\u015flarla oynamak", "arkadas arkadaslarla coklu oyuncu"]}, "relax": {"zh": ["\u653e\u677e", "\u653e\u677e \u4f11\u95f2 \u89e3\u538b \u6d88\u9063"], "hi": ["\u0906\u0930\u093e\u092e \u0915\u0930\u0928\u093e", "\u0906\u0930\u093e\u092e \u0930\u093f\u0932\u0948\u0915\u094d\u0938 \u092e\u0928\u094b\u0930\u0902\u091c\u0928"], "ru": ["\u0440\u0430\u0441\u0441\u043b\u0430\u0431\u0438\u0442\u044c\u0441\u044f", "\u0440\u0430\u0441\u0441\u043b\u0430\u0431\u0438\u0442\u044c\u0441\u044f \u043e\u0442\u0434\u043e\u0445\u043d\u0443\u0442\u044c \u043e\u0442\u0434\u044b\u0445 \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u044c\u0441\u044f"], "de": ["entspannen", "entspannen entspannung zeitvertreib"], "ja": ["\u30ea\u30e9\u30c3\u30af\u30b9", "\u30ea\u30e9\u30c3\u30af\u30b9 \u606f\u629c\u304d \u6687\u3064\u3076\u3057 \u304f\u3064\u308d\u3050"], "ko": ["\ud734\uc2dd", "\ud734\uc2dd \ud790\ub9c1 \ud3b8\ud558\uac8c \uc2ec\uc2ec"], "it": ["rilassarsi", "rilassarsi relax svago passatempo"], "tr": ["rahatlamak", "rahatlamak dinlenmek eglence"]}, "adventure": {"zh": ["\u5192\u9669\u548c\u5f00\u653e\u4e16\u754c", "\u5192\u9669 \u63a2\u9669 \u5f00\u653e\u4e16\u754c"], "hi": ["\u0930\u094b\u092e\u093e\u0902\u091a \u0914\u0930 \u0916\u0941\u0932\u0940 \u0926\u0941\u0928\u093f\u092f\u093e", "\u0930\u094b\u092e\u093e\u0902\u091a \u090f\u0921\u0935\u0947\u0902\u091a\u0930"], "ru": ["\u043f\u0440\u0438\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0438 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u043c\u0438\u0440", "\u043f\u0440\u0438\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u043f\u0440\u0438\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u043c\u0438\u0440"], "de": ["Abenteuer und offene Welten", "abenteuer open world offene welt"], "ja": ["\u5192\u967a\u3068\u30aa\u30fc\u30d7\u30f3\u30ef\u30fc\u30eb\u30c9", "\u5192\u967a \u30a2\u30c9\u30d9\u30f3\u30c1\u30e3\u30fc \u30aa\u30fc\u30d7\u30f3\u30ef\u30fc\u30eb\u30c9"], "ko": ["\ubaa8\ud5d8\uacfc \uc624\ud508 \uc6d4\ub4dc", "\ubaa8\ud5d8 \uc5b4\ub4dc\ubca4\ucc98 \uc624\ud508\uc6d4\ub4dc"], "it": ["avventura e mondi aperti", "avventura avventure mondo aperto"], "tr": ["macera ve a\u00e7\u0131k d\u00fcnya", "macera acik dunya"]}};
INTENTS.forEach(function (n) {
var e = EXTRA_INT[n.id];
if (!e) return;
Object.keys(e).forEach(function (lg) { n.l[lg] = e[lg][0]; n.k = n.k.concat(e[lg][1].split(' ')); });
});
var SUBRE = /[\u1100-\u11ff\u3040-\u30ff\u3400-\u9fff]/;

/* S\u00e9curit\u00e9 : on ignore tout produit inconnu du catalogue (\u00e9vite une erreur de frappe) */
INTENTS.forEach(function (n) {
n.ids = n.ids.filter(function (id) { return CATALOG.some(function (c) { return c.id === id; }); });
n.kw = n.k.map(plain);
});
function plain(s) { return norm(s).replace(/[^\p{L}\p{N}]+/gu, ' ').trim(); }


/* ---------- 3. OUTILS ---------- */
function $(id) { return document.getElementById(id); }
function t(key) {
var d = I18N[state.lang] || I18N.fr;
return d[key] !== undefined ? d[key] : (I18N.fr[key] !== undefined ? I18N.fr[key] : key);
}
function norm(s) {
return String(s || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').trim();
}
function el(tag, cls, text) {
var e = document.createElement(tag);
if (cls) e.className = cls;
if (text !== undefined) e.textContent = text;
return e;
}
/* S\u00e9curit\u00e9 : on n'ouvre que des liens https. */
function safeUrl(u) {
try { var x = new URL(u); return x.protocol === 'https:' ? x.href : null; } catch (e) { return null; }
}
function fmtDate(iso) {
try {
return new Date(iso + 'T12:00:00').toLocaleDateString(state.lang, { day: 'numeric', month: 'long', year: 'numeric' });
} catch (e) { return iso; }
}

/* Stockage local prot\u00e9g\u00e9 (erreurs, donn\u00e9es invalides) */
var storageOk = true;
function load(key, fallback) {
try {
var raw = localStorage.getItem(key);
if (raw === null) return fallback;
return JSON.parse(raw);
} catch (e) { storageOk = false; return fallback; }
}
function save(key, val) {
try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { storageOk = false; }
}
function cleanIds(arr) {
if (!Array.isArray(arr)) return [];
var ids = CATALOG.map(function (c) { return c.id; });
return arr.filter(function (x) { return typeof x === 'string' && ids.indexOf(x) !== -1; });
}
function cleanStrings(arr, max) {
if (!Array.isArray(arr)) return [];
return arr.filter(function (x) { return typeof x === 'string' && x.length > 0 && x.length <= 60; }).slice(0, max);
}

/* Index de recherche calcul\u00e9 une seule fois */
CATALOG.forEach(function (it) {
it._i = { name: norm(it.name), tags: it.tags.map(norm), text: norm(it.d.fr + ' ' + it.d.en) };
});

/* ---------- 4. \u00c9TAT ---------- */
var state = { lang: 'fr', cat: 'all', platform: 'all', sort: 'rel', q: '', favOnly: false, speak: false,
favs: [], history: [], lastFocus: null, ctx: null, sec: null };

/* ---------- 5. LANGUE ---------- */
function fillSelect(sel, pairs, current) {
sel.textContent = '';
pairs.forEach(function (p) { var o = el('option', '', p[1]); o.value = p[0]; sel.appendChild(o); });
sel.value = current;
}
function applyLang() {
document.documentElement.lang = state.lang;
document.documentElement.dir = RTL[state.lang] ? 'rtl' : 'ltr';
document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
document.querySelectorAll('[data-i18n-ph]').forEach(function (n) { n.setAttribute('placeholder', t(n.getAttribute('data-i18n-ph'))); });
var plats = [['all', t('all_platforms')]];
PLATFORMS.forEach(function (p) { plats.push([p, t('p_' + p)]); });
fillSelect($('platform'), plats, state.platform);
fillSelect($('sort'), [['rel', t('sort_rel')], ['az', t('sort_az')]], state.sort);
$('lang').value = state.lang;
if ($('voiceGender')) $('voiceGender').value = state.voiceG;
$('mic').setAttribute('aria-label', 'Micro');
$('mClose').setAttribute('aria-label', t('close'));
$('secInput').setAttribute('aria-label', t('sec_ph'));
renderSecurity(state.sec);
if ($('voiceInfo')) updateVoiceInfo();
renderHistory();
render();
if (!$('modal').hidden && modalItem) openModal(modalItem);
shellRefresh();
}
function setLang(l) {
if (!I18N[l]) l = 'fr';
state.lang = l;
save('nexora.lang', l);
applyLang();
/* si la conversation ne contient que le message d'accueil, on le remet dans la nouvelle langue */
var chatBox = $('chat');
if (chatBox && chatBox.children.length === 1) { chatBox.textContent = ''; addMsg(t('ai_hello'), 'bot', null, examples()); }
}

/* ---------- 6. RECHERCHE (par score) ---------- */
function descOf(item) {
var d = item.d[state.lang];
if (d) return { text: d, translated: true };
return { text: item.d[state.lang === 'fr' ? 'fr' : 'en'] || item.d.fr, translated: state.lang === 'fr' || state.lang === 'en' };
}

/* ----- Correction des fautes de frappe (distance d'\u00e9dition) ----- */
function own(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
INTENTS.forEach(function (n) { n.kw = n.k.map(plain); });
var ALLTEXT = ' ' + CATALOG.map(function (it) { return plain(it.name) + ' ' + plain(it._i.tags.join(' ')) + ' ' + plain(it._i.text); }).join(' ') + ' ';
var VOCAB = (function () {
var seen = {}, list = [];
function add(s) { plain(s).split(' ').forEach(function (w) { if (w.length >= 4 && !own(seen, w)) { seen[w] = 1; list.push(w); } }); }
CATALOG.forEach(function (it) { add(it.name); it.tags.forEach(add); });
Object.keys(SYN).forEach(function (k) { add(k); SYN[k].forEach(add); });
Object.keys(CAT_WORDS).forEach(add);
Object.keys(PLAT_WORDS).forEach(add);
INTENTS.forEach(function (n) { n.kw.forEach(add); });
return { list: list, set: seen };
})();
function editDist(a, b, max) {
var la = a.length, lb = b.length, i, j, d = [];
if (Math.abs(la - lb) > max) return max + 1;
for (i = 0; i <= la; i++) { d[i] = [i]; }
for (j = 1; j <= lb; j++) { d[0][j] = j; }
for (i = 1; i <= la; i++) {
for (j = 1; j <= lb; j++) {
var c = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
}
}
}
return d[la][lb];
}
/* Corrige un mot seulement s'il est inconnu et tr\u00e8s proche d'un mot connu (m\u00eame premi\u00e8re lettre) */
function fixWord(w) {
if (w.length < 5 || own(VOCAB.set, w) || ALLTEXT.indexOf(' ' + w + ' ') !== -1 || STOP.indexOf(w) !== -1) return w;
var max = w.length >= 9 ? 2 : 1, best = w, bd = max + 1, i;
for (i = 0; i < VOCAB.list.length; i++) {
var v = VOCAB.list[i];
if (v.charAt(0) !== w.charAt(0)) continue;
if (v === w + 's' || w === v + 's' || v === w + 'x' || w === v + 'x') continue;   /* pluriel, pas une faute */
var d = editDist(w, v, max);
if (d < bd) { bd = d; best = v; }
}
return best;
}
/* Intentions d\u00e9tect\u00e9es dans la phrase (mots d\u00e9j\u00e0 corrig\u00e9s) */
function detectIntents(words) {
var list = [];
words.forEach(function (w) { list.push(w); if (w.indexOf('\u0627\u0644') === 0 && w.length > 4) list.push(w.slice(2)); });
var text = ' ' + list.join(' ') + ' ', found = [];
INTENTS.forEach(function (n) {
var c = 0;
n.kw.forEach(function (k) { if (text.indexOf(' ' + k + ' ') !== -1 || (SUBRE.test(k) && text.indexOf(k) !== -1)) c++; });
if (c) found.push({ n: n, c: c });
});
found.sort(function (a, b) { return b.c - a.c; });
return found.slice(0, 3).map(function (f) { return f.n; });
}
function ilabel(n) { return n.l[state.lang] || n.l.en; }
function intentScore(it, intents) {
var s = 0, labels = [];
intents.forEach(function (n) {
var i = n.ids.indexOf(it.id);
if (i !== -1) { s += Math.max(5, 9 - i); labels.push(ilabel(n)); }
});
return { score: s, labels: labels };
}

/* Comprend une phrase : mots-cl\u00e9s, cat\u00e9gories, plateformes, intentions, fautes corrig\u00e9es */
function parseQuery(q) {
var raw = norm(q).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
var out = { groups: [], cats: [], plats: [], words: [], corr: [], intents: [] };
raw.forEach(function (w0) {
var w = fixWord(w0);
if (w !== w0) out.corr.push([w0, w]);
out.words.push(w);
if (own(CAT_WORDS, w)) { if (out.cats.indexOf(CAT_WORDS[w]) === -1) out.cats.push(CAT_WORDS[w]); return; }
if (own(PLAT_WORDS, w)) { if (out.plats.indexOf(PLAT_WORDS[w]) === -1) out.plats.push(PLAT_WORDS[w]); return; }
if (STOP.indexOf(w) !== -1 || w.length < 2) return;
var alts = [w];
if (w !== w0) alts.push(w0);   /* on garde aussi le mot tap\u00e9 (recherche partielle) */
(own(SYN, w) ? SYN[w] : []).forEach(function (a) { alts.push(norm(a)); });
out.groups.push({ raw: w, alts: alts });
});
out.intents = detectIntents(out.words);
return out;
}
function termScore(ix, a) {
var i;
if (ix.name === a) return 12;
if (a.length < 3) {
for (i = 0; i < ix.tags.length; i++) { if (ix.tags[i] === a) return 6; }
return (' ' + ix.name + ' ').indexOf(' ' + a + ' ') !== -1 ? 6 : 0;
}
if (ix.name.indexOf(a) === 0) return 10;
if (ix.name.replace(/ /g, '').indexOf(a) !== -1) return 8;
if (ix.name.indexOf(a) !== -1) return 8;
var best = 0;
for (i = 0; i < ix.tags.length; i++) {
if (ix.tags[i] === a) return 6;
if (ix.tags[i].indexOf(a) !== -1 && best < 4) best = 4;
}
if (best) return best;
return ix.text.indexOf(a) !== -1 ? 2 : 0;
}
/* mode 'and' : tous les mots doivent correspondre ; mode 'or' : au moins un */
function scoreItem(it, groups, mode) {
var total = 0, hits = [], missed = 0;
groups.forEach(function (g) {
var best = 0;
g.alts.forEach(function (a) { var s = termScore(it._i, a); if (s > best) best = s; });
if (best > 0) { total += best; hits.push(g.raw); } else { missed++; }
});
if (mode === 'and' && missed > 0) return { score: 0, hits: [] };
return { score: total, hits: hits };
}
function platOk(it, plats) {
if (!plats.length) return true;
return plats.some(function (p) { return it.plat.indexOf(p) !== -1; });
}
function catOk(it, cats) { return !cats.length || cats.indexOf(it.cat) !== -1; }

function getResults() {
var p = parseQuery(state.q);
var list = [];
CATALOG.forEach(function (it) {
if (state.cat !== 'all' && it.cat !== state.cat) return;
if (state.platform !== 'all' && it.plat.indexOf(state.platform) === -1) return;
if (state.favOnly && state.favs.indexOf(it.id) === -1) return;
if (!catOk(it, p.cats) || !platOk(it, p.plats)) return;
var r = scoreItem(it, p.groups, 'and');
if (p.groups.length && r.score === 0) return;
list.push({ it: it, score: r.score, hits: r.hits });
});
if (!list.length && p.intents.length && p.groups.length) {
CATALOG.forEach(function (it) {
if (state.cat !== 'all' && it.cat !== state.cat) return;
if (state.platform !== 'all' && it.plat.indexOf(state.platform) === -1) return;
if (state.favOnly && state.favs.indexOf(it.id) === -1) return;
if (!catOk(it, p.cats) || !platOk(it, p.plats)) return;
var r = intentScore(it, p.intents);
if (r.score > 0) list.push({ it: it, score: r.score, hits: r.labels });
});
list.sort(function (a, b) { return b.score - a.score || a.it.name.localeCompare(b.it.name); });
} else if (state.sort === 'az') {
list.sort(function (a, b) { return a.it.name.localeCompare(b.it.name); });
} else if (p.groups.length) {
list.sort(function (a, b) { return b.score - a.score || a.it.name.localeCompare(b.it.name); });
}
return { list: list, parsed: p };
}

/* ---------- 7. AFFICHAGE ---------- */
function avatarColor(name) {
var h = 0, i;
for (i = 0; i < name.length; i++) { h = (h * 31 + name.charCodeAt(i)) % 360; }
return 'hsl(' + h + ',55%,42%)';
}
function render() {
var res = getResults(), list = res.list;
var box = $('results');
box.textContent = '';
list.forEach(function (r) { box.appendChild(card(r.it, r.hits, '')); });
$('count').textContent = list.length + ' ' + t('results');
var st = $('status');
if (!list.length) { st.hidden = false; st.textContent = state.favOnly && !state.q ? t('no_fav') : t('no_results'); }
else { st.hidden = true; }
var hint = $('qHint'), labels = [], parts = [];
res.parsed.cats.forEach(function (c) { labels.push(t('cat_' + c)); });
res.parsed.plats.forEach(function (p) { labels.push(t('p_' + p)); });
res.parsed.intents.forEach(function (n) { labels.push(ilabel(n)); });
if (labels.length) parts.push(t('understood') + ' ' + labels.join(', '));
if (res.parsed.corr.length) parts.push(t('corrected') + ' ' + res.parsed.corr.map(function (c) { return c[0] + ' \u2192 ' + c[1]; }).join(', '));
if (parts.length) { hint.hidden = false; hint.textContent = parts.join(' \u00b7 '); } else { hint.hidden = true; }
$('favToggle').setAttribute('aria-pressed', String(state.favOnly));
document.querySelectorAll('.tab').forEach(function (b) {
var on = b.getAttribute('data-cat') === state.cat;
b.classList.toggle('active', on);
b.setAttribute('aria-pressed', String(on));
});
renderReco();
}
/* Icone : lettre coloree, puis l'icone officielle du site (service d'icones de Google) si elle se charge */
function brandIcon(it) {
var av = el('span', 'avatar', it.name.charAt(0).toUpperCase());
av.style.background = avatarColor(it.name);
av.setAttribute('aria-hidden', 'true');
var host = '';
try { host = new URL(it.url).hostname.replace(/^www\./, ''); } catch (e) { host = ''; }
if (host) {
var img = document.createElement('img');
img.alt = ''; img.decoding = 'async'; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
img.onload = function () { if (img.naturalWidth > 16) { av.classList.add('has-icon'); av.style.background = '#fff'; } else { img.remove(); } };
img.onerror = function () { img.remove(); };
img.src = 'https://www.google.com/s2/favicons?sz=128&domain=' + encodeURIComponent(host);
av.appendChild(img);
}
return av;
}
function card(it, hits, whyText) {
var c = el('article', 'card');
var head = el('div', 'card-head');
var av = brandIcon(it);
var hd = el('div');
hd.appendChild(el('span', 'badge', t('cat_' + it.cat)));
hd.appendChild(el('h3', '', it.name));
head.appendChild(av); head.appendChild(hd);
c.appendChild(head);
c.appendChild(el('p', '', descOf(it).text));
var why = whyText || (hits && hits.length ? t('match') + ' : ' + hits.join(', ') : '');
if (why) c.appendChild(el('p', 'why', why));
var chips = el('div', 'chips');
it.plat.forEach(function (p) { chips.appendChild(el('span', 'chip', t('p_' + p))); });
c.appendChild(chips);
var act = el('div', 'card-actions');
var det = el('button', 'btn', t('details')); det.type = 'button';
det.addEventListener('click', function () { openModal(it); });
var fav = el('button', 'btn fav', isFav(it.id) ? '\u2605' : '\u2606'); fav.type = 'button';
fav.setAttribute('aria-pressed', String(isFav(it.id)));
fav.setAttribute('aria-label', isFav(it.id) ? t('remove_fav') : t('add_fav'));
fav.addEventListener('click', function () { toggleFav(it.id); });
act.appendChild(det); act.appendChild(fav);
c.appendChild(act);
return c;
}
function isFav(id) { return state.favs.indexOf(id) !== -1; }
function toggleFav(id) {
var i = state.favs.indexOf(id);
if (i === -1) state.favs.push(id); else state.favs.splice(i, 1);
save('nexora.favs', state.favs);
render();
if (!storageOk) showStorageWarn();
}
function showStorageWarn() { var s = $('status'); s.hidden = false; s.textContent = t('store_err'); }

/* ---------- 7b. RECOMMANDATIONS (selon les favoris) ---------- */
function buildReco() {
var favItems = CATALOG.filter(function (it) { return isFav(it.id); });
if (!favItems.length) return [];
var out = [];
CATALOG.forEach(function (it) {
if (isFav(it.id)) return;
var best = null;
favItems.forEach(function (f) {
var shared = f._i.tags.filter(function (tg) { return it._i.tags.indexOf(tg) !== -1; });
if (!shared.length) return;
var score = shared.length * 2 + (f.cat === it.cat ? 1 : 0);
if (!best || score > best.score) best = { it: it, fav: f, shared: shared, score: score };
});
if (best) out.push(best);
});
out.sort(function (a, b) { return b.score - a.score || a.it.name.localeCompare(b.it.name); });
return out.slice(0, 3);
}
function renderReco() {
var sec = $('reco'), box = $('recoList');
var recos = buildReco();
box.textContent = '';
if (!recos.length) { sec.hidden = true; return; }
sec.hidden = false;
recos.forEach(function (r) {
var why = t('reco_why') + ' : ' + r.fav.name + ' (' + r.shared.slice(0, 2).join(', ') + ')';
box.appendChild(card(r.it, null, why));
});
}

/* ---------- 8. FEN\u00caTRE D\u00c9TAIL ---------- */
var modalItem = null;
function openModal(it) {
modalItem = it;
state.lastFocus = document.activeElement;
$('mTitle').textContent = it.name;
var mi = $('mIcon'); mi.textContent = ''; var mic2 = brandIcon(it); mic2.classList.add('modal-ico'); mi.appendChild(mic2);
$('mCat').textContent = t('cat_' + it.cat);
var d = descOf(it);
$('mDesc').textContent = d.text;
var note = $('mLangNote');
note.hidden = d.translated;
note.textContent = d.translated ? '' : t('untranslated');
var pl = $('mPlat'); pl.textContent = '';
it.plat.forEach(function (p) { pl.appendChild(el('span', 'chip', t('p_' + p))); });
$('mVerif').textContent = (it.u ? t('link_unconfirmed') : t('link_checked') + ' ' + fmtDate(it.ver || VERIFIED) + '.') + ' ' + t('plat_note');
var link = $('mLink');
var u = safeUrl(it.url);
if (u) { link.href = u; link.hidden = false; } else { link.removeAttribute('href'); link.hidden = true; }
link.textContent = t('open_official');
$('modal').hidden = false;
$('mClose').focus();
}
function closeModal() {
$('modal').hidden = true; modalItem = null;
if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
}

/* ---------- 9. HISTORIQUE ---------- */
function addHistory(q) {
q = q.trim();
if (!q || q.length > 60) return;
state.history = state.history.filter(function (x) { return x !== q; });
state.history.unshift(q);
state.history = state.history.slice(0, 5);
save('nexora.history', state.history);
renderHistory();
}
function renderHistory() {
var box = $('historyBox');
box.textContent = '';
if (!state.history.length) { box.hidden = true; return; }
box.hidden = false;
box.appendChild(el('span', 'note', t('history')));
state.history.forEach(function (h) {
var b = el('button', 'chip-btn', h); b.type = 'button';
b.addEventListener('click', function () { $('q').value = h; state.q = h; render(); });
box.appendChild(b);
});
var c = el('button', 'chip-btn', t('clear')); c.type = 'button';
c.addEventListener('click', function () { state.history = []; save('nexora.history', []); renderHistory(); });
box.appendChild(c);
}

/* ---------- 9b. NEXORA AI SECURITY v0 (regles simples : AUCUNE garantie de securite) ----------
Le lien n'est jamais ouvert ni visite : on analyse seulement le texte de l'adresse. */
var SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'rebrand.ly', 'shorturl.at', 'tiny.cc', 'rb.gy', 't.ly'];
var BAD_TLDS = ['zip', 'mov', 'xyz', 'top', 'click', 'gq', 'tk', 'ml', 'cf', 'ga', 'work', 'support', 'loan', 'country', 'kim', 'men', 'review', 'rest', 'icu', 'cyou', 'buzz'];
var KW_PHISH = ['login', 'signin', 'verify', 'verification', 'secure', 'account', 'update', 'password', 'wallet', 'gift', 'free', 'bonus', 'prize', 'giveaway', 'claim', 'recovery', 'suspended', 'unlock', 'robux', 'vbucks'];
var KW_DL = ['apk', 'crack', 'cracked', 'keygen', 'hack', 'hacks', 'generator', 'modapk'];
var EXE_EXT = ['exe', 'msi', 'apk', 'bat', 'scr', 'jar', 'dmg', 'pkg', 'cmd', 'vbs'];
var DANGER_SCHEMES = ['javascript:', 'data:', 'vbscript:', 'file:', 'blob:'];
var SEC_WORDS = ['lien', 'liens', 'link', 'links', 'verifier', 'verifie', 'check', 'arnaque', 'scam', 'phishing', 'fiable', 'safe', 'danger', 'dangereux',
'suspect', 'enlace', 'verificar', 'golpe', 'confiavel', '\u0631\u0627\u0628\u0637', '\u0627\u062d\u062a\u064a\u0627\u0644', '\u062a\u062d\u0642\u0642'].map(plain);
var SLD2 = ['co', 'com', 'org', 'net', 'gov', 'ac', 'edu'];
function hostParts(host) {
var l = host.split('.'), n = l.length, tld = l[n - 1], sld = n >= 2 ? l[n - 2] : l[0];
if (n >= 3 && SLD2.indexOf(l[n - 2]) !== -1 && tld.length === 2) sld = l[n - 3];
return { sld: sld, tld: tld, labels: l };
}
/* lettres/chiffres souvent echanges pour imiter un nom (0->o, rn->m ...) */
function deLeet(s, one) {
return s.replace(/rn/g, 'm').replace(/vv/g, 'w').replace(/0/g, 'o').replace(/1/g, one).replace(/3/g, 'e').replace(/5/g, 's').replace(/-/g, '');
}
var BRANDS = CATALOG.map(function (it) {
var u = new URL(it.url), host = u.hostname.replace(/^www\./, ''), keys = [plain(it.name).replace(/ /g, '')];
var path = u.pathname.toLowerCase().replace(/\/$/, '');
if (!path) { var sd = hostParts(host).sld; if (keys.indexOf(sd) === -1) keys.push(sd); }
return { it: it, host: host, path: path, keys: keys };
});
function matchOfficial(host, path) {
var h = host.replace(/^www\./, ''), same = null, i;
for (i = 0; i < BRANDS.length; i++) {
var b = BRANDS[i];
if (h === b.host || h.slice(-(b.host.length + 1)) === '.' + b.host) {
if (!b.path || path.indexOf(b.path) === 0) return { b: b, exact: true };
if (!same) same = { b: b, exact: false };
}
}
return same;
}
/* Resultat : { level, total, reasons:[{id,w,p}], host, known, brand } (independant de la langue) */
function checkLink(raw) {
var res = { level: 'invalid', total: 0, reasons: [], host: '', known: false, brand: null };
var s = String(raw || '').trim();
if (!s || s.length > 2000) return res;
var hasScheme = /^[a-z][a-z0-9+.\-]*:/i.test(s) && !/^[a-z0-9.\-]+:\d+(\/|$)/i.test(s);
var u;
try { u = new URL(hasScheme ? s : 'https://' + s.replace(/^\/\//, '')); } catch (e) { return res; }
function add(id, w, p) { res.reasons.push({ id: id, w: w, p: p || {} }); res.total += w; }
if (u.protocol !== 'http:' && u.protocol !== 'https:') {
if (DANGER_SCHEMES.indexOf(u.protocol) === -1) return res;
res.host = u.protocol; add('scheme', 5, { x: u.protocol }); res.level = 'high';
return res;
}
var host = u.hostname.toLowerCase();
var isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.charAt(0) === '[';
if (!host || (host.indexOf('.') === -1 && !isIp)) return res;
res.host = host;
var path = (u.pathname || '/').toLowerCase();
if (!hasScheme) add('assumed', 0, { x: s.replace(/^\/\//, '').slice(0, 80) });
var off = matchOfficial(host, path);
var known = !!(off && off.exact);
res.known = known;
res.unconf = !!(known && off.b.it.u);
if (known) { if (off.b.it.u) add('known_u', 0, { x: off.b.it.name }); else add('known', 0, { x: off.b.it.name, d: off.b.it.ver || VERIFIED }); }
else if (off) add('samehost', 0, { x: off.b.it.name });
if (u.protocol === 'http:') add('nohttps', 2);
if (u.username || u.password) add('userinfo', 3);
if (u.port && u.port !== '80' && u.port !== '443') add('port', 2, { x: u.port });
if (isIp) add('ip', 3);
if (host.indexOf('xn--') !== -1) add('puny', 3);
if (SHORTENERS.indexOf(host.replace(/^www\./, '')) !== -1) add('short', 2);
var ext = (path.match(/\.([a-z0-9]{2,5})$/) || [])[1];
if (ext && EXE_EXT.indexOf(ext) !== -1) add('exe', 2, { x: '.' + ext });
if (!known) {
var parts = hostParts(host), sld = parts.sld, dsL = deLeet(sld, 'l'), dsI = deLeet(sld, 'i');
var best = null, i, j;
if (!isIp) {
for (i = 0; i < BRANDS.length; i++) {
var b = BRANDS[i];
for (j = 0; j < b.keys.length; j++) {
var key = b.keys[j], hit = null;
if (key.length < 5) continue;
if (sld === key) hit = { id: 'look_exact', w: 2 };
else if (dsL === key || dsI === key) hit = { id: 'look_homo', w: 5 };
else if (key.length >= 6 && (editDist(dsL, key, 1) === 1)) hit = { id: 'look_close', w: 4 };
else if ((key.length >= 6 && sld.indexOf(key) !== -1) || parts.labels.slice(0, -1).indexOf(key) !== -1) hit = { id: 'look_contains', w: 3 };
if (hit && (!best || hit.w > best.w)) { hit.b = b; best = hit; }
}
}
}
if (best) {
add(best.id, best.w, { x: best.b.it.name, y: best.b.host });
res.brand = best.b.it;
}
if (BAD_TLDS.indexOf(parts.tld) !== -1) add('tld', 1, { x: parts.tld });
if (parts.labels.length > 4 && !isIp) add('sub', 1);
if ((host.match(/-/g) || []).length >= 3) add('hyph', 1);
if (s.length > 200) add('long', 1);
var tokens = (host + ' ' + path + ' ' + u.search.toLowerCase()).split(/[^a-z0-9]+/);
var ph = KW_PHISH.filter(function (k) { return tokens.indexOf(k) !== -1 || (k.length >= 6 && host.indexOf(k) !== -1); });
if (ph.length) add('kw', ph.length >= 2 ? 2 : 1, { x: ph.join(', ') });
var dl = KW_DL.filter(function (k) { return tokens.indexOf(k) !== -1; });
if (dl.length) add('kwdl', 2, { x: dl.join(', ') });
}
if (known) res.level = res.total >= 2 ? 'caution' : 'known';
else res.level = res.total === 0 ? 'unknown' : (res.total < 3 ? 'caution' : 'high');
return res;
}
var LVL_SYM = { known: '\u2713', unknown: '?', caution: '!', high: '\u26a0', invalid: '\u2716' };
function reasonText(r) {
var p = {}, k;
for (k in r.p) { if (own(r.p, k)) p[k] = r.p[k]; }
if (p.d) p.d = fmtDate(p.d);
return fmt(t('r_' + r.id), p);
}
function sortedReasons(res) { return res.reasons.slice().sort(function (a, b) { return b.w - a.w; }); }
function renderSecurity(res) {
var out = $('secOut');
out.textContent = '';
if (!res) { out.hidden = true; return; }
out.hidden = false;
var head = el('div', 'sec-level lvl-' + res.level);
var sym = el('span', 'sec-sym', LVL_SYM[res.level]);
sym.setAttribute('aria-hidden', 'true');
head.appendChild(sym);
head.appendChild(el('strong', '', t('sec_lvl_' + res.level)));
out.appendChild(head);
if (res.level === 'invalid') { out.appendChild(el('p', '', t('sec_adv_invalid'))); return; }
if (res.host) {
var hp = el('p', 'sec-host', t('sec_host') + ' ');
hp.appendChild(el('code', '', res.host));
out.appendChild(hp);
}
out.appendChild(el('p', 'sec-why', t('sec_why')));
var ul = el('ul', 'sec-list');
if (res.total === 0 && !res.known) ul.appendChild(el('li', '', t('sec_none')));
sortedReasons(res).forEach(function (r) { ul.appendChild(el('li', '', reasonText(r))); });
out.appendChild(ul);
out.appendChild(el('p', '', t(res.level === 'known' && res.unconf ? 'sec_adv_known_u' : 'sec_adv_' + res.level)));
if (res.brand && !res.known) {
var u = safeUrl(res.brand.url);
if (u) {
var a = el('a', 'btn small', fmt(t('sec_official_btn'), { x: res.brand.name }));
a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer';
out.appendChild(a);
}
}
}
function secSummary(res) {
if (res.level === 'invalid') return t('sec_adv_invalid');
var lines = [t('sec_lvl_' + res.level) + (res.host ? ' - ' + res.host : '')];
if (res.total === 0 && !res.known) lines.push(t('sec_none'));
sortedReasons(res).forEach(function (r) { lines.push('\u2022 ' + reasonText(r)); });
lines.push(t('sec_adv_' + res.level));
lines.push(t('sec_limits'));
return lines.join('\n');
}
/* Un lien dans un message du chat : http(s)://, www., ou un nom de domaine si le message parle de verifier */
function extractLink(q, words) {
var m = q.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/i);
if (m) return m[0].replace(/[),.;!?]+$/, '');
if (hasAny(words, SEC_WORDS)) {
var d = q.match(/[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/[^\s]*)?/i);
if (d) return d[0].replace(/[),.;!?]+$/, '');
}
return null;
}

/* ---------- 10. NEXORA AI v0.3 (r\u00e8gles, PAS un mod\u00e8le d'IA) ---------- */
function fmt(s, m) { return String(s).replace(/\{(\w+)\}/g, function (a, k) { return m[k] !== undefined ? m[k] : a; }); }
function platList(it) { return it.plat.map(function (p) { return t('p_' + p); }).join(', '); }
function hasAny(words, set) { return words.some(function (w) { return set.indexOf(w) !== -1; }); }
function examples() { var e = t('ai_examples'); return Array.isArray(e) ? e : []; }
/* Produits cit\u00e9s par leur nom dans la phrase, dans l'ordre d'apparition */
function findNamed(words) {
var text = ' ' + words.join(' ') + ' ', found = [];
CATALOG.forEach(function (it) {
var pos = text.indexOf(' ' + plain(it.name) + ' ');
if (pos !== -1) found.push({ it: it, pos: pos });
});
found.sort(function (a, b) { return a.pos - b.pos; });
return found.map(function (f) { return f.it; });
}
function similarTo(it, n) {
var out = [];
CATALOG.forEach(function (o) {
if (o.id === it.id) return;
var shared = it._i.tags.filter(function (tg) { return o._i.tags.indexOf(tg) !== -1; }).length;
if (shared) out.push({ it: o, s: shared * 2 + (o.cat === it.cat ? 1 : 0) });
});
out.sort(function (a, b) { return b.s - a.s || a.it.name.localeCompare(b.it.name); });
return out.slice(0, n).map(function (x) { return x.it; });
}
function aiSearch(p, exclude) {
var list = [];
CATALOG.forEach(function (it) {
if (exclude && exclude.indexOf(it.id) !== -1) return;
if (!platOk(it, p.plats)) return;
var catMatch = p.cats.indexOf(it.cat) !== -1;
var s = 0, hits = [], labels = [];
if (p.groups.length || p.intents.length) {
var r = scoreItem(it, p.groups, 'or');
var ib = intentScore(it, p.intents);
s = r.score + ib.score; hits = r.hits; labels = ib.labels;
if (s < 4) return;           /* seuil : au moins une correspondance s\u00e9rieuse */
if (catMatch) s += 3;
} else {
if (p.cats.length && !catMatch) return;
s = (catMatch ? 3 : 0) + 1;
}
list.push({ it: it, score: s, hits: hits, labels: labels });
});
list.sort(function (a, b) { return b.score - a.score || a.it.name.localeCompare(b.it.name); });
return list;
}
function describe(r) {
var why = r.labels.slice();
if (r.hits.length) why.push('\u00ab ' + r.hits.join(', ') + ' \u00bb');
var line = '\u2022 ' + r.it.name + ' \u2014 ' + descOf(r.it).text + '\n   ' + t('ai_avail') + ' ' + platList(r.it);
if (why.length) line += '\n   ' + t('ai_why_label') + ' : ' + why.join(' \u00b7 ');
return line;
}
function addMsg(text, who, items, chips) {
var m = el('div', 'msg ' + who);
m.appendChild(el('div', 'msg-text', text));
if (items && items.length) {
var act = el('div', 'msg-actions');
act.appendChild(el('span', '', t('ai_open')));
items.forEach(function (it) {
var b = el('button', 'btn small', it.name); b.type = 'button';
b.addEventListener('click', function () { openModal(it); });
act.appendChild(b);
});
m.appendChild(act);
}
if (chips && chips.length) {
var box = el('div', 'msg-chips');
chips.forEach(function (c) {
var b = el('button', 'btn small ghost', c); b.type = 'button';
b.addEventListener('click', function () { onChat(c); });
box.appendChild(b);
});
m.appendChild(box);
}
if (who === 'bot') addPlayer(m, text);
$('chat').appendChild(m);
$('chat').scrollTop = $('chat').scrollHeight;
}
function onChat(q) {
q = String(q).trim();
if (!q) return;
if (q.length > 300) q = q.slice(0, 300);
addMsg(q, 'me');
var p = parseQuery(q), ctx = state.ctx;
var link = extractLink(q, p.words);
if (link) {
var sreply = secSummary(checkLink(link));
addMsg(sreply, 'bot');
speakText(sreply);
return;
}
var named = findNamed(p.words);
var wantsMore = hasAny(p.words, MORE);
var hasTopic = p.groups.length > 0 || p.intents.length > 0;
var usable = hasTopic || !!(ctx && (wantsMore || p.plats.length > 0 || p.cats.length > 0));
var reply = '', items = [], chips = [];

if (named.length >= 2) {
/* Comparaison : uniquement avec les donn\u00e9es du catalogue */
var c = named.slice(0, 3);
reply = t('ai_compare_head') + '\n' + c.map(function (it) {
return '\u2022 ' + it.name + ' \u2014 ' + descOf(it).text + '\n   ' + t('ai_avail') + ' ' + platList(it);
}).join('\n');
var common = c[0].plat.filter(function (pl) { return c.every(function (it) { return it.plat.indexOf(pl) !== -1; }); });
if (common.length) reply += '\n' + t('ai_compare_common') + ' ' + common.map(function (pl) { return t('p_' + pl); }).join(', ');
reply += '\n' + t('ai_compare_nodata');
items = c;
} else if (named.length === 1 && !p.intents.length && p.words.length <= 7) {
var one = named[0], sim = similarTo(one, 2);
reply = '\u2022 ' + one.name + ' \u2014 ' + descOf(one).text + '\n   ' + t('ai_avail') + ' ' + platList(one);
if (sim.length) reply += '\n' + t('ai_info_similar') + ' ' + sim.map(function (x) { return x.name; }).join(', ');
reply += '\n' + t('ai_compare_nodata');
items = [one].concat(sim);
} else if (!usable) {
reply = hasAny(p.words, THANKS) ? t('ai_thanks') : (hasAny(p.words, GREET) ? t('ai_hello2') : t('ai_clarify'));
chips = examples();
} else {
var base = p, exclude = null;
if (!hasTopic && ctx) {
/* Suite de conversation : on garde le sujet pr\u00e9c\u00e9dent */
base = { groups: ctx.p.groups, intents: ctx.p.intents,
cats: p.cats.length ? p.cats : ctx.p.cats, plats: p.plats.length ? p.plats : ctx.p.plats, corr: p.corr, words: p.words };
if (wantsMore) exclude = ctx.shown;
}
var list = aiSearch(base, exclude);
if (!list.length) {
reply = exclude ? t('ai_more_none') : t('ai_none');
chips = examples();
} else {
var top = list.slice(0, 3);
var head = '';
if (p.corr.length) head += fmt(t('ai_corrected'), { pairs: p.corr.map(function (x) { return '\u00ab ' + x[0] + ' \u2192 ' + x[1] + ' \u00bb'; }).join(', ') }) + '\n';
var il = base.intents.map(ilabel);
head += il.length ? fmt(t('ai_intro_intent'), { x: il.join(' / ') }) : t('ai_found');
reply = head + '\n' + top.map(describe).join('\n');
var filt = base.cats.map(function (x) { return t('cat_' + x); }).concat(base.plats.map(function (x) { return t('p_' + x); }));
if (filt.length) reply += '\n' + t('ai_filtered') + ' ' + filt.join(', ');
if (base.intents.some(function (n) { return n.id === 'business'; })) reply += '\n' + t('ai_limit_business');
var seen = {};
top.forEach(function (r) { seen[r.it.cat] = 1; });
if (!base.cats.length && Object.keys(seen).length > 1) reply += '\n' + t('ai_followup');
reply += '\n' + t('ai_uncertain');
items = top.map(function (r) { return r.it; });
chips = [t('chip_other')];
if (!base.plats.length) chips.push(t('chip_android'), t('chip_ios'));
state.ctx = { p: base, shown: (exclude || []).concat(top.map(function (r) { return r.it.id; })) };
}
}
addMsg(reply, 'bot', items, chips);
speakText(reply);
}

/* ---------- 11. VOIX (facultative) ---------- */
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
var recog = null, listening = false;
/* Voix : on choisit, parmi les voix installees sur l'appareil, une voix de femme ou d'homme dans la langue choisie */
var VF = 'amelie audrey aurelie marie julie hortense denise samantha karen moira tessa victoria kate serena susan zira hazel monica paulina helena laura sabina luciana joana maria francisca raquel tingting ting sinji meijia xiaoxiao huihui yaoyao lekha heera kalpana milena katya irina svetlana anna petra katja hedda marlene vicki alice elsa federica paola carla yelda filiz emel kyoko haruka ayumi nanami yuna sora sunhi heami laila zeina hoda salma zariyah ioana female'.split(' ');
var VM = 'thomas daniel mathieu paul henri claude alex fred tom aaron david mark guy james oliver arthur rishi hemant jorge diego juan carlos enrique pablo felipe antonio luca cosimo yuri pavel dmitri maxim markus stefan hans conrad cem tolga ahmet otoya ichiro keita kenji injoon minsu maged tarik naayf hamed shakir yunyang kangkang liang bruce male'.split(' ');
var VNOVELTY = 'albert bahh bells boing bubbles cellos deranged hysterical jester organ superstar trinoids whisper wobble zarvox'.split(' ');
function voiceTokens(name) {
var toks = norm(name).split(/[^a-z]+/).filter(Boolean);
toks.push(toks.join(''));
return toks;
}
function voiceGenderOf(v) {
var toks = voiceTokens(v.name || '');
if (toks.indexOf('female') !== -1) return 'f';
var f = toks.some(function (w) { return VF.indexOf(w) !== -1; });
var m = toks.some(function (w) { return VM.indexOf(w) !== -1; });
if (f && !m) return 'f';
if (m && !f) return 'm';
return '';
}
function pickVoice(lang, g) {
if (!('speechSynthesis' in window)) return null;
var vs = [];
try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { vs = []; }
var loc = (VOICE_LOCALE[lang] || 'fr-FR').toLowerCase(), pre = loc.slice(0, 2), best = null, bs = -99;
vs.forEach(function (v) {
var vl = String(v.lang || '').toLowerCase().replace('_', '-');
if (vl.indexOf(pre) !== 0) return;
var toks = voiceTokens(v.name || '');
if (toks.some(function (w) { return VNOVELTY.indexOf(w) !== -1; })) return;
var sc = 0, vg = voiceGenderOf(v);
if (vg === g) sc += 10; else if (vg) sc -= 6;
if (/premium|enhanced|neural|natural|siri|improved|ameliore|avanc/.test(norm(v.name || ''))) sc += 3;
if (vl === loc) sc += 2;
if (sc > bs) { bs = sc; best = { v: v, known: vg === g }; }
});
return best;
}
function cleanForSpeech(txt) {
return String(txt)
.replace(/https?:\/\/\S+/g, ' ')
.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27bf]/gu, ' ')
.replace(/[\u2022\u00b7\u25cf\u25aa\u2192\u2190\u2194\u2713\u2717\u2605\u2606]/g, ' ')
.replace(/[*_`#>|~]/g, ' ')
.replace(/\s*[\u2014\u2013]\s*/g, ', ')
.replace(/\s+/g, ' ')
.trim();
}
function speechChunks(txt) {
var parts = txt.match(/[^.!?\u3002\uff01\uff1f\n]+[.!?\u3002\uff01\uff1f]*/g) || [txt], out = [], cur = '';
parts.forEach(function (p) {
p = p.trim();
if (!p) return;
if ((cur + ' ' + p).length > 180 && cur) { out.push(cur); cur = p; } else { cur = cur ? cur + ' ' + p : p; }
});
if (cur) out.push(cur);
return out;
}
var NONLATIN = { ar: 1, zh: 1, hi: 1, ru: 1, ja: 1, ko: 1 };
function speakText(text, force, hooks) {
if ((!state.speak && !force) || !('speechSynthesis' in window)) return;
try {
window.speechSynthesis.cancel();
var chunks = speechChunks(cleanForSpeech(text)).filter(Boolean), total = Math.max(1, chunks.join(' ').length), offset = 0;
chunks.forEach(function (chunk, idx) {
var lg = state.lang;
/* un passage en lettres latines dans une langue a autre ecriture (ex. description en anglais) est lu avec une voix anglaise */
if (NONLATIN[lg] && /^[\x20-\x7E]+$/.test(chunk) && /[a-z]{3}/i.test(chunk)) lg = 'en';
var pk = pickVoice(lg, state.voiceG), u = new SpeechSynthesisUtterance(chunk);
u.lang = VOICE_LOCALE[lg] || 'fr-FR';
u.rate = 0.95;
u.volume = state.vol === 0 ? 0 : 1;
if (pk) {
u.voice = pk.v;
if (pk.v.lang) u.lang = pk.v.lang;
u.pitch = pk.known ? 1 : (state.voiceG === 'f' ? 1.2 : 0.8);
} else { u.pitch = state.voiceG === 'f' ? 1.2 : 0.8; }
if (hooks) {
(function (off, last, len) {
u.onboundary = function (ev) { if (hooks.progress) hooks.progress(Math.min(1, (off + (ev.charIndex || 0)) / total)); };
u.onend = function () { if (hooks.progress) hooks.progress(Math.min(1, (off + len) / total)); if (last && hooks.end) hooks.end(); };
u.onerror = function () { if (hooks.end) hooks.end(); };
})(offset, idx === chunks.length - 1, chunk.length);
}
offset += chunk.length + 1;
window.speechSynthesis.speak(u);
});
} catch (e) { /* voix indisponible : on ignore */ }
}
function updateVoiceInfo() {
var info = $('voiceInfo');
if (!info) return;
if (!('speechSynthesis' in window)) { info.textContent = ''; return; }
var pk = pickVoice(state.lang, state.voiceG);
if (!pk) { info.textContent = t('voice_used') + ' ' + t('voice_default'); return; }
info.textContent = t('voice_used') + ' ' + pk.v.name + ' (' + (pk.v.lang || '') + ')' + (pk.known ? '' : ' - ' + t('voice_default'));
}
function setupVoice() {
var note = $('voiceNote');
if (!SR) { $('mic').disabled = true; }
if (!SR || !('speechSynthesis' in window)) { note.hidden = false; note.textContent = t('voice_unsupported'); }
var has = 'speechSynthesis' in window;
if ($('speakToggle')) $('speakToggle').disabled = !has;
if ($('voiceGender')) $('voiceGender').disabled = !has;
if ($('voiceTest')) $('voiceTest').disabled = !has;
if (has) {
try { window.speechSynthesis.addEventListener('voiceschanged', updateVoiceInfo); } catch (e) { /* ignore */ }
updateVoiceInfo();
}
}
function toggleMic() {
if (!SR) return;
if (listening && recog) { recog.stop(); return; }
try {
recog = new SR();
recog.lang = VOICE_LOCALE[state.lang] || 'fr-FR';
recog.interimResults = false;
recog.onstart = function () { listening = true; $('mic').classList.add('mic-on'); $('voiceNote').hidden = false; $('voiceNote').textContent = t('voice_listen'); };
recog.onend = function () { listening = false; $('mic').classList.remove('mic-on'); $('voiceNote').hidden = true; };
recog.onerror = function () { $('voiceNote').hidden = false; $('voiceNote').textContent = t('voice_err'); };
recog.onresult = function (e) {
var txt = e.results[0][0].transcript;
$('chatInput').value = txt;
onChat(txt); $('chatInput').value = '';
};
recog.start();
} catch (e) { $('voiceNote').hidden = false; $('voiceNote').textContent = t('voice_err'); }
}

/* ---------- 12. \u00c9V\u00c9NEMENTS ---------- */
function bind() {
$('lang').addEventListener('change', function (e) { setLang(e.target.value); });
$('platform').addEventListener('change', function (e) { state.platform = e.target.value; render(); });
$('sort').addEventListener('change', function (e) { state.sort = e.target.value; save('nexora.sort', state.sort); render(); });
$('searchForm').addEventListener('submit', function (e) {
e.preventDefault();
state.q = $('q').value; addHistory(state.q); render();
});
$('q').addEventListener('input', function (e) { state.q = e.target.value; render(); });
$('tabs').addEventListener('click', function (e) {
var b = e.target.closest ? e.target.closest('.tab') : null;
if (!b) return;
state.cat = b.getAttribute('data-cat'); render();
});
$('favToggle').addEventListener('click', function () { state.favOnly = !state.favOnly; render(); });
$('chatForm').addEventListener('submit', function (e) {
e.preventDefault();
var v = $('chatInput').value; $('chatInput').value = ''; onChat(v);
});
$('mic').addEventListener('click', toggleMic);
$('secForm').addEventListener('submit', function (e) {
e.preventDefault();
var v = $('secInput').value;
if (!v.trim()) { state.sec = { level: 'invalid', total: 0, reasons: [], host: '', known: false, brand: null }; }
else { state.sec = checkLink(v); }
renderSecurity(state.sec);
});
$('voiceGender').addEventListener('change', function (e) {
state.voiceG = e.target.value === 'm' ? 'm' : 'f'; save('nexora.voiceg', state.voiceG);
updateVoiceInfo(); speakText(t('voice_sample'), true);
});
$('voiceTest').addEventListener('click', function () { updateVoiceInfo(); speakText(t('voice_sample'), true); });
$('speakToggle').addEventListener('change', function (e) {
state.speak = e.target.checked; save('nexora.speak', state.speak);
if (!state.speak && 'speechSynthesis' in window) window.speechSynthesis.cancel();
});
$('mClose').addEventListener('click', closeModal);
$('modal').addEventListener('click', function (e) { if (e.target === $('modal')) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('modal').hidden) closeModal(); });
}

/* ---------- 12b. NEXORA v2 : ecrans, plans, progression, PDF ----------
Tout est local (navigateur). Les plans viennent de modeles ecrits a l'avance : ce n'est PAS une vraie IA. */
var SCREENS = ['welcome', 'home', 'store', 'goal', 'plan', 'langs', 'voice', 'chat', 'history', 'progress', 'more', 'export', 'examples', 'security', 'voicecfg', 'about', 'help'];
var NAV_ON = { home: 1, store: 1, history: 1, progress: 1, more: 1, examples: 1 };
var NAV_OF = { home: 'home', store: 'home', examples: 'home', history: 'history', progress: 'progress', more: 'more' };
var THEMES = ['job', 'study', 'business', 'finance', 'health', 'growth'];
var T_ICON = { job: '\ud83d\udcbc', study: '\ud83d\udcda', business: '\ud83c\udfe2', finance: '\ud83d\udcb0', health: '\ud83c\udfc3', growth: '\ud83c\udf31' };
var FLAGS = { fr: '\ud83c\uddeb\ud83c\uddf7', en: '\ud83c\uddec\ud83c\udde7', ar: '\ud83c\uddf8\ud83c\udde6', es: '\ud83c\uddea\ud83c\uddf8', pt: '\ud83c\udde7\ud83c\uddf7', zh: '\ud83c\udde8\ud83c\uddf3', hi: '\ud83c\uddee\ud83c\uddf3', ru: '\ud83c\uddf7\ud83c\uddfa', de: '\ud83c\udde9\ud83c\uddea', ja: '\ud83c\uddef\ud83c\uddf5', ko: '\ud83c\uddf0\ud83c\uddf7', it: '\ud83c\uddee\ud83c\uddf9', tr: '\ud83c\uddf9\ud83c\uddf7' };
var LANG_NAME = { fr: 'Fran\u00e7ais', en: 'English', ar: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629', es: 'Espa\u00f1ol', pt: 'Portugu\u00eas', zh: '\u4e2d\u6587', hi: '\u0939\u093f\u0928\u094d\u0926\u0940', ru: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', de: 'Deutsch', ja: '\u65e5\u672c\u8a9e', ko: '\ud55c\uad6d\uc5b4', it: 'Italiano', tr: 'T\u00fcrk\u00e7e' };
var LANG_ORDER = ['fr', 'en', 'ar', 'es', 'pt', 'zh', 'hi', 'ru', 'de', 'ja', 'ko', 'it', 'tr'];
var PLAN_LANGS = ['fr', 'en', 'ar', 'es', 'pt'];
var LEVELS = ['b', 'i', 'a'];
var navStack = [], plans = [], days = [], curPlan = null, langSel = 'fr', exFilter = 'all', toastTimer = null;
var goal = { obj: '', theme: 'business', level: 'b', budget: 0, lang: 'fr' };

function tt(key, lang) {
var d = I18N[lang];
if (d && d[key] !== undefined) return d[key];
if (I18N.en[key] !== undefined) return I18N.en[key];
return I18N.fr[key] !== undefined ? I18N.fr[key] : key;
}
function dur(n, u, lang) {
var U = (V2.units && (V2.units[lang] || V2.units.en)) || { d: ['d', 'd'], w: ['w', 'w'], m: ['m', 'm'] };
return n + ' ' + U[u][n === 1 ? 0 : 1];
}
function two(n) { return (n < 10 ? '0' : '') + n; }
function todayStr() { var d = new Date(); return d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate()); }
function shortDate(iso) {
try { return new Date(iso + 'T12:00:00').toLocaleDateString(state.lang, { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return iso; }
}
function toast(msg) {
var n = $('toast');
n.textContent = msg; n.hidden = false;
if (toastTimer) clearTimeout(toastTimer);
toastTimer = setTimeout(function () { n.hidden = true; }, 2200);
}
function markDay() {
var d = todayStr();
if (days.indexOf(d) === -1) { days.push(d); days = days.slice(-400); save('nexora.days', days); }
}
function cleanPlans(arr) {
if (!Array.isArray(arr)) return [];
var out = [];
arr.forEach(function (p) {
if (!p || typeof p !== 'object' || out.length >= 30) return;
if (typeof p.id !== 'string' || p.id.length > 30 || typeof p.obj !== 'string' || p.obj.length > 120) return;
if (typeof p.ts !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(p.ts)) return;
if (THEMES.indexOf(p.theme) === -1 || LEVELS.indexOf(p.level) === -1 || PLAN_LANGS.indexOf(p.lang) === -1) return;
if (p.budget !== 0 && p.budget !== 1 && p.budget !== 2) return;
if (!Array.isArray(p.steps) || p.steps.length < 1 || p.steps.length > 8 || !Array.isArray(p.done)) return;
var steps = [], ok = true;
p.steps.forEach(function (s) {
if (!s || typeof s.t !== 'string' || s.t.length > 300 || typeof s.n !== 'number' || s.n < 1 || s.n > 12 || ['d', 'w', 'm'].indexOf(s.u) === -1) { ok = false; return; }
steps.push({ t: s.t, n: Math.floor(s.n), u: s.u });
});
if (!ok) return;
var notes = Array.isArray(p.notes) ? p.notes.filter(function (x) { return typeof x === 'string' && x.length <= 300; }).slice(0, 2) : [];
out.push({ id: p.id, ts: p.ts, obj: p.obj, theme: p.theme, level: p.level, budget: p.budget, lang: p.lang, notes: notes, steps: steps,
done: steps.map(function (s, i) { return p.done[i] === true; }) });
});
return out;
}
function savePlans() { save('nexora.plans', plans); }
function findPlan(id) { var i; for (i = 0; i < plans.length; i++) { if (plans[i].id === id) return plans[i]; } return null; }
function initial() { return state.name ? Array.from(state.name)[0].toUpperCase() : 'N'; }

function shellLoad() {
plans = cleanPlans(load('nexora.plans', []));
var dd = load('nexora.days', []);
days = Array.isArray(dd) ? dd.filter(function (x) { return typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x); }).slice(-400) : [];
var nm = load('nexora.name', '');
state.name = (typeof nm === 'string' ? nm : '').replace(/[<>]/g, '').slice(0, 30);
state.remind = load('nexora.remind', false) === true;
state.theme = load('nexora.theme', 'dark') === 'light' ? 'light' : 'dark';
state.vol = 1;
document.documentElement.setAttribute('data-theme', state.theme);
}

/* ----- navigation ----- */
var ENTER = {};
function go(name, mode) {
if (SCREENS.indexOf(name) === -1) return;
if (state.screen === 'voice' && name !== 'voice') stopVoice();
if (mode !== 'replace' && state.screen && state.screen !== name) { navStack.push(state.screen); navStack = navStack.slice(-30); }
state.screen = name;
SCREENS.forEach(function (s) { var n = $('s-' + s); if (n) n.classList.toggle('active', s === name); });
$('bnav').hidden = !NAV_ON[name];
document.querySelectorAll('.nv').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-go') === NAV_OF[name]); });
try { window.scrollTo(0, 0); } catch (e) { /* ignore */ }
if (ENTER[name]) ENTER[name]();
}
function back() { go(navStack.pop() || 'home', 'replace'); }

/* ----- accueil / tableau de bord ----- */
function nextStep() {
var i, j;
for (i = 0; i < plans.length; i++) {
for (j = 0; j < plans[i].steps.length; j++) { if (!plans[i].done[j]) return { plan: plans[i], idx: j }; }
}
return null;
}
function renderHome() {
$('hHello').textContent = t('h_hello') + (state.name ? ', ' + state.name : '') + ' \ud83d\udc4b';
$('hAvatar').textContent = initial();
$('hStoreD').textContent = fmt(t('h_store_d'), { n: CATALOG.length });
var box = $('themes'); box.textContent = '';
THEMES.forEach(function (k) {
var b = el('button', 'theme th-' + k); b.type = 'button';
b.appendChild(el('span', 't-ico', T_ICON[k]));
b.appendChild(el('strong', '', t('th_' + k)));
b.appendChild(el('small', '', t('th_' + k + '_d')));
b.addEventListener('click', function () { openGoal({ theme: k }); });
box.appendChild(b);
});
var r = $('remind'), ns = nextStep();
if (state.remind && ns) {
var left = 0; plans.forEach(function (p) { p.done.forEach(function (d) { if (!d) left++; }); });
r.hidden = false; r.textContent = fmt(t('h_remind'), { n: left, s: ns.plan.steps[ns.idx].t });
r.dir = RTL[ns.plan.lang] ? 'rtl' : 'ltr';
} else { r.hidden = true; }
}
ENTER.home = renderHome;

/* ----- objectif ----- */
function openGoal(o) {
o = o || {};
var lg = o.lang || state.lang;
goal = { obj: (o.obj || '').slice(0, 120), theme: o.theme || goal.theme, level: 'b', budget: 0, lang: PLAN_LANGS.indexOf(lg) !== -1 ? lg : 'fr' };
go('goal');
}
function segBuild(box, items, cur, onPick) {
box.textContent = '';
items.forEach(function (it) {
var b = el('button', it[0] === cur ? 'on' : '', it[1]); b.type = 'button';
b.setAttribute('aria-pressed', String(it[0] === cur));
b.addEventListener('click', function () { onPick(it[0]); });
box.appendChild(b);
});
}
function renderGoal() {
if ($('gObj') !== document.activeElement) $('gObj').value = goal.obj;
segBuild($('gTheme'), THEMES.map(function (k) { return [k, T_ICON[k] + ' ' + t('th_' + k)]; }), goal.theme, function (v) { goal.theme = v; renderGoal(); });
segBuild($('gLevel'), LEVELS.map(function (k) { return [k, t('lv_' + k)]; }), goal.level, function (v) { goal.level = v; renderGoal(); });
segBuild($('gBudget'), [0, 1, 2].map(function (k) { return [k, t('bud_' + k)]; }), goal.budget, function (v) { goal.budget = v; renderGoal(); });
var fb = $('gLang'); fb.textContent = '';
PLAN_LANGS.forEach(function (l) {
var b = el('button', 'flag-btn' + (l === goal.lang ? ' on' : '')); b.type = 'button';
b.setAttribute('aria-pressed', String(l === goal.lang));
b.appendChild(el('span', 'fe', FLAGS[l])); b.appendChild(el('span', '', LANG_NAME[l]));
b.addEventListener('click', function () { goal.lang = l; renderGoal(); });
fb.appendChild(b);
});
$('gErr').hidden = true;
}
ENTER.goal = renderGoal;
function makePlan(g) {
var L = g.lang, by = V2.plans[g.theme], base = by[L] || by.en;
var steps = base.map(function (s) { return { t: s[0], n: s[1], u: s[2] }; });
if (g.level === 'i') steps[0] = { t: tt('pn_s1_i', L), n: 3, u: 'd' };
if (g.level === 'a') steps[0] = { t: tt('pn_s1_a', L), n: 3, u: 'd' };
return { id: Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36), ts: todayStr(), obj: g.obj, theme: g.theme, level: g.level,
budget: g.budget, lang: L, notes: [tt('pn_lvl_' + g.level, L), tt('pn_bud_' + g.budget, L)], steps: steps,
done: steps.map(function () { return false; }) };
}
function onGoalSubmit(e) {
e.preventDefault();
var v = $('gObj').value.replace(/\s+/g, ' ').trim();
if (!v) { $('gErr').hidden = false; $('gErr').textContent = t('g_err'); return; }
goal.obj = v.slice(0, 120);
var p = makePlan(goal);
plans.unshift(p); plans = plans.slice(0, 30); savePlans(); markDay();
curPlan = p.id;
if (navStack[navStack.length - 1] === 'goal') navStack.pop();
go('plan', 'replace');
if (!storageOk) showStorageWarn();
}

/* ----- plan ----- */
function planText(p) {
var lines = [p.obj, ''];
p.notes.forEach(function (n) { lines.push(n); });
lines.push('');
p.steps.forEach(function (s, i) { lines.push((i + 1) + '. ' + s.t + ' (' + dur(s.n, s.u, p.lang) + ')' + (p.done[i] ? ' [x]' : '')); });
lines.push('', 'NEXORA - ' + t('foot_by'));
return lines.join('\n');
}
function copyText(txt) {
function fallback() {
try {
var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', '');
ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
var ok = document.execCommand && document.execCommand('copy'); document.body.removeChild(ta); return !!ok;
} catch (e) { return false; }
}
if (navigator.clipboard && navigator.clipboard.writeText) {
return navigator.clipboard.writeText(txt).then(function () { return true; }, function () { return fallback(); });
}
return Promise.resolve(fallback());
}
function renderPlan() {
var box = $('planBox'); box.textContent = '';
var p = findPlan(curPlan);
if (!p) { box.appendChild(el('p', 'empty', t('hi_empty'))); return; }
var head = el('div', 'plan-head');
head.appendChild(el('span', 'plan-ico', T_ICON[p.theme]));
var hb = el('div'); var h = el('h2', '', p.obj); h.dir = 'auto'; hb.appendChild(h);
var tr = el('div', 'tagrow');
[t('th_' + p.theme), t('lv_' + p.level), t('bud_' + p.budget), shortDate(p.ts)].forEach(function (x) { tr.appendChild(el('span', 'tg', x)); });
hb.appendChild(tr); head.appendChild(hb); box.appendChild(head);
var doneN = p.done.filter(Boolean).length;
var sub = el('h3', 'rf-title', t('p_head') + ' \u2014 ' + doneN + '/' + p.steps.length + ' ' + t('p_steps_done')); box.appendChild(sub);
var notes = el('div', 'plan-notes');
p.notes.forEach(function (n) { var q = el('p', 'note', n); q.dir = RTL[p.lang] ? 'rtl' : 'ltr'; notes.appendChild(q); });
box.appendChild(notes);
var ul = el('ul', 'steps');
p.steps.forEach(function (s, i) {
var li = el('li'); var b = el('button', 'step' + (p.done[i] ? ' done' : '')); b.type = 'button';
b.setAttribute('aria-pressed', String(!!p.done[i]));
b.appendChild(el('span', 'n', p.done[i] ? '\u2713' : String(i + 1)));
var tx = el('span', 'st-t'); tx.dir = RTL[p.lang] ? 'rtl' : 'ltr';
tx.appendChild(el('span', '', s.t)); tx.appendChild(el('small', '', '(' + dur(s.n, s.u, p.lang) + ')'));
b.appendChild(tx);
b.addEventListener('click', function () { p.done[i] = !p.done[i]; savePlans(); markDay(); renderPlan(); });
li.appendChild(b); ul.appendChild(li);
});
box.appendChild(ul);
var acts = el('div', 'plan-acts');
var cp = el('button', 'btn', t('p_copy')); cp.type = 'button';
cp.addEventListener('click', function () { copyText(planText(p)).then(function (ok) { toast(ok ? t('p_copied') : t('e_err')); }); });
var ex = el('button', 'btn primary', t('p_pdf')); ex.type = 'button';
ex.addEventListener('click', function () { go('export'); });
acts.appendChild(cp); acts.appendChild(ex); box.appendChild(acts);
var tools = (V2.tools && V2.tools[p.theme] || []).map(function (id) {
var i; for (i = 0; i < CATALOG.length; i++) { if (CATALOG[i].id === id) return CATALOG[i]; } return null;
}).filter(Boolean);
if (tools.length) {
var tb = el('div', 'tools'); tb.appendChild(el('h3', '', t('p_tools')));
var ch = el('div', 'chips');
tools.forEach(function (it) { var b = el('button', 'btn small', it.name); b.type = 'button'; b.addEventListener('click', function () { openModal(it); }); ch.appendChild(b); });
tb.appendChild(ch); box.appendChild(tb);
}
box.appendChild(el('p', 'note', t('g_note')));
var del = el('button', 'link-del', t('p_del')); del.type = 'button';
del.addEventListener('click', function () {
plans = plans.filter(function (x) { return x.id !== p.id; }); savePlans(); curPlan = null; toast(t('p_deleted')); back();
});
box.appendChild(del);
}
ENTER.plan = renderPlan;

/* ----- PDF : le plan est dessine sur un canevas (toutes les ecritures marchent), puis mis dans un PDF ----- */
function b64bytes(b64) { var bin = atob(b64), a = new Uint8Array(bin.length), i; for (i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }
function asciiBytes(s) { var a = new Uint8Array(s.length), i; for (i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; }
function buildPdf(jpgs) {
var parts = [], len = 0, offs = [], n = jpgs.length, i, kids = [];
function add(x) { var b = typeof x === 'string' ? asciiBytes(x) : x; parts.push(b); len += b.length; }
function begin(num) { offs[num] = len; add(num + ' 0 obj\n'); }
add('%PDF-1.4\n');
for (i = 0; i < n; i++) kids.push((3 + 3 * i) + ' 0 R');
begin(1); add('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
begin(2); add('<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + n + ' >>\nendobj\n');
for (i = 0; i < n; i++) {
var pg = 3 + 3 * i, ct = pg + 1, im = pg + 2, content = 'q 595 0 0 842 0 0 cm /Im0 Do Q';
begin(pg); add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ' + im + ' 0 R >> >> /Contents ' + ct + ' 0 R >>\nendobj\n');
begin(ct); add('<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream\nendobj\n');
begin(im); add('<< /Type /XObject /Subtype /Image /Width 1240 /Height 1754 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpgs[i].length + ' >>\nstream\n');
add(jpgs[i]); add('\nendstream\nendobj\n');
}
var total = 3 + 3 * n, xr = len, x = 'xref\n0 ' + total + '\n0000000000 65535 f \n', k;
for (k = 1; k < total; k++) { x += ('0000000000' + offs[k]).slice(-10) + ' 00000 n \n'; }
add(x + 'trailer\n<< /Size ' + total + ' /Root 1 0 R >>\nstartxref\n' + xr + '\n%%EOF\n');
return new Blob(parts, { type: 'application/pdf' });
}
function planPdf(p) {
var W = 1240, H = 1754, M = 110, pages = [], cv, cx, y, rtl = !!RTL[p.lang], X = rtl ? W - M : M, maxW = W - 2 * M;
var FF = ' -apple-system, "Segoe UI", Roboto, Arial, "Noto Sans", "Noto Sans Arabic", sans-serif';
function newPage() {
cv = document.createElement('canvas'); cv.width = W; cv.height = H; cx = cv.getContext('2d');
cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, W, H);
cx.direction = rtl ? 'rtl' : 'ltr'; cx.textAlign = rtl ? 'right' : 'left'; cx.textBaseline = 'alphabetic';
pages.push(cv); y = M;
}
function wrap(text, font) {
cx.font = font;
var words = String(text).split(/\s+/), out = [], line = '';
words.forEach(function (w) {
var test = line ? line + ' ' + w : w;
if (cx.measureText(test).width <= maxW) { line = test; return; }
if (line) out.push(line);
while (cx.measureText(w).width > maxW && w.length > 1) {
var k = w.length; while (k > 1 && cx.measureText(w.slice(0, k)).width > maxW) k--;
out.push(w.slice(0, k)); w = w.slice(k);
}
line = w;
});
if (line) out.push(line);
return out;
}
function para(text, size, weight, color, gap) {
var font = weight + ' ' + size + 'px' + FF;
wrap(text, font).forEach(function (ln) {
if (y + size * 1.5 > H - M - 40) { newPage(); }
cx.font = font; cx.fillStyle = color; cx.fillText(ln, X, y + size);
y += Math.round(size * 1.5);
});
y += gap;
}
newPage();
para('NEXORA', 34, 'bold', '#4f7cff', 6);
para(p.obj, 54, 'bold', '#10204a', 10);
para([tt('th_' + p.theme, p.lang), tt('lv_' + p.level, p.lang), tt('bud_' + p.budget, p.lang), shortDate(p.ts)].join('  |  '), 28, 'normal', '#5a6a92', 24);
p.notes.forEach(function (n) { para(n, 28, 'normal', '#33426b', 10); });
y += 14;
p.steps.forEach(function (s, i) {
para((i + 1) + '.  ' + s.t, 34, 'bold', '#10204a', 0);
para('(' + dur(s.n, s.u, p.lang) + ')' + (p.done[i] ? '  [x]' : ''), 26, 'normal', '#5a6a92', 20);
});
pages.forEach(function (c, i) {
var g = c.getContext('2d'); g.direction = 'ltr'; g.textAlign = 'left'; g.font = 'normal 24px' + FF; g.fillStyle = '#7a88ad';
g.fillText('NEXORA - ' + t('foot_by') + '   (' + (i + 1) + '/' + pages.length + ')', M, H - 60);
});
var jpgs = pages.map(function (c) { return b64bytes(c.toDataURL('image/jpeg', 0.92).split(',')[1]); });
return buildPdf(jpgs);
}
function pdfName(p) { return 'nexora-plan-' + p.ts + '.pdf'; }
function exportBlob(cb) {
var p = findPlan(curPlan), er = $('eErr');
er.hidden = true;
if (!p) { er.hidden = false; er.textContent = t('e_err'); return; }
try { cb(planPdf(p), p); } catch (e) { er.hidden = false; er.textContent = t('e_err'); }
}
function downloadPdf() {
exportBlob(function (blob, p) {
var url = URL.createObjectURL(blob), a = document.createElement('a');
a.href = url; a.download = pdfName(p); a.rel = 'noopener'; document.body.appendChild(a); a.click();
setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 5000);
});
}
function sharePlan() {
var p = findPlan(curPlan); if (!p) return;
function textShare() {
if (navigator.share) { navigator.share({ title: p.obj, text: planText(p) }).catch(function () { /* annule */ }); return; }
copyText(planText(p)).then(function (ok) { toast(ok ? t('p_copied') : t('e_err')); });
}
try {
var blob = planPdf(p), f = new File([blob], pdfName(p), { type: 'application/pdf' });
if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: p.obj }).catch(function () { /* annule */ }); return; }
} catch (e) { /* on partage le texte */ }
textShare();
}

/* ----- langues ----- */
function renderLangs() {
var box = $('langList'); box.textContent = '';
LANG_ORDER.forEach(function (l) {
var b = el('button', 'lang-row' + (l === langSel ? ' on' : '')); b.type = 'button'; b.setAttribute('data-l', l);
b.setAttribute('aria-pressed', String(l === langSel));
b.appendChild(el('span', 'fe', FLAGS[l]));
var tx = el('span'); tx.appendChild(document.createTextNode(LANG_NAME[l])); tx.appendChild(el('small', '', l.toUpperCase()));
b.appendChild(tx);
b.addEventListener('click', function () { langSel = l; renderLangs(); });
box.appendChild(b);
});
}
ENTER.langs = function () { langSel = state.lang; renderLangs(); };

/* ----- voix (conversation) ----- */
var vRecog = null, vGot = false;
function stopVoice() {
$('s-voice').classList.remove('listening');
if (vRecog) { try { vRecog.abort ? vRecog.abort() : vRecog.stop(); } catch (e) { /* ignore */ } vRecog = null; }
}
function startVoice() {
$('vFlag').textContent = FLAGS[state.lang] || ''; $('vLangName').textContent = LANG_NAME[state.lang] || state.lang;
$('vMsg').textContent = '';
if (!SR) { $('vMsg').textContent = t('voice_unsupported'); return; }
stopVoice(); vGot = false;
try {
var r = new SR(); vRecog = r;
r.lang = VOICE_LOCALE[state.lang] || 'fr-FR'; r.interimResults = false;
r.onstart = function () { $('s-voice').classList.add('listening'); };
r.onend = function () {
$('s-voice').classList.remove('listening');
if (vRecog === r) { vRecog = null; if (!vGot && state.screen === 'voice') $('vMsg').textContent = t('v_none') + ' ' + t('v_retry'); }
};
r.onerror = function () { if (state.screen === 'voice') $('vMsg').textContent = t('v_err') + ' ' + t('v_retry'); };
r.onresult = function (e) {
var txt = e.results[0][0].transcript; vGot = true;
go('chat', 'replace');
var prev = state.speak; state.speak = true;
try { onChat(txt); } finally { state.speak = prev; }
};
r.start();
} catch (e) { $('vMsg').textContent = t('v_err') + ' ' + t('v_retry'); }
}
ENTER.voice = startVoice;
ENTER.chat = function () { var c = $('chat'); c.scrollTop = c.scrollHeight; };

/* ----- lecteur sous les reponses de l'assistant ----- */
function mmss(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + two(s % 60); }
function addPlayer(m, text) {
if (!('speechSynthesis' in window)) return;
var p = el('div', 'player'), b = el('button', 'pb', '\u25b6'), bar = el('div', 'bar'), fill = el('i'), tm = el('span', 'tm'), vb = el('button', 'vb', state.vol ? '\ud83d\udd0a' : '\ud83d\udd07');
var est = Math.max(1, cleanForSpeech(text).length / 14), playing = false;
b.type = 'button'; vb.type = 'button';
b.setAttribute('aria-label', t('c_play')); vb.setAttribute('aria-label', t('c_vol'));
tm.textContent = '~' + mmss(est); tm.title = t('c_est');
bar.appendChild(fill); p.appendChild(b); p.appendChild(bar); p.appendChild(tm); p.appendChild(vb);
function reset() { playing = false; b.textContent = '\u25b6'; b.setAttribute('aria-label', t('c_play')); }
b.addEventListener('click', function () {
if (playing) { try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ } reset(); fill.style.width = '0'; tm.textContent = '~' + mmss(est); return; }
playing = true; b.textContent = '\u25a0'; b.setAttribute('aria-label', t('c_stop'));
speakText(text, true, {
progress: function (f) { fill.style.width = Math.round(f * 100) + '%'; tm.textContent = mmss(est * f) + ' / ~' + mmss(est); },
end: function () { reset(); fill.style.width = '0'; tm.textContent = '~' + mmss(est); }
});
});
vb.addEventListener('click', function () {
state.vol = state.vol ? 0 : 1;
document.querySelectorAll('.vb').forEach(function (x) { x.textContent = state.vol ? '\ud83d\udd0a' : '\ud83d\udd07'; });
});
m.appendChild(p);
}

/* ----- historique / progression ----- */
function renderHistoryScreen() {
var box = $('planList'); box.textContent = '';
if (!plans.length) { box.appendChild(el('p', 'empty', t('hi_empty'))); return; }
plans.forEach(function (p) {
var b = el('button', 'plan-item'); b.type = 'button';
b.appendChild(el('span', 'pi-ico', T_ICON[p.theme]));
var tx = el('span', 'pi-t'); var st = el('strong', '', p.obj); st.dir = 'auto'; tx.appendChild(st);
tx.appendChild(el('small', '', shortDate(p.ts) + ' - ' + LANG_NAME[p.lang]));
b.appendChild(tx); b.appendChild(el('span', 'tg', t('th_' + p.theme)));
b.addEventListener('click', function () { curPlan = p.id; go('plan'); });
box.appendChild(b);
});
}
ENTER.history = renderHistoryScreen;
function renderProgress() {
var total = 0, done = 0, fin = 0, act = 0;
plans.forEach(function (p) {
var d = p.done.filter(Boolean).length; total += p.steps.length; done += d;
if (d === p.steps.length) fin++; else act++;
});
$('ringTxt').textContent = done + '/' + total;
$('ring').style.setProperty('--p', String(total ? Math.round(done * 100 / total) : 0));
$('stDays').textContent = String(days.length);
$('stActive').textContent = String(act);
$('stDone').textContent = String(fin);
$('stLeft').textContent = String(total - done);
}
ENTER.progress = renderProgress;

/* ----- plus (parametres) ----- */
function renderMore() {
$('mAvatar').textContent = initial();
$('mName').textContent = state.name || 'NEXORA';
if ($('nameInput') !== document.activeElement) $('nameInput').value = state.name;
$('rLangV').textContent = LANG_NAME[state.lang] || state.lang;
$('swNotif').checked = state.remind;
$('swDark').checked = state.theme === 'dark';
}
ENTER.more = renderMore;
function shareApp() {
var url = String(location.href);
if (navigator.share) { navigator.share({ title: 'NEXORA STORE', text: t('share_text'), url: url }).catch(function () { /* annule */ }); return; }
copyText(url).then(function (ok) { toast(ok ? t('share_copied') : t('e_err')); });
}

/* ----- exemples de questions ----- */
function renderExamples() {
var items = [['all', t('x_all')]].concat(THEMES.map(function (k) { return [k, t('th_' + k)]; }));
segBuild($('xFilter'), items, exFilter, function (v) { exFilter = v; renderExamples(); });
var ul = $('xList'); ul.textContent = '';
(V2.examples || []).forEach(function (x) {
if (exFilter !== 'all' && x[2] !== exFilter) return;
var li = el('li'), b = el('button', 'ex-item'); b.type = 'button';
b.appendChild(el('span', 'fe', FLAGS[x[1]] || ''));
var tx = el('span'); var q = el('span', '', x[0]); q.dir = RTL[x[1]] ? 'rtl' : 'ltr'; tx.appendChild(q);
tx.appendChild(el('small', '', LANG_NAME[x[1]] + ' - ' + t('th_' + x[2]))); b.appendChild(tx);
b.addEventListener('click', function () { openGoal({ obj: x[0], theme: x[2], lang: x[1] }); });
li.appendChild(b); ul.appendChild(li);
});
}
ENTER.examples = renderExamples;

/* ----- rafraichir les ecrans quand la langue change ----- */
function shellRefresh() {
if (!state.screen) return;
document.querySelectorAll('.back').forEach(function (b) { b.setAttribute('aria-label', t('back')); });
$('hMic').setAttribute('aria-label', t('nav_voice')); $('nvMic').setAttribute('aria-label', t('nav_voice')); $('vMic').setAttribute('aria-label', t('nav_voice'));
if (state.screen === 'voice') { $('vFlag').textContent = FLAGS[state.lang] || ''; $('vLangName').textContent = LANG_NAME[state.lang] || state.lang; return; }
if (ENTER[state.screen]) ENTER[state.screen]();
}

function shellBind() {
document.querySelectorAll('.back').forEach(function (b) { b.addEventListener('click', back); });
document.querySelectorAll('.nv').forEach(function (b) { b.addEventListener('click', function () { navStack = []; go(b.getAttribute('data-go'), 'replace'); }); });
$('nvMic').addEventListener('click', function () { go('voice'); });
$('wStart').addEventListener('click', function () { save('nexora.started', true); go('home', 'replace'); });
$('hMenu').addEventListener('click', function () { go('more'); });
$('hAvatar').addEventListener('click', function () { go('more'); });
$('hMic').addEventListener('click', function () { go('voice'); });
$('hForm').addEventListener('submit', function (e) {
e.preventDefault();
var v = $('hInput').value.trim(); if (!v) return;
$('hInput').value = ''; go('chat'); onChat(v);
});
$('hStore').addEventListener('click', function () { go('store'); });
$('hExamples').addEventListener('click', function () { go('examples'); });
$('goalForm').addEventListener('submit', onGoalSubmit);
$('gObj').addEventListener('input', function (e) { goal.obj = e.target.value; });
$('pShare').addEventListener('click', function () { go('export'); });
$('langOk').addEventListener('click', function () { setLang(langSel); back(); });
$('vMic').addEventListener('click', function () { if (vRecog) stopVoice(); else startVoice(); });
$('vCancel').addEventListener('click', function () { stopVoice(); back(); });
$('hiNew').addEventListener('click', function () { openGoal({}); });
$('eDl').addEventListener('click', downloadPdf);
$('eShare').addEventListener('click', sharePlan);
$('eBack').addEventListener('click', back);
$('nameInput').addEventListener('input', function (e) {
state.name = e.target.value.replace(/[<>]/g, '').slice(0, 30); save('nexora.name', state.name);
$('mAvatar').textContent = initial(); $('mName').textContent = state.name || 'NEXORA';
});
$('swNotif').addEventListener('change', function (e) { state.remind = e.target.checked; save('nexora.remind', state.remind); });
$('swDark').addEventListener('change', function (e) {
state.theme = e.target.checked ? 'dark' : 'light'; save('nexora.theme', state.theme);
document.documentElement.setAttribute('data-theme', state.theme);
});
$('rLang').addEventListener('click', function () { go('langs'); });
$('rVoice').addEventListener('click', function () { go('voicecfg'); });
$('rStore').addEventListener('click', function () { go('store'); });
$('rSec').addEventListener('click', function () { go('security'); });
$('rExamples').addEventListener('click', function () { go('examples'); });
$('rAbout').addEventListener('click', function () { go('about'); });
$('rHelp').addEventListener('click', function () { go('help'); });
$('rShare').addEventListener('click', shareApp);
}
function shellStart() {
shellBind();
go(load('nexora.started', false) === true ? 'home' : 'welcome', 'replace');
markDay();
}

/* ---------- 13. D\u00c9MARRAGE ---------- */
function init() {
state.favs = cleanIds(load('nexora.favs', []));
state.history = cleanStrings(load('nexora.history', []), 5);
state.speak = load('nexora.speak', false) === true;
state.voiceG = load('nexora.voiceg', 'f') === 'm' ? 'm' : 'f';
var sv = load('nexora.sort', 'rel');
state.sort = (sv === 'az' || sv === 'rel') ? sv : 'rel';
var saved = load('nexora.lang', null);
if (typeof saved !== 'string' || !I18N[saved]) {
var nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
saved = I18N[nav] ? nav : 'fr';
}
state.lang = saved;
$('speakToggle').checked = state.speak;
$('voiceGender').value = state.voiceG;
shellLoad();
bind();
applyLang();
setupVoice();
addMsg(t('ai_hello'), 'bot', null, examples());
shellStart();
if (!storageOk) showStorageWarn();
}
init();
})();
/* FIN NEXORA v2.0 - si tu vois cette ligne en bas de l onglet JS, le collage est complet */
