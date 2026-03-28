# Clean Up Sikkim Frontend

This is a Next.js 14 project using TypeScript, Tailwind CSS, and shadcn/ui for the frontend of the Clean Up Sikkim initiative.

## Features

- Next.js 14 (App Router)
- Tailwind CSS for styling
- shadcn/ui for modern, customizable UI components
- Redux Toolkit for state management
- TypeScript for type safety

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure

- `app/` — Next.js app directory
- `components/` — UI and shared components (shadcn/ui components inside `components/ui/`)
- `store/` — Redux Toolkit store and slices
- `lib/` — Utility functions
- `public/` — Static assets

## Customization

- Theme and color variables are defined in `app/globals.css`.
- Add shadcn/ui components as needed using the CLI:
  ```sh
  npx shadcn@latest add <component>
  ```

## License

MIT
