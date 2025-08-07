# Pengenalan Laravel Project

Selamat datang di dokumentasi proyek Laravel yang powerful dan elegant.

## Tentang Proyek

Proyek ini adalah aplikasi web backend yang dibangun dengan Laravel framework, menyediakan API yang robust dan scalable untuk aplikasi modern.

## Fitur Utama

- **Eloquent ORM**: Object-Relational Mapping yang powerful
- **Artisan CLI**: Command line interface untuk development
- **Blade Templates**: Template engine yang elegant
- **Middleware**: Request filtering yang fleksibel
- **Authentication**: Sistem autentikasi yang lengkap
- **API Resources**: Transformasi data yang konsisten

## Teknologi Stack

```json
{
  "php": "^8.2",
  "laravel/framework": "^10.0",
  "laravel/sanctum": "^3.0",
  "laravel/tinker": "^2.8"
}
```

## Struktur Proyek

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   └── ProductController.php
│   ├── Middleware/
│   │   └── Authenticate.php
│   └── Requests/
│       ├── LoginRequest.php
│       └── RegisterRequest.php
├── Models/
│   ├── User.php
│   └── Product.php
└── Services/
    ├── AuthService.php
    └── ProductService.php
```

## Contoh API Endpoint

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::with('profile')->paginate(15);
        
        return response()->json([
            'status' => 'success',
            'data' => $users,
            'message' => 'Users retrieved successfully'
        ]);
    }
    
    public function show(User $user): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $user->load('profile', 'posts'),
            'message' => 'User retrieved successfully'
        ]);
    }
}
```

## Database Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('stock');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

## Getting Started

1. Clone repository: `git clone <repo-url>`
2. Install dependencies: `composer install`
3. Setup environment: `cp .env.example .env`
4. Generate key: `php artisan key:generate`
5. Run migrations: `php artisan migrate`
6. Start server: `php artisan serve`
