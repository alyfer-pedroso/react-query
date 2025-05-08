# Tag Management Dashboard

A modern React application demonstrating state management with TanStack React Query and URL-based pagination with React Router's useSearchParams hook.

![Screenshot of the Tag Management Dashboard](https://github.com/alyfer-pedroso/react-query/blob/production/src/assets/screencapture.png)

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack React Query](https://tanstack.com/query/latest)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Mock API**: [JSON Server](https://github.com/typicode/json-server)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Features

- **Data Fetching**: Efficient data fetching with React Query
- **Pagination**: URL-based pagination for shareable and bookmarkable pages
- **Loading States**: Optimistic UI updates with loading indicators
- **Cached Data**: Data caching for improved performance
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern UI**: Clean, accessible UI components with shadcn/ui

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/alyfer-pedroso/react-query.git
cd react-query
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

### Running the Application

This application requires both the frontend dev server and the JSON server (mock API) to be running simultaneously.

1. Start the JSON server (mock API)
```bash
npm run server
```
This will start the JSON server on http://localhost:3333

2. In a new terminal, start the frontend application
```bash
npm run dev
```
This will start the Vite dev server on http://localhost:5000

3. Open your browser and visit http://localhost:5000

## Project Structure

```
react-query/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── pagination.tsx # Pagination component
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── server.json          # Mock database for JSON Server
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## How it Works

### State Management with React Query

The application uses TanStack React Query for data fetching and state management:

```typescript
const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
  queryKey: ["get-tags", page],
  queryFn: async () => {
    const res = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10`);
    const data = await res.json();
    return data;
  },
  placeholderData: keepPreviousData,
});
```

The `keepPreviousData` option prevents UI flickering when changing pages by keeping the previous data displayed until new data arrives.

### URL-based Pagination

The application uses `useSearchParams` from React Router DOM to manage pagination state in the URL:

```typescript
const [searchParams] = useSearchParams();
const page = searchParams.get("page") ? Number(searchParams.get("page") || 1) : 1;
```

This approach allows for:
- Bookmarkable and shareable pages
- Browser navigation support (back/forward)
- Persistence of page state on refresh

The `Pagination` component manipulates the URL search parameters to navigate between pages:

```typescript
function nextPage() {
  if (page >= pages) {
    return;
  }

  setSearchParams((params) => {
    params.set("page", String(page + 1));
    return params;
  });
}
```

## Available Scripts

- `npm run dev`: Start the Vite development server
- `npm run server`: Start the JSON Server mock API
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build locally

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /tags`: Get all tags
- `GET /tags?_page=1&_per_page=10`: Get paginated tags

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [TanStack React Query](https://tanstack.com/query/latest) for the data fetching library
- [React Router](https://reactrouter.com/) for routing
- [JSON Server](https://github.com/typicode/json-server) for the mock API
