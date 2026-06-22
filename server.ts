import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { dbService } from './server-db';

const app = express();
const PORT = process.env.PORT || 3000;
const KIVU_NAME = "Kivu Ceramic";

// Middleware for parsing JSON
app.use(express.json());

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Authentication validation helper
const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentification requise pour l'administration." });
  }
  const token = authHeader.split(' ')[1];
  if (token === 'kivu-admin-authenticated-token-2026') {
    next();
  } else {
    res.status(403).json({ error: "Token d'administration invalide ou expiré." });
  }
};

// 1. Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { passkey } = req.body;
  const correctPasskey = process.env.ADMIN_PASSKEY || 'kivu2026';

  if (passkey === correctPasskey) {
    res.json({
      success: true,
      token: 'kivu-admin-authenticated-token-2026',
      message: "Authentification réussie !"
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Code d'accès incorrect. Essayez avec 'kivu2026' ou configurez ADMIN_PASSKEY."
    });
  }
});

// 2. Articles (Blog)
app.get('/api/articles', (req, res) => {
  try {
    const articles = dbService.getArticles();
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/articles/:id', (req, res) => {
  try {
    const article = dbService.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article non trouvé." });
    res.json(article);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/articles', requireAdminAuth, (req, res) => {
  try {
    const { title, content, summary, image, category, author, tags } = req.body;
    if (!title || !content || !summary) {
      return res.status(400).json({ error: "Les champs Titre, Résumé et Contenu sont requis." });
    }
    const newArticle = dbService.createArticle({
      title,
      content,
      summary,
      image: image || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
      category: category || "Céramique",
      author: author || "Admin " + KIVU_NAME,
      tags: tags || [],
      date: new Date().toISOString().split('T')[0]
    });
    res.status(201).json(newArticle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/articles/:id', requireAdminAuth, (req, res) => {
  try {
    const updated = dbService.updateArticle(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Article non trouvé." });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/articles/:id', requireAdminAuth, (req, res) => {
  try {
    const success = dbService.deleteArticle(req.params.id);
    if (!success) return res.status(404).json({ error: "Article non trouvé." });
    res.json({ success: true, message: "Article supprimé avec succès." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Contacts / Messagerie
app.post('/api/contacts', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Tous les champs (nom, email, sujet, message) sont obligatoires." });
    }
    const newContact = dbService.createContact({ name, email, subject, message });
    res.status(201).json({ success: true, contact: newContact });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contacts', requireAdminAuth, (req, res) => {
  try {
    const contacts = dbService.getContacts();
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/contacts/:id/status', requireAdminAuth, (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: "Statut invalide. Doit être 'unread', 'read' ou 'replied'." });
    }
    const updated = dbService.updateContactStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: "Message non trouvé." });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/contacts/:id', requireAdminAuth, (req, res) => {
  try {
    const success = dbService.deleteContact(req.params.id);
    if (!success) return res.status(404).json({ error: "Message non trouvé." });
    res.json({ success: true, message: "Sujet supprimé de l'historique." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Company Info
app.get('/api/company', (req, res) => {
  try {
    const company = dbService.getCompany();
    res.json(company);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/company', requireAdminAuth, (req, res) => {
  try {
    const company = dbService.updateCompany(req.body);
    res.json(company);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Global Admin Stats
app.get('/api/stats', requireAdminAuth, (req, res) => {
  try {
    const articles = dbService.getArticles();
    const contacts = dbService.getContacts();
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const unreadContacts = contacts.filter(c => c.status === 'unread').length;
    res.json({
      totalArticles: articles.length,
      totalContacts: contacts.length,
      unreadContacts,
      totalViews
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// VITE & STATIC SERVING INTEGRATION
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // Don't serve index.html for API routes
      if (req.path.startsWith('/api')) return;
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only listen if not running on Vercel
  if (!process.env.VERCEL) {
    const port = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;
    app.listen(port, '0.0.0.0', () => {
      console.log(`[Kivu Ceramic App] Server listening at http://0.0.0.0:${port}`);
    });
  }
}

// Handle execution
if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
  });
}

// Export for Vercel
export default app;
