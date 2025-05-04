# Foolproof Vercel Deployment Guide

This guide provides the exact steps to deploy your portfolio website to Vercel without any issues. Follow these steps in order.

## Step 1: Prepare Your GitHub Repository

1. Create a new repository on GitHub
2. Open a terminal and run these commands to push your code:

```bash
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account
3. Authorize Vercel to access your repositories

## Step 3: Import Your Project

1. From the Vercel dashboard, click the "Add New..." button → "Project"
2. Select the GitHub repository you just created
3. Vercel will automatically detect it as a Node.js project

## Step 4: Configure the Build Settings

Vercel should automatically detect most settings, but verify these configurations:

1. In the "Build and Output Settings" section:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`

2. Add these Environment Variables:
   - `WEB3FORMS_API_KEY`: `384d8768-c52f-4a1c-89f1-db67130a68c8`
   - `SITE_URL`: Leave blank for now (we'll update after deployment)

3. Click "Deploy"

## Step 5: Update the Site URL

After the initial deployment completes:

1. Copy your deployment URL (e.g., `your-project.vercel.app`)
2. Go to your project settings → Environment Variables
3. Add or update the `SITE_URL` variable with your full deployment URL
4. Click "Save" and Vercel will trigger a redeployment

## Step 6: Test Your Site

1. Once redeployment completes, open your site URL
2. Verify that all pages load correctly
3. Test the contact form by sending a test message

## Optional: Connect a Custom Domain

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Enter your domain name and follow Vercel's instructions
3. Update the `SITE_URL` environment variable with your custom domain
4. Click "Save" and Vercel will redeploy your site

## Troubleshooting

If your site doesn't deploy correctly:

1. Check the build logs in Vercel for specific errors
2. Verify that all environment variables are set correctly
3. Make sure your `vercel.json` file is in the root directory
4. If the contact form doesn't work, check the API routes configuration

## Support

If you need additional help, consult Vercel's documentation at https://vercel.com/docs