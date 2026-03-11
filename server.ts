import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase body size limit for base64 images
  app.use(express.json({ limit: '10mb' }));

  // Image proxy to fix CORS/Tainted Canvas issues
  app.get("/api/proxy-image", async (req, res) => {
    const imageUrl = req.query.url as string;
    if (!imageUrl) {
      return res.status(400).send("URL is required");
    }

    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const contentType = response.headers['content-type'];
      res.setHeader('Content-Type', contentType || 'image/jpeg');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(response.data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).send("Failed to fetch image");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
