<?php

namespace App\Http\Controllers\Auth\Socialite;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class ProviderRedirectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $provider)
    {
        if(!in_array($provider,['facebook','google'])){
            return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/login')->withErrors(['provider' => 'Invalid provider']);
        }

        try {
            return Socialite::driver($provider)->redirect();
        } catch (\Exception $e) {
            return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/login')->withErrors(['provider' => 'Something went wrong']);
        }
    }
}
