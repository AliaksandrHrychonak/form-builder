# Form Builder

## Development Status

Currently in active development. The core functionality is implemented and working.

## Features

- Advanced form template search and filtering system
- Flexible sorting options (by creation date, popularity, updates)
- Tag support for template categorization
- Role-based access system (public, user, administrative)
- Template commenting functionality
- Template sharing capabilities
- Detailed metadata system
- Infinite scroll for template listing
- Persistent user filters
- Elastic search across various fields with weighted importance

## Technical Details

- Frontend:
    - React 19.1.0 with TypeScript 5.8.3
    - Tanstack Query for server state management
    - Zustand for local state management
    - Tailwind CSS for styling
    - ElasticSearch integration for search functionality
    - Next.js for server-side rendering

## Data Fields

Form templates include the following core fields:

- title: template name
- description: template description
- topic: subject area
- owner: owner information (first name, last name, email)
- sharedUsers: list of users with access
- tags: tags with name, description, and color
- questions: form questions (title, description)
- comments: template comments
- createdAt: creation date
- updatedAt: last update date
- popularityScore: popularity

## Getting Started

1. Clone the repository
2. Install dependencies with pnpm
3. Run the development server

## Available Commands

```bash
# Development
pnpm start:dev      # Run with Turbopack
pnpm start          # Start production server
pnpm start:build    # Build with increased memory

# Code Quality
pnpm format         # Format all files
pnpm lint          # Check TypeScript files
pnpm lint:fix      # Fix TypeScript files
pnpm stylelint     # Check styles
pnpm stylelint:fix # Fix styles

# FSD Architecture
pnpm fsd:check    # Check FSD structure
pnpm fsd:watch    # Watch FSD changes
pnpm fsd:cruise   # Generate dependencies graph

# Other
pnpm prepare      # Setup husky
```

## Architecture

The project follows Feature-Sliced Design (FSD) methodology:

- `app` - Application initialization logic
- `pages` - Page components
- `widgets` - Independent and reusable feature blocks
- `features` - User interactions
- `entities` - Business logic
- `shared` - Reusable components and utils

## Libraries and Tools

- **TanStack Table**: Powers the virtual table functionality with infinite scroll
- **TanStack Virtual**: Handles virtualization for efficient large dataset rendering
- **TanStack Infinite**: Implements infinite scrolling capabilities
- **Radix UI**: Provides accessible, unstyled UI components for building the interface
- **Zustand**: Lightweight state management solution
- **Zod**: Type-safe schema validation
- **React Hook Form**: Form handling and validation
- **TanStack Query**: Data synchronization and caching
- **Axios**: HTTP client for API requests
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable component system built on Radix UI
- **date-fns**: Modern date utility library

These libraries ensure:

- Optimal performance with virtualization and infinite scrolling
- Type-safe development environment
- Accessible and responsive UI components
- Efficient state management and data caching
- Robust form handling and validation
- Consistent styling and theming
- Seamless API integration

## Important Notes

1. **Project Structure**:
    - Feature-Sliced Design (FSD) architecture
    - Modular organization with shared, entities, features, and widgets layers
    - Clear separation of concerns between components

2. **Development Guidelines**:
    - Follow TypeScript strict mode guidelines
    - Use component composition patterns
    - Implement proper error boundaries
    - Maintain consistent code style with ESLint and Prettier

3. **Performance Considerations**:
    - Utilize code splitting and lazy loading
    - Implement proper memoization where needed
    - Follow React best practices for preventing unnecessary rerenders
    - Optimize bundle size through proper import statements

4. **Accessibility**:
    - All components must meet WCAG 2.1 guidelines
    - Ensure keyboard navigation support
    - Maintain proper ARIA attributes
    - Test with screen readers

