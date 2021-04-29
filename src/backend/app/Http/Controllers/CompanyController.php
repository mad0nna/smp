<?php

namespace App\Http\Controllers;

class CompanyController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware(['auth', 'verified']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('company-dashboard');
    }

    public function login()
    {
        return view('auth/company-login');
    }

    public function dashboard()
    {
        return view('companyDashboard');
    }
}
