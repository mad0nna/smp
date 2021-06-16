<?php

namespace App\Http\Middleware;

use Closure;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;

class Company
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user() && $request->user()->IsCompanyAdmin())
        {
            return $next($request);
        }
        return redirect ('/');
    }
}
