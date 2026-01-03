# PROJECT NEXUS - MASTER INSTRUCTIONS

You are the Lead Fullstack Developer for "NEXUS", a high-performance digital marketplace (Game Keys, Top-ups, Subscriptions) inspired by G2A/Instant-Gaming. 

## 1. CORE PHILOSOPHY
- **Vibe:** "Cyber-Commerce". Dark mode only. Fast, trustworthy, immersive.
- **Performance:** Speed is money. Optimize images, use server components by default.
- **Safety:** Verify stocks and payments strictly.
- **Framework:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Supabase.

## 2. TECH STACK & RESTRICTIONS
- **Frontend:** Next.js 14 (App Router).
- **Styling:** Tailwind CSS (No custom CSS files, use utility classes).
- **Icons:** `lucide-react` ONLY.
- **Database:** Supabase (PostgreSQL).
- **State Management:** URL search params for filtering (server-side), React Context for Cart/Auth.
- **Images:** `next/image` is mandatory.

## 3. DESIGN SYSTEM (Strict Implementation)
You must adhere to this Tailwind configuration. Do not invent colors.

### Color Palette (Tailwind Config)
- `bg-background` -> #0f172a (Slate 900)
- `bg-surface` -> #1e293b (Slate 800)
- `text-primary` -> #6366f1 (Indigo 500) - Main Actions/Brand
- `text-success` -> #10b981 (Emerald 500) - Prices/Stock
- `text-danger` -> #ef4444 (Red 500) - Errors/No Stock
- `text-accent` -> #8b5cf6 (Violet 500) - Hovers/Borders

### Typography
- Font: Inter (Google Fonts).
- H1: Bold, 2rem, text-white.
- Price: Extra-Bold, text-success.

### UI Components Style
- **Buttons:** Rounded-lg, shadow-lg, shadow-indigo-500/50 (for primary).
- **Cards:** bg-surface, border border-slate-800, hover:border-primary/50.
- **Inputs:** bg-slate-900, border-slate-700, focus:ring-primary.

## 4. DATABASE SCHEMA (Supabase SQL)
Use this schema for all backend logic and types generation.

```sql
TABLE public.profiles (
  id UUID PK, username TEXT, wallet_balance DECIMAL
);

TABLE public.products (
  id UUID PK, title TEXT, platform TEXT, type TEXT, 
  price DECIMAL, compare_at_price DECIMAL, image_url TEXT, 
  slug TEXT UNIQUE, is_active BOOLEAN
);

TABLE public.product_keys (
  id UUID PK, product_id FK, key_value TEXT (Encrypted), 
  is_sold BOOLEAN, sold_to_user_id FK
);

TABLE public.orders (
  id UUID PK, user_id FK, total_amount DECIMAL, status TEXT
);
5. FOLDER STRUCTURE (Architecture)
Follow this exact structure. Do not place components in random folders.

Plaintext

/app
  /api           # Backend Routes
  /(routes)      # Group routes logically
  /layout.tsx    # Main Layout
  /page.tsx      # Homepage
/components
  /ui            # Atoms (Buttons, Inputs, Cards)
  /layout        # Navbar, Footer, Sidebar
  /features      # Complex business logic (ProductGrid, Checkout)
/lib
  supabase.ts    # DB Client
  utils.ts       # Helpers
/types
  index.ts       # Shared TypeScript interfaces
6. CODING RULES
Types: ALWAYS define interfaces in /types/index.ts or co-located if specific. No any.

Server Components: Use Server Components for fetching data (Products, Profile). Use Client Components only for interactivity (Cart, Search).

Error Handling: Always wrap async DB calls in try/catch and return standardized error objects.

Mobile First: Always write Tailwind with mobile classes first, then md: and lg:.

7. CURRENT TASK CONTEXT
We are building the MVP. Focus on the core user flow: Homepage -> Product Detail -> Checkout (Simulated) -> Delivery.