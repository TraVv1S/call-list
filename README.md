# Call List Application

This is a [Next.js](https://nextjs.org) project that implements a call list management system.

## Features

- Display call list with date range selection
- Filter calls by type (incoming, outgoing, or all calls)
- Play call recordings (if available)
- Sort calls by date and duration via API
- Random rating display (not implemented in API)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Main application code
- `components/` - Reusable React components
- `styles/` - Global styles and CSS modules
- `public/` - Static assets

## Deployment

The project is deployed on Vercel. You can deploy your own version using the [Vercel Platform](https://vercel.com/new).

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
