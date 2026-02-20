# Global Supply Chain Contracts Database - Project Structure

## Overview
This is a production-ready enterprise web application for managing contract lifecycle workflows in the supply chain domain.

## Architecture

### Directory Structure

```
/src
├── /app
│   ├── App.tsx                     # Main application component
│   ├── /components                 # Reusable UI components
│   │   ├── /dashboard              # Dashboard-specific components
│   │   │   ├── DashboardView.tsx   # Main dashboard view
│   │   │   └── index.ts            # Barrel export
│   │   ├── /stepper                # Stepper workflow components
│   │   │   ├── StepperFormView.tsx # Stepper form container
│   │   │   ├── StepContent.tsx     # Step content renderer
│   │   │   ├── StepNavigation.tsx  # Navigation controls
│   │   │   └── index.ts            # Barrel export
│   │   ├── /steps                  # Individual step components
│   │   │   ├── CMODetails.tsx
│   │   │   ├── StatusUpdate.tsx
│   │   │   └── ...                 # 13 step components
│   │   ├── GileadHeader.tsx        # Application header
│   │   ├── SecondaryActionBar.tsx  # Secondary navigation
│   │   ├── VerticalStepper.tsx     # Stepper UI component
│   │   └── FormTable.tsx           # Reusable table component
│   ├── /config                     # Configuration files
│   │   └── tableColumns.tsx        # Table column definitions
│   ├── /constants                  # Application constants
│   │   └── index.ts                # Brand colors, configs, workflow steps
│   ├── /hooks                      # Custom React hooks
│   │   ├── useContracts.ts         # Contract state management
│   │   ├── useStepNavigation.ts    # Stepper navigation logic
│   │   └── index.ts                # Barrel export
│   ├── /types                      # TypeScript type definitions
│   │   └── index.ts                # Core type definitions
│   ├── /utils                      # Utility functions
│   │   ├── progressUtils.ts        # Progress calculation utilities
│   │   └── index.ts                # Barrel export
│   └── /theme                      # Theme configuration
│       └── antd-theme.ts           # Ant Design theme
├── /data
│   └── contracts.json              # Mock contract data
└── /styles                         # Global styles
    └── theme.css                   # CSS theme variables
```

## Key Design Patterns

### 1. **Custom Hooks**
- `useContracts`: Manages contract state and CRUD operations
- `useStepNavigation`: Handles multi-step form navigation and data

### 2. **Component Composition**
- Separated views (Dashboard, StepperForm)
- Isolated business logic from presentation
- Reusable components with clear responsibilities

### 3. **Type Safety**
- Centralized type definitions in `/types`
- Strict TypeScript typing throughout
- Proper interface definitions for all props

### 4. **Configuration Management**
- Constants extracted to `/constants`
- Theme configuration in `/theme`
- Table columns in `/config`

### 5. **Utilities**
- Pure functions for reusable logic
- Progress calculation and formatting
- Color utilities based on business rules

## Performance Optimizations

1. **React.memo**: All view components memoized to prevent unnecessary re-renders
2. **useCallback**: Callback functions memoized in custom hooks
3. **Code Splitting**: Components organized for potential lazy loading
4. **Optimized Re-renders**: State management designed to minimize updates

## Data Flow

```
App.tsx (State Container)
    ↓
Custom Hooks (Business Logic)
    ↓
View Components (Dashboard/Stepper)
    ↓
Presentational Components (Tables/Forms)
```

## Scalability Considerations

### Adding New Features
1. **New Step**: Add component in `/components/steps`, update `WORKFLOW_STEPS` constant
2. **New View**: Create in `/components/[view-name]`, add route handling in App.tsx
3. **New Hook**: Add to `/hooks` with proper TypeScript types
4. **New Utility**: Add to `/utils` as pure function

### State Management
- Currently using React hooks
- Can easily migrate to Redux/Zustand if needed
- State structure supports external state management

### API Integration
- `useContracts` hook designed for easy API integration
- Replace mock data with API calls
- Add error handling and loading states

## Code Quality

### Standards
- **ESLint**: Enforces code quality rules
- **TypeScript**: Strict mode enabled
- **Naming Conventions**: Clear, descriptive names
- **Comments**: JSDoc style for functions and components

### Best Practices
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Separation of Concerns
- Immutable State Updates
- Proper Error Boundaries (to be added)

## Testing Strategy (Future)

```
/src
├── /app
│   ├── __tests__
│   │   ├── App.test.tsx
│   │   ├── /hooks
│   │   │   ├── useContracts.test.ts
│   │   │   └── useStepNavigation.test.ts
│   │   └── /utils
│   │       └── progressUtils.test.ts
```

## Environment Variables (Future)

```env
VITE_API_BASE_URL=
VITE_AUTH_ENDPOINT=
VITE_FEATURE_FLAGS=
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Error boundaries added
- [ ] Loading states implemented
- [ ] Authentication integrated
- [ ] Analytics tracking added
- [ ] Performance monitoring setup
- [ ] Security headers configured
- [ ] CORS policies set
- [ ] Rate limiting implemented

## Maintenance

### Regular Tasks
- Update dependencies quarterly
- Review and refactor as codebase grows
- Monitor performance metrics
- Update documentation

### Version Control
- Feature branches for new development
- Pull request reviews required
- Semantic versioning for releases
