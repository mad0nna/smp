<?php

namespace App\Http\Middleware;

use Closure;

class ZuoraApi
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
        // requests authorization and bearer token check
        if (!$request->hasHeader('Authorization') || $request->bearerToken() !== config('app.zuora_api_token')) {
            abort(403, "You don't have permission to access this resource.");
        }

        return $next($request);
    }
}
