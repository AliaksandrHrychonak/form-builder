# Backend Documentation

> This is a NestJS-based backend application that provides a template management system with tags, user management, and
> search capabilities using MongoDB and Elasticsearch.

## Key Features

1. Template Management
2. Template Tagging System
3. User Management
4. Elasticsearch Integration
5. AWS S3 Integration
6. Role-based Access Control
7. Database Migration System

## Technical Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Search Engine**: Elasticsearch
- **Storage**: AWS S3
- **Authentication**: JWT
- **Schema Validation**: Class Validator
- **Documentation**: Swagger/OpenAPI

# Project Requirements and Infrastructure

## Cloud Services Integration

### AWS Services

- **S3 Integration** for storing template images and attachments
- **SES Integration** for sending emails
- **AWS SDK** usage for AWS services interaction

### Elasticsearch

- Used for full-text search functionality
- Handles template indexing and search operations
- Supports advanced querying and filtering
- Maintains search indices for templates, including:
    - Template content
    - Tags
    - User information
    - Comments
    - Questions
    - Popularity metrics

## Authentication & Authorization

- **Stateless Authentication** using JWT tokens
- **Google SSO Integration**
    - Requires Google Cloud Console account
    - Need to configure `clientId` and `clientSecret`
    - Set up OAuth 2.0 credentials
- **Apple SSO Integration**
    - Requires `clientId` and `signInClientId`
    - Apple Developer Account needed

## Database Requirements

### MongoDB Configuration

- **Mandatory Replication Set** setup for:
    - Supporting database transactions
    - Ensuring data consistency
    - High availability

## Environment Configuration

### Production Environment (`APP_ENV=production`)

When activated, the following changes occur:

1. **CORS Configuration**
    - Implements settings from `src/configs/middleware.config.ts`
    - Stricter security policies

2. **API Documentation**
    - Swagger/OpenAPI documentation disabled

3. **API Routing**
    - Removes global `/api` prefix
    - Direct endpoint access

## Monitoring and Error Tracking

### Sentry Integration

- Integrated with `sentry.io`
- Tracks server errors (500 - Internal Server Error)
- Error reporting configuration:
    - Source maps uploading
    - Environment-based filtering
    - Custom error contexts

## Search Engine Configuration

### Elasticsearch Setup

- **Index Management**
    - Automatic index creation
    - Template mapping configuration
    - Field type definitions

- **Search Features**
    - Full-text search
    - Faceted search
    - Sorting and filtering
    - Pagination support

- **Document Operations**
    - Bulk indexing
    - Real-time updates
    - Deletion handling

- **Performance Optimization**
    - Field boosting
    - Relevance scoring
    - Query optimization

## Development Guidelines

1. Always run MongoDB in replication set mode
2. Configure all required AWS credentials
3. Set up Elasticsearch instance and verify connectivity
4. Properly configure SSO credentials
5. Set up Sentry project and configure DSN
6. Follow environment-specific configurations

## Build with

Describes which version.

| Name           | Version   |
|----------------|-----------|
| NestJS         | v10.4.16  |
| NestJS Swagger | v7.3.1    |
| NodeJS         | v20.17.30 |
| TypeScript     | v5.8.3    |
| Mongoose       | v8.13.2   |
| MongoDB        | v7.0      |
| Yarn           | v1.22.22  |
| NPM            | v10.2.4   |
| Docker         | v24.0.7   |
| Docker Compose | v2.23.3   |

## Installation

Before starting, you need to install some essential packages and tools.
We recommend using LTS (Long Term Support) versions for all tools and packages.

> Please verify that all tools have been installed successfully by checking their versions.

### Required Tools

1. [NodeJS][ref-nodejs] (v20.x)
   ```bash
   node --version
   ```

2. [MongoDB][ref-mongodb] (v7.x)
   ```bash
   mongod --version
   ```

3. [Elasticsearch][ref-elasticsearch] (v8.10.x)
   ```bash
   elasticsearch --version
   ```

4. [pnpm][ref-pnpm] (v8.x)
   ```bash
   pnpm --version
   ```

5. [Git][ref-git]
   ```bash
   git --version
   ```

### Database Setup

1. MongoDB Configuration
    - Must be run as a replication set for transaction support
    - Recommended configuration for development:
   ```bash
   mongod --replSet rs0 --dbpath /path/to/data/db
   ```

2. Elasticsearch Setup
    - Required for full-text search functionality
    - Default configuration for development:
   ```bash
   elasticsearch -E cluster.name=templates -E node.name=node-1
   ```

### Development Tools

For better development experience, install these optional tools:

- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [Kibana](https://www.elastic.co/kibana) - Elasticsearch GUI

[ref-nodejs]: https://nodejs.org/

[ref-mongodb]: https://www.mongodb.com/try/download/community

[ref-elasticsearch]: https://www.elastic.co/downloads/elasticsearch

[ref-pnpm]: https://pnpm.io/installation

[ref-git]: https://git-scm.com/downloads

### Database Migration and Seed

By default the options of `AutoCreate` and `AutoIndex` will be `false`. Thats means the schema in MongoDb will not
change with the latest.
So to update the schema we need to run

```bash
pnpm migrate:schema
```

After migrate the schema, also we need to run data seed

```bash
pnpm seed
```

## Installation with Docker

For docker installation, we need more tools to be installed.

1. [Docker][ref-docker]
2. [Docker-Compose][ref-dockercompose]

Make your own environment file with a copy of `env.example` and adjust values to suit your own environment.

```bash
cp .env.example .env
```

then run

```bash
docker-compose up -d
```

### User

1. Super Admin
    - email: `superadmin@mail.com`
    - password: `aaAA@123`
2. Admin
    - email: `admin@mail.com`
    - password: `aaAA@123`
3. Member
    - email: `member@mail.com`
    - password: `aaAA@123`
4. User
    - email: `user@mail.com`
    - password: `aaAA@123`

## Prerequisites

- Node.js v20.x
- MongoDB v7.x
- Elasticsearch v8.10.x
- pnpm v8.x
- Docker & Docker Compose (optional)

## Local Development Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file with your configuration.

### 3. Setup MongoDB Replica Set

Using Docker:

```bash
# Create network
docker network create mongodb-network

# Start primary node
docker run -d --name mongodb-primary \
  --network mongodb-network \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  mongo:7.0 --replSet rs0 --bind_ip_all

# Initialize replica set
docker exec -it mongodb-primary mongosh --eval "rs.initiate({
 _id: 'rs0',
 members: [
   {_id: 0, host: 'mongodb-primary:27017'}
 ]
})"
```

### 4. Setup Elasticsearch

Using Docker:

```bash
# Create network
docker network create elastic-network

# Start Elasticsearch
docker run -d --name elasticsearch \
  --network elastic-network \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  elasticsearch:8.10.0

# Start Kibana (optional)
docker run -d --name kibana \
  --network elastic-network \
  -p 5601:5601 \
  -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" \
  kibana:8.10.0
```

### 5. Database Setup

Initialize database schema:

```bash
pnpm migrate:schema
```

Seed initial data:

```bash
pnpm seed
```

### 6. Asset Migration (Optional)

Upload template assets to AWS:

```bash
pnpm migrate:asset
```

### 7. Elasticsearch Index Setup

Create and configure indices:

```bash
pnpm elasticsearch:setup
```

Index existing data:

```bash
pnpm elasticsearch:reindex
```

### 8. Start Development Server

```bash
pnpm start:dev
```

## Docker Deployment

### 1. Build and Start Services

```bash
docker-compose up -d
```

This starts:

- NestJS application
- MongoDB replica set
- Elasticsearch
- Kibana (optional)

### 2. Initialize MongoDB Replica Set

```bash
docker-compose exec mongodb mongosh --eval "rs.initiate({
 _id: 'rs0',
 members: [
   {_id: 0, host: 'mongodb:27017'}
 ]
})"
```

### 3. Run Migrations & Seeds

```bash
docker-compose exec app pnpm migrate:schema
docker-compose exec app pnpm seed
docker-compose exec app pnpm elasticsearch:setup
docker-compose exec app pnpm elasticsearch:reindex
```

## API Documentation

Access Swagger documentation at:

- Development: http://localhost:3000/docs
- Production: Active by default

## Environment Variables

See `.env.example`

### Core Modules

#### 1. Auth Module (`/modules/auth`)

- JWT authentication implementation
- SSO integration (Google & Apple)
- Role-based access control (RBAC)
- Authentication guards
- Password encryption/verification

#### 2. User Module (`/modules/user`)

- User CRUD operations
- Profile management
- Role management
- User preferences
- Activity tracking

#### 3. Template Module (`/modules/template`)

- Template CRUD operations
- Version control
- Template categories
- Template tagging
- Access control
- Rating system

#### 4. Search Module (`/modules/search`)

- Elasticsearch integration
- Full-text search
- Search filters
- Search results pagination
- Search analytics
- Index management

#### 5. Storage Module (`/modules/storage`)

- AWS S3 integration
- File upload/download
- File type validation
- Access control
- Temporary URLs generation

### Supporting Components

#### Database (`/database`)

- MongoDB schemas
- Migration scripts
- Seed data
- Indexes configuration

#### Common (`/common`)

- Custom decorators
- Exception filters
- Guards
- Utility functions
- Common interfaces
- Validation pipes

#### Config (`/configs`)

- Environment configuration
- Service configurations
- Security settings
- External API configurations

### Key Features by Module

#### Auth Module Features

- JWT token generation/validation
- Social authentication
- Permission management
- Session handling
- Security middleware

#### User Module Features

- User registration/login
- Profile updates
- Role assignment
- Password management
- User search

#### Template Module Features

- Template creation/editing
- Version control
- Category management
- Tag management
- Template sharing
- Access permissions

#### Search Module Features

- Real-time indexing
- Advanced search queries
- Faceted search
- Search suggestions
- Result highlighting
- Search analytics

#### Storage Module Features

- Secure file upload
- File access control
- File type validation
- Temporary access URLs
- Storage optimization
