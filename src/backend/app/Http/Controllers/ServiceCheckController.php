<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class ServiceCheckController extends Controller
{
    public function __invoke(Request $request)
    {
        // parse token
        $token = base64_decode($request->header('X-MONITORING-TOKEN'));

        if ( $token !== 'smp-service-check') abort(404);

        try {
            // attempt redis connection
            Redis::connection();
            $redis = "OK";
        } catch (Exception $e) {
            $redis = 'Not Reachable';
        }

        try {
            // attempt database connection
            DB::connection()->getPdo();;
            $database = "OK";
        } catch (Exception $e) {
            $database = 'Not Reachable';
        }

        return response()->json([
            'nginx' => 'OK', // assumed ok if page is accessible
            'php' => 'OK',  // assumed ok if page is accessible
            'database' => $database,
            'redis' => $redis,
        ]);
    }
}
