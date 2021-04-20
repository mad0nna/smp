<?php

namespace App\Http\Middleware;

use Closure;

class Acl
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
        // get the current request path
        $path = $request->path();

        // get the url without api suffix
        $url = str_replace(config('app.api_version') . '/', '', $path);

        // breakdown the url segments
        $uriSegments = explode('/', $url);

        // check if request type will need read/write permissions
        $write = in_array($request->method(), ['POST', 'PUT', 'DELETE', 'PATCH']);

        if ($request->user()->canAccessResource($uriSegments[0], $write) === false) {
            abort(403, "You don't have permission to access this resource.");
        }

        return $next($request);
    }
}
