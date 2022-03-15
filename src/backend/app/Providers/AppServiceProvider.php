<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository as CustomUserRepository;
use Laravel\Passport\Bridge\UserRepository as PassportUserRepository;
use Illuminate\Routing\UrlGenerator;

class AppServiceProvider extends ServiceProvider
{
    public function boot(UrlGenerator $url)
    {
        if(env('APP_ENV') !== 'local') {
            $url->forceScheme('https');
        }

        // Add custom user repository
        $this->app->bind(PassportUserRepository::class, CustomUserRepository::class);
    }

    public function register()
    {
        //
    }
}
