# Full-Stack News Aggregator

A complete full-stack application with Laravel backend and React frontend, The project is to build a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

## Features

### Backend (Laravel)
- ✅ Laravel 10 with PHP 8.1+
- ✅ Laravel Sanctum for API authentication
- ✅ User registration and login endpoints
- ✅ User profile endpoint
- ✅ User preferences storage
- ✅ MySQL database with migrations
- ✅ RESTful API endpoints

### Frontend (React + TypeScript)
- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ React Router for navigation
- ✅ Axios for API communication
- ✅ Authentication context with localStorage
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design

## Project Structure

```
InnoscriptaTask/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Console/
│   │   │   └── Commands/
│   │   │       └── FetchArticlesCommand.php
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── ArticleController.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── UserPreference.php
│   │   │   └── Article.php
│   │   └── Providers/
│   ├── config/
│   ├── database/
│   │   ├── database.sqlite
│   │   ├── factories/
│   │   │   └── ArticleFactory.php
│   │   ├── migrations/
│   │   │   ├── 2025_06_30_110720_create_articles_table.php
│   │   └── seeders/
│   │       └── ArticleSeeder.php
│   ├── routes/
│   │   └── api.php
│   └── routes/
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/user` - Get user profile (protected)
- `POST /api/logout` - User logout (protected)

## Prerequisites

Before running this application, make sure you have the following installed:

- **PHP 8.1 or higher**
- **Composer** (PHP package manager)
- **Node.js 16 or higher**
- **npm** (Node.js package manager)
- **MySQL 5.7 or higher** (or MariaDB 10.2+)
- **Git**

## Quick Start with Docker

#### 1. Clone and Navigate
```bash
git clone <repository-url>
cd InnoscriptaTask
```

#### 2. Build and Start Containers
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

#### 3. Run Database Migrations
```bash
# Run migrations
docker-compose exec backend php artisan migrate

# Seed with dummy articles
docker-compose exec backend php artisan db:seed --class=ArticleSeeder
```

#### 4. Test Article Fetching
```bash
# Test fetching articles from external APIs
docker-compose exec backend php artisan articles:fetch
```

## Development

### Backend Development (Laravel)

```bash
cd backend

# Run migrations
php artisan migrate

# Create new migration
php artisan make:migration create_new_table

# Run tests
php artisan test

# Clear cache
php artisan cache:clear

# View routes
php artisan route:list
```

### Frontend Development (React)

```bash
cd frontend

# Install new dependencies
npm install package-name

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Environment Variables

### Backend (.env)
```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3308
DB_DATABASE=laravel_app
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `email_verified_at` - Email verification timestamp
- `remember_token` - Remember me token
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### User Preferences Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `theme` - User's preferred theme (light/dark)
- `language` - User's preferred language
- `notifications_enabled` - Boolean for notifications
- `timezone` - User's timezone
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Articles Table
- `id` - Primary key (bigint)
- `title` - Article title (string)
- `content` - Article content (longText)
- `source` - Source name (string)
- `category` - Article category (string)
- `published_at` - Publication date (timestamp)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Authentication Flow

1. **Registration**: User fills out registration form → API creates user and preferences → Returns JWT token
2. **Login**: User provides credentials → API validates → Returns JWT token
3. **Protected Routes**: Frontend includes JWT token in Authorization header
4. **Logout**: Frontend calls logout endpoint → Removes token from localStorage

## Security Features

- ✅ Password hashing with Laravel's Hash facade
- ✅ JWT tokens with Laravel Sanctum
- ✅ CSRF protection
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection

## UI Features

- ✅ Responsive design with Tailwind CSS
- ✅ Loading states for all forms
- ✅ Error message display
- ✅ Form validation
- ✅ Protected routes
- ✅ User profile display
- ✅ Logout functionality

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # For Laravel backend (default port 8000)
   php artisan serve --port=8001
   
   # For React frontend (default port 3000)
   npm run dev -- --port=3001
   ```

2. **Database connection issues**
   ```bash
   # Make sure MySQL is running
   sudo systemctl start mysql  # Linux
   brew services start mysql   # macOS
   
   # Create database if it doesn't exist
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS laravel_app;"
   
   # Check database connection
   php artisan tinker --execute="DB::connection()->getPdo();"
   
   # Run migrations again
   php artisan migrate:fresh
   ```

3. **Frontend not loading**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Backend API errors**
   ```bash
   # Clear Laravel cache
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   
   # Check Laravel logs
   tail -f storage/logs/laravel.log
   ```

5. **Composer issues**
   ```bash
   # Clear Composer cache
   composer clear-cache
   
   # Update Composer dependencies
   composer update
   ```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Article Search and Filtering

### Features
- Search news articles by keyword, source, category, or date
- Paginated results (10 per page)
- Filter by source, category, and date
- Modern UI for searching and browsing articles

### Backend
- `GET /api/articles` endpoint
  - Query params: `keyword`, `source`, `category`, `date`, `page`
  - Example: `/api/articles?keyword=tech&source=BBC&category=Technology&date=2024-06-30&page=2`
- Eloquent scopes for filtering
- Seeder and factory for 50+ dummy articles

### Frontend
- Dashboard page includes:
  - Search input for keyword
  - Dropdowns for source and category
  - Date picker for published date
  - Paginated article list with centered pagination controls
  - Loading, empty, and error states

### Usage
1. **Seed the database** (if not already seeded):
   ```bash
   cd backend
   php artisan migrate --seed
   ```
2. **Start backend and frontend servers** as described above.
3. **Login and navigate to Dashboard** to use the article search and filtering UI.

## Article Scraping and Storage

- The backend includes an Artisan command to fetch and store news articles from external APIs (NewsAPI, Guardian, NYT, etc.).
- The command normalizes, deduplicates, and stores articles in the local database.
- **Scheduling:**
  - The command is scheduled to run automatically every 10 minutes using Laravel's scheduler.
  - **Note:** If you want this to work, you still need to have the Laravel scheduler running in the background (via `php artisan schedule:work` or a cron job).
- You can also run the command manually:
  ```bash
  php artisan articles:fetch
  ```

## Docker Setup and Commands

### Prerequisites for Docker
- **Docker** and **Docker Compose** installed on your system
- **Git** for cloning the repository

### Ports Used
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MySQL**: localhost:3308

#### Reset Everything
```bash
# Stop and remove everything
docker-compose down --volumes --remove-orphans

# Remove all images
docker system prune -a

# Start fresh
docker-compose up --build
```

--- 