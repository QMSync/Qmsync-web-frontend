# QMSync Frontend

Quality Management System - Web Application

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Icons**: Lucide React

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Production API URL
4. Deploy

### Manual Deployment

```bash
npm run build
```

Deploy `.next` folder with `node_modules` to hosting.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Login (root)
│   ├── playground/           # Dev playground
│   ├── adminapp/             # Admin module
│   ├── procedures/           # Procedures/SOPs
│   ├── training/             # Training module
│   ├── equipment/            # Equipment module
│   ├── goods/                # Goods module
│   ├── doc-tools/            # Document tools
│   └── qa/                   # QA module
```

## Modules

- **Admin**: User management, departments
- **Procedures/SOPs**: Document management with annexures
- **Training**: Training records and tracking
- **Equipment**: Equipment management
- **Goods**: Goods management
- **QA**: Quality assurance tools

## API Integration

Backend: Django REST Framework
- Base URL: `NEXT_PUBLIC_API_URL`
- Authentication: Session-based (cookies)

## Scripts

- `npm run dev`: Development server
- `npm run build`: Production build
- `npm start`: Start production server
- `npm run lint`: Run ESLint
