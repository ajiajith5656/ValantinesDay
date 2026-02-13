# 🗄️ Supabase Backend Setup Guide

Complete guide to set up Supabase as the backend for your Valentine's Day app.

---

## Step 1: Create Supabase Project

1. Go to **[supabase.com](https://supabase.com/)** and sign up (free tier available)
2. Click **"New Project"**
3. Enter project name: `valentine-app`
4. Set a database password (save it!)
5. Choose a region close to you
6. Click **"Create new project"** and wait ~2 minutes

---

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Paste this SQL and click **"Run"**:

```sql
-- Create the valentine_responses table
CREATE TABLE valentine_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  care_comfort TEXT,
  feel_loved TEXT,
  love_rating TEXT,
  fav_thing TEXT,
  improve TEXT,
  habit_change TEXT,
  first_reaction TEXT,
  promise_happy TEXT,
  marry_me TEXT,
  selfie_url TEXT,
  photo_for_me_url TEXT,
  advice TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE valentine_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (so the form can submit without login)
CREATE POLICY "Allow anonymous inserts"
  ON valentine_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can SELECT (so only you can read responses)
CREATE POLICY "Allow authenticated reads"
  ON valentine_responses
  FOR SELECT
  TO authenticated
  USING (true);
```

You should see ✅ "Success" after running.

---

## Step 3: Create Storage Bucket for Photos

1. Go to **Storage** in the left sidebar
2. Click **"New bucket"**
3. Name: `valentine-photos`
4. **Toggle ON** "Public bucket" (so uploaded images can be viewed)
5. Click **"Create bucket"**

### Set Storage Policy

1. Click on the `valentine-photos` bucket
2. Go to **Policies** tab
3. Click **"New policy"** → **"For full customization"**
4. Or go to **SQL Editor** and run:

```sql
-- Allow anyone to upload images
CREATE POLICY "Allow public uploads"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'valentine-photos');

-- Allow anyone to view images
CREATE POLICY "Allow public viewing"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'valentine-photos');
```

---

## Step 4: Get Your Credentials

1. Go to **Settings** → **API** in the left sidebar
2. Copy these two values:

| Field | Where to find it |
|-------|-----------------|
| **Project URL** | Under "Project URL" |
| **anon public key** | Under "Project API keys" → `anon` `public` |

---

## Step 5: Configure Your App

### Option A: Create `.env` file (for local development)

Create a file named `.env` in your project root:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key-here
```

### Option B: Add to AWS Amplify (for deployment)

In the Amplify console → **Environment variables**, add:
- `VITE_SUPABASE_URL` = your project URL
- `VITE_SUPABASE_ANON_KEY` = your anon key

---

## Step 6: Test Locally

```bash
npm run dev
```

1. Open the site
2. Click "Yes"
3. Fill out all 12 questions
4. Upload photos
5. Click "Submit"
6. Check your Supabase dashboard → **Table Editor** → `valentine_responses`

You should see the response row with all answers and image URLs! 🎉

---

## 📊 Viewing Responses

### From Supabase Dashboard
1. Go to **Table Editor** → `valentine_responses`
2. All responses appear as rows
3. Click image URLs to view uploaded photos

### Viewing Uploaded Photos
1. Go to **Storage** → `valentine-photos` → `uploads/`
2. All photos are stored with timestamps

---

## 🔒 Security Notes

- **anon key** is safe to use in frontend — it has limited permissions
- Only INSERT is allowed without login (people can submit but can't read others' data)
- To read responses, log into the Supabase dashboard
- Photos are stored in a public bucket (accessible via URL)
- Consider enabling **rate limiting** via Supabase settings for production

---

## 🆓 Supabase Free Tier Limits

| Resource | Free Limit |
|----------|-----------|
| Database | 500 MB |
| Storage | 1 GB |
| Bandwidth | 2 GB |
| API Requests | Unlimited |
| Projects | 2 |

More than enough for a Valentine's app! 💝

---

## 🛠️ Troubleshooting

### "Permission denied" error
→ Make sure you ran the RLS policies in Step 2 and Step 3

### "Bucket not found" error
→ Make sure the bucket is named exactly `valentine-photos`

### Images not showing
→ Ensure the bucket is set to **Public**

### No data appearing in table
→ Check browser console for errors
→ Verify `.env` values are correct (no extra spaces)
→ Make sure you restarted `npm run dev` after creating `.env`

---

## 📎 Quick Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

---

**🎉 Your Valentine's app now has a real backend — text answers in the database, photos in storage!**
