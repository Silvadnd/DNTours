# Railway Deployment Setup Guide

## Environment Variables Configuration

To fix the "Missing Supabase configuration" error, you need to add environment variables in Railway:

### Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Project Settings** → **API**
4. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)
   - **Service Role Key** (starts with `eyJ...`) - Keep this secret!

### Step 2: Add Environment Variables in Railway

1. Go to your [Railway Dashboard](https://railway.app/dashboard)
2. Select your DN Tours project
3. Click on **Variables** tab
4. Add these three variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...your-anon-key
SUPABASE_SERVICE_ROLE_KEY = eyJhbGci...your-service-role-key
```

### Step 3: Redeploy

After adding the variables, Railway will automatically redeploy your application.

## Additional Configuration

### Supabase Storage Buckets

Make sure you have created the following storage buckets in Supabase:

1. **memories** - for memory photos/videos
2. **vibe-videos** - for vibe video content

To create buckets:
1. Go to **Storage** in Supabase Dashboard
2. Click **Create Bucket**
3. Set bucket to **Public** if you want direct access
4. Configure RLS policies if needed

### Database Tables

Ensure your database tables are created using the schema in `supabase/schema.sql`

## Troubleshooting

If you still see errors:

1. **Check Variable Names**: Ensure they match exactly (case-sensitive)
2. **No Quotes**: Don't wrap values in quotes in Railway
3. **Redeploy**: After adding variables, trigger a new deployment
4. **Logs**: Check Railway logs for detailed error messages
5. **CORS**: Ensure your Railway domain is added to Supabase's allowed domains

### View Logs in Railway

```bash
# In Railway dashboard, go to:
Deployments → Latest Deployment → View Logs
```

## Local Development

For local development, create a `.env.local` file (not tracked by git):

```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Then run:
```bash
npm run dev
```
