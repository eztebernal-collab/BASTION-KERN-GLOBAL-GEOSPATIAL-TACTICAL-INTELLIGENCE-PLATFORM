import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Octokit } from "octokit";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API Route to generate the GitHub OAuth URL
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    
    if (!clientId) {
      return res.status(500).json({ error: "GITHUB_CLIENT_ID is not configured" });
    }

    const redirectUri = `${req.protocol}://${req.get("host")}/auth/callback`;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "repo user", 
    });

    res.json({ url: `https://github.com/login/oauth/authorize?${params}` });
  });

  // Callback Route
  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    const { code } = req.query;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage(
                  { type: 'OAUTH_AUTH_ERROR', error: 'GitHub OAuth is not fully configured on the server. Please provide GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.' }, 
                  '*'
                );
                window.close();
              }
            </script>
            <p>GitHub OAuth is not fully configured on the server.</p>
          </body>
        </html>
      `);
      return;
    }

    try {
      // Exchange code for token
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      // Store this in a more secure way in a real app
      // For this example, we pass it back to the client via postMessage
      
      if (tokenData.access_token) {
        res.send(`
          <html>
            <body>
              <script>
                if (window.opener) {
                  window.opener.postMessage(
                    { type: 'OAUTH_AUTH_SUCCESS', token: '${tokenData.access_token}' }, 
                    '*'
                  );
                  window.close();
                } else {
                  window.location.href = '/';
                }
              </script>
              <p>Authentication successful. This window should close automatically.</p>
            </body>
          </html>
        `);
      } else {
        res.send(`
          <html>
            <body>
              <script>
                if (window.opener) {
                  window.opener.postMessage(
                    { type: 'OAUTH_AUTH_ERROR', error: '${tokenData.error_description || tokenData.error || 'Unknown error'}' }, 
                    '*'
                  );
                  window.close();
                }
              </script>
              <p>Authentication failed: ${tokenData.error_description || tokenData.error}</p>
            </body>
          </html>
        `);
      }
    } catch (error) {
      res.status(500).send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage(
                  { type: 'OAUTH_AUTH_ERROR', error: 'Internal Server Error during GitHub OAuth callback.' }, 
                  '*'
                );
                window.close();
              }
            </script>
            <p>Internal Server Error during GitHub OAuth callback.</p>
          </body>
        </html>
      `);
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
