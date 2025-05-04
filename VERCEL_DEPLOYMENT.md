# Vercel Deployment Guide for Harshit Yadav's Portfolio

This guide provides simple, sequential steps to deploy your portfolio website to Vercel without any issues.

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub
2. Push your entire codebase to this repository

## Step 2: Deploy to Vercel (Web Interface Method)

1. Go to [vercel.com](https://vercel.com/) and sign up/login with GitHub
2. Click "Add New Project"
3. Import the GitHub repository you just created
4. Vercel will detect your project settings automatically
5. In the "Environment Variables" section, add these exact values:
   - `WEB3FORMS_API_KEY` = `384d8768-c52f-4a1c-89f1-db67130a68c8`
   - `SITE_URL` = `your-vercel-domain.vercel.app` (update this after deployment)
6. Click "Deploy"

## Step 3: Update Site URL (After Initial Deployment)

After your first deployment, Vercel will assign a domain like `your-project.vercel.app`:

1. Copy this domain
2. Go to your project settings in Vercel
3. Navigate to "Environment Variables"
4. Update `SITE_URL` with your actual Vercel domain
5. Click "Save" and redeploy

## Step 4: Set Up Custom Domain (Optional)

If you have your own domain:

1. In your project dashboard, go to "Settings" > "Domains"
2. Add your domain (e.g., harshityadav.com)
3. Follow Vercel's instructions to verify and configure DNS settings
4. Update the `SITE_URL` environment variable to match your custom domain

## Troubleshooting

If your deployment fails:

1. Check the Vercel build logs for specific errors
2. Verify that all environment variables are set correctly
3. Make sure your `vercel.json` configuration is correct
4. If the contact form doesn't work, check the Web3Forms integration

## Important Notes

The portfolio is set up with:
- React frontend with interactive animations
- Express.js backend for the contact form API
- Web3Forms integration for the contact form
- Environment variables for configuration