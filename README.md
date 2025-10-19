# UddoktaHut Backend

A robust multi-tenant SaaS e-commerce backend built with Node.js, Express, and Sequelize. This system provides subscription-based store management with customizable templates and comprehensive product management.

## 🚀 Features

### Core Features

- **Multi-tenant Architecture** - Multiple stores with isolated data
- **Subscription Management** - Trial periods and subscription enforcement
- **JWT Authentication** - Secure user authentication and authorization
- **Role-based Access Control** - Admin, store owner, and user roles
- **Product Management** - Full CRUD operations with search and pagination
- **Store Templates** - Customizable frontend themes per store
- **Public Store APIs** - Customer-facing endpoints for store browsing

### Technical Features

- **Database Migrations** - Version-controlled schema changes
- **Row-level Security** - Data isolation per user/store
- **Optimized Queries** - Efficient joins and indexing
- **Input Validation** - Zod schema validation
- **Error Handling** - Centralized error management
- **Pagination** - Efficient large dataset handling
- **Search Functionality** - Full-text search across products

## 📋 Table of Contents

- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Subscription System](#subscription-system)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🏗️ Architecture

This is a multi-tenant SaaS application where:

- Each **User** can own one **Store**
- Each **Store** has a **Subscription** (trial or paid)
- **Products** belong to stores (isolated per tenant)
- **Templates** customize the frontend appearance per store

```
User → Store → Products
  ↓      ↓
Roles  Subscription
```

For detailed architecture information, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 🗄️ Database Schema

### Core Models

- **User** - User accounts and authentication
- **Role** - User roles (admin, store_owner, customer)
- **UserRole** - Many-to-many relationship with onboarding status
- **Store** - Multi-tenant store instances
- **Subscription** - Trial/paid subscription management
- **Plan** - Subscription plan definitions
- **Product** - Store products with full metadata

### Relationships

```
User ←→ UserRole ←→ Role
User → Store → Subscription → Plan
Store → Products
```

For detailed schema documentation, see [DATABASE.md](./docs/DATABASE.md)

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Product Management (Protected)

- `GET /api/products` - List user's products with pagination/search
- `POST /api/products` - Create new product (requires active subscription)
- `PATCH /api/products/:id` - Update product (requires active subscription)
- `DELETE /api/products/:id` - Delete product (requires active subscription)

### Store Management

- `GET /api/store/:storeName` - Get public store info
- `GET /api/store/:storeName/products` - Get public store products
- `PATCH /api/store/:storeName/template` - Update store template (protected)

### Subscription Management

- `GET /api/subscription/status` - Get user subscription status

For complete API documentation, see [API.md](./docs/API.md)

## 🔧 Installation

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/FarhanMasud07/UddoktaHut-Backend.git
cd UddoktaHut-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Database Setup**

```bash
# Create database
createdb uddoktahut_development

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

5. **Start Development Server**

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## ⚙️ Configuration

### Environment Variables

```env
# Database Configuration
DB_NAME=uddoktahut_development
DB_USER=your_username
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=4000
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Database Configuration

The application uses Sequelize ORM with PostgreSQL. Configuration is managed in `config/config.js`.

## 🎯 Usage

### Creating a Store

1. Register a new user account
2. User automatically gets assigned store owner role
3. Store is created with default template
4. 7-day trial subscription is activated

### Managing Products

1. Authenticate as store owner
2. Use product endpoints to manage inventory
3. All operations require active subscription/trial

### Public Store Access

1. Customers can browse stores using store name
2. No authentication required for public endpoints
3. Template information is included for frontend theming

## 💳 Subscription System

### Trial Management

- New stores get 7-day free trial
- Trial status checked on all write operations
- Automatic trial expiration handling

### Subscription Enforcement

- Middleware checks subscription status
- Write operations blocked for expired subscriptions
- Read operations remain available

### Subscription Statuses

- `trialing` - Active trial period
- `active` - Paid subscription active
- `expired` - Subscription/trial ended

For detailed subscription documentation, see [SUBSCRIPTION.md](./docs/SUBSCRIPTION.md)

## 🚀 Deployment

### Production Considerations

- Set `NODE_ENV=production`
- Use environment variables for secrets
- Configure proper database connection pooling
- Set up SSL/TLS certificates
- Configure reverse proxy (nginx/Apache)

### Database Migration

```bash
# Production migration
NODE_ENV=production npx sequelize-cli db:migrate
```

For complete deployment guide, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 📖 Project Structure

```
UddoktaHut-Backend/
├── app/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication, validation, subscription
│   ├── models/          # Sequelize models
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   ├── utils/           # Constants and utilities
│   └── validations/     # Zod validation schemas
├── config/              # Sequelize configuration
├── migrations/          # Database migrations
├── seeders/            # Database seeders
├── docs/               # Documentation files
├── main.js             # Application entry point
└── package.json        # Dependencies and scripts
```

## 🛠️ Development Commands

```bash
# Start development server with hot reload
npm run dev

# Run database migrations
npm run db:migrate

# Rollback last migration
npm run db:migrate:undo

# Run seeders
npm run db:seed

# Generate new migration
npm run migration:generate -- --name migration-name

# Generate new seeder
npm run seed:generate -- --name seeder-name
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ES6+ features
- Follow existing code patterns
- Add JSDoc comments for functions
- Validate inputs with Zod schemas

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE.md)
- [API Reference](./docs/API.md)
- [Subscription System](./docs/SUBSCRIPTION.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Visual Diagrams](./docs/DIAGRAMS.md)

## 🖥️ Complete Project Repositories

This is part of a **full-stack SaaS e-commerce solution** with separate frontend and backend repositories:

### Backend (Current Repository)

**Repository:** [https://github.com/FarhanMasud07/UddoktaHut-Backend](https://github.com/FarhanMasud07/UddoktaHut-Backend)

- **Multi-tenant API** - Subscription-based store management
- **JWT Authentication** - Secure user and role management
- **Product Management** - Full CRUD with search and pagination
- **Subscription System** - Trial management and access control

### Frontend Integration

**Repository:** [https://github.com/FarhanMasud07/UddoktaHut](https://github.com/FarhanMasud07/UddoktaHut)

- **Multi-store Frontend** - Dynamic store pages based on store templates
- **Customer Shopping Experience** - Product browsing and purchasing interface
- **Store Owner Dashboard** - Product management and analytics interface
- **Template Customization** - Theme switching and store personalization

The frontend consumes the public store APIs (`/store/:storeName/products`) for customer-facing pages and the protected APIs for store management, creating a complete SaaS e-commerce solution.## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact: f.mahin7@gmail.com

---

**Built with ❤️ by Farhan Masud**
