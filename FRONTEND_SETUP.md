# Frontend Setup Guide

This guide will help you set up the React + TypeScript frontend for the Graduate Tracer System.

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed ([Download Node.js](https://nodejs.org/))
- npm (comes with Node.js)

Check your installation:
```bash
node --version
npm --version
```

## Step 1: Create React App with Vite

Navigate to the project root and create the frontend:

```bash
cd c:\xampp\htdocs\gts
npm create vite@latest frontend -- --template react-ts
```

## Step 2: Install Dependencies

Navigate to the frontend directory and install core dependencies:

```bash
cd frontend
npm install
```

## Step 3: Install Additional Dependencies

Install required packages:

```bash
npm install react-router-dom axios @tanstack/react-query react-hook-form @hookform/resolvers zod lucide-react recharts date-fns
```

Install development dependencies:

```bash
npm install -D @types/node
```

## Step 4: Setup ShadcnUI

Initialize ShadcnUI:

```bash
npx shadcn-ui@latest init
```

When prompted, use these settings:
- Would you like to use TypeScript? **Yes**
- Which style would you like to use? **Default**
- Which color would you like to use as base color? **Slate**
- Where is your global CSS file? **src/index.css**
- Would you like to use CSS variables for colors? **Yes**
- Where is your tailwind.config.js located? **tailwind.config.js**
- Configure the import alias for components: **@/components**
- Configure the import alias for utils: **@/lib/utils**

## Step 5: Install ShadcnUI Components

Install the necessary UI components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add alert
```

## Step 6: Update vite.config.ts

Update your `vite.config.ts` to include path aliases:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

## Step 7: Update tsconfig.json

Add path mapping to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Step 8: Create Environment File

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api
```

## Step 9: Update package.json Scripts

Ensure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

## Step 10: Create Project Structure

Create the following directory structure in `src/`:

```
src/
├── components/
│   ├── ui/              # ShadcnUI components (auto-generated)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   └── RecentActivity.tsx
│   ├── graduates/
│   │   ├── GraduateTable.tsx
│   │   ├── GraduateForm.tsx
│   │   └── GraduateDetails.tsx
│   ├── surveys/
│   │   ├── SurveyList.tsx
│   │   ├── SurveyForm.tsx
│   │   └── SurveyBuilder.tsx
│   ├── employment/
│   │   ├── EmploymentForm.tsx
│   │   └── EmploymentHistory.tsx
│   └── analytics/
│       ├── EmploymentChart.tsx
│       ├── SalaryChart.tsx
│       └── IndustryChart.tsx
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── Dashboard.tsx
│   ├── Graduates.tsx
│   ├── GraduateProfile.tsx
│   ├── Surveys.tsx
│   ├── SurveyDetails.tsx
│   ├── Analytics.tsx
│   └── Settings.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useGraduates.ts
│   ├── useSurveys.ts
│   └── useAnalytics.ts
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── graduate.service.ts
│   ├── survey.service.ts
│   └── analytics.service.ts
├── types/
│   ├── auth.types.ts
│   ├── graduate.types.ts
│   ├── survey.types.ts
│   └── analytics.types.ts
├── contexts/
│   └── AuthContext.tsx
├── utils/
│   ├── formatters.ts
│   └── validators.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Step 11: Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, you can specify a different port:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors
Ensure all dependencies are installed:
```bash
npm install
```

### TypeScript Errors
Clear cache and restart:
```bash
rm -rf node_modules
npm install
```

### API Connection Issues
- Ensure the Laravel backend is running on `http://localhost:8000`
- Check the `.env` file has the correct `VITE_API_URL`
- Verify CORS is configured in Laravel

## Next Steps

After setup is complete:
1. Implement authentication flow
2. Create dashboard components
3. Build graduate management interface
4. Develop survey system
5. Create analytics visualizations

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [ShadcnUI Documentation](https://ui.shadcn.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/)
