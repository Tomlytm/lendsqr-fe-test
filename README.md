# Lendsqr Frontend Engineer Assessment

This project is a comprehensive solution to the Lendsqr Frontend Engineer Assessment V2, featuring a React application built with TypeScript and SCSS that implements modern best practices, comprehensive testing, and high-quality code standards.

## Project Overview

The application implements a full-featured user management dashboard with the following pages:
- **Login Page** - Authentication with form validation
- **Dashboard** - User statistics and filterable data table
- **User Details Page** - Comprehensive user information display

## Key Features & Improvements

### Core Features
- **Data Management**: Fetches data from mock API with 500+ user records
- **Local Storage**: Persistent user details storage and retrieval
- **Responsive Design**: Fully mobile-responsive across all screen sizes
- **Visual Fidelity**: Pixel-perfect implementation matching Figma designs
- **Error Handling**: Comprehensive error boundaries and user feedback

### Code Quality Improvements
- **Architecture**: Clean component structure with separation of concerns
- **TypeScript**: Strong typing throughout with custom interfaces and types
- **Reusable Components**: Modular `UserStatus` component for consistent UI
- **Performance**: Optimized rendering with proper React patterns
- **Accessibility**: ARIA labels and semantic HTML structure

### Testing Implementation
- **Unit Tests**: 2,400+ lines of comprehensive test coverage
- **Positive Scenarios**: Happy path testing for all core functionality
- **Negative Scenarios**: Error handling, edge cases, and boundary testing
- **Integration Tests**: Component interaction and data flow testing
- **Mock Strategy**: Proper API mocking and test isolation

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | ^18.0.0 |
| **TypeScript** | Type Safety | ^4.9.0 |
| **SCSS** | Styling & Theming | Latest |
| **React Router** | Client-side Routing | ^6.0.0 |
| **React Query** | Data Fetching & Caching | ^4.0.0 |
| **React Bootstrap** | UI Components | ^2.0.0 |
| **Jest** | Testing Framework | ^27.0.0 |
| **React Testing Library** | Component Testing | ^13.0.0 |

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard/        # Dashboard-specific components
│   ├── Filter/           # Filter form components
│   ├── UserStatus/       # Status indicator component
│   └── TopBar/           # Navigation component
├── services/            # API and data management
│   ├── api/             # HTTP client and routes
│   ├── hooks/           # Custom React hooks
│   └── helper.ts        # Utility functions
├── types/               # TypeScript interfaces
├── styles/              # Global SCSS styles
└── __tests__/          # Test files
```

## Testing Strategy

### Test Coverage Areas
1. **API Services** (`services/api/index.test.ts`)
   - HTTP methods (GET, POST, PUT, DELETE)
   - Error handling and network failures
   - Request/response transformation

2. **Custom Hooks** (`services/hooks/user-manager/index.test.ts`)
   - Data fetching with React Query
   - Loading states and error handling
   - Cache management

3. **Components** (Multiple test files)
   - User interaction scenarios
   - Props validation and rendering
   - State management and side effects

4. **Utilities** (`services/helper.test.ts`)
   - LocalStorage operations
   - Data transformation functions
   - Edge cases and error conditions

### Test Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watchAll
```

## Architecture Decisions

### Component Design
- **Single Responsibility**: Each component has a clear, focused purpose
- **Composition over Inheritance**: Flexible component composition
- **Props Interface**: Strong typing for component contracts

### State Management
- **React Query**: Server state management with caching
- **Local State**: Component-level state with React hooks
- **Context**: Minimal use, only for truly global state

### Error Handling Strategy
- **API Level**: Centralized error handling in HTTP client
- **Component Level**: Error boundaries and fallback UI
- **User Feedback**: Clear error messages and recovery options

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd lendsqr-assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (port 3000) |
| `npm test` | Run test suite |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript compiler check |

## Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Mobile Features
- Collapsible navigation
- Card-based user display
- Touch-optimized interactions
- Optimized typography scaling

## Component Documentation

### UserStatus Component
Reusable status indicator with consistent styling:
```typescript
interface UserStatusProps {
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}
```

### FilterForm Component
Advanced filtering with multiple criteria:
- Organization selection
- Text-based search (username, email, phone)
- Date range filtering
- Status filtering

## Performance Optimizations

1. **Code Splitting**: Dynamic imports for route-based splitting
2. **Memoization**: React.memo for expensive components
3. **Lazy Loading**: Deferred loading of non-critical components
4. **Image Optimization**: Optimized asset loading
5. **Bundle Analysis**: Regular bundle size monitoring

## Security Considerations

- **Input Validation**: Client-side validation with server-side verification
- **XSS Protection**: Proper data sanitization
- **CSRF Protection**: Token-based request validation
- **Secure Storage**: Sensitive data handling best practices

## Development Guidelines

### Code Style
- **ESLint**: Enforced code style rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode enabled
- **Naming**: Descriptive, consistent naming conventions

### Commit Standards
- **Conventional Commits**: Structured commit messages
- **Atomic Commits**: Single responsibility per commit
- **Descriptive Messages**: Clear explanation of changes

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Recent Updates

### v1.2.0 - Code Quality & Testing Enhancement
- Comprehensive unit test implementation (2,400+ lines)
- TypeScript strict mode and interface improvements
- Reusable UserStatus component creation
- Enhanced error handling and user feedback
- Mobile responsive design improvements
- Performance optimizations and code refactoring

### v1.1.0 - UI/UX Improvements
- Table menu alignment fixes
- Typography consistency (12px headers, 13px body text)
- Reset button for empty states
- Enhanced filter functionality

## Known Issues

Currently, there are no known issues. All major functionality has been tested and verified.

## License

This project is created for assessment purposes and follows standard open-source practices.

## Support

For questions or issues, please refer to the commit history and code comments for detailed implementation explanations.

---

**Built for Lendsqr Frontend Engineer Assessment**