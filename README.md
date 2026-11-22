# StoreManagement

Inventory and document management for a small retail business: one Laravel API, one Next.js dashboard.

## What it does

- Sign-in for staff, with a token-guarded API.
- Stores, inventory items and documents as REST resources, so the dashboard and any future client share one contract.
- A small back-office UI: list views with filters, a modal-based entry form, and custom views per section.

## Layout

| Path | What is in it |
|---|---|
| `backend/` | Laravel application. `routes/api.php` exposes `POST /login`, `GET /stores`, and `apiResource` endpoints for `inventory` and `documents`. Controllers live in `app/Http/Controllers`, schema in `database/migrations`. |
| `frontend/` | Next.js 15 app router dashboard (React 19, TypeScript). Reusable `Listing`, `NewEntry`, `Modal`, `CardListing` and `CustomView` components; API access in `src/inventory.ts`, types in `interfaces.tsx`. |

## Stack

Laravel (PHP), MySQL, Next.js 15, React 19, TypeScript, Tailwind CSS 4, Biome, Vite.

## Running it

```bash
# backend
cd backend
composer install
cp .env.example .env        # set DB credentials
php artisan key:generate
php artisan migrate
php artisan serve

# frontend
cd frontend
npm install
npm run dev                 # http://localhost:3000
```

No credentials or `.env` files are committed; `backend/.env.example` shows the shape of the configuration.
