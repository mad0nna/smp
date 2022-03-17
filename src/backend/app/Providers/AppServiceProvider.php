<?php

namespace App\Providers;

use Illuminate\Routing\UrlGenerator;
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
    public function boot(UrlGenerator $url)
    {
        // Handle load mixed content over https error when using AWS Load Balancer
        if (in_array(env('APP_ENV'), ['staging', 'production'])) {
            $url->forceScheme('https');
        }

        // Add custom user repository
        $this->app->bind(PassportUserRepository::class, CustomUserRepository::class);
    }
}
