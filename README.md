# ShowUp DC

**Find volunteer opportunities in Washington, DC.**

A modern, mobile-first website connecting DC residents with local nonprofits and volunteer opportunities. Built with React + Vite.

---

## How to go live (step by step)

You need three free accounts: **GitHub**, **Vercel**, and **Google Analytics**. You already have your domain on Namecheap. Here's exactly what to do:

### Step 1: Create a GitHub account (if you don't have one)

1. Go to [github.com](https://github.com) and sign up (free)
2. Once logged in, click the **+** button in the top right → **New repository**
3. Name it `showup-dc`
4. Keep it set to **Public**
5. Click **Create repository**
6. You'll see a page with instructions — on that page, click **"uploading an existing file"**
7. Drag and drop ALL the files and folders from this project into the upload area
8. Click **Commit changes**

### Step 2: Deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and click **Sign Up** → **Continue with GitHub**
2. It will ask to connect your GitHub account — allow it
3. You'll see your `showup-dc` repository listed — click **Import**
4. Don't change any settings — just click **Deploy**
5. Wait about 60 seconds. You'll see a "Congratulations!" screen with a preview of your site
6. Your site is now live at a temporary URL like `showup-dc.vercel.app`

### Step 3: Connect your Namecheap domain

1. In Vercel, go to your project → **Settings** → **Domains**
2. Type in your domain (e.g., `showupdc.com`) and click **Add**
3. Vercel will show you DNS records to add. You'll typically see:
   - **A Record**: Host = `@`, Value = `76.76.21.21`
   - **CNAME Record**: Host = `www`, Value = `cname.vercel-dns.com`
4. Now go to [Namecheap](https://www.namecheap.com) → **Domain List** → click **Manage** next to your domain
5. Go to the **Advanced DNS** tab
6. **Delete** any existing records (the default parking page ones)
7. Click **Add New Record** and add the two records Vercel gave you
8. Wait 5–30 minutes for DNS to update
9. Go back to Vercel — it should now show a green checkmark next to your domain. SSL (the lock icon) is automatic.

**Your site is now live at your domain!**

### Step 4: Set up Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Start measuring** → create an account (name it "ShowUp DC")
3. Create a property (also name it "ShowUp DC")
4. Choose **Web** as the platform
5. Enter your domain URL
6. You'll get a **Measurement ID** that looks like `G-ABC123XYZ`
7. In your project, open `index.html` and find the two places that say `G-XXXXXXXXXX`
8. Replace both with your real Measurement ID
9. Commit the change on GitHub — Vercel will automatically redeploy

---

## How to update volunteer listings

All listings live in one file: `src/App.jsx`

Open that file and scroll to the top. You'll see a big array called `LISTINGS` that looks like this:

```js
{
  id: 1,
  org: "Capital Area Food Bank",
  title: "Warehouse Food Sorting & Packing",
  cause: "Food Insecurity",
  neighborhood: "Northeast",
  commitment: "One-time",
  days: ["Saturday"],
  description: "Help sort and pack...",
  url: "https://volunteer.capitalareafoodbank.org/",
},
```

To **add** a new listing: copy one of the existing blocks, paste it at the end (before the `];`), change the `id` to the next number, and fill in the details.

To **edit** a listing: find it and change the text.

To **remove** a listing: delete the entire block from `{` to `},`

**Valid options for each field:**
- `cause`: Food Insecurity, Education, Environment, Housing, Mentorship, Animals, Elderly Care, Health
- `neighborhood`: Northwest, Northeast, Southeast, Southwest, Capitol Hill, Adams Morgan
- `commitment`: One-time, Weekly, Monthly
- `days`: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

After making changes, commit them on GitHub. Vercel will automatically redeploy your site within about 60 seconds.

---

## Questions?

If something isn't working, the most common issues are:
- **DNS not propagated yet** — just wait up to 30 minutes
- **Vercel build failed** — check that you didn't accidentally delete a comma or bracket when editing listings
- **Analytics not showing data** — it can take 24-48 hours for the first data to appear
