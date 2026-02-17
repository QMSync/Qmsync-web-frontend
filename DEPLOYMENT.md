# Deployment Guide

## Vercel Deployment

### Initial Setup

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import `qmsync-web-frontend` repository
   - Framework: Next.js (auto-detected)

3. **Environment Variables**
   
   Add in Vercel dashboard (Settings → Environment Variables):
   
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   NEXT_PUBLIC_APP_NAME=QMSync
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Subsequent Deployments

Automatic deployment on every push to `main` branch.

### Manual Redeploy

Vercel dashboard → Deployments → Click "Redeploy"

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://api.qmsync.com` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `QMSync` |

## Build Configuration

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 20.x

## Troubleshooting

### Build Fails

1. Check environment variables are set
2. Verify `package.json` dependencies
3. Check build logs in Vercel dashboard

### Old Code Deployed

1. Verify correct repository connected
2. Check latest commit is in GitHub
3. Trigger manual redeploy
4. Clear Vercel cache: Settings → General → Clear Cache

### 404 Errors

- Ensure `output: 'standalone'` in `next.config.ts`
- Check route files exist in `src/app/`

## Production Checklist

- [ ] Environment variables configured
- [ ] API URL points to production backend
- [ ] CORS configured on backend for frontend domain
- [ ] Test all routes after deployment
- [ ] Verify authentication flow works
