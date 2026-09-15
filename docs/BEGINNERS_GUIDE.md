# Beginner's Guide: Understanding the EArovers Architecture

Welcome to the EArovers project! If you are new to modern web development or haven't used the specific tools in our stack before, this document is for you. 

We’ve built this project using a "modern stack" that might seem complex at first, but every tool was chosen to solve a specific problem. By the end of this guide, you’ll understand what each tool does, why we use it, and how they all connect together.

---

## 1. The Big Picture: How Our App Works

When a user visits our website, a few different services work together behind the scenes:
1. **Next.js (React)**: The framework that builds the user interface (what the user sees) and handles server requests.
2. **Supabase**: Our remote database host (stores our data).
3. **Prisma**: The translator that helps Next.js talk to Supabase easily.
4. **Cloudinary**: A specialized storage service for holding our images and videos.
5. **Upstash Redis**: A high-speed memory cache used to protect our site from spam (rate limiting).

Let's break down each one.

### Visual Architecture Diagram

```text
+---------------------+
| User's Web Browser  |
+---------------------+
         | 1. Visits Website
         v
+-------------------------------------------------+
| Next.js Server (Vercel)                         |
|                                                 |
|  2. Rate Limit Check       3. Data Request      |
|  +---------------+         +--------------+     |
|  | Upstash Redis |         |  Prisma ORM  |     |
|  +---------------+         +--------------+     |
+-------------------------------------------------+
                                     |
                                     | 4. SQL Queries
                                     v
+-------------------------------------------------+
| Remote Databases & Storage                      |
|                                                 |
|  +----------------------+  +-----------------+  |
|  | Supabase (Postgres)  |  |   Cloudinary    |  |
|  +----------------------+  +-----------------+  |
+-------------------------------------------------+
         ^                            ^
         |                            |
         +----------------------------+
            5. Downloads Images directly
```

---

## 2. The Database: Supabase + Prisma

### What is Supabase?
Normally, if you want a database, you have to rent a server, install a database system like PostgreSQL, configure security, and maintain it. **Supabase** does all of this for us in the cloud. It provides us with a hosted PostgreSQL database and built-in user authentication (login/signup). 
- *Think of it as:* A giant, secure, cloud-based Excel spreadsheet where all our user and clan data lives.

### What is Prisma?
Databases speak a language called SQL (Structured Query Language). Writing raw SQL inside JavaScript code can be messy and error-prone. **Prisma** is an Object-Relational Mapper (ORM). It reads a single file (`prisma/schema.prisma`) that defines what our data looks like, and then it generates simple JavaScript functions so we can interact with the database without writing SQL.
- *Think of it as:* A universal translator. We write simple JavaScript (`prisma.member.findMany()`), and Prisma translates it into complex SQL to fetch data from Supabase.

**How they connect:** Next.js uses Prisma to ask Supabase for data. Supabase sends the data back, and Next.js displays it on the screen.

