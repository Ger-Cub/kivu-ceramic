const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const products = [
    {
        id: "prod-01",
        name: "Tasse Kahuzi-Biega",
        category: "table",
        description: "Mug artisanal rustique tourné à la main, recouvert d’un émail volcanique satiné noir et ocre inspiré du parc national. Idéal pour votre café matinal.",
        price: "15.000 FC / 8 $",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Hauteur 9cm, Ø 8.5cm",
        is_popular: true
    },
    {
        id: "prod-02",
        name: "Assiette plate \"Terroir de Kabare\"",
        category: "table",
        description: "Assiette large avec un contour brut texturé, préservant la teinte sauvage et ocre de l’argile naturelle. Émail blanc crème mat sur la surface utile.",
        price: "28.000 FC / 12 $",
        image: "https://images.unsplash.com/photo-1590451430585-64c1f1446937?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Ø 24cm",
        is_popular: true
    },
    {
        id: "prod-03",
        name: "Vase Amphore Volcan Mat",
        category: "decor",
        description: "Vase sculptural façonné à la plaque avec des anses géométriques. Texture extérieure rugueuse rappelant le basalte, intérieur imperméabilisé.",
        price: "70.000 FC / 30 $",
        image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Hauteur 28cm, Largeur max 16cm",
        is_popular: false
    },
    {
        id: "prod-04",
        name: "Bol à Ramen \"Kivu Teal\"",
        category: "table",
        description: "Grand bol robuste avec repose-baguettes moulé. Vernis intérieur bleu-vert canard scintillant rappelant les eaux profondes du lac Kivu.",
        price: "35.000 FC / 15 $",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Hauteur 11cm, Ø 18cm",
        is_popular: false
    },
    {
        id: "prod-05",
        name: "Pot à Bonsaï Souche Charnue",
        category: "decor",
        description: "Coupe large et basse percée à l’égout, modelée avec des rainures reproduisant l’écorce des grands arbres de la forêt équatoriale.",
        price: "45.000 FC / 19 $",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Ø 20cm, Hauteur 7cm",
        is_popular: false
    },
    {
        id: "prod-06",
        name: "Service à Thé Complet \"Goma\" pour 4",
        category: "table",
        description: "Comprend 1 théière hermétique munie d’un filtre intégré et d’une poignée en rotin, assortie de 4 tasses cylindriques élégantes sans anses.",
        price: "180.000 FC / 75 $",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
        origin: "Bukavu (Kadutu)",
        dimensions: "Théière 750ml, Tasses 150ml",
        is_popular: false
    },
    {
        id: "prod-07",
        name: "Ensemble de tasses pour Cafés & Restos",
        category: "custom",
        description: "Service personnalisé d’espresso ou de cappuccino pour bars, coffee shops et hôtels. Choix d’email, estampage de votre logo d’entreprise.",
        price: "Sur devis (Tarif dégressif)",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Volumétries ajustables de 80ml à 350ml",
        is_popular: true
    },
    {
        id: "prod-08",
        name: "Jarres Décoratives de Sol d’Hôtel",
        category: "custom",
        description: "Jarre monumentale de décoration d’intérieur d’un demi-mètre de haut, modelée au boudin par les aînés formateurs de l’atelier.",
        price: "Sur Devis uniquement",
        image: "https://images.unsplash.com/photo-1614362945762-3740268291f4?auto=format&fit=crop&q=80&w=600",
        origin: "Bukavu (Kadutu)",
        dimensions: "Hauteur 55cm, Ø 32cm",
        is_popular: false
    }
];

async function seed() {
    console.log('Seeding products via REST API...');

    const restUrl = `${supabaseUrl}/rest/v1/products`;

    for (const product of products) {
        try {
            const response = await fetch(`${restUrl}?id=eq.${product.id}`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error seeding product ${product.name}: ${response.status} ${errorText}`);
            } else {
                console.log(`Product ${product.name} seeded.`);
            }
        } catch (err) {
            console.error(`Fetch error for ${product.name}:`, err.message);
        }
    }
    console.log('Done!');
}

seed();
