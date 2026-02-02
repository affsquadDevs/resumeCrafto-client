# ResumeCraftor

A modern, powerful platform for creating professional resumes, portfolios, and documents with an intuitive drag-and-drop editor. Built for professionals who demand premium quality and seamless user experience.

## Tech Stack

- **[Next.js](https://nextjs.org/)** 16 (App Router)
- **TypeScript** 5
- **Tailwind CSS** 4
- **Framer Motion** - Animations
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **Zustand** - State Management
- **@dnd-kit** - Drag-and-drop functionality

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB Connection String
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/resume-craftor"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Page Structure

- **`/`** - Dashboard (Home page)
- **`/editor`** - Main resume editor with drag-and-drop functionality
- **`/templates`** - Template gallery
- **`/settings`** - User settings and profile management
- **`/about`** - About page
- **`/blog`** - Blog articles
- **`/contact`** - Contact page
- **`/how-it-works`** - Product walkthrough
- **`/privacy-policy`** - Privacy policy
- **`/terms-of-service`** - Terms of service

## File Locations

- **Favicon**: `src/app/favicon.ico` and `public/favicon.ico`
- **OG Image**: `public/og/og-image.png`
- **Robots**: `public/robots.txt`
- **Sitemap**: `src/app/sitemap.ts` (generated dynamically)
- **Ads.txt**: `public/ads.txt`

## Features

- ✨ Intuitive drag-and-drop editor
- 🎨 Dynamic, professional templates
- 📱 Fully responsive design
- 🔒 Secure authentication system
- 💾 Save and manage multiple designs
- 📄 High-quality PDF export
- ⚡ Real-time preview and editing
- 🎯 SEO-optimized pages

## License

© 2026 ResumeCraftor. All rights reserved.
