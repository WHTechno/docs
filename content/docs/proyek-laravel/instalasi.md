# Instalasi Laravel Project

Panduan lengkap untuk menginstal dan menjalankan proyek Laravel.

## Prasyarat

Pastikan sistem Anda memiliki:

- **PHP** (versi 8.2 atau lebih baru)
- **Composer** (dependency manager untuk PHP)
- **MySQL** atau **PostgreSQL**
- **Node.js** dan **npm** (untuk asset compilation)

## Langkah Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/proyek-laravel.git
cd proyek-laravel
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Setup

Edit file `.env` untuk konfigurasi database:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_project
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 5. Database Migration

```bash
# Create database tables
php artisan migrate

# Seed database with sample data (optional)
php artisan db:seed
```

### 6. Storage Link

```bash
# Create symbolic link for storage
php artisan storage:link
```

### 7. Start Development Server

```bash
# Start Laravel development server
php artisan serve

# In another terminal, compile assets
npm run dev
```

## Production Deployment

### 1. Optimize for Production

```bash
# Install production dependencies only
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache
```

### 2. Build Assets

```bash
# Build production assets
npm run build
```

### 3. Set Permissions

```bash
# Set proper permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

## Troubleshooting

### Error: Permission Denied

```bash
# Fix storage permissions
sudo chown -R www-data:www-data storage
sudo chown -R www-data:www-data bootstrap/cache
```

### Error: Key Not Found

```bash
# Generate new application key
php artisan key:generate
```

### Error: Database Connection

```bash
# Check database credentials in .env
# Ensure database server is running
sudo systemctl start mysql

# Test database connection
php artisan tinker
DB::connection()->getPdo();
```

## Development Tools

### Laravel Telescope (Debugging)

```bash
# Install Telescope
composer require laravel/telescope --dev

# Publish Telescope assets
php artisan telescope:install

# Run migrations
php artisan migrate
```

### Laravel Debugbar

```bash
# Install Debugbar
composer require barryvdh/laravel-debugbar --dev

# Publish config (optional)
php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
```

## Testing

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/UserTest.php

# Run tests with coverage
php artisan test --coverage
