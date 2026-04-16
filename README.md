---
title: Archinova AI
emoji: 🏗️
colorFrom: green
colorTo: blue
sdk: docker
app_port: 3000
---

# 🏗️ ArchiNova AI

ArchiNova AI is a modern architecture mentorship platform for Class 12 students. It provides AI-driven advice on B.Arch, NATA, JEE Paper 2, and career paths in architecture.

## 🚀 Deployment

### Netlify (Recommended)

This project is optimized for Netlify using Serverless Functions.

1.  **Push to GitHub**: Push your changes to a GitHub repository.
2.  **Connect to Netlify**:
    - Go to [Netlify](https://app.netlify.com/).
    - Click **"Add new site"** -> **"Import an existing project"**.
    - Select your GitHub repository.
    - Netlify will automatically detect the `netlify.toml` file.
3.  **Configure Environment Variables**:
    - In the Netlify Dashboard, go to **Site settings** > **Environment variables**.
    - Add `GEMINI_API_KEY` (or `HUGGINGFACE_API_KEY`).
4.  **Deploy**: Click **Deploy site**.

### Local Development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.