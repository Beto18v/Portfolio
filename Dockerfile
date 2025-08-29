# Use PHP 8.4 with Alpine as base image
FROM php:8.4-cli-alpine

# Install system dependencies including Node.js
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    icu-dev \
    oniguruma-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files first for better caching
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Copy environment file if not exists
RUN cp .env.example .env || true

RUN php artisan config:clear

# Run composer scripts that require the app code
RUN composer dump-autoload --optimize && php artisan package:discover --ansi

# Run database migrations (with fallback if DB not ready)
RUN php artisan migrate --force --no-interaction || true

# Build the assets
RUN npm run build

# Mostrar las extensiones PHP instaladas
RUN php -m

# Generate application key if not set
RUN php artisan key:generate || true

# Set permissions
RUN chown -R www-data:www-data /app \
    && chmod -R 755 /app/storage \
    && chmod -R 755 /app/bootstrap/cache \
    && chmod -R 755 /app/database

# Expose port (Railway will set PORT env var)
EXPOSE 8080

# Limpiar caché de configuración y aplicación al iniciar el contenedor
CMD php artisan cache:clear && php artisan config:cache && (php artisan migrate --force --no-interaction || echo "Migration failed, continuing...") && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