**Resources to learn:**
- [Prisma in 100 Seconds (Video)](https://www.youtube.com/watch?v=E7VJos7xEcg)
- [Prisma Quickstart Guide](https://www.prisma.io/docs/getting-started)
- [Supabase Crash Course](https://www.youtube.com/watch?v=7uKQBl9uZ00)

---

## 3. Media Storage: Cloudinary

### What is Cloudinary?
You might wonder: *"If we have a Supabase database, why don't we just save our images there?"*
Databases are great for text and numbers, but they are terrible at storing heavy files like images and videos. It makes the database bloated, slow, and expensive. 

**Cloudinary** is a cloud service designed specifically for hosting images. When a user uploads a photo, it goes directly to Cloudinary. Cloudinary then gives us a simple URL (link) to that image. 

**How it connects to Prisma:**
We take the URL that Cloudinary gives us and save *just the URL string* in our Supabase database using Prisma (in the `Media` model). When the website loads, it reads the URL from the database and tells the browser to fetch the actual image from Cloudinary.

**Resources to learn:**
- [Cloudinary Fundamentals](https://cloudinary.com/documentation/cloudinary_get_started_tutorial)

---

## 4. Speed & Security: Caching and Redis

If 1,000 users visit our site at the exact same time, asking the database for information 1,000 times will crash the database or cost us a lot of money. We solve this using two caching techniques:

### Next.js ISR (Incremental Static Regeneration)
Instead of asking the database for data every single time a user opens a page (like `/shields` or `/fame`), Next.js asks the database *once*, builds the HTML page, and saves it. For the next 60 seconds, anyone who visits gets the saved (cached) page instantly. After 60 seconds, Next.js will quietly ask the database for updates in the background.
- *Why we use it:* It makes the website incredibly fast and keeps our database bills at zero.

### Upstash Redis (Rate Limiting)
**Redis** is a database that stores data in RAM (memory) instead of a hard drive, making it lightning fast. We use a serverless version of it called **Upstash**.
We use Redis inside our Next.js Middleware (`src/proxy.ts`) to count how many times a user refreshes the page or tries to log in. If they try too many times in a row, Redis blocks them.
- *Why we use it:* It protects our app from hackers trying to brute-force passwords or bots trying to crash our site (DDoS attacks).

**Resources to learn:**
- [Next.js Data Fetching & Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [What is Redis?](https://redis.io/docs/about/)

---

## 5. The Complete Flow: How a Request Works

Let's look at what happens when a user navigates to the `/shields` page:

1. **The Request:** The user clicks the "Shields" button.
2. **The Cache Check (Next.js ISR):** Next.js checks if it has a saved version of the `/shields` page from the last 60 seconds. 
   - If *yes*, it sends it to the user instantly.
   - If *no*, it moves to step 3.
3. **The Database Query (Prisma):** Next.js runs `prisma.shield.findMany()` in a Server Component.
4. **The Database (Supabase):** Prisma connects to Supabase, executes the SQL, and gets the list of shields.
5. **The Media:** The database returns the text data, including the image URLs (which are hosted on Cloudinary).
6. **The Render:** Next.js builds the page with this data and sends it to the user.

---

## 6. Folder Structure & UI Separation

If you open the project in your code editor, you'll see a lot of folders. Here is exactly what the most important ones do:

```text
EArovers/
├── prisma/             # The schema.prisma file lives here. It defines our database models.
├── public/             # Static assets like fonts, icons, and placeholder images.
├── docs/               # Documentation files (like the one you're reading now!).
└── src/
    ├── app/            # Next.js Routing (Pages)
    ├── components/     # UI Building Blocks
    └── lib/            # Helper functions and utilities
```

### Routing (`src/app/`)
Next.js uses **file-system routing**. Every folder inside `src/app/` that has a `page.tsx` file inside it automatically becomes a URL on our website.
- `src/app/admin/`: All the secure admin dashboard pages.
- `src/app/(public)/`: The client-facing public pages (like `/events`, `/hierarchy`, `/shields`). The `(public)` folder is in parentheses, meaning it groups things together logically but doesn't show up in the actual URL.
- `src/app/api/`: Hidden endpoints for cron jobs or external tools.

### UI Components (`src/components/`)
This is where the actual visual code lives. We keep our UI highly organized and modular.
- `src/components/ui/`: Contains primitive, reusable components like `<Button>`, `<Input>`, and `<Card>`. These are mostly auto-generated by a tool called **shadcn/ui**.
- **Feature Folders:** The rest of the components are grouped by their feature, such as `src/components/home/`, `src/components/layout/`, or `src/components/gallery/`.

### 📱 How We Separate Mobile and Desktop UI
One of our biggest architectural rules is **Decoupling Mobile and Desktop**. 
Instead of writing one massive, complicated component that tries to look good on both phones and laptops using a million CSS media queries, we separate them physically.

For example, on the Home Page, you will find:
1. `DesktopHome.tsx`: A component built specifically for wide laptop screens.
2. `MobileHome.tsx`: A component built specifically for touch-screens and phones.

Our main `page.tsx` simply looks at the screen size and renders the correct component. This makes the code **much easier to read, test, and edit** without accidentally breaking the mobile view while fixing the desktop view!

---

## 7. How to Safely Edit Data (Without Breaking Things)

If you are writing code for this project, here is the golden rule: **Don't hardcode data.** All data must live in the database.

However, **you must not modify `prisma/schema.prisma` (the database structure) without explicit permission** from the lead developers. Altering the schema can corrupt the database for everyone if not done carefully.

If the structure you need already exists (e.g., you just want to add a new Member, Shield, or Event), the safest way to do this is using **Prisma Studio**. It prevents you from saving invalid data.

### Step-by-Step Guide to Adding/Editing Data:
1. **Start Prisma Studio:** Open your terminal in the project folder and run:
   ```bash
   npx prisma studio
   ```
2. **Open the Interface:** It will automatically open a browser tab (usually `http://localhost:5555`). This is a safe, spreadsheet-like view of our live database.
3. **Select your Table:** Click on the table you want to edit (e.g., `Member`, `Shield`, `Event`).
4. **Add or Edit Data:**
   - **To Edit:** Double-click any cell and type your changes.
   - **To Add:** Click the **"Add Record"** button at the top and fill in the required fields.
   - **Important for Images:** If you are adding a photo, do NOT upload the image file to the database. You must upload the image to **Cloudinary** first, and then paste the URL string into Prisma Studio.
5. **Save Changes:** Click the green **"Save Changes"** button at the top.

### Need a completely new type of data?
If you are building a feature that requires a brand-new database table, you must request permission first. Once approved, a lead developer will update the `prisma/schema.prisma` file and sync it with Supabase. 

---

## 8. A Deep Dive into Images (Cloudinary + Database)

Images are the heaviest part of any website. Because we want EArovers to load blazingly fast, we **never** store actual image files (like `.jpg` or `.png`) directly inside the Supabase database. Instead, the database only stores *directions* on where to find the image.

### How Images are Connected to the Database
When you look at our `Media` table (or any table with an image like `Shield.imageUrl`), you will notice the field is just a standard text string. It expects a URL link (e.g., `https://res.cloudinary.com/.../my-image.jpg`). 

When Next.js builds the page, it reads that text URL from the database and inserts it into a standard `<Image src="..." />` component. The user's browser then downloads the image directly from Cloudinary.

### Exactly What to Do When You Want to Add an Image:
If you need to add a new image (for example, a photo of a new Scout Shield) to the database, you must act as the bridge between Cloudinary and Prisma:

1. **Prepare the Image:** Make sure your image is named properly (e.g., `golden-shield.png`).
2. **Upload to Cloudinary:**
   - Log into our EArovers Cloudinary account dashboard.
   - Go to the **"Media Library"** and click **"Upload"**.
   - Drag and drop your image file into the dashboard.
3. **Copy the URL:**
   - Once uploaded, hover over the image in Cloudinary and click the **"Copy URL"** or **"Copy Link"** icon. 
   - You should now have a link in your clipboard that looks like: `https://res.cloudinary.com/.../image/upload/v1234/golden-shield.png`
4. **Paste into the Database (Prisma Studio):**
   - Open Prisma Studio (`npx prisma studio` in your terminal).
   - Find the record you want to attach the image to (e.g., creating a new `Shield`).
   - Paste the Cloudinary URL you just copied straight into the `imageUrl` field (or whichever field asks for the image link).
   - Click **Save Changes**.

That's it! Your new image is safely hosted on Cloudinary, perfectly linked in our Database, and ready to be displayed on the website!

---

For practical coding examples on how to write Next.js code to fetch and display this data, read the [`docs/DEVELOPER_GUIDE.md`](./DEVELOPER_GUIDE.md) file!
