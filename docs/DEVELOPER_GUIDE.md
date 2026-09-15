# Developer Guide: Building with Prisma & Supabase

Welcome to the EArovers codebase! We have recently migrated from a purely static, hardcoded architecture to a dynamic, database-driven architecture using **Next.js (App Router)**, **Prisma**, and **Supabase (PostgreSQL)**.

This guide will teach you how to build new features properly in this new architecture, avoiding the old pattern of hardcoding data into `.ts` files.

---

## 🚫 The Old Way: Hardcoded Data (DO NOT DO THIS)

Previously, all site data was stored statically in files like `src/data/clanData.ts`. 

```tsx
// OLD WAY - DO NOT DO THIS
const shieldsData = [
  { id: 1, name: "Scout Shield", ... }
];

export function OldShieldsPage() {
  return <div>{shieldsData.map(shield => <Card key={shield.id} data={shield} />)}</div>
}
```

**Why we moved away from this:**
- Hard to update without a developer.
- Causes massive Git conflicts.
- Requires redeploying the whole site just to fix a typo.
- Bloats the JavaScript bundle sent to the user's phone.

---

## ✅ The New Way: Prisma & Next.js Server Components

Our new architecture fetches data securely on the server and caches it at the edge using Next.js Incremental Static Regeneration (ISR).

### 1. The Database Schema (`prisma/schema.prisma`)
Before writing any UI code, check `prisma/schema.prisma`. 
All data models (like `Member`, `Shield`, `Event`, `Media`) live here. If you need a new type of data, you must add it to the schema, run `npx prisma db push`, and manage it in the database.

### 2. Fetching Data in Server Components
When creating a new page (e.g., `src/app/(public)/my-feature/page.tsx`), **always fetch data on the server**.

```tsx
// 1. Mark your component as async
import prisma from "@/lib/prisma";

export default async function MyFeaturePage() {
  // 2. Fetch the data directly from the database using Prisma!
  const myData = await prisma.shield.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="container">
      {/* Render the data directly */}
      {myData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### 3. Edge Caching & Performance (ISR)
Because database queries can be slow, we tell Next.js to cache the result at the Edge for 60 seconds. Add this to the top of any public page that fetches from Prisma:

```tsx
export const revalidate = 60; // Cache this page for 60 seconds
```

### 4. Interactive UIs (Client Components)
Server Components cannot use `useState`, `onClick`, or `useEffect`. 
If your page needs interactive elements (like image galleries, modal popups, or tabs), you must **split your code**.

1. Create the `page.tsx` (Server Component) to fetch the data.
2. Create a `FeatureClient.tsx` (Client Component) to handle the interactions.
3. Pass the fetched data from the Server Component down to the Client Component as props.

**Example Client Component (`FeatureClient.tsx`):**
```tsx
"use client"; // This is required for interactivity!

import { useState } from "react";
import { Shield } from "@prisma/client"; // Import the Prisma type!

export function FeatureClient({ initialData }: { initialData: Shield[] }) {
  const [activeTab, setActiveTab] = useState(initialData[0].id);

  return (
    <button onClick={() => setActiveTab(initialData[1].id)}>
      Switch Tab
    </button>
  );
}
```

**Example Server Component (`page.tsx`):**
```tsx
import prisma from "@/lib/prisma";
import { FeatureClient } from "./FeatureClient";

export const revalidate = 60;

export default async function Page() {
  const data = await prisma.shield.findMany();
  
  // Pass the raw data to the Client Component
  return <FeatureClient initialData={data} />;
}
```

---

## 🛠️ Summary Rules
1. **No new hardcoded data files.** Use Supabase (Prisma) to store data.
2. **Fetch on the Server.** Use `await prisma.model.findMany()` in your `page.tsx`.
3. **Use `"use client"` only when necessary.** Keep the heavy lifting on the server, and only make components client-side if they need state or event listeners.
4. **Use ISR for public pages.** Add `export const revalidate = 60;` to prevent spamming the database.
5. **Admin Edits.** If data needs to change, build a form in the `/admin` dashboard that uses Next.js Server Actions to `await prisma.model.update()`.
