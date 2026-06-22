import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    if (!fs.existsSync(dbPath)) {
        console.error("db.json not found");
        return;
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    console.log("🚀 Starting migration...");

    // 1. Migrate Company Settings
    if (data.company) {
        console.log("Migrating company settings...");
        const { error } = await supabase
            .from('company_settings')
            .upsert({
                id: 1,
                ...data.company
            });
        if (error) console.error("Error company_settings:", error.message);
    }

    // 2. Migrate Articles
    if (data.articles && data.articles.length > 0) {
        console.log(`Migrating ${data.articles.length} articles...`);
        // Ensure ID is valid or remove it to let Supabase generate one if it's not a UUID
        // But our frontend expects current IDs for now.
        const { error } = await supabase
            .from('articles')
            .upsert(data.articles);
        if (error) console.error("Error articles:", error.message);
    }

    // 3. Migrate Contacts
    if (data.contacts && data.contacts.length > 0) {
        console.log(`Migrating ${data.contacts.length} contacts...`);
        const { error } = await supabase
            .from('contacts')
            .upsert(data.contacts);
        if (error) console.error("Error contacts:", error.message);
    }

    console.log("✅ Migration finished!");
}

migrate();
