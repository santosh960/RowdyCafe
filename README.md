# Rowdy Cafe Karve Nagar

A responsive cafe landing page built with React, Vite, Tailwind CSS, and Lucide icons.

## Run locally

Use Node.js 20.19 or newer (or 22.12 or newer).

```sh
npm install
npm run dev
```

To create and preview a production build:

```sh
npm run build
npm run preview
```

## Supabase live menu and admin

The menu has 25 horizontally scrollable category tabs and 125 products transcribed from the supplied menu screenshots. It reads live items from Supabase when available and includes a protected Menu Admin. Without live menu rows, the supplied menu data is shown.

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql), then [`supabase/menu_seed.sql`](supabase/menu_seed.sql), in its SQL Editor. The seed imports the menu items and prices supplied in the screenshots and can be run again without adding duplicate rows.
2. Copy `.env.example` to `.env` and fill in the Project URL and anon/publishable key from **Project Settings → API**.
3. In Supabase Authentication, create the admin user manually. Do not enable public sign-up for the site.
4. Grant that user the `admin` role in SQL Editor, replacing the UUID with the user's Auth UUID:

   ```sql
   insert into public.user_roles (user_id, role)
   values ('REPLACE-WITH-AUTH-USER-UUID', 'admin')
   on conflict (user_id) do update set role = excluded.role;
   ```

5. Restart Vite after changing `.env`, then open **Menu Admin** on the menu section and sign in.

Only the anon/publishable key belongs in the browser. Never place a `service_role` key in `.env` with a `VITE_` prefix or in frontend code. Supabase row-level security enforces admin access; the UI is not the security boundary. Menu items are stored in `public.menu_items`. The enquiry form is still a preview and does not save or send messages.

The attached starter ZIP contains setup guidance as project documentation; the project-specific integration here follows its Supabase schema and access model while retaining this site's existing layout.

## Before publishing

- Confirm the provided phone number, address, ₹200–₹400 price range, and closing time.
- Verify the 5.0 rating and 63-review count before presenting them as a current Google rating.
- Confirm menu dishes, availability, and prices against the cafe’s current menu before publishing. The displayed products and prices were transcribed from the supplied screenshots.
- Replace illustrative Unsplash food and interior images with approved cafe photographs if available. Current image captions disclose that the photos do not depict the cafe or its actual dishes.
- The contact form validates required fields in the browser but does not send or store messages. Connect it to a real backend before enabling message delivery.
- The Google Maps search and map embed use the supplied business name and address. Confirm the listing resolves to the correct place before publishing it as the official listing.

The LocalBusiness structured data includes only the supplied name, contact, address, and price-range information. It intentionally omits unverified opening hours and aggregate ratings.
# RowdyCafe
