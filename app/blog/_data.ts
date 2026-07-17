export const posts = [
  {
    slug: 'amazon-vs-zalando-image-requirements',
    isoDate: '2026-07-10T00:00:00Z',
    date: { en: 'July 10, 2026', it: '10 luglio 2026' },
    tag: { en: 'Guide', it: 'Guida' },
    readTime: '6 min',
    title: {
      en: 'Amazon vs Zalando image requirements: the format conflict every EU seller faces',
      it: 'Amazon vs Zalando: il conflitto di formati che blocca i venditori europei',
    },
    excerpt: {
      en: 'Amazon wants square. Zalando wants portrait. If you sell on both, you need two separate image sets — or one tool that outputs both from a single upload.',
      it: 'Amazon vuole il quadrato. Zalando vuole il ritratto. Se vendi su entrambi, hai bisogno di due set di immagini separati — o uno strumento che generi entrambi da un singolo upload.',
    },
    body: {
      en: [
        "If you sell on both Amazon and Zalando, you've already hit the wall. Both require white backgrounds. Both have strict image quality rules. Both will suppress your listings if your photos don't comply. But their specs are subtly — and importantly — different.",
        "**Amazon's image requirements:**\n- Main image: pure white background (RGB 255,255,255)\n- Aspect ratio: 1:1 square\n- Minimum size: 1000×1000px; recommended 2000×2000px for zoom\n- Product must fill at least 85% of the frame\n- No watermarks, no text, no props, no borders\n- Applies to all categories: clothing, accessories, electronics, shoes",
        "**Zalando's image requirements:**\n- Background: white or very light neutral\n- Clothing on model or flat lay: 762×1100px minimum, portrait orientation (≈4:5 ratio)\n- Shoes: 2000×2000px square\n- Bags and accessories: square or portrait depending on shape\n- Product must fill 80–90% of the frame\n- Category-specific rules apply — a shirt on Zalando needs portrait, the same shirt on Amazon needs square",
        "**The conflict in practice:** Say you sell a jacket. Amazon wants a 2000×2000px square image where the jacket fills 85% of a perfectly square frame. Zalando wants the same jacket in a portrait frame, roughly 1600×2000px, where the proportions show the full length of the garment. You cannot use the same image file for both platforms and have it look right on both. The square crop that works for Amazon cuts off the bottom of the jacket on Zalando. The portrait image that Zalando wants shows unnecessary white space on Amazon.",
        "**The result:** most sellers either submit the wrong ratio (and get lower placement or listing suppression), or manually produce two separate edited versions of every product photo — doubling the editing workload and cost for every new SKU.",
        "**How to solve it with Centyr:**\nCreate two presets — one for Amazon, one for Zalando — and process your batch twice.\n1. Preset 'Amazon': 2000×2000px, fill 85%, white background\n2. Preset 'Zalando Clothing': 1600×2000px (portrait), fill 85%, white background\n3. Preset 'Zalando Shoes': 2000×2000px, fill 85%, white background\n\nUpload your raw photos once. Run through the Amazon preset, download the ZIP. Run through the Zalando preset, download the ZIP. Two compliant image sets, one upload session, no Photoshop.",
      ],
      it: [
        "Se vendi su Amazon e Zalando, hai già incontrato il problema. Entrambi richiedono sfondi bianchi. Entrambi hanno regole rigide sulla qualità delle immagini. Entrambi sopprimeranno le tue inserzioni se le foto non sono conformi. Ma le loro specifiche sono — sottilmente ma significativamente — diverse.",
        "**Requisiti immagini Amazon:**\n- Immagine principale: sfondo bianco puro (RGB 255,255,255)\n- Rapporto d'aspetto: 1:1 quadrato\n- Dimensione minima: 1000×1000px; consigliato 2000×2000px per lo zoom\n- Il prodotto deve riempire almeno l'85% del frame\n- Nessuna filigrana, testo, accessori o bordi\n- Valido per tutte le categorie: abbigliamento, accessori, elettronica, scarpe",
        "**Requisiti immagini Zalando:**\n- Sfondo: bianco o neutro molto chiaro\n- Abbigliamento su modello o flat lay: minimo 762×1100px, orientamento ritratto (≈rapporto 4:5)\n- Scarpe: 2000×2000px quadrato\n- Borse e accessori: quadrato o ritratto in base alla forma\n- Il prodotto deve riempire l'80–90% del frame\n- Regole specifiche per categoria: una giacca su Zalando richiede il ritratto, la stessa giacca su Amazon richiede il quadrato",
        "**Il conflitto in pratica:** Supponiamo che tu venda una giacca. Amazon vuole un'immagine quadrata 2000×2000px dove la giacca riempie l'85% di un frame perfettamente quadrato. Zalando vuole la stessa giacca in un frame ritratto, circa 1600×2000px, dove le proporzioni mostrano la lunghezza completa del capo. Non puoi usare lo stesso file immagine su entrambe le piattaforme e aspettarti che appaia bene su entrambe.",
        "**Il risultato:** la maggior parte dei venditori o carica il rapporto sbagliato (e ottiene un posizionamento inferiore o la soppressione dell'inserzione), oppure produce manualmente due versioni separate di ogni foto prodotto — raddoppiando il lavoro di editing e il costo per ogni nuovo SKU.",
        "**Come risolverlo con Centyr:**\nCrea due preset — uno per Amazon, uno per Zalando — ed elabora il batch due volte.\n1. Preset 'Amazon': 2000×2000px, riempimento 85%, sfondo bianco\n2. Preset 'Zalando Abbigliamento': 1600×2000px (ritratto), riempimento 85%, sfondo bianco\n3. Preset 'Zalando Scarpe': 2000×2000px, riempimento 85%, sfondo bianco\n\nCarica le foto grezze una volta. Esegui con il preset Amazon, scarica il ZIP. Esegui con il preset Zalando, scarica il ZIP. Due set di immagini conformi, una sessione di upload, nessun Photoshop.",
      ],
    },
  },
  {
    slug: 'studio-vs-automated-product-photography-cost',
    isoDate: '2026-07-03T00:00:00Z',
    date: { en: 'July 3, 2026', it: '3 luglio 2026' },
    tag: { en: 'Tips', it: 'Consigli' },
    readTime: '5 min',
    title: {
      en: '€30 per image at the studio vs €0.25 automated: the real cost of product photography',
      it: '€30 per foto in studio vs €0,25 automatizzato: il vero costo della fotografia prodotto',
    },
    excerpt: {
      en: 'A studio charges €15–40 per white-background image. A 200-product catalog costs €3,000–8,000. Here is the math on automated processing — and when it is worth switching.',
      it: 'Uno studio chiede €15–40 per un\'immagine su sfondo bianco. Un catalogo di 200 prodotti costa €3.000–8.000. Ecco i calcoli sull\'elaborazione automatica — e quando vale la pena passarci.',
    },
    body: {
      en: [
        "Every e-commerce seller eventually faces the same math problem. You need white-background product images for Amazon, Zalando, your Shopify store. You get a studio quote: €20 per image, minimum 30 images, €600 minimum. For a 200-product catalog that's €4,000. Annually, if you refresh your catalog, it's €4,000 again. That's a fixed cost that scales directly with your catalog size — and never gets cheaper.",
        "**Where studios actually earn their price:**\nLifestyle photography — models, props, scene styling, creative direction — is legitimately complex work that requires human judgment. If you need a jacket worn by a model in a specific setting, a studio is the right tool. But white-background images are not creative work. They are a mechanical process: remove the background, center the product, export at the right size. This is exactly the kind of work that should be automated.",
        "**The actual cost comparison:**\n- Premium studio: €30–40/image → 200 images = €6,000–8,000 → 1,000 images = €30,000–40,000\n- Budget studio or freelancer editing: €15–20/image → 200 images = €3,000–4,000\n- Centyr Pro (200 jobs/month, €49): ~€0.25/image → 200 images = €49/month\n- Centyr Starter (50 jobs/month, €15): ~€0.30/image → 50 images = €15/month\n\nThe difference is not marginal. At studio rates, 200 images cost more than a full year of Centyr. At 1,000 images, the annual gap exceeds €30,000.",
        "**What you still need a photographer for:**\nCentyr processes images — it does not take them. You still need a photographer (or a decent camera and lightbox setup) to produce the raw shot. But there's a critical distinction: raw product photography on a neutral background — just the photographer capturing the product clearly — costs €5–12/image from a freelancer. The expensive part at studios is the editing: background removal, color correction, centering, format export. That editing work is what Centyr replaces.",
        "**The hybrid workflow most brands use:**\n1. Photographer produces raw shots on a neutral surface (€5–12/image)\n2. Upload raw shots to Centyr\n3. Centyr removes background, centers, scales, exports in all required formats\n4. Download compliant ZIPs for each marketplace\n\nThis splits the human work (creative, irreplaceable) from the mechanical work (processing, automatable). A 200-product shoot with this approach costs roughly €1,000–2,400 for photography + €49/month for processing — vs €4,000–8,000 all-in at a studio.",
        "**How to calculate your ROI:**\nTake your current studio cost per image. Multiply by your average annual volume. That's your baseline. Centyr's monthly cost at your volume is your new processing budget. The difference is your annual saving. For most brands processing 50+ images per month, the payback period is under 30 days.",
      ],
      it: [
        "Ogni venditore e-commerce si trova prima o poi davanti allo stesso problema matematico. Hai bisogno di immagini prodotto su sfondo bianco per Amazon, Zalando, il tuo store Shopify. Chiedi un preventivo a uno studio: €20 per immagine, minimo 30 immagini, minimo €600. Per un catalogo di 200 prodotti sono €4.000. Ogni anno, se aggiorni il catalogo, altri €4.000. È un costo fisso che scala direttamente con la dimensione del catalogo — e non diventa mai più economico.",
        "**Dove gli studi guadagnano davvero il loro prezzo:**\nLa fotografia lifestyle — modelli, accessori, ambientazioni, direzione creativa — è un lavoro genuinamente complesso che richiede giudizio umano. Se hai bisogno di una giacca indossata da un modello in un ambiente specifico, lo studio è lo strumento giusto. Ma le immagini su sfondo bianco non sono lavoro creativo. Sono un processo meccanico: rimuovi lo sfondo, centra il prodotto, esporta alla dimensione giusta. È esattamente il tipo di lavoro che dovrebbe essere automatizzato.",
        "**Il confronto dei costi reali:**\n- Studio premium: €30–40/immagine → 200 immagini = €6.000–8.000 → 1.000 immagini = €30.000–40.000\n- Studio budget o freelancer editing: €15–20/immagine → 200 immagini = €3.000–4.000\n- Centyr Pro (200 job/mese, €49): ~€0,25/immagine → 200 immagini = €49/mese\n- Centyr Starter (50 job/mese, €15): ~€0,30/immagine → 50 immagini = €15/mese\n\nLa differenza non è marginale. Alle tariffe studio, 200 immagini costano più di un anno intero di Centyr. A 1.000 immagini, il gap annuale supera €30.000.",
        "**Cosa richiede ancora un fotografo:**\nCentyr elabora le immagini — non le scatta. Hai ancora bisogno di un fotografo (o una buona fotocamera e un lightbox) per produrre lo scatto grezzo. Ma c'è una distinzione importante: la fotografia prodotto grezza su uno sfondo neutro — semplicemente il fotografo che cattura il prodotto chiaramente — costa €5–12/immagine da un freelancer. La parte costosa in studio è l'editing: rimozione sfondo, correzione colore, centraggio, esportazione formati. Quel lavoro di editing è ciò che Centyr sostituisce.",
        "**Il workflow ibrido che usano i brand di successo:**\n1. Il fotografo produce gli scatti grezzi su una superficie neutra (€5–12/immagine)\n2. Carica gli scatti grezzi su Centyr\n3. Centyr rimuove lo sfondo, centra, scala, esporta in tutti i formati richiesti\n4. Scarica i ZIP conformi per ogni marketplace\n\nQuesto separa il lavoro umano (creativo, insostituibile) dal lavoro meccanico (elaborazione, automatizzabile). Una sessione di 200 prodotti con questo approccio costa circa €1.000–2.400 per la fotografia + €49/mese per l'elaborazione — vs €4.000–8.000 tutto incluso in uno studio.",
        "**Come calcolare il tuo ROI:**\nPrendi il tuo costo attuale per immagine in studio. Moltiplicalo per il tuo volume annuale medio. Quello è il tuo punto di partenza. Il costo mensile di Centyr al tuo volume è il tuo nuovo budget di elaborazione. La differenza è il tuo risparmio annuale. Per la maggior parte dei brand che elaborano 50+ immagini al mese, il periodo di recupero è inferiore a 30 giorni.",
      ],
    },
  },
  {
    slug: 'amazon-product-photos-2026',
    isoDate: '2026-02-28T00:00:00Z',
    date: { en: 'February 28, 2026', it: '28 febbraio 2026' },
    tag: { en: 'Guide', it: 'Guida' },
    readTime: '5 min',
    title: {
      en: 'How to prepare product photos for Amazon in 2026',
      it: 'Come preparare le foto prodotto per Amazon nel 2026',
    },
    excerpt: {
      en: "Amazon requires white backgrounds, specific pixel dimensions, and perfect centering. Here's how to meet their requirements automatically with Centyr.",
      it: 'Amazon richiede sfondi bianchi, dimensioni specifiche in pixel e centraggio perfetto. Ecco come soddisfare i loro requisiti automaticamente con Centyr.',
    },
    body: {
      en: [
        "Amazon's image requirements are among the strictest in e-commerce. Your main product image must have a pure white background (RGB 255,255,255), the product must fill at least 85% of the frame, and the image must be at least 1000px on the longest side for zoom to work.",
        "Failing these requirements means your listing gets suppressed, which translates directly to lost revenue. Manually editing every image to meet these specs is time-consuming and error-prone, especially when you have hundreds or thousands of SKUs.",
        "**What Centyr does automatically:**\n- Removes the original background and replaces it with pure white\n- Centers and scales the product to fill at least 85% of the frame\n- Outputs images at your chosen resolution (we recommend 2000×2000px for Amazon)\n- Processes entire batches at once, upload 100 images, download 100 compliant images",
        "**Step-by-step setup for Amazon:**\n1. Log into Centyr and create a new preset\n2. Set background to White (#FFFFFF)\n3. Set output size to 2000×2000px\n4. Set subject fill to 85–90%\n5. Upload your product photos as a batch\n6. Download the ZIP and upload directly to Seller Central",
        "With this workflow, a catalog of 200 products that previously required 6+ hours of Photoshop work can be processed in under 20 minutes.",
      ],
      it: [
        "I requisiti immagine di Amazon sono tra i più rigidi nell'e-commerce. L'immagine principale del prodotto deve avere uno sfondo bianco puro (RGB 255,255,255), il prodotto deve occupare almeno l'85% del frame e l'immagine deve essere di almeno 1000px sul lato più lungo per abilitare lo zoom.",
        "Non rispettare questi requisiti significa che la tua inserzione viene soppressa, il che si traduce direttamente in perdita di fatturato. Modificare manualmente ogni immagine per rispettare queste specifiche è lento e soggetto a errori, specialmente con centinaia o migliaia di SKU.",
        "**Cosa fa Centyr automaticamente:**\n- Rimuove lo sfondo originale e lo sostituisce con bianco puro\n- Centra e scala il prodotto per riempire almeno l'85% del frame\n- Genera le immagini alla risoluzione scelta (consigliamo 2000×2000px per Amazon)\n- Elabora interi batch in una volta, carica 100 immagini, scarica 100 immagini conformi",
        "**Setup passo per passo per Amazon:**\n1. Accedi a Centyr e crea un nuovo preset\n2. Imposta lo sfondo su Bianco (#FFFFFF)\n3. Imposta la dimensione output su 2000×2000px\n4. Imposta il riempimento soggetto all'85–90%\n5. Carica le tue foto prodotto come batch\n6. Scarica il ZIP e carica direttamente su Seller Central",
        "Con questo flusso, un catalogo di 200 prodotti che prima richiedeva 6+ ore di Photoshop può essere elaborato in meno di 20 minuti.",
      ],
    },
  },
  {
    slug: 'fashion-brand-automation',
    isoDate: '2026-02-15T00:00:00Z',
    date: { en: 'February 15, 2026', it: '15 febbraio 2026' },
    tag: { en: 'Case Study', it: 'Caso Studio' },
    readTime: '7 min',
    title: {
      en: 'From 3 hours to 10 minutes: how a fashion brand automated photo editing',
      it: 'Da 3 ore a 10 minuti: come un brand fashion ha automatizzato il photo editing',
    },
    excerpt: {
      en: 'A boutique clothing brand with 800+ SKUs was spending an entire workday each week editing product photos. Centyr reduced that to 10 minutes of uploads.',
      it: "Un brand di abbigliamento con 800+ SKU spendeva un'intera giornata lavorativa a settimana per editare le foto prodotto. Centyr ha ridotto tutto a 10 minuti di caricamento.",
    },
    body: {
      en: [
        "This fashion brand sells 800+ clothing items across their own Shopify store and two marketplaces. Every week, new seasonal products required a full cycle of photo editing: remove backgrounds, apply white or light grey backgrounds, crop to standard sizes, export in three formats.",
        "Their in-house process: one part-time employee spending 3–4 hours every Monday morning doing nothing but photo editing in Photoshop. The work was repetitive, the quality was inconsistent, and delays in publishing new arrivals meant lost sales.",
        "**The integration:** They connected Centyr to their internal photo workflow. Photographers upload raw shots directly to a shared folder. On Monday morning, instead of opening Photoshop, the employee uploads the folder to Centyr, sets the preset (white background, 1200×1600px for Shopify, square crop for marketplaces), and downloads the results.",
        "**Results after 8 weeks:**\n- Monday editing time: 3.5h → 10 minutes\n- Image consistency score (internal audit): from 72% to 99%\n- New products listed same-day instead of Wednesday\n- Employee reassigned to customer support, improving response times",
        "The brand now processes 40–60 new images per week with zero Photoshop involvement. The preset system means any team member can run the workflow, no design skills required.",
      ],
      it: [
        "Questo brand fashion vende 800+ capi su Shopify e due marketplace. Ogni settimana, i nuovi prodotti stagionali richiedevano un ciclo completo di photo editing: rimozione sfondi, applicazione sfondo bianco o grigio chiaro, crop a dimensioni standard, esportazione in tre formati.",
        "Il processo interno: un dipendente part-time che spendeva 3–4 ore ogni lunedì mattina a fare solo photo editing in Photoshop. Il lavoro era ripetitivo, la qualità era inconsistente, e i ritardi nella pubblicazione delle nuove uscite significavano vendite perse.",
        "**L'integrazione:** Hanno collegato Centyr al loro flusso fotografico interno. I fotografi caricano gli scatti grezzi direttamente in una cartella condivisa. Il lunedì mattina, invece di aprire Photoshop, il dipendente carica la cartella su Centyr, imposta il preset (sfondo bianco, 1200×1600px per Shopify, crop quadrato per i marketplace), e scarica i risultati.",
        "**Risultati dopo 8 settimane:**\n- Tempo di editing lunedì: 3,5h → 10 minuti\n- Punteggio di coerenza immagini (audit interno): dal 72% al 99%\n- Nuovi prodotti pubblicati in giornata invece che il mercoledì\n- Dipendente riassegnato al supporto clienti, migliorando i tempi di risposta",
        "Il brand ora elabora 40–60 nuove immagini a settimana senza alcun coinvolgimento di Photoshop. Il sistema di preset significa che qualsiasi membro del team può gestire il flusso, nessuna competenza di design richiesta.",
      ],
    },
  },
  {
    slug: 'ecommerce-photography-mistakes',
    isoDate: '2026-01-30T00:00:00Z',
    date: { en: 'January 30, 2026', it: '30 gennaio 2026' },
    tag: { en: 'Tips', it: 'Consigli' },
    readTime: '4 min',
    title: {
      en: '5 common mistakes in e-commerce product photography (and how to fix them automatically)',
      it: '5 errori comuni nella fotografia prodotto e-commerce (e come correggerli automaticamente)',
    },
    excerpt: {
      en: "Inconsistent backgrounds, poor centering, wrong aspect ratios, these small errors cost conversions. Learn how automated processing eliminates them at scale.",
      it: "Sfondi inconsistenti, centraggio impreciso, rapporti d'aspetto errati, questi piccoli errori costano conversioni. Scopri come il processing automatico li elimina su larga scala.",
    },
    body: {
      en: [
        "Product photography mistakes are often subtle, but they compound. A shopper scrolling through a category page notices inconsistency before they consciously register it. Here are the five most common errors and how to fix them.",
        "**1. Inconsistent backgrounds**\nSome images have a warm white background, others are cool white or light grey. On a marketplace, this makes your catalog look unprofessional. Fix: always define a single exact background color (e.g., #FFFFFF) and apply it uniformly with Centyr.",
        "**2. Off-center subjects**\nManual cropping introduces subtle misalignment, the product leans left, sits too low, or doesn't fill the frame. Fix: Centyr detects the subject bounding box and centers it precisely, with configurable padding.",
        "**3. Wrong aspect ratios per channel**\nAmazon prefers square (1:1), Shopify collections look best at 4:5, Instagram requires 1:1 or 4:5. Exporting one format for all channels degrades quality. Fix: create one preset per channel in Centyr and process each batch multiple times.",
        "**4. Shadows and reflections**\nHard floor shadows or surface reflections are often overlooked in manual editing. Fix: background removal eliminates the surface the product is resting on, including shadows, giving you a clean floating product image.",
        "**5. Inconsistent scale between products**\nA small accessory photographed to fill the frame looks the same size as a large bag, misleading customers. Fix: use Centyr's fill percentage setting consistently (e.g., 80% for all products) so relative size feels proportional.",
      ],
      it: [
        "Gli errori nella fotografia prodotto sono spesso sottili, ma si accumulano. Un acquirente che scorre una pagina categoria nota l'inconsistenza prima di registrarla consapevolmente. Ecco i cinque errori più comuni e come correggerli.",
        "**1. Sfondi inconsistenti**\nAlcune immagini hanno uno sfondo bianco caldo, altre bianco freddo o grigio chiaro. Su un marketplace, questo rende il tuo catalogo poco professionale. Soluzione: definisci sempre un singolo colore di sfondo esatto (es. #FFFFFF) e applicalo uniformemente con Centyr.",
        "**2. Soggetti non centrati**\nIl ritaglio manuale introduce disallineamenti sottili, il prodotto è spostato a sinistra, troppo in basso, o non riempie il frame. Soluzione: Centyr rileva il bounding box del soggetto e lo centra con precisione, con padding configurabile.",
        "**3. Rapporti d'aspetto errati per canale**\nAmazon preferisce il quadrato (1:1), le collezioni Shopify stanno meglio a 4:5, Instagram richiede 1:1 o 4:5. Esportare un solo formato per tutti i canali degrada la qualità. Soluzione: crea un preset per canale in Centyr ed elabora ogni batch più volte.",
        "**4. Ombre e riflessi**\nLe ombre dure sul pavimento o i riflessi sulla superficie vengono spesso trascurati nel editing manuale. Soluzione: la rimozione dello sfondo elimina la superficie su cui poggia il prodotto, incluse le ombre, restituendo un'immagine del prodotto pulita e flottante.",
        "**5. Scala inconsistente tra prodotti**\nUn piccolo accessorio fotografato a riempire il frame sembra della stessa dimensione di una borsa grande, ingannando i clienti. Soluzione: usa la percentuale di riempimento di Centyr in modo coerente (es. 80% per tutti i prodotti) così la dimensione relativa risulta proporzionale.",
      ],
    },
  },
]
