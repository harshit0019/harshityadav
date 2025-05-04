# Deploying to Vercel

This document provides instructions for deploying your portfolio website to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account (you can sign up with your GitHub account)
- Your code pushed to a GitHub repository

## Deployment Steps

1. **Push your code to GitHub**
   - Create a new repository on GitHub
   - Push this project to your repository

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Add New Project"
   - Select your repository from the list
   - Vercel will automatically detect the project settings

3. **Configure Environment Variables**
   - In the project setup screen, add the environment variable from `.env.example`:
     - Key: `WEB3FORMS_API_KEY`
     - Value: `384d8768-c52f-4a1c-89f1-db67130a68c8`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your project
   - Once complete, you'll get a URL for your site

5. **Custom Domain (Optional)**
   - In your project dashboard, go to "Settings" > "Domains"
   - Add your custom domain and follow the instructions

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel for specific errors
2. Ensure all environment variables are correctly set
3. For contact form issues, verify the Web3Forms API key is valid

## Important Notes

- The contact form uses Web3Forms for submission which requires the API key
- The portfolio uses client-side rendering for the interactive animations
- The `vercel.json` configuration handles the routing for both frontend and backend