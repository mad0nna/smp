<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository as CustomUserRepository;
use Laravel\Passport\Bridge\UserRepository as PassportUserRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Add custom user repository
        $this->app->bind(PassportUserRepository::class, CustomUserRepository::class);
    }
}
